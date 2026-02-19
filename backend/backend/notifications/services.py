"""
Telegram Bot API service for sending restock alerts.

Uses httpx for HTTP calls to the Telegram Bot API.
"""

import logging

import httpx
from django.conf import settings

logger = logging.getLogger(__name__)

TELEGRAM_API_BASE = "https://api.telegram.org/bot{token}"


def _get_api_url(method: str) -> str:
    token = settings.TELEGRAM_BOT_TOKEN
    return f"{TELEGRAM_API_BASE.format(token=token)}/{method}"


def send_message(chat_id: int, text: str, parse_mode: str = "HTML") -> bool:
    """Send a message to a Telegram chat. Returns True on success."""
    try:
        resp = httpx.post(
            _get_api_url("sendMessage"),
            json={
                "chat_id": chat_id,
                "text": text,
                "parse_mode": parse_mode,
                "disable_web_page_preview": True,
            },
            timeout=10,
        )
        data = resp.json()
        if not data.get("ok"):
            logger.warning("Telegram sendMessage failed for chat %s: %s", chat_id, data)
            return False
        return True
    except Exception:
        logger.exception("Error sending Telegram message to chat %s", chat_id)
        return False


def send_restock_alerts(restocked_voucher_platforms) -> dict:
    """
    Send restock alerts to subscribers of restocked VoucherPlatforms.

    Args:
        restocked_voucher_platforms: List of VoucherPlatform objects
            that just came back in stock.

    Returns:
        dict with counts of notifications sent and failed.
    """
    from backend.notifications.models import TelegramSubscription

    if not restocked_voucher_platforms:
        return {"sent": 0, "failed": 0, "skipped": "no restocked items"}

    sent = 0
    failed = 0

    # For each restocked VoucherPlatform, find subscribers and notify them
    for vp in restocked_voucher_platforms:
        subscriptions = TelegramSubscription.objects.filter(
            voucher_platform=vp,
            subscriber__is_active=True,
        ).select_related("subscriber")

        if not subscriptions.exists():
            continue

        message = _build_restock_message(vp)

        for sub in subscriptions:
            if send_message(sub.subscriber.chat_id, message):
                sent += 1
            else:
                failed += 1

    return {"sent": sent, "failed": failed}


def _build_restock_message(vp) -> str:
    """Build a formatted restock alert message for a single VoucherPlatform."""
    return (
        f"🔔 <b>Restock Alert!</b>\n\n"
        f"<b>{vp.voucher.name}</b> is back in stock on <b>{vp.platform.name}</b>!\n\n"
        f"Check it out at <a href='https://cardperks.xyz/?voucher={vp.voucher.slug}'>{vp.voucher.name}</a>"
    )
