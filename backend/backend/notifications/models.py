from django.db import models
from django.utils.translation import gettext_lazy as _

from backend.vouchers.models import VoucherPlatform


class TelegramSubscriber(models.Model):
    """A Telegram user who can receive restock alerts."""

    chat_id = models.BigIntegerField(_("Chat ID"), unique=True, db_index=True)
    username = models.CharField(_("Username"), max_length=255, blank=True)
    first_name = models.CharField(_("First Name"), max_length=255, blank=True)
    is_active = models.BooleanField(_("Active"), default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Telegram Subscriber")
        verbose_name_plural = _("Telegram Subscribers")

    def __str__(self):
        return self.username or self.first_name or str(self.chat_id)


class TelegramSubscription(models.Model):
    """A subscription linking a subscriber to a specific VoucherPlatform."""

    subscriber = models.ForeignKey(
        TelegramSubscriber,
        on_delete=models.CASCADE,
        related_name="subscriptions",
    )
    voucher_platform = models.ForeignKey(
        VoucherPlatform,
        on_delete=models.CASCADE,
        related_name="telegram_subscriptions",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Telegram Subscription")
        verbose_name_plural = _("Telegram Subscriptions")
        unique_together = [["subscriber", "voucher_platform"]]

    def __str__(self):
        return f"{self.subscriber} → {self.voucher_platform}"
