"""
Telegram Bot webhook handler.

Handles incoming messages from Telegram and processes bot commands.

Commands:
  /start                              — Welcome + help
  /subscribe <voucher>                — Subscribe to a voucher across all platforms
  /subscribe <voucher> <platform>     — Subscribe to a voucher on a specific platform
  /unsubscribe <voucher>              — Unsubscribe from a voucher (all platforms)
  /unsubscribe <voucher> <platform>   — Unsubscribe from a specific voucher-platform
  /list                               — Show current subscriptions
  /search <query>                     — Search available vouchers
  /help                               — Show help
"""

import hmac
import json
import logging

from django.conf import settings
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from telegram import Update

from backend.notifications.telegram_app import get_application

logger = logging.getLogger(__name__)

# Cache PTB application singleton
_ptb_application = None


async def _get_ptb_app():
    global _ptb_application
    if _ptb_application is None:
        _ptb_application = get_application()
        if _ptb_application is not None:
            await _ptb_application.initialize()
    return _ptb_application


@csrf_exempt
@require_POST
async def telegram_webhook(request):
    """Handle incoming Telegram webhook updates asynchronously."""
    # Verify the secret token
    secret_token = getattr(settings, "TELEGRAM_WEBHOOK_SECRET", "")
    if secret_token:
        header_token = request.headers.get("X-Telegram-Bot-Api-Secret-Token", "")
        if not hmac.compare_digest(header_token, secret_token):
            logger.warning("Invalid Telegram webhook secret token")
            return HttpResponse(status=403)

    ptb_app = await _get_ptb_app()
    if not ptb_app:
        logger.error("PTB Application is not configured.")
        return HttpResponse(status=500)

    try:
        update_json = json.loads(request.body)
        update = Update.de_json(update_json, ptb_app.bot)

        # Process the update asynchronously
        await ptb_app.process_update(update)
    except json.JSONDecodeError:
        return HttpResponse(status=400)
    except Exception as e:
        logger.exception("Error processing Telegram update: %s", e)

    return JsonResponse({"ok": True})
