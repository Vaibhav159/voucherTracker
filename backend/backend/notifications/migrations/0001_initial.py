from django.db import migrations
from django.db import models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("vouchers", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="TelegramSubscriber",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "chat_id",
                    models.BigIntegerField(
                        db_index=True,
                        unique=True,
                        verbose_name="Chat ID",
                    ),
                ),
                (
                    "username",
                    models.CharField(
                        blank=True,
                        max_length=255,
                        verbose_name="Username",
                    ),
                ),
                (
                    "first_name",
                    models.CharField(
                        blank=True,
                        max_length=255,
                        verbose_name="First Name",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(
                        default=True,
                        verbose_name="Active",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Telegram Subscriber",
                "verbose_name_plural": "Telegram Subscribers",
            },
        ),
        migrations.CreateModel(
            name="TelegramSubscription",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "subscriber",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="subscriptions",
                        to="notifications.telegramsubscriber",
                    ),
                ),
                (
                    "voucher_platform",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="telegram_subscriptions",
                        to="vouchers.voucherplatform",
                    ),
                ),
            ],
            options={
                "verbose_name": "Telegram Subscription",
                "verbose_name_plural": "Telegram Subscriptions",
                "unique_together": {("subscriber", "voucher_platform")},
            },
        ),
    ]
