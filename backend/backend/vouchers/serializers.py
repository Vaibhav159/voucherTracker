from rest_framework import serializers
from .models import Voucher, VoucherAlias, Platform, VoucherPlatform


class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ["id", "name", "icon_url"]


class VoucherPlatformSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='platform.name', read_only=True)

    class Meta:
        model = VoucherPlatform
        fields = ["name", "cap", "fee", "denominations", "link", "color"]


class VoucherSerializer(serializers.ModelSerializer):
    brand = serializers.CharField(source='name')
    site = serializers.CharField(source='site_link')
    platforms = VoucherPlatformSerializer(many=True, read_only=True)
    lastUpdated = serializers.DateTimeField(source='updated_at', format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Voucher
        fields = ["id", "brand", "logo", "category", "site", "platforms", "lastUpdated"]
