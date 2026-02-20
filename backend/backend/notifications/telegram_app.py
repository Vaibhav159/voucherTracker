import logging

from asgiref.sync import sync_to_async
from django.conf import settings
from django.db.models import Q
from telegram import BotCommand
from telegram import InlineKeyboardButton
from telegram import InlineKeyboardMarkup
from telegram import ReplyKeyboardMarkup
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
AWAIT_SEARCH_QUERY = 2


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


async def get_default_keyboard(chat_id: int):
    count = await _get_user_subscription_count(chat_id)
    if count == 0:
        keyboard = [
            ["/subscribe", "/search"],
            ["/help", "/list"],
        ]
        # Remove list from the no-sub menu? User requested: "list all except for unsub and list"
        # Wait, if I do exactly that:
        keyboard = [
            ["/subscribe", "/search"],
            ["/help"],
        ]
    else:
        # "else if sub, list all expect sub"
        keyboard = [
            ["/list", "/search"],
            ["/unsubscribe", "/help"],
        ]
    return ReplyKeyboardMarkup(keyboard, resize_keyboard=True)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /start is issued."""
    user = update.effective_user
    chat_id = update.effective_chat.id

    await _get_or_create_subscriber(
        chat_id=chat_id,
        username=user.username or "",
        first_name=user.first_name or "",
    )

    keyboard = await get_default_keyboard(chat_id)

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
        reply_markup=keyboard,
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /help is issued."""
    chat_id = update.effective_chat.id
    keyboard = await get_default_keyboard(chat_id)

    await update.message.reply_html(
        "🤖 <b>VoucherTracker Bot Commands:</b>\n\n"
        "/search &lt;query&gt; — Find vouchers\n"
        "/subscribe — Start the subscription menu\n"
        "/unsubscribe &lt;voucher slug&gt; — Remove alerts\n"
        "/list — Your subscriptions\n"
        "/help — Show this help\n\n"
        "💡 Use voucher slugs (find via /search).",
        reply_markup=keyboard,
    )


async def search_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Handle /search <query> or prompt for a query."""
    text = update.message.text
    parts = text.split(maxsplit=1)
    chat_id = update.effective_chat.id
    keyboard = await get_default_keyboard(chat_id)

    if len(parts) < 2:
        await update.message.reply_html(
            "What voucher are you looking for?\n\nPlease reply with a search term (e.g., 'amazon' or 'flipkart'), or type /cancel.",
            reply_markup=keyboard,
        )
        return AWAIT_SEARCH_QUERY

    query = parts[1].strip()
    return await execute_search(update, context, query, keyboard)


async def perform_search(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Handle the text reply for a search query."""
    query = update.message.text.strip()
    chat_id = update.effective_chat.id
    keyboard = await get_default_keyboard(chat_id)
    return await execute_search(update, context, query, keyboard)


async def execute_search(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
    query: str,
    keyboard: ReplyKeyboardMarkup,
) -> int:
    """Executes the search logic and returns to ConversationHandler.END."""
    matches = await _get_vouchers_by_query(query)

    if not matches:
        await update.message.reply_html(
            f"❌ No vouchers found matching '<b>{query}</b>'.",
            reply_markup=keyboard,
        )
        return ConversationHandler.END

    lines = [f"🔍 <b>Results for '{query}':</b>\n"]
    for vp in matches:
        stock = "✅" if not vp.out_of_stock_at else "🔴"
        lines.append(f"  {stock} {vp.voucher.name} (<b>{vp.voucher.slug}</b>) — {vp.platform.name}")

    lines.append("\n💡 Use /subscribe to begin subscribing.")
    await update.message.reply_html("\n".join(lines), reply_markup=keyboard)
    return ConversationHandler.END


@sync_to_async
def _unsubscribe_from_vp(chat_id: int, vp_id: int):
    try:
        subscriber = TelegramSubscriber.objects.get(chat_id=chat_id)
        sub = TelegramSubscription.objects.filter(subscriber=subscriber, voucher_platform_id=vp_id).first()
        if sub:
            sub.delete()
            return True
    except TelegramSubscriber.DoesNotExist:
        pass
    return False


