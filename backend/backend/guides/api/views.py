from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.permissions import AllowAny

from backend.guides.models import Guide
from backend.guides.api.serializers import GuideSerializer

class GuideViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Guide.objects.all().order_by("-created_at")
    serializer_class = GuideSerializer
    permission_classes = [AllowAny]
