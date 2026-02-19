"""
Local testing command for the Telegram bot using polling (no webhook needed).

Usage:
    python manage.py test_telegram_bot

This uses Telegram's getUpdates API (long polling) instead of webhooks,
so you can test bot commands locally without ngrok or a public URL.

Press Ctrl+C to stop.
"""

import time

import httpx
from django.conf import settings
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Test the Telegram bot locally using polling (no webhook needed)"

    def handle(self, *args, **options):
        token = settings.TELEGRAM_BOT_TOKEN
        if not token:
            self.stderr.write(self.style.ERROR("TELEGRAM_BOT_TOKEN is not set"))
            self.stderr.write("Add it to .envs/.local/.django:")
            self.stderr.write("  TELEGRAM_BOT_TOKEN=<your-bot-token>")
            return

        # Delete webhook first so getUpdates works
        self.stdout.write("🔌 Removing webhook for local polling mode...")
        httpx.post(f"https://api.telegram.org/bot{token}/deleteWebhook", timeout=10)

        self.stdout.write(self.style.SUCCESS("🤖 Bot is running in polling mode. Send /start to your bot!"))
        self.stdout.write("Press Ctrl+C to stop.\n")

        offset = 0
        while True:
            try:
                resp = httpx.get(
                    f"https://api.telegram.org/bot{token}/getUpdates",
                    params={"offset": offset, "timeout": 30},
                    timeout=35,
                )
                data = resp.json()

                if not data.get("ok"):
                    self.stderr.write(f"Error: {data}")
                    time.sleep(5)
                    continue

                for update in data.get("result", []):
                    offset = update["update_id"] + 1
                    self._process_update(update)

            except KeyboardInterrupt:
                self.stdout.write("\n👋 Bot stopped.")
                return
            except Exception as e:
                self.stderr.write(f"Error: {e}")
                time.sleep(5)

    def _process_update(self, update: dict):
        """Process a single update using the same logic as the webhook."""
        message = update.get("message")
        if not message or not message.get("text"):
            return

        chat_id = message["chat"]["id"]
        text = message["text"]
        username = message["from"].get("username", "")
        first_name = message["from"].get("first_name", "")
        self.stdout.write(f"📩 {username or chat_id}: {text}")

        from backend.notifications.bot import _handle_help
        from backend.notifications.bot import _handle_list
        from backend.notifications.bot import _handle_search
        from backend.notifications.bot import _handle_start
        from backend.notifications.bot import _handle_subscribe
        from backend.notifications.bot import _handle_unknown
        from backend.notifications.bot import _handle_unsubscribe

        if text.startswith("/start"):
            _handle_start(chat_id, username, first_name)
        elif text.startswith("/subscribe"):
            _handle_subscribe(chat_id, text, username, first_name)
        elif text.startswith("/unsubscribe"):
            _handle_unsubscribe(chat_id, text)
        elif text.startswith("/list"):
            _handle_list(chat_id)
        elif text.startswith("/search"):
            _handle_search(chat_id, text)
        elif text.startswith("/help"):
            _handle_help(chat_id)
        else:
            _handle_unknown(chat_id)
