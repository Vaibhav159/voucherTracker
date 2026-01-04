import pytest
from rest_framework.test import APIClient

from backend.vouchers.choices import VoucherCategory
from backend.vouchers.models import Platform
from backend.vouchers.models import Voucher
from backend.vouchers.models import VoucherPlatform


@pytest.mark.django_db
class TestVoucherAPI:
    def setup_method(self):
        self.client = APIClient()
        self.url = "/api/vouchers/"

        # Setup data
        self.platform = Platform.objects.create(name="Gyftr", icon_url="http://example.com/gyftr.png")
        self.voucher = Voucher.objects.create(
            name="Amazon Shopping Voucher",
            logo="http://example.com/amazon.png",
            category=VoucherCategory.SHOPPING,
            site_link="http://amazon.in",
        )
        self.vp = VoucherPlatform.objects.create(
            voucher=self.voucher,
            platform=self.platform,
            cap="10k/month",
            fee="1%",
            denominations=["500", "1000"],
            link="http://gyftr.com/amazon",
            color="#000000",
            priority=1,
        )

    def test_voucher_list_structure(self):
        response = self.client.get(self.url)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list) or (isinstance(data, dict) and "results" in data)

        results = data["results"] if isinstance(data, dict) else data
        assert len(results) > 0
        item = results[0]

        # Verify flattened structure
        assert "brand" in item
        assert "logo" in item
        assert "category" in item
        assert "site" in item
        assert "lastUpdated" in item
        assert "platforms" in item

        # Verify platform structure
        platforms = item["platforms"]
        assert len(platforms) > 0
        p = platforms[0]
        assert "name" in p
        assert p["name"] == "Gyftr"
        assert "cap" in p
        assert "fee" in p
        assert "denominations" in p
        assert "link" in p
        assert "color" in p


@pytest.mark.django_db
class TestPlatformAPI:
    def setup_method(self):
        self.client = APIClient()
        self.url = "/api/platforms/"
        Platform.objects.create(name="Maximize", icon_url="http://example.com/max.png")

    def test_platform_list(self):
        response = self.client.get(self.url)
        assert response.status_code == 200
        data = response.json()
        results = data["results"] if isinstance(data, dict) else data
        assert len(results) > 0
        item = results[0]
        assert "name" in item
        assert "icon_url" in item
