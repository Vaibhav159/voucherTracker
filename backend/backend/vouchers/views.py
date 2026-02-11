"""
Voucher API ViewSets.

This module provides the REST API endpoints for vouchers and platforms.
Sync operations are delegated to service classes in the services/ directory.
"""

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import decorators
from rest_framework import filters
from rest_framework import permissions
from rest_framework import response
from rest_framework import viewsets

from backend.vouchers.models import Platform
from backend.vouchers.models import Voucher
from backend.vouchers.serializers import PlatformSerializer
from backend.vouchers.serializers import VoucherSerializer
from backend.vouchers.services import GyftrSyncService
from backend.vouchers.services import IShopSyncService
from backend.vouchers.services import MagnifySyncService
from backend.vouchers.services import MaximizeSyncService


class PlatformViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer
    permission_classes = [permissions.AllowAny]


@method_decorator(cache_page(60 * 15), name="dispatch")
class VoucherViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Voucher.objects.prefetch_related("platforms", "platforms__platform").all()
    serializer_class = VoucherSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["category"]
    search_fields = ["name"]

    @decorators.action(detail=False, methods=["post"], permission_classes=[permissions.AllowAny])
    def sync_maximize(self, request):
        """Sync vouchers from Maximize platform."""
        service = MaximizeSyncService()
        result = service.fetch_and_sync()

        status_code = 200 if result.get("status") == "success" else 400
        return response.Response(result, status=status_code)

    @decorators.action(detail=False, methods=["post"], permission_classes=[permissions.AllowAny])
    def sync_gyftr(self, request):
        """Sync vouchers from Gyftr platform."""
        service = GyftrSyncService()
        result = service.fetch_and_sync()

        status_code = 200 if result.get("status") == "success" else 400
        return response.Response(result, status=status_code)

    @decorators.action(detail=False, methods=["post"], permission_classes=[permissions.AllowAny])
    def sync_ishop(self, request):
        """Sync vouchers from iShop platform (requires encrypted data in request body)."""

        service = IShopSyncService()
        result = service.fetch_and_sync()

        status_code = 200 if result.get("status") == "success" else 400
        return response.Response(result, status=status_code)

    @decorators.action(detail=False, methods=["post"], permission_classes=[permissions.AllowAny])
    def sync_magnify(self, request):
        """Sync vouchers from Magnify platform."""
        service = MagnifySyncService()
        result = service.fetch_and_sync()

        status_code = 200 if result.get("status") == "success" else 400
        return response.Response(result, status=status_code)

    @decorators.action(detail=False, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def sync_ishop_local(self, request):
        """Sync vouchers from iShop platform using provided item list."""
        items = request.data
        if not isinstance(items, list):
            return response.Response(
                {"status": "error", "message": "Expected a list of items"},
                status=400,
            )

        service = IShopSyncService()
        result = service.process_items(items)

        status_code = 200 if result.get("status") == "success" else 400
        return response.Response(result, status=status_code)
