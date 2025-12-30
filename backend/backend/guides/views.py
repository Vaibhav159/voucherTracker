from rest_framework import viewsets, filters, permissions
from .models import Guide
from .serializers import GuideSerializer

class GuideViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Guide.objects.all()
    serializer_class = GuideSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'tags']
