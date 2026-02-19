from django.urls import path

from backend.notifications.bot import telegram_webhook

app_name = "notifications"

urlpatterns = [
    path("telegram/webhook/", telegram_webhook, name="telegram-webhook"),
]
