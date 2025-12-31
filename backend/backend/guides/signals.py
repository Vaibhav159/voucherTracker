from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Guide

@receiver(post_save, sender=Guide)
@receiver(post_delete, sender=Guide)
def clear_cache(sender, **kwargs):
    cache.clear()
