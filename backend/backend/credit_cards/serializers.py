from rest_framework import serializers
from .models import CreditCard

class CreditCardSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    annualFee = serializers.CharField(source='annual_fee')
    rewardRate = serializers.CharField(source='reward_rate')
    fxMarkup = serializers.CharField(source='fx_markup')
    bestFor = serializers.CharField(source='best_for')
    detailedGuide = serializers.CharField(source='detailed_guide')
    applyLink = serializers.URLField(source='apply_link')
    rewardType = serializers.CharField(source='reward_type')
    rewardCaps = serializers.JSONField(source='reward_caps')

    class Meta:
        model = CreditCard
        fields = [
            "id", "name", "bank", "category", "image", "annualFee",
            "rewardRate", "fxMarkup", "bestFor", "verdict", "detailedGuide",
            "applyLink", "features", "tags", "rewardType", "rewardCaps"
        ]
