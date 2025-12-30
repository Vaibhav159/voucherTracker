import pytest
from django.core.cache import cache
from backend.vouchers.models import Voucher
from rest_framework.test import APIClient

@pytest.mark.django_db
def test_cache_invalidation_on_create(client):
    # Ensure cache is empty
    cache.clear()
    
    # 1. Initial Request
    response1 = client.get("/api/vouchers/")
    assert response1.status_code == 200
    assert len(response1.data) == 0

    # 2. Create Voucher (triggers signal -> cache.clear())
    Voucher.objects.create(name="New Voucher", category="Shopping")

    # 3. Second Request - should retrieve new data if cache was cleared
    response2 = client.get("/api/vouchers/")
    assert response2.status_code == 200
    assert len(response2.data) == 1
    assert response2.data[0]["name"] == "New Voucher"

@pytest.mark.django_db
def test_cache_invalidation_on_update(client):
    cache.clear()
    voucher = Voucher.objects.create(name="Old Name", category="Shopping")
    
    # 1. Populate Cache
    response1 = client.get("/api/vouchers/")
    assert response1.data[0]["name"] == "Old Name"

    # 2. Update Voucher
    voucher.name = "New Name"
    voucher.save()

    # 3. Verify Cache Invalidation
    response2 = client.get("/api/vouchers/")
    assert response2.data[0]["name"] == "New Name"

@pytest.mark.django_db
def test_cache_invalidation_on_delete(client):
    cache.clear()
    voucher = Voucher.objects.create(name="To Delete", category="Shopping")
    
    # 1. Populate Cache
    client.get("/api/vouchers/")
    
    # 2. Delete Voucher
    voucher.delete()

    # 3. Verify Cache Invalidation
    response2 = client.get("/api/vouchers/")
    assert len(response2.data) == 0
