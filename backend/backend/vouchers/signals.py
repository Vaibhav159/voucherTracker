from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Voucher, Platform, VoucherPlatform, VoucherAlias

@receiver(post_save, sender=Voucher)
@receiver(post_delete, sender=Voucher)
@receiver(post_save, sender=Platform)
@receiver(post_delete, sender=Platform)
@receiver(post_save, sender=VoucherPlatform)
@receiver(post_delete, sender=VoucherPlatform)
@receiver(post_save, sender=VoucherAlias)
@receiver(post_delete, sender=VoucherAlias)
def clear_cache(sender, **kwargs):
    cache.clear()
