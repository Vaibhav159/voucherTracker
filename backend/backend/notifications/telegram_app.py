import logging

from asgiref.sync import sync_to_async
from django.conf import settings
from django.db.models import Q
from telegram import InlineKeyboardButton
from telegram import InlineKeyboardMarkup
from telegram import Update
from telegram.ext import Application
from telegram.ext import CallbackQueryHandler
from telegram.ext import CommandHandler
from telegram.ext import ContextTypes
from telegram.ext import ConversationHandler
from telegram.ext import MessageHandler
from telegram.ext import filters

from backend.notifications.models import TelegramSubscriber
from backend.notifications.models import TelegramSubscription
from backend.vouchers.models import VoucherPlatform

logger = logging.getLogger(__name__)

# Max subscriptions per user
MAX_SUBSCRIPTIONS_PER_USER = 1

# Conversation states
SELECT_VOUCHER, SELECT_PLATFORM = range(2)


@sync_to_async
def _get_or_create_subscriber(chat_id: int, username: str = "", first_name: str = "") -> TelegramSubscriber:
    """Get or create a subscriber record."""
    subscriber, _ = TelegramSubscriber.objects.update_or_create(
        chat_id=chat_id,
        defaults={"username": username, "first_name": first_name, "is_active": True},
    )
    return subscriber


@sync_to_async
def _get_vouchers_by_query(query: str):
    matches = (
        VoucherPlatform.objects.filter(
            Q(voucher__name__icontains=query) | Q(voucher__slug__icontains=query),
            out_of_stock_at__isnull=True,  # only show in-stock items
        )
        .select_related("voucher", "platform")
        .order_by("voucher__name", "platform__name")[:20]
    )

    if not matches:
        matches = (
            VoucherPlatform.objects.filter(Q(voucher__name__icontains=query) | Q(voucher__slug__icontains=query))
            .select_related("voucher", "platform")
            .order_by("voucher__name", "platform__name")[:20]
        )
    return list(matches)


@sync_to_async
def _get_platforms_for_voucher(voucher_slug: str):
    return list(
        VoucherPlatform.objects.filter(
            voucher__slug__iexact=voucher_slug,
        ).select_related("voucher", "platform"),
    )


@sync_to_async
def _get_user_subscriptions(chat_id: int):
    try:
        subscriber = TelegramSubscriber.objects.get(chat_id=chat_id)
        return list(
            TelegramSubscription.objects.filter(subscriber=subscriber)
            .select_related("voucher_platform__voucher", "voucher_platform__platform")
            .order_by("voucher_platform__voucher__name", "voucher_platform__platform__name"),
        )
    except TelegramSubscriber.DoesNotExist:
        return []


@sync_to_async
def _get_user_subscription_count(chat_id: int):
    try:
        subscriber = TelegramSubscriber.objects.get(chat_id=chat_id)
        return TelegramSubscription.objects.filter(subscriber=subscriber).count()
    except TelegramSubscriber.DoesNotExist:
        return 0


@sync_to_async
def _unsubscribe_from_all(chat_id: int, voucher_slug: str):
    try:
        subscriber = TelegramSubscriber.objects.get(chat_id=chat_id)
        subs = TelegramSubscription.objects.filter(
            subscriber=subscriber,
            voucher_platform__voucher__slug__iexact=voucher_slug,
        )
        count = subs.count()
        subs.delete()
        return count
    except TelegramSubscriber.DoesNotExist:
        return 0


@sync_to_async
def _subscribe_user_to_platform(chat_id: int, vp_id: int, username: str, first_name: str):
    subscriber = TelegramSubscriber.objects.get(chat_id=chat_id)
    vp = VoucherPlatform.objects.select_related("voucher", "platform").get(id=vp_id)
    # Check limit
    current_count = TelegramSubscription.objects.filter(subscriber=subscriber).count()
    if current_count >= MAX_SUBSCRIPTIONS_PER_USER:
        return (
            False,
            f"⚠️ You've reached the maximum of <b>{MAX_SUBSCRIPTIONS_PER_USER}</b> subscription{'s' if MAX_SUBSCRIPTIONS_PER_USER > 1 else ''}.\n\nUse /unsubscribe to free up a slot.",
        )

    # Check exists
    if TelegramSubscription.objects.filter(subscriber=subscriber, voucher_platform=vp).exists():
        return False, "ℹ️ You're already subscribed to this."

    TelegramSubscription.objects.create(subscriber=subscriber, voucher_platform=vp)
    return (
        True,
        f"✅ Subscribed to <b>{vp.voucher.name}</b> on {vp.platform.name}!\n\nYou'll be notified when it's back in stock.",
    )


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /start is issued."""
    user = update.effective_user
    chat_id = update.effective_chat.id

    await _get_or_create_subscriber(
        chat_id=chat_id,
        username=user.username or "",
        first_name=user.first_name or "",
    )

    await update.message.reply_html(
        "👋 <b>Welcome to VoucherTracker Alerts!</b>\n\n"
        "I'll notify you when specific vouchers come back in stock.\n\n"
        "<b>Commands:</b>\n"
        "/search &lt;query&gt; — Find vouchers\n"
        "/subscribe — Start the subscription menu\n"
        "/unsubscribe &lt;voucher slug&gt; — Remove alerts\n"
        "/list — Your subscriptions\n"
        "/help — Show this help\n\n"
        "💡 Start with /search or /subscribe to find vouchers!",
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /help is issued."""
    await update.message.reply_html(
        "🤖 <b>VoucherTracker Bot Commands:</b>\n\n"
        "/search &lt;query&gt; — Find vouchers\n"
        "/subscribe — Start the subscription menu\n"
        "/unsubscribe &lt;voucher slug&gt; — Remove alerts\n"
        "/list — Your subscriptions\n"
        "/help — Show this help\n\n"
        "💡 Use voucher slugs (find via /search).",
    )


