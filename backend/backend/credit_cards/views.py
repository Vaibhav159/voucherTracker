from rest_framework import viewsets, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import CreditCard
from .serializers import CreditCardSerializer

class CreditCardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['bank', 'category']
    search_fields = ['name', 'bank']
