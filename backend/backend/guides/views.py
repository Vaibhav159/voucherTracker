from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import filters
from rest_framework import permissions
from rest_framework import viewsets

from .models import Guide
from .serializers import GuideSerializer


@method_decorator(cache_page(60 * 15), name="dispatch")
class GuideViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Guide.objects.all().order_by("-created_at")
    serializer_class = GuideSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "tags"]
