from rest_framework import serializers

from .models import Guide


class GuideSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    embedHtml = serializers.CharField(source="embed_html")

    class Meta:
        model = Guide
        fields = ["id", "title", "description", "link", "tags", "author", "embedHtml"]
