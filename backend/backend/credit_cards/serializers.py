from rest_framework import serializers

from .models import CreditCard


class CreditCardSerializer(serializers.ModelSerializer):
    detailedGuide = serializers.CharField(source="detailed_guide")
    applyLink = serializers.URLField(source="apply_link")
    related_guides = serializers.SerializerMethodField()

    class Meta:
        model = CreditCard
        fields = [
            "id",
            "slug",
            "name",
            "bank",
            "category",
            "image",
            "verdict",
            "detailedGuide",
            "applyLink",
            "features",
            "fees",
            "eligibility",
            "rewards",
            "metadata",
            "tags",
            "related_guides",
        ]

    def get_related_guides(self, obj: CreditCard):
        return []
