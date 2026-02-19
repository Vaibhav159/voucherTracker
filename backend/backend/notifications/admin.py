from django.contrib import admin

from backend.notifications.models import TelegramSubscriber
from backend.notifications.models import TelegramSubscription


class TelegramSubscriptionInline(admin.TabularInline):
    model = TelegramSubscription
    extra = 0
    raw_id_fields = ["voucher_platform"]
    readonly_fields = ["created_at"]


@admin.register(TelegramSubscriber)
class TelegramSubscriberAdmin(admin.ModelAdmin):
    list_display = ["chat_id", "username", "first_name", "is_active", "subscription_count", "created_at"]
    list_filter = ["is_active"]
    search_fields = ["username", "first_name", "chat_id"]
    inlines = [TelegramSubscriptionInline]

    def subscription_count(self, obj):
        return obj.subscriptions.count()

    subscription_count.short_description = "Subscriptions"


@admin.register(TelegramSubscription)
class TelegramSubscriptionAdmin(admin.ModelAdmin):
    list_display = ["subscriber", "voucher_platform", "created_at"]
    list_filter = ["voucher_platform__platform"]
    raw_id_fields = ["subscriber", "voucher_platform"]
