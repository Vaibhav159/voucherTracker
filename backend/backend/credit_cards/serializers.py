from django.db.models import Q
from rest_framework import serializers

from backend.guides.models import Guide

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
        all_guides = Guide.objects.filter(
            Q(tags__contains=[obj.name]) | Q(tags__contains=[obj.slug]),
        ).values()[:5]

        return all_guides
