from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from backend.users.api.views import UserViewSet
from backend.vouchers.views import PlatformViewSet, VoucherViewSet
from backend.guides.views import GuideViewSet
from backend.credit_cards.views import CreditCardViewSet
from backend.credit_cards.views import CreditCardViewSet
from backend.guides.views import GuideViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("vouchers", VoucherViewSet)
router.register("platforms", PlatformViewSet)
router.register("guides", GuideViewSet)
router.register("credit-cards", CreditCardViewSet)


app_name = "api"
urlpatterns = router.urls
