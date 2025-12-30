from rest_framework import serializers
from .models import Voucher, VoucherAlias, Platform, VoucherPlatform

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ["id", "name", "icon_url"]

class VoucherPlatformSerializer(serializers.ModelSerializer):
    platform = PlatformSerializer(read_only=True)
    
    class Meta:
        model = VoucherPlatform
        fields = ["platform", "cap", "fee", "denominations", "link", "color", "priority"]

class VoucherAliasSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoucherAlias
        fields = ["name"]

class VoucherSerializer(serializers.ModelSerializer):
    platforms = VoucherPlatformSerializer(many=True, read_only=True)
    aliases = VoucherAliasSerializer(many=True, read_only=True)

    class Meta:
        model = Voucher
        fields = ["id", "name", "logo", "category", "site_link", "created_at", "updated_at", "platforms", "aliases"]
