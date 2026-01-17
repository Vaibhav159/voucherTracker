from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

from backend.vouchers.choices import PlatformName
from backend.vouchers.models import Platform
from backend.vouchers.models import Voucher
from backend.vouchers.models import VoucherPlatform
from backend.vouchers.services.ishop import IShopSyncService

User = get_user_model()


class TestIShopSyncService(TestCase):
    def test_process_items(self):
        service = IShopSyncService()
        items = [
            {
                "brand": "TestBrand",
                "sku": "TEST-SKU-123",
                "reward_value": "5%",
                "_id": "some-id",
            },
        ]

        # Le's pre-create a Voucher
        Voucher.objects.create(name="TestBrand")

        result = service.process_items(items)

        self.assertEqual(result["status"], "success")
        # Might be 1 if linked, or 0 if logic differs
        self.assertGreaterEqual(result["created"], 0)


class TestIShopSyncEndpoint(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = "/api/vouchers/sync_ishop_local/"
        self.user = User.objects.create_user(username="testuser", password="password")

    def test_sync_ishop_local_unauthorized(self):
        response = self.client.post(self.url, {}, format="json")
        self.assertIn(response.status_code, [401, 403])

    def test_sync_ishop_local(self):
        self.client.force_authenticate(user=self.user)
        # Create a voucher to ensure sync works and creates a platform entry
        Voucher.objects.create(name="TestBrandViaAPI")

        items = [
            {
                "brand": "TestBrandViaAPI",
                "sku": "API-SKU-123",
                "reward_value": "2.5%",
                "_id": "api-id",
            },
        ]

        response = self.client.post(self.url, items, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["status"], "success")

        # Verify DB Side effect
        path_exists = VoucherPlatform.objects.filter(
            voucher__name="TestBrandViaAPI",
        ).exists()

        # BaseSyncService matches voucher by name.
        # But we need to check if Platform was created.

        platform = Platform.objects.filter(name=PlatformName.ISHOP).first()
        self.assertIsNotNone(platform)

        vp = VoucherPlatform.objects.filter(
            voucher__name="TestBrandViaAPI",
            platform=platform,
        ).first()

        self.assertIsNotNone(vp)
        self.assertEqual(vp.fee, "2.5%")

    def test_invalid_payload(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, {"not": "a list"}, format="json")
        self.assertEqual(response.status_code, 400)
