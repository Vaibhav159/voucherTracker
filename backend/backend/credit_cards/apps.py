from django.apps import AppConfig


class CreditCardsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend.credit_cards'

    def ready(self):
        try:
            import backend.credit_cards.signals  # noqa: F401
        except ImportError:
            pass
