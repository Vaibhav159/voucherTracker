import pytest
from django.core.cache import cache
from backend.vouchers.models import Voucher
from backend.vouchers.choices import VoucherCategory
from rest_framework.test import APIClient

@pytest.mark.django_db
def test_cache_invalidation_on_create(client):
    # Ensure cache is empty
    cache.clear()
    
    # 1. Initial Request
    response1 = client.get("/api/vouchers/")
    assert response1.status_code == 200
    data = response1.data["results"] if "results" in response1.data else response1.data
    assert len(data) == 0

    # 2. Create Voucher (triggers signal -> cache.clear())
    Voucher.objects.create(name="New Voucher", category=VoucherCategory.SHOPPING)

    # 3. Second Request - should retrieve new data if cache was cleared
    response2 = client.get("/api/vouchers/")
    assert response2.status_code == 200
    data = response2.data["results"] if "results" in response2.data else response2.data
    assert len(data) == 1
    assert data[0]["brand"] == "New Voucher"

@pytest.mark.django_db
def test_cache_invalidation_on_update(client):
    cache.clear()
    voucher = Voucher.objects.create(name="Old Name", category=VoucherCategory.SHOPPING)
    
    # 1. Populate Cache
    response1 = client.get("/api/vouchers/")
    data = response1.data["results"] if "results" in response1.data else response1.data
    assert data[0]["brand"] == "Old Name"

    # 2. Update Voucher
    voucher.name = "New Name"
    voucher.save()

    # 3. Verify Cache Invalidation
    response2 = client.get("/api/vouchers/")
    data = response2.data["results"] if "results" in response2.data else response2.data
    assert data[0]["brand"] == "New Name"

@pytest.mark.django_db
def test_cache_invalidation_on_delete(client):
    cache.clear()
    voucher = Voucher.objects.create(name="To Delete", category=VoucherCategory.SHOPPING)
    
    # 1. Populate Cache
    client.get("/api/vouchers/")
    
    # 2. Delete Voucher
    voucher.delete()

    # 3. Verify Cache Invalidation
    response2 = client.get("/api/vouchers/")
    data = response2.data["results"] if "results" in response2.data else response2.data
    assert len(data) == 0
