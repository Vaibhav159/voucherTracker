from rest_framework import serializers

from .models import Platform
from .models import Voucher
from .models import VoucherPlatform


class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ["id", "name", "icon_url"]


class VoucherPlatformSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="platform.name", read_only=True)

    class Meta:
        model = VoucherPlatform
        fields = ["name", "cap", "fee", "denominations", "link", "color", "out_of_stock_at"]


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
