from collections import defaultdict

import requests
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, permissions, decorators, response

from backend.vouchers.models import Voucher, VoucherPlatform, VoucherMismatch, Platform
from backend.vouchers.choices import VoucherMismatchStatus, PlatformName
from backend.vouchers.serializers import VoucherSerializer, PlatformSerializer


class PlatformViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer
    permission_classes = [permissions.AllowAny]


@method_decorator(cache_page(60 * 15), name='dispatch')
class VoucherViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Voucher.objects.prefetch_related('platforms', 'platforms__platform', 'aliases').all()
    serializer_class = VoucherSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['name', 'aliases__name']

    def _handle_voucher_sync(self, voucher: Voucher, platform: Platform, item):
        external_id = str(item.get("id"))
        brand_name = item.get("brand")
        gift_card_name = item.get("giftCardName")
        discount = item.get("discount")

        if voucher:
            # Upsert VoucherPlatform
            vp, vp_created = VoucherPlatform.objects.update_or_create(
                voucher=voucher,
                platform=platform,
                defaults={
                    "external_id": external_id,
                    "fee": f"{discount}% OFF" if discount > 0 else "0% OFF",
                    "cap": "No Cap",
                    "link": f"https://www.maximize.money/gift-cards/{brand_name}/{external_id}",
                    "priority": 10
                }
            )
            return 'created' if vp_created else 'updated', None
        else:
            # Log mismatch
            VoucherMismatch.objects.update_or_create(
                platform=platform,
                external_id=external_id,
                defaults={
                    "brand_name": brand_name,
                    "gift_card_name": gift_card_name or brand_name,
                    "raw_data": item,
                    "status": VoucherMismatchStatus.PENDING
                }
            )
            return 'mismatch', {
                "id": external_id,
                "brand": brand_name,
                "name": gift_card_name
            }

    @decorators.action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def sync_maximize(self, request):
        url = 'https://savemax.maximize.money/api/savemax/giftcard/list-all-llm?pageSize=400'
        headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-IN,en;q=0.6',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
        }

        try:
            external_res = requests.get(url, headers=headers)
            external_res.raise_for_status()
            data = external_res.json()
            items = data.get("data", {}).get("giftCardList", [])

            brand_to_giftcard_map = defaultdict(list)

            for item in items:
                brand_to_giftcard_map[item["brand"]].append(item)

            if not brand_to_giftcard_map:
                return response.Response({"status": "error", "message": "No brands found."}, status=400)

            # Ensure "Maximize" platform exists
            platform, created = Platform.objects.get_or_create(
                name=PlatformName.MAXIMIZE,
                defaults={"icon_url": "https://savemax.maximize.money/favicon.ico"}
            )

            updated_count = 0
            created_count = 0
            skipped_items = []

            for brand_name, brand_items in brand_to_giftcard_map.items():
                if len(brand_items) == 1:
                    item = brand_items[0]
                    if item.get("discount") is None:
                        continue

                    # Search by brand OR gift card name
                    voucher = Voucher.objects.filter(name__iexact=brand_name).first()
                    if not voucher:
                        voucher = Voucher.objects.filter(aliases__name__iexact=item.get("giftCardName")).first()

                    status, data = self._handle_voucher_sync(voucher, platform, item)

                    if status == 'created':
                        created_count += 1
                    elif status == 'updated':
                        updated_count += 1
                    elif status == 'mismatch':
                        skipped_items.append(data)
                else:
                    for item in brand_items:
                        if item.get("discount") is None:
                            continue

                        # Match ONLY via gift_card_name
                        gift_card_name = item.get("giftCardName")
                        voucher = Voucher.objects.filter(name__iexact=gift_card_name).first()
                        if not voucher:
                            voucher = Voucher.objects.filter(aliases__name__iexact=gift_card_name).first()
                        status, data = self._handle_voucher_sync(voucher, platform, item)

                        if status == 'created':
                            created_count += 1
                        elif status == 'updated':
                            updated_count += 1
                        elif status == 'mismatch':
                            skipped_items.append(data)

            from django.core.cache import cache
            cache.clear()  # Invalidate cache after sync

            return response.Response({
                "status": "success",
                "message": f"Synced {len(items)} items.",
                "created": created_count,
                "updated": updated_count,
                "skipped_count": len(skipped_items),
                "skipped_items": skipped_items
            })

        except Exception as e:
            return response.Response({"status": "error", "message": str(e)}, status=500)

    @decorators.action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def sync_gyftr(self, request):
        GYFTR_CATEGORIES_URL = 'https://communication.gyftr.com/hdfcsmartbuyapizeta/hdfcbank/api/v1/home/categories'
        GYFTR_BRANDS_URL_TEMPLATE = 'https://communication.gyftr.com/hdfcsmartbuyapizeta/hdfcbank/api/v1/categories/brands/{slug}/300'

        headers = {
            'accept': 'application/json, text/plain, */*',
            'origin': 'https://www.gyftr.com',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
            'content-type': 'application/json'
        }

        try:
            # 1. Fetch Categories
            cat_res = requests.get(GYFTR_CATEGORIES_URL, headers=headers)
            cat_res.raise_for_status()
            cat_json = cat_res.json()

            if cat_json.get('status') != 'SUCCESS':
                return response.Response({"status": "error", "message": "Failed to fetch categories"}, status=400)

            categories = cat_json.get('data', [])

            # Ensure "Gyftr" platform exists
            platform, _ = Platform.objects.get_or_create(
                name=PlatformName.GYFTR,
                defaults={"icon_url": "https://www.gyftr.com/public/images/gyftr_logo.png"}  # Default logo if needed
            )

            created_count = 0
            updated_count = 0
            skipped_items = []

            for cat in categories:
                cat_slug = cat.get('slug')
                brands_url = GYFTR_BRANDS_URL_TEMPLATE.format(slug=cat_slug)

                payload = {
                    "id": 0,
                    "brandid": 0,
                    "from": 0,
                    "to": 500,
                    "bogoFilter": "",
                    "redemptionFilter": "",
                    "saleFilter": False
                }

                try:
                    brand_res = requests.post(brands_url, headers=headers, json=payload)
                    brand_res.raise_for_status()
                    brand_json = brand_res.json()

                    if brand_json.get('status') != 'SUCCESS':
                        continue

                    brands = brand_json.get('data', [])

                    for item in brands:
                        brand_name = item.get('name')
                        item["category"] = cat["name"]
                        # Normalize brand name for matching same as JS script: toLowerCase and remove non-alphanumeric
                        # However, DB search is usually case-insensitive. We will use standard logic.

                        # Search by brand exact match (iexact)
                        voucher = Voucher.objects.filter(name__iexact=brand_name).first()
                        if not voucher:
                            # Check aliases
                            voucher = Voucher.objects.filter(aliases__name__iexact=brand_name).first()

                        # Prepare mapping item
                        # In JS script:
                        # offer_value -> discount %
                        # slug -> part of link

                        try:
                            offer_val = float(item.get('offer_value', 0) or 0)
                        except (ValueError, TypeError):
                            offer_val = 0

                        discount_text = f"Discount {offer_val:g}%" if offer_val > 0 else "None"
                        slug = item.get('slug')
                        link = f"https://www.gyftr.com/instantvouchers/{slug}"

                        # Reuse _handle_voucher_sync structure, but we need to adapt it slightly
                        # because _handle_voucher_sync expects specific keys in 'item' for Maximize.
                        # We can construct a compatible item or call logic directly.
                        # Let's call logic directly to avoid confusion or adapt _handle_voucher_sync if it was more generic.
                        # _handle_voucher_sync uses: id, brand, giftCardName, discount.
                        # Here we have: id, name, name, offer_value

                        external_id = str(item.get("id"))

                        if voucher:
                            vp, vp_created = VoucherPlatform.objects.update_or_create(
                                voucher=voucher,
                                platform=platform,
                                defaults={
                                    "external_id": external_id,
                                    "fee": discount_text,
                                    # "cap": "10k/month", # Default as per JS script
                                    "link": link,
                                    # "priority": 5 # Let's not set priority hardcoded for now or maybe lower than Maximize?
                                }
                            )
                            if vp_created:
                                created_count += 1
                            else:
                                updated_count += 1
                        else:
                            # Log mismatch
                            VoucherMismatch.objects.update_or_create(
                                platform=platform,
                                external_id=external_id,
                                defaults={
                                    "brand_name": brand_name,
                                    "gift_card_name": brand_name,  # Gyftr usually implies brand = gift card
                                    "raw_data": item,
                                    "status": VoucherMismatchStatus.PENDING
                                }
                            )
                            skipped_items.append({
                                "id": external_id,
                                "brand": brand_name,
                                "name": brand_name
                            })

                except Exception as brand_err:
                    print(f"Error fetching brands for {cat_slug}: {brand_err}")
                    continue

            from django.core.cache import cache
            cache.clear()

            return response.Response({
                "status": "success",
                "message": f"Synced Gyftr items.",
                "created": created_count,
                "updated": updated_count,
                "skipped_count": len(skipped_items),
                # "skipped_items": skipped_items # Can be large
            })

        except Exception as e:
            return response.Response({"status": "error", "message": str(e)}, status=500)