async def show_subscriptions_menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    chat_id = update.effective_chat.id
    subs = await _get_user_subscriptions(chat_id)

    if not subs:
        text = "📭 No active subscriptions.\n\nUse /search &lt;query&gt; and /subscribe to get started."
        if update.callback_query:
            await update.callback_query.edit_message_text(text, parse_mode="HTML")
        else:
            keyboard = await get_default_keyboard(chat_id)
            await update.message.reply_html(text, reply_markup=keyboard)
        return

    lines = ["📋 <b>Your Subscriptions:</b>\n"]
    keyboard = []

    for sub in subs:
        vp = sub.voucher_platform
        stock = "✅" if not vp.out_of_stock_at else "🔴"
        lines.append(f"  {stock} {vp.voucher.name} ({vp.voucher.slug}) — {vp.platform.name}")
        keyboard.append(
            [
                InlineKeyboardButton(
                    f"❌ Remove {vp.voucher.name} ({vp.platform.name})",
                    callback_data=f"RM_SUB_{vp.id}",
                ),
            ],
        )

    lines.append(f"\nTotal: {len(subs)} alerts")
    reply_markup = InlineKeyboardMarkup(keyboard)

    if update.callback_query:
        await update.callback_query.edit_message_text("\n".join(lines), reply_markup=reply_markup, parse_mode="HTML")
    else:
        # Note: We don't overwrite the InlineKeyboardMarkup here because it needs to be shown,
        # but to keep the ReplyKeyboard sticky, we actually can't send two reply_markups at once.
        # But sending an inline keyboard doesn't hide the existing ReplyKeyboard, so it's fine!
        await update.message.reply_html("\n".join(lines), reply_markup=reply_markup)


async def list_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /list"""
    await show_subscriptions_menu(update, context)


async def unsubscribe_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /unsubscribe"""
    text = update.message.text
    parts = text.split(maxsplit=1)
    if len(parts) < 2:
        await show_subscriptions_menu(update, context)
        return

    voucher_slug = parts[1].strip()
    chat_id = update.effective_chat.id
    count = await _unsubscribe_from_all(chat_id, voucher_slug)
    keyboard = await get_default_keyboard(chat_id)

    if count == 0:
        await update.message.reply_html(
            f"ℹ️ You're not subscribed to <b>{voucher_slug}</b>.",
            reply_markup=keyboard,
        )
    else:
        await update.message.reply_html(
            f"✅ Unsubscribed from <b>{voucher_slug}</b> ({count} alert{'s' if count > 1 else ''} removed).",
            reply_markup=keyboard,
        )


async def handle_remove_sub(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle inline button clicks to remove a subscription."""
    query = update.callback_query
    await query.answer()

    vp_id = int(query.data.replace("RM_SUB_", ""))
    chat_id = update.effective_chat.id

    await _unsubscribe_from_vp(chat_id, vp_id)
    await show_subscriptions_menu(update, context)


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
    chat_id = update.effective_chat.id
    context.user_data.clear()

    keyboard = await get_default_keyboard(chat_id)
    await update.message.reply_text("Subscription process cancelled.", reply_markup=keyboard)
    return ConversationHandler.END


async def setup_commands(application: Application) -> None:
    """Sets the bot command menu dynamically on startup."""
    from telegram import BotCommandScopeAllPrivateChats

    commands = [
        BotCommand("subscribe", "Start the subscription menu"),
        BotCommand("list", "View and manage active subscriptions"),
        BotCommand("search", "Find vouchers to subscribe to"),
        BotCommand("unsubscribe", "Remove alerts"),
        BotCommand("help", "Show help and commands"),
    ]
    await application.bot.set_my_commands(commands, scope=BotCommandScopeAllPrivateChats())


async def unknown_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle unknown text messages or commands and return the help menu."""
    await help_command(update, context)


def get_application():
    """Returns the PTB application instance configured with handlers."""
    # We must not run multiple event loops, so we build without building if we're inside Django.
    # The webhook will route the updates directly.
    token = settings.TELEGRAM_BOT_TOKEN
    if not token:
        logger.warning("No TELEGRAM_BOT_TOKEN configured.")
        return None

    application = Application.builder().token(token).post_init(setup_commands).build()

    # Commands
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("list", list_command))
    application.add_handler(CommandHandler("unsubscribe", unsubscribe_command))

    # Global callback handlers
    application.add_handler(CallbackQueryHandler(handle_remove_sub, pattern="^RM_SUB_"))

    # Conversation handler for /search
    search_conv_handler = ConversationHandler(
        entry_points=[CommandHandler("search", search_command)],
        states={
            AWAIT_SEARCH_QUERY: [
                MessageHandler(filters.TEXT & ~filters.COMMAND, perform_search),
            ],
        },
        fallbacks=[CommandHandler("cancel", cancel)],
    )
    application.add_handler(search_conv_handler)

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

    # Catch-all for unknown commands and plain text outside conversations
    application.add_handler(MessageHandler(filters.ALL, unknown_message))

    return application
