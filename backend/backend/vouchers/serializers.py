from rest_framework import serializers

from .models import Platform
from .models import StockAlert
from .models import TelegramSubscription
from .models import Voucher
from .models import VoucherPlatform
from .models import VoucherSubscription


class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ["id", "name", "icon_url"]


class VoucherPlatformSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="platform.name", read_only=True)

    class Meta:
        model = VoucherPlatform
        fields = ["name", "cap", "fee", "denominations", "link", "color"]


class VoucherSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    brand = serializers.CharField(source="name")
    site = serializers.CharField(source="site_link")
    platforms = VoucherPlatformSerializer(many=True, read_only=True)
    lastUpdated = serializers.DateTimeField(source="updated_at", format="%Y-%m-%d", read_only=True)
    expiry_date = serializers.SerializerMethodField()

    class Meta:
        model = Voucher
        fields = ["id", "brand", "logo", "category", "site", "platforms", "lastUpdated", "expiry_date"]

    def get_expiry_date(self, obj):
        return "365"


# Telegram Subscription Serializers
class TelegramSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramSubscription
        fields = ["id", "chat_id", "username", "first_name", "is_active", "subscribe_all", "created_at"]
        read_only_fields = ["id", "created_at"]


class TelegramLinkSerializer(serializers.Serializer):
    """Serializer for linking Telegram chat to a token."""

    chat_id = serializers.CharField(max_length=50)
    username = serializers.CharField(max_length=100, required=False, allow_blank=True)
    first_name = serializers.CharField(max_length=100, required=False, allow_blank=True)
    link_token = serializers.CharField(max_length=100, required=False, allow_blank=True)


class VoucherSubscriptionSerializer(serializers.ModelSerializer):
    voucher_name = serializers.CharField(source="voucher.name", read_only=True)

    class Meta:
        model = VoucherSubscription
        fields = ["id", "voucher", "voucher_name", "created_at"]
        read_only_fields = ["id", "created_at"]


# Stock Alert Serializers
class StockAlertSerializer(serializers.ModelSerializer):
    voucher_name = serializers.CharField(source="voucher_platform.voucher.name", read_only=True)
    voucher_logo = serializers.CharField(source="voucher_platform.voucher.logo", read_only=True)
    platform_name = serializers.CharField(source="voucher_platform.platform.name", read_only=True)
    link = serializers.CharField(source="voucher_platform.link", read_only=True)
    fee = serializers.CharField(source="voucher_platform.fee", read_only=True)

    class Meta:
        model = StockAlert
        fields = [
            "id",
            "voucher_name",
            "voucher_logo",
            "platform_name",
            "link",
            "fee",
            "previous_stock",
            "new_stock",
            "status",
            "created_at",
        ]


class StockAlertMarkSentSerializer(serializers.Serializer):
    """Serializer for marking alerts as sent."""

    alert_ids = serializers.ListField(child=serializers.IntegerField(), min_length=1)