async def search_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /search <query>"""
    text = update.message.text
    parts = text.split(maxsplit=1)
    if len(parts) < 2:
        await update.message.reply_html("⚠️ Please provide a search term.\n\nExample: /search amazon")
        return

    query = parts[1].strip()
    matches = await _get_vouchers_by_query(query)

    if not matches:
        await update.message.reply_html(f"❌ No vouchers found matching '<b>{query}</b>'.")
        return

    lines = [f"🔍 <b>Results for '{query}':</b>\n"]
    for vp in matches:
        stock = "✅" if not vp.out_of_stock_at else "🔴"
        lines.append(f"  {stock} {vp.voucher.name} (<b>{vp.voucher.slug}</b>) — {vp.platform.name}")

    lines.append("\n💡 Use /subscribe to begin subscribing.")
    await update.message.reply_html("\n".join(lines))


async def list_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /list"""
    chat_id = update.effective_chat.id
    subs = await _get_user_subscriptions(chat_id)

    if not subs:
        await update.message.reply_html(
            "📭 No active subscriptions.\n\nUse /search &lt;query&gt; and /subscribe to get started.",
        )
        return

    lines = ["📋 <b>Your Subscriptions:</b>\n"]
    for sub in subs:
        vp = sub.voucher_platform
        stock = "✅" if not vp.out_of_stock_at else "🔴"
        lines.append(f"  {stock} {vp.voucher.name} ({vp.voucher.slug}) — {vp.platform.name}")

    lines.append(f"\nTotal: {len(subs)} alerts")
    lines.append("Use /unsubscribe &lt;voucher_slug&gt; to remove.")
    await update.message.reply_html("\n".join(lines))


async def unsubscribe_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /unsubscribe <voucher slug>"""
    chat_id = update.effective_chat.id
    text = update.message.text
    parts = text.split(maxsplit=1)
    if len(parts) < 2:
        await update.message.reply_html("⚠️ Please specify a voucher slug.\n\nExample: /unsubscribe amazon")
        return

    voucher_slug = parts[1].strip()
    count = await _unsubscribe_from_all(chat_id, voucher_slug)

    if count == 0:
        await update.message.reply_html(f"ℹ️ You're not subscribed to <b>{voucher_slug}</b>.")
    else:
        await update.message.reply_html(
            f"✅ Unsubscribed from <b>{voucher_slug}</b> ({count} alert{'s' if count > 1 else ''} removed).",
        )


# --- CONVERSATION HANDLER FLOW ---


async def start_subscribe(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Starts the subscribe conversation."""
    user = update.effective_user
    chat_id = update.effective_chat.id

    await _get_or_create_subscriber(
        chat_id=chat_id,
        username=user.username or "",
        first_name=user.first_name or "",
    )

    count = await _get_user_subscription_count(chat_id)
    if count >= MAX_SUBSCRIPTIONS_PER_USER:
        await update.message.reply_html(
            f"⚠️ You've reached the maximum of <b>{MAX_SUBSCRIPTIONS_PER_USER}</b> subscription{'s' if MAX_SUBSCRIPTIONS_PER_USER > 1 else ''}.\n\n"
            "Use /unsubscribe to free up a slot.",
        )
        return ConversationHandler.END

    text = update.message.text
    parts = text.split(maxsplit=1)

    if len(parts) == 2:
        # User provided a query immediately (e.g. /subscribe amazon)
        return await handle_voucher_search(update, context, query=parts[1].strip())
    # Prompt user for search query
    await update.message.reply_html(
        "To subscribe, please reply with the name of the voucher you're looking for (e.g., 'amazon' or 'flipkart').\n"
        "Or type /cancel to abort.",
    )
    return SELECT_VOUCHER


