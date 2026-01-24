from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from backend.credit_cards.views import CreditCardViewSet
from backend.users.api.views import UserViewSet
from backend.vouchers.views import PlatformViewSet
from backend.vouchers.views import StockAlertViewSet
from backend.vouchers.views import TelegramSubscriptionViewSet
from backend.vouchers.views import VoucherViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("vouchers", VoucherViewSet)
router.register("platforms", PlatformViewSet)
router.register("credit-cards", CreditCardViewSet)

# Telegram and Stock Alerts for n8n integration
router.register("telegram", TelegramSubscriptionViewSet, basename="telegram")
router.register("stock-alerts", StockAlertViewSet, basename="stock-alerts")


app_name = "api"
urlpatterns = router.urls
