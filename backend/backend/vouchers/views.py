from rest_framework import viewsets, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import Voucher
from .serializers import VoucherSerializer

class VoucherViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Voucher.objects.prefetch_related('platforms', 'platforms__platform', 'aliases').all()
    serializer_class = VoucherSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['name', 'aliases__name']
