from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from backend.users.api.views import UserViewSet
from backend.vouchers.views import VoucherViewSet, PlatformViewSet
from backend.credit_cards.views import CreditCardViewSet
from backend.guides.views import GuideViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("vouchers", VoucherViewSet)
router.register("platforms", PlatformViewSet)
router.register("credit-cards", CreditCardViewSet)
router.register("guides", GuideViewSet)


app_name = "api"
urlpatterns = router.urls
