import pytest
from rest_framework.test import APIClient
from backend.vouchers.models import Voucher
from backend.vouchers.choices import VoucherCategory

@pytest.mark.django_db
def test_voucher_list(client):
    Voucher.objects.create(name="Amazon", category=VoucherCategory.SHOPPING)
    response = client.get("/api/vouchers/")
    assert response.status_code == 200
    assert len(response.data) >= 1
    assert response.data[0]["brand"] == "Amazon"

@pytest.mark.django_db
def test_voucher_filter(client):
    Voucher.objects.create(name="Flipkart", category=VoucherCategory.SHOPPING)
    Voucher.objects.create(name="Dominos", category=VoucherCategory.FOOD)
    
    response = client.get(f"/api/vouchers/?category={VoucherCategory.FOOD}")
    assert response.status_code == 200
    # Assuming standard pagination might be off or on, but checking content
    # If paginated, data is in 'results'
    data = response.data['results'] if 'results' in response.data else response.data
    assert len(data) == 1
    assert data[0]["brand"] == "Dominos"
