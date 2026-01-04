from django.core.cache import cache
from django.db.models.signals import post_delete
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import CreditCard


@receiver(post_save, sender=CreditCard)
@receiver(post_delete, sender=CreditCard)
def clear_cache(sender, **kwargs):
    cache.clear()
