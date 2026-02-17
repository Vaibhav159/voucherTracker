"""
Base sync service with optimized database operations.

This module provides the foundation for all platform sync services,
implementing bulk operations to minimize database queries.
"""

from __future__ import annotations

from typing import NamedTuple

from django.core.cache import cache
from django.utils import timezone

from backend.vouchers.choices import VoucherMismatchStatus
from backend.vouchers.models import Platform
from backend.vouchers.models import Voucher
from backend.vouchers.models import VoucherAlias
from backend.vouchers.models import VoucherMismatch
from backend.vouchers.models import VoucherPlatform


class SyncItem(NamedTuple):
    """Standardized item format for sync operations."""

    external_id: str
    brand_name: str
    gift_card_name: str
    fee: str
    link: str
    raw_data: dict
    priority: int = 0
    cap: str = ""


class SyncResult(NamedTuple):
    """Result of a sync operation."""

    created: int
    updated: int
    skipped_count: int
    skipped_items: list

    def __add__(self, other):
        return SyncResult(
            self.created + other.created,
            self.updated + other.updated,
            self.skipped_count + other.skipped_count,
            self.skipped_items + other.skipped_items,
        )


class BaseSyncService:
    """
    Base class for platform sync services.

    Provides optimized bulk database operations to reduce query count
    from O(3N) to O(4) constant queries per sync.
    """

    platform_name: str = ""
    platform_icon_url: str = ""

    def __init__(self):
        self._voucher_lookup: dict[str, Voucher] | None = None
        self._alias_lookup: dict[str, Voucher] | None = None
        self._platform: Platform | None = None

    def get_platform(self) -> Platform:
        """Get or create the platform for this sync service."""
        if self._platform is None:
            self._platform, _ = Platform.objects.get_or_create(
                name=self.platform_name,
                defaults={"icon_url": self.platform_icon_url},
            )
        return self._platform

    def _build_lookups(self) -> None:
        """
        Build in-memory lookup dictionaries for vouchers and aliases.
        This converts O(2N) queries to O(2) queries.
        """
        if self._voucher_lookup is not None:
            return

        # Build voucher name -> voucher lookup (case-insensitive)
        self._voucher_lookup = {}
        for voucher in Voucher.objects.all():
            self._voucher_lookup[voucher.name.lower()] = voucher

        # Build alias name -> voucher lookup (case-insensitive)
        self._alias_lookup = {}
        for alias in VoucherAlias.objects.select_related("voucher").all():
            self._alias_lookup[alias.name.lower()] = alias.voucher

    def find_voucher(self, name: str) -> Voucher | None:
        """
        Find a voucher by name or alias.
        Uses in-memory lookups for O(1) performance.
        """
        self._build_lookups()
        name_lower = name.lower()

        # Try direct name match first
        voucher = self._voucher_lookup.get(name_lower)
        if voucher:
            return voucher

        # Fall back to alias match
        return self._alias_lookup.get(name_lower)

    def sync_items(self, items: list[SyncItem]) -> SyncResult:
        """
        Sync a list of items to the database using bulk operations.

        Args:
            items: List of SyncItem objects to sync

        Returns:
            SyncResult with counts and skipped items
        """
        platform = self.get_platform()
        self._build_lookups()

        # Classify items into matched and unmatched
        voucher_platforms_to_upsert: list[VoucherPlatform] = []
        mismatches_to_upsert: list[VoucherMismatch] = []
        skipped_items: list[dict] = []

        # Track which (voucher_id, platform_id) pairs we've seen
        # to handle duplicates in the input
        seen_voucher_platform_pairs: set[tuple] = set()

        for item in items:
            voucher = self.find_voucher(item.brand_name)
            if not voucher and item.gift_card_name:
                voucher = self.find_voucher(item.gift_card_name)

            if voucher:
                pair_key = (voucher.id, platform.id)
                if pair_key in seen_voucher_platform_pairs:
                    continue  # Skip duplicates
                seen_voucher_platform_pairs.add(pair_key)

                voucher_platforms_to_upsert.append(
                    VoucherPlatform(
                        voucher=voucher,
                        platform=platform,
                        external_id=item.external_id,
                        fee=item.fee,
                        cap=item.cap,
                        link=item.link,
                        priority=item.priority,
                    ),
                )
            else:
                mismatches_to_upsert.append(
                    VoucherMismatch(
                        platform=platform,
                        external_id=item.external_id,
                        brand_name=item.brand_name,
                        gift_card_name=item.gift_card_name or item.brand_name,
                        raw_data=item.raw_data,
                        status=VoucherMismatchStatus.PENDING,
                    ),
                )
                skipped_items.append(
                    {
                        "id": item.external_id,
                        "brand": item.brand_name,
                        "name": item.gift_card_name,
                    },
                )

        # Bulk upsert VoucherPlatform
        created_count = 0
        updated_count = 0

        if voucher_platforms_to_upsert:
            # Get existing VoucherPlatform records to determine created vs updated
            existing_pairs = set(
                VoucherPlatform.objects.filter(
                    platform=platform,
                    voucher_id__in=[vp.voucher_id for vp in voucher_platforms_to_upsert],
                ).values_list("voucher_id", "platform_id"),
            )

            for vp in voucher_platforms_to_upsert:
                if (vp.voucher_id, vp.platform_id) in existing_pairs:
                    updated_count += 1
                else:
                    created_count += 1

            # Perform bulk upsert
            VoucherPlatform.objects.bulk_create(
                voucher_platforms_to_upsert,
                update_conflicts=True,
                unique_fields=["voucher", "platform"],
                update_fields=["external_id", "fee", "cap", "link", "priority"],
                batch_size=50,
            )

        # Bulk upsert VoucherMismatch
        if mismatches_to_upsert:
            VoucherMismatch.objects.bulk_create(
                mismatches_to_upsert,
                update_conflicts=True,
                unique_fields=["platform", "external_id"],
                update_fields=["brand_name", "gift_card_name", "raw_data", "status"],
                batch_size=50,
            )

        # Clear cache after sync
        cache.clear()

        return SyncResult(
            created=created_count,
            updated=updated_count,
            skipped_count=len(skipped_items),
            skipped_items=skipped_items,
        )

    def update_stock_status(self, active_external_ids: list[str] | set[str]) -> None:
        """
        Update out_of_stock_at for items based on their presence in the current sync.

        Args:
            active_external_ids: List/Set of external IDs found in the current sync.
        """
        platform = self.get_platform()
        now = timezone.now()

        # 1. Mark missing items as out of stock
        # Only update if currently in stock (out_of_stock_at is None)
        # We exclude items that match the active external_ids
        VoucherPlatform.objects.filter(platform=platform).exclude(external_id__in=active_external_ids).filter(
            out_of_stock_at__isnull=True,
        ).update(out_of_stock_at=now)

        # 2. Mark present items as in stock
        # Only update if currently out of stock (out_of_stock_at is NOT None)
        VoucherPlatform.objects.filter(platform=platform, external_id__in=active_external_ids).filter(
            out_of_stock_at__isnull=False,
        ).update(out_of_stock_at=None)
