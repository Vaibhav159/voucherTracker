from collections import defaultdict

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, permissions, decorators, response

from .models import Voucher, VoucherPlatform, VoucherMismatch, Platform
from .choices import VoucherMismatchStatus, PlatformName
from .serializers import VoucherSerializer


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
        import requests

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
