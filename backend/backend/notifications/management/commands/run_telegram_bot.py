"""
Local testing command for the Telegram bot using polling (no webhook needed).

Usage:
    python manage.py test_telegram_bot

This uses Telegram's getUpdates API (long polling) instead of webhooks,
so you can test bot commands locally without ngrok or a public URL.

Press Ctrl+C to stop.
"""

import asyncio

import httpx
from django.conf import settings
from django.core.management.base import BaseCommand
from telegram import Update


class Command(BaseCommand):
    help = "Test the Telegram bot locally using polling (no webhook needed)"

    def handle(self, *args, **options):
        # Run async logic in the synchronous management command
        asyncio.run(self.handle_async(*args, **options))

    async def handle_async(self, *args, **options):
        token = settings.TELEGRAM_BOT_TOKEN
        if not token:
            self.stderr.write(self.style.ERROR("TELEGRAM_BOT_TOKEN is not set"))
            self.stderr.write("Add it to .envs/.local/.django:")
            self.stderr.write("  TELEGRAM_BOT_TOKEN=<your-bot-token>")
            return

        # Delete webhook first so getUpdates works
        self.stdout.write("🔌 Removing webhook for local polling mode...")
        async with httpx.AsyncClient() as client:
            await client.post(f"https://api.telegram.org/bot{token}/deleteWebhook", timeout=10)

        self.stdout.write(self.style.SUCCESS("🤖 Bot is running in polling mode. Send /start to your bot!"))
        self.stdout.write("Press Ctrl+C to stop.\n")

        from backend.notifications.telegram_app import get_application

        # Build the application
        application = get_application()
        if not application:
            self.stderr.write(self.style.ERROR("Failed to initialize telegram application."))
            return

        # Initialize the app (starts the bot session)
        await application.initialize()
        await application.start()

        # Simple polling loop passing updates to the application
        offset = 0
        try:
            while True:
                try:
                    async with httpx.AsyncClient() as client:
                        resp = await client.get(
                            f"https://api.telegram.org/bot{token}/getUpdates",
                            params={"offset": offset, "timeout": 30},
                            timeout=35,
                        )
                        data = resp.json()

                    if not data.get("ok"):
                        self.stderr.write(f"Error: {data}")
                        await asyncio.sleep(5)
                        continue

                    for update_json in data.get("result", []):
                        offset = update_json["update_id"] + 1

                        # Process Update
                        update = Update.de_json(update_json, application.bot)

                        message = update.message
                        if message and message.text:
                            text = message.text
                            chat_id = message.chat.id
                            username = message.from_user.username or ""
                            self.stdout.write(f"📩 {username or chat_id}: {text}")

                        # Pass to handlers (wait for it to finish)
                        await application.process_update(update)

                except KeyboardInterrupt:
                    raise
                except Exception as e:
                    self.stderr.write(f"Error: {e}")
                    await asyncio.sleep(5)
        except KeyboardInterrupt:
            self.stdout.write("\n👋 Bot stopped.")
        finally:
            await application.stop()
