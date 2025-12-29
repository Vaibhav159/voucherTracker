from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class GuidesConfig(AppConfig):
    name = "backend.guides"
    verbose_name = _("Guides")

    def ready(self):
        pass