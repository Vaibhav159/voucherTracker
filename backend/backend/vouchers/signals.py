from django.core.cache import cache
from django.db.models.signals import post_delete
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Platform
from .models import Voucher
from .models import VoucherAlias
from .models import VoucherPlatform


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
