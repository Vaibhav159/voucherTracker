from rest_framework import serializers

from backend.guides.models import Guide

class GuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guide
        fields = [
            "id",
            "title",
            "description",
            "link",
            "tags",
            "author",
            "embed_html",
            "created_at",
            "updated_at",
        ]
