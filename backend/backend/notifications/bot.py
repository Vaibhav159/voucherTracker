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
from django.db.models import Q
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from backend.notifications.models import TelegramSubscriber
from backend.notifications.models import TelegramSubscription
from backend.vouchers.models import VoucherPlatform

logger = logging.getLogger(__name__)


@csrf_exempt
@require_POST
def telegram_webhook(request):
    """Handle incoming Telegram webhook updates."""
    # Verify the secret token
    secret_token = getattr(settings, "TELEGRAM_WEBHOOK_SECRET", "")
    if secret_token:
        header_token = request.headers.get("X-Telegram-Bot-Api-Secret-Token", "")
        if not hmac.compare_digest(header_token, secret_token):
            logger.warning("Invalid Telegram webhook secret token")
            return HttpResponse(status=403)

    try:
        update = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponse(status=400)

    message = update.get("message")
    if not message or not message.get("text"):
        return JsonResponse({"ok": True})

    chat_id = message["chat"]["id"]
    text = message["text"].strip()
    username = message["from"].get("username", "")
    first_name = message["from"].get("first_name", "")

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

    return JsonResponse({"ok": True})


def _send(chat_id: int, text: str):
    """Send a reply message."""
    from backend.notifications.services import send_message

    send_message(chat_id, text)


def _get_or_create_subscriber(chat_id: int, username: str = "", first_name: str = "") -> TelegramSubscriber:
    """Get or create a subscriber record."""
    subscriber, _ = TelegramSubscriber.objects.update_or_create(
        chat_id=chat_id,
        defaults={"username": username, "first_name": first_name, "is_active": True},
    )
    return subscriber


def _handle_start(chat_id: int, username: str, first_name: str):
    """Handle /start command."""
    _get_or_create_subscriber(chat_id, username, first_name)

    _send(
        chat_id,
        "👋 <b>Welcome to VoucherTracker Alerts!</b>\n\n"
        "I'll notify you when specific vouchers come back in stock.\n\n"
        "<b>Commands:</b>\n"
        "/search &lt;query&gt; — Find vouchers\n"
        "/subscribe &lt;voucher&gt; — Alert for all platforms\n"
        "/subscribe &lt;voucher&gt; &lt;platform&gt; — Alert for one platform\n"
        "/unsubscribe &lt;voucher&gt; — Remove alerts\n"
        "/list — Your subscriptions\n"
        "/help — Show this help\n\n"
        "💡 Start with /search to find vouchers!",
    )


def _handle_search(chat_id: int, text: str):
    """Handle /search <query> — find matching vouchers."""
    parts = text.split(maxsplit=1)
    if len(parts) < 2:
        _send(chat_id, "⚠️ Please provide a search term.\n\nExample: /search amazon")
        return

    query = parts[1].strip()
    matches = (
        VoucherPlatform.objects.filter(
            Q(voucher__name__icontains=query),
            out_of_stock_at__isnull=True,  # only show in-stock items
        )
        .select_related("voucher", "platform")
        .order_by("voucher__name", "platform__name")[:20]
    )

    if not matches:
        # Also search out-of-stock items
        matches = (
            VoucherPlatform.objects.filter(Q(voucher__name__icontains=query))
            .select_related("voucher", "platform")
            .order_by("voucher__name", "platform__name")[:20]
        )

    if not matches:
        _send(chat_id, f"❌ No vouchers found matching '<b>{query}</b>'.")
        return

    lines = [f"🔍 <b>Results for '{query}':</b>\n"]
    for vp in matches:
        stock = "✅" if not vp.out_of_stock_at else "🔴"
        lines.append(f"  {stock} {vp.voucher.name} — {vp.platform.name}")

    lines.append("\n💡 Use /subscribe &lt;voucher&gt; to get alerts.")
    _send(chat_id, "\n".join(lines))


