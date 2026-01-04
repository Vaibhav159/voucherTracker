from django.apps import AppConfig


class VouchersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "backend.vouchers"

    def ready(self):
        try:
            import backend.vouchers.signals  # noqa: F401
        except ImportError:
            pass
