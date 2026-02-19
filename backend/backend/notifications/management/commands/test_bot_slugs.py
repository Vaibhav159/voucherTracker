import sys
from unittest.mock import patch

from django.core.management.base import BaseCommand

from backend.notifications.bot import _handle_search
from backend.notifications.bot import _handle_subscribe
from backend.notifications.models import TelegramSubscriber
from backend.vouchers.models import Platform
from backend.vouchers.models import Voucher
from backend.vouchers.models import VoucherPlatform


class Command(BaseCommand):
    help = "Test bot slug logic"

    def handle(self, *args, **options):
        # Clean previous test data if any
        VoucherPlatform.objects.filter(voucher__slug="test-voucher-unique-123").delete()
        Voucher.objects.filter(slug="test-voucher-unique-123").delete()

        # Setup data
        v = Voucher.objects.create(name="Test Voucher Unique", slug="test-voucher-unique-123", category="Shopping")
        p, _ = Platform.objects.get_or_create(name="TestPlatformUnique")
        vp = VoucherPlatform.objects.create(voucher=v, platform=p, link="http://example.com")

        chat_id = 99999999
        username = "tester"
        first_name = "Tester"

        print("Testing Search...")
        with patch("backend.notifications.bot._send") as mock_send:
            _handle_search(chat_id, "/search Test Voucher Unique")
            # Should find it
            if not mock_send.called:
                print("FAIL: Search did not call send")
                sys.exit(1)

            args = mock_send.call_args[0]
            msg = args[1]
            if "test-voucher-unique-123" in msg:
                print("PASS: Search result contains slug")
            else:
                print(f"FAIL: Search result missing slug. Msg: {msg}")
                sys.exit(1)

        # Test Subscribe Exact Slug
        print("Testing Subscribe Exact Slug...")
        with patch("backend.notifications.bot._send") as mock_send:
            _handle_subscribe(chat_id, "/subscribe test-voucher-unique-123", username, first_name)
            if not mock_send.called:
                print("FAIL: Subscribe did not call send")
                sys.exit(1)

            args = mock_send.call_args[0]
            msg = args[1]
            if "Subscribed to" in msg and "Test Voucher Unique" in msg:
                print("PASS: Subscribe with slug worked")
            else:
                print(f"FAIL: Subscribe with slug failed. Msg: {msg}")
                sys.exit(1)

        # Test Subscribe Invalid Slug (Fuzzy Match) - assuming user entered exact name instead of slug
        print("Testing Subscribe Fuzzy Match...")

        # Clear subscriptions first to test clean slate if needed, but fuzzy match happens BEFORE subscription logic anyway if slug doesn't match
        # Wait, if slug doesn't match, it goes to fuzzy logic.

        with patch("backend.notifications.bot._send") as mock_send:
            _handle_subscribe(chat_id, "/subscribe Test Voucher Unique", username, first_name)

            if not mock_send.called:
                print("FAIL: Subscribe fuzzy did not call send")
                sys.exit(1)

            args = mock_send.call_args[0]
            msg = args[1]

            # Expected "Did you mean ... /subscribe test-voucher-unique-123"
            if "Did you mean" in msg and "/subscribe test-voucher-unique-123" in msg:
                print("PASS: Subscribe fuzzy match suggested correct slug")
            else:
                print(f"FAIL: Subscribe fuzzy match failed. Msg: {msg}")
                sys.exit(1)

        # Cleanup
        VoucherPlatform.objects.filter(voucher__slug="test-voucher-unique-123").delete()
        Voucher.objects.filter(slug="test-voucher-unique-123").delete()
        TelegramSubscriber.objects.filter(chat_id=chat_id).delete()

        print("ALL TESTS PASSED")
