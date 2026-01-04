from django.core.cache import cache
from django.db.models.signals import post_delete
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Guide


@receiver(post_save, sender=Guide)
@receiver(post_delete, sender=Guide)
def clear_cache(sender, **kwargs):
    cache.clear()
