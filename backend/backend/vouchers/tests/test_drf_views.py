import pytest
from rest_framework.test import APIClient
from backend.vouchers.models import Voucher

@pytest.mark.django_db
def test_voucher_list(client):
    Voucher.objects.create(name="Amazon", category="Shopping")
    response = client.get("/api/vouchers/")
    assert response.status_code == 200
    assert len(response.data) >= 1
    assert response.data[0]["name"] == "Amazon"

@pytest.mark.django_db
def test_voucher_filter(client):
    Voucher.objects.create(name="Flipkart", category="Shopping")
    Voucher.objects.create(name="Dominos", category="Food")
    
    response = client.get("/api/vouchers/?category=Food")
    assert response.status_code == 200
    # Assuming standard pagination might be off or on, but checking content
    # If paginated, data is in 'results'
    data = response.data['results'] if 'results' in response.data else response.data
    assert len(data) == 1
    assert data[0]["name"] == "Dominos"
