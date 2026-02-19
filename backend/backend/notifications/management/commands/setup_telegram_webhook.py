"""
Management command to register the Telegram webhook.

Usage (one-time after first deploy):
    python manage.py setup_telegram_webhook https://tracker.cheq.dpdns.org

To delete:
    python manage.py setup_telegram_webhook --delete
"""

import httpx
from django.conf import settings
from django.core.management.base import BaseCommand

WEBHOOK_PATH = "/api/telegram/webhook/"


class Command(BaseCommand):
    help = "Register the Telegram bot webhook with the Telegram API (one-time setup)"

    def add_arguments(self, parser):
        parser.add_argument(
            "base_url",
            nargs="?",
            type=str,
            help="Your server's base URL, e.g. https://tracker.cheq.dpdns.org",
        )
        parser.add_argument(
            "--delete",
            action="store_true",
            help="Delete the current webhook instead of setting one",
        )

    def handle(self, *args, **options):
        token = settings.TELEGRAM_BOT_TOKEN
        if not token:
            self.stderr.write(self.style.ERROR("TELEGRAM_BOT_TOKEN is not set"))
            return

        if options["delete"]:
            self._delete_webhook(token)
            return

        base_url = options["base_url"]
        if not base_url:
            self.stderr.write(
                self.style.ERROR(
                    "Please provide your base URL.\n"
                    "Usage: python manage.py setup_telegram_webhook https://tracker.cheq.dpdns.org",
                ),
            )
            return

        webhook_url = base_url.rstrip("/") + WEBHOOK_PATH
        self._set_webhook(token, webhook_url)

    def _set_webhook(self, token: str, webhook_url: str):
        api_url = f"https://api.telegram.org/bot{token}/setWebhook"

        payload = {"url": webhook_url}
        secret = getattr(settings, "TELEGRAM_WEBHOOK_SECRET", "")
        if secret:
            payload["secret_token"] = secret

        resp = httpx.post(api_url, json=payload, timeout=10)
        data = resp.json()

        if data.get("ok"):
            self.stdout.write(
                self.style.SUCCESS(f"✅ Webhook set to: {webhook_url}"),
            )
        else:
            self.stderr.write(
                self.style.ERROR(f"❌ Failed to set webhook: {data}"),
            )

    def _delete_webhook(self, token: str):
        api_url = f"https://api.telegram.org/bot{token}/deleteWebhook"

        resp = httpx.post(api_url, timeout=10)
        data = resp.json()

        if data.get("ok"):
            self.stdout.write(self.style.SUCCESS("✅ Webhook deleted"))
        else:
            self.stderr.write(
                self.style.ERROR(f"❌ Failed to delete webhook: {data}"),
            )