def _handle_subscribe(chat_id: int, text: str, username: str, first_name: str):
    """Handle /subscribe <voucher> [platform]."""
    parts = text.split(maxsplit=2)
    if len(parts) < 2:
        _send(
            chat_id,
            "⚠️ Please specify a voucher name.\n\nExample: /subscribe amazon\nExample: /subscribe amazon maximize",
        )
        return

    voucher_query = parts[1].strip()
    platform_filter = parts[2].strip() if len(parts) > 2 else None

    # Find matching VoucherPlatforms
    vps = VoucherPlatform.objects.filter(
        voucher__name__iexact=voucher_query,
    ).select_related("voucher", "platform")

    if platform_filter:
        vps = vps.filter(platform__name__iexact=platform_filter)

    vps = list(vps)

    if not vps:
        # Try partial match to suggest alternatives
        partials = (
            VoucherPlatform.objects.filter(voucher__name__icontains=voucher_query)
            .select_related("voucher", "platform")
            .values_list("voucher__name", flat=True)
            .distinct()[:5]
        )
        suggestions = list(partials)
        msg = f"❌ No voucher found matching '<b>{voucher_query}</b>'"
        if platform_filter:
            msg += f" on <b>{platform_filter}</b>"
        if suggestions:
            msg += "\n\n💡 Did you mean:\n" + "\n".join(f"  • {s}" for s in suggestions)
        msg += "\n\nUse /search &lt;query&gt; to find voucher names."
        _send(chat_id, msg)
        return

    subscriber = _get_or_create_subscriber(chat_id, username, first_name)

    created_count = 0
    for vp in vps:
        _, created = TelegramSubscription.objects.get_or_create(
            subscriber=subscriber,
            voucher_platform=vp,
        )
        if created:
            created_count += 1

    if created_count > 0:
        voucher_name = vps[0].voucher.name
        platforms = ", ".join(vp.platform.name for vp in vps)
        _send(
            chat_id,
            f"✅ Subscribed to <b>{voucher_name}</b> on {platforms}!\n\nYou'll be notified when it's back in stock.",
        )
    else:
        _send(chat_id, "ℹ️ You're already subscribed to all of those.")


def _handle_unsubscribe(chat_id: int, text: str):
    """Handle /unsubscribe <voucher> [platform]."""
    parts = text.split(maxsplit=2)
    if len(parts) < 2:
        _send(chat_id, "⚠️ Please specify a voucher.\n\nExample: /unsubscribe amazon")
        return

    voucher_query = parts[1].strip()
    platform_filter = parts[2].strip() if len(parts) > 2 else None

    try:
        subscriber = TelegramSubscriber.objects.get(chat_id=chat_id)
    except TelegramSubscriber.DoesNotExist:
        _send(chat_id, "ℹ️ You don't have any subscriptions yet.")
        return

    subs = TelegramSubscription.objects.filter(
        subscriber=subscriber,
        voucher_platform__voucher__name__iexact=voucher_query,
    )

    if platform_filter:
        subs = subs.filter(voucher_platform__platform__name__iexact=platform_filter)

    count = subs.count()
    if count == 0:
        _send(chat_id, f"ℹ️ You're not subscribed to <b>{voucher_query}</b>.")
        return

    subs.delete()
    msg = f"✅ Unsubscribed from <b>{voucher_query}</b>"
    if platform_filter:
        msg += f" on <b>{platform_filter}</b>"
    msg += f" ({count} alert{'s' if count > 1 else ''} removed)."
    _send(chat_id, msg)


def _handle_list(chat_id: int):
    """Handle /list — show current subscriptions."""
    try:
        subscriber = TelegramSubscriber.objects.get(chat_id=chat_id)
    except TelegramSubscriber.DoesNotExist:
        _send(chat_id, "ℹ️ You don't have any subscriptions yet. Use /search to find vouchers.")
        return

    subs = (
        TelegramSubscription.objects.filter(subscriber=subscriber)
        .select_related("voucher_platform__voucher", "voucher_platform__platform")
        .order_by("voucher_platform__voucher__name", "voucher_platform__platform__name")
    )

    if not subs.exists():
        _send(chat_id, "📭 No active subscriptions.\n\nUse /search &lt;query&gt; and /subscribe to get started.")
        return

    lines = ["📋 <b>Your Subscriptions:</b>\n"]
    for sub in subs:
        vp = sub.voucher_platform
        stock = "✅" if not vp.out_of_stock_at else "🔴"
        lines.append(f"  {stock} {vp.voucher.name} — {vp.platform.name}")

    lines.append(f"\nTotal: {subs.count()} alerts")
    lines.append("Use /unsubscribe &lt;voucher&gt; to remove.")
    _send(chat_id, "\n".join(lines))


def _handle_help(chat_id: int):
    """Handle /help command."""
    _send(
        chat_id,
        "🤖 <b>VoucherTracker Bot Commands:</b>\n\n"
        "/search &lt;query&gt; — Find vouchers\n"
        "/subscribe &lt;voucher&gt; — Alert for all platforms\n"
        "/subscribe &lt;voucher&gt; &lt;platform&gt; — Alert for one platform\n"
        "/unsubscribe &lt;voucher&gt; — Remove alerts\n"
        "/unsubscribe &lt;voucher&gt; &lt;platform&gt; — Remove from one platform\n"
        "/list — Your subscriptions\n"
        "/help — Show this help\n\n"
        "💡 Voucher names must be exact (use /search first).",
    )


def _handle_unknown(chat_id: int):
    """Handle unrecognized messages."""
    _send(chat_id, "🤔 I didn't understand that. Use /help to see available commands.")
