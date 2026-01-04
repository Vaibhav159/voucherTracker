from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import permissions
from rest_framework import viewsets

from .models import CreditCard
from .serializers import CreditCardSerializer


@method_decorator(cache_page(60 * 15), name="dispatch")
class CreditCardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
    lookup_field = "slug"
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["bank", "category"]
    search_fields = ["name", "bank"]