async def process_voucher_search(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Processes the text input for voucher search."""
    query = update.message.text
    return await handle_voucher_search(update, context, query)


async def handle_voucher_search(update: Update, context: ContextTypes.DEFAULT_TYPE, query: str) -> int:
    """Finds vouchers and builds the first menu."""
    matches = await _get_vouchers_by_query(query)

    if not matches:
        await update.message.reply_html(
            f"❌ No vouchers found matching '<b>{query}</b>'.\n\nPlease try another search term or /cancel.",
        )
        return SELECT_VOUCHER

    # Group by unique voucher slugs so we don't show duplicates for different platforms yet
    unique_vouchers = {}
    for vp in matches:
        slug = vp.voucher.slug
        if slug not in unique_vouchers:
            unique_vouchers[slug] = vp.voucher.name

    keyboard = []
    # Maximum of 10 results to not flood the UI
    for slug, name in list(unique_vouchers.items())[:10]:
        # limit callback_data to 64 bytes
        keyboard.append([InlineKeyboardButton(f"{name}", callback_data=f"VOUCHER_{slug}")])

    reply_markup = InlineKeyboardMarkup(keyboard)

    msg_text = "Select a voucher to subscribe to:"
    if update.message:
        await update.message.reply_text(msg_text, reply_markup=reply_markup)
    elif update.callback_query:
        await update.callback_query.edit_message_text(msg_text, reply_markup=reply_markup)

    return SELECT_PLATFORM


async def platform_selection(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Handles the user clicking a voucher -> shows platforms."""
    query = update.callback_query
    await query.answer()

    data = query.data
    if not data.startswith("VOUCHER_"):
        return ConversationHandler.END

    voucher_slug = data.replace("VOUCHER_", "")

    # Store in context to use later
    context.user_data["selected_voucher_slug"] = voucher_slug

    platforms = await _get_platforms_for_voucher(voucher_slug)
    if not platforms:
        await query.edit_message_text(text="Sorry, no platforms available for this voucher anymore.")
        return ConversationHandler.END

    keyboard = []
    for vp in platforms:
        stock = "🟢" if not vp.out_of_stock_at else "🔴"
        btn_text = f"{vp.platform.name} ({stock})"
        keyboard.append([InlineKeyboardButton(btn_text, callback_data=f"VP_{vp.id}")])

    keyboard.append([InlineKeyboardButton("🔙 Back to Search", callback_data="BACK_TO_SEARCH")])

    reply_markup = InlineKeyboardMarkup(keyboard)
    await query.edit_message_text(
        text=f"Select the platform for <b>{platforms[0].voucher.name}</b>:",
        reply_markup=reply_markup,
        parse_mode="HTML",
    )
    return SELECT_PLATFORM


async def confirm_subscription(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Handles the final click to subscribe."""
    query = update.callback_query
    await query.answer()

    data = query.data

    if data == "BACK_TO_SEARCH":
        await query.edit_message_text(
            "Please type the name of the voucher you're looking for (e.g., 'amazon').\nOr type /cancel to abort.",
        )
        return SELECT_VOUCHER

    if not data.startswith("VP_"):
        return ConversationHandler.END

    vp_id = int(data.replace("VP_", ""))
    user = update.effective_user
    chat_id = update.effective_chat.id

    success, msg = await _subscribe_user_to_platform(
        chat_id=chat_id,
        vp_id=vp_id,
        username=user.username or "",
        first_name=user.first_name or "",
    )

    await query.edit_message_text(text=msg, parse_mode="HTML")
    context.user_data.clear()

    return ConversationHandler.END


async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Cancels and ends the conversation."""
    user = update.message.from_user
    context.user_data.clear()
    await update.message.reply_text("Subscription process cancelled.")
    return ConversationHandler.END


def get_application():
    """Returns the PTB application instance configured with handlers."""
    # We must not run multiple event loops, so we build without building if we're inside Django.
    # The webhook will route the updates directly.
    token = settings.TELEGRAM_BOT_TOKEN
    if not token:
        logger.warning("No TELEGRAM_BOT_TOKEN configured.")
        return None

    application = Application.builder().token(token).build()

    # Commands
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("search", search_command))
    application.add_handler(CommandHandler("list", list_command))
    application.add_handler(CommandHandler("unsubscribe", unsubscribe_command))

    # Conversation handler for /subscribe
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("subscribe", start_subscribe)],
        states={
            SELECT_VOUCHER: [
                # Handles typed text searches for vouchers
                MessageHandler(filters.TEXT & ~filters.COMMAND, process_voucher_search),
            ],
            SELECT_PLATFORM: [
                CallbackQueryHandler(platform_selection, pattern="^VOUCHER_"),
                CallbackQueryHandler(confirm_subscription, pattern="^(VP_|BACK_TO_SEARCH)"),
            ],
        },
        fallbacks=[CommandHandler("cancel", cancel)],
    )

    application.add_handler(conv_handler)
    return application
