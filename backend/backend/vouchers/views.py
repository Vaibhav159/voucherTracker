"""
Voucher API ViewSets.

This module provides the REST API endpoints for vouchers and platforms.
Sync operations are delegated to service classes in the services/ directory.
"""

from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import decorators
from rest_framework import filters
from rest_framework import permissions
from rest_framework import response
from rest_framework import status
from rest_framework import viewsets

from backend.vouchers.choices import StockAlertStatus
from backend.vouchers.models import Platform
from backend.vouchers.models import StockAlert
from backend.vouchers.models import TelegramSubscription
from backend.vouchers.models import Voucher
from backend.vouchers.models import VoucherSubscription
from backend.vouchers.serializers import PlatformSerializer
from backend.vouchers.serializers import StockAlertMarkSentSerializer
from backend.vouchers.serializers import StockAlertSerializer
from backend.vouchers.serializers import TelegramLinkSerializer
from backend.vouchers.serializers import TelegramSubscriptionSerializer
from backend.vouchers.serializers import VoucherSerializer
from backend.vouchers.serializers import VoucherSubscriptionSerializer
from backend.vouchers.services import GyftrSyncService
from backend.vouchers.services import IShopSyncService
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


class TelegramSubscriptionViewSet(viewsets.ModelViewSet):
    """
    API for managing Telegram subscriptions.
    Used by n8n to register users and manage their subscriptions.
    """

    queryset = TelegramSubscription.objects.prefetch_related("voucher_subscriptions").all()
    serializer_class = TelegramSubscriptionSerializer
    permission_classes = [permissions.AllowAny]  # n8n will call this
    lookup_field = "chat_id"

    @decorators.action(detail=False, methods=["post"])
    def link(self, request):
        """
        Link a Telegram chat_id to user.
        Called by n8n when user starts the bot with /start command.
        """
        serializer = TelegramLinkSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        chat_id = serializer.validated_data["chat_id"]
        username = serializer.validated_data.get("username", "")
        first_name = serializer.validated_data.get("first_name", "")
        link_token = serializer.validated_data.get("link_token", "")

        subscription, created = TelegramSubscription.objects.update_or_create(
            chat_id=chat_id,
            defaults={
                "username": username,
                "first_name": first_name,
                "link_token": link_token,
                "is_active": True,
            },
        )

        return response.Response(
            {
                "status": "success",
                "created": created,
                "subscription": TelegramSubscriptionSerializer(subscription).data,
            },
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )

    @decorators.action(detail=True, methods=["get"])
    def subscriptions(self, request, chat_id=None):
        """Get voucher subscriptions for a specific Telegram user."""
        try:
            subscription = TelegramSubscription.objects.get(chat_id=chat_id)
        except TelegramSubscription.DoesNotExist:
            return response.Response({"error": "Subscription not found"}, status=status.HTTP_404_NOT_FOUND)

        voucher_subs = subscription.voucher_subscriptions.select_related("voucher").all()
        return response.Response(VoucherSubscriptionSerializer(voucher_subs, many=True).data)

    @decorators.action(detail=True, methods=["post"])
    def subscribe_voucher(self, request, chat_id=None):
        """Subscribe to a specific voucher."""
        try:
            subscription = TelegramSubscription.objects.get(chat_id=chat_id)
        except TelegramSubscription.DoesNotExist:
            return response.Response({"error": "Subscription not found"}, status=status.HTTP_404_NOT_FOUND)

        voucher_id = request.data.get("voucher_id")
        if not voucher_id:
            return response.Response({"error": "voucher_id required"}, status=status.HTTP_400_BAD_REQUEST)

        voucher_sub, created = VoucherSubscription.objects.get_or_create(
            subscription=subscription,
            voucher_id=voucher_id,
        )

        return response.Response({"status": "success", "created": created})

    @decorators.action(detail=True, methods=["post"])
    def unsubscribe_voucher(self, request, chat_id=None):
        """Unsubscribe from a specific voucher."""
        try:
            subscription = TelegramSubscription.objects.get(chat_id=chat_id)
        except TelegramSubscription.DoesNotExist:
            return response.Response({"error": "Subscription not found"}, status=status.HTTP_404_NOT_FOUND)

        voucher_id = request.data.get("voucher_id")
        if not voucher_id:
            return response.Response({"error": "voucher_id required"}, status=status.HTTP_400_BAD_REQUEST)

        deleted, _ = VoucherSubscription.objects.filter(
            subscription=subscription,
            voucher_id=voucher_id,
        ).delete()

        return response.Response({"status": "success", "deleted": deleted > 0})


class StockAlertViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API for stock alerts.
    Used by n8n to fetch pending alerts and mark them as sent.
    """

    queryset = StockAlert.objects.select_related(
        "voucher_platform",
        "voucher_platform__voucher",
        "voucher_platform__platform",
    ).all()
    serializer_class = StockAlertSerializer
    permission_classes = [permissions.AllowAny]

    @decorators.action(detail=False, methods=["get"])
    def pending(self, request):
        """Get all pending stock alerts (not yet sent)."""
        pending_alerts = self.queryset.filter(status=StockAlertStatus.PENDING)
        return response.Response(StockAlertSerializer(pending_alerts, many=True).data)

    @decorators.action(detail=False, methods=["post"])
    def mark_sent(self, request):
        """Mark alerts as sent after n8n delivers them."""
        serializer = StockAlertMarkSentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        alert_ids = serializer.validated_data["alert_ids"]
        updated = StockAlert.objects.filter(id__in=alert_ids, status=StockAlertStatus.PENDING).update(
            status=StockAlertStatus.SENT,
            sent_at=timezone.now(),
        )

        return response.Response({"status": "success", "updated": updated})

    @decorators.action(detail=False, methods=["get"])
    def subscribers(self, request):
        """Get all active subscribers who should receive alerts."""
        # Get subscribers who want all alerts
        all_subscribers = TelegramSubscription.objects.filter(is_active=True, subscribe_all=True)

        return response.Response(TelegramSubscriptionSerializer(all_subscribers, many=True).data)
