from django.db import models
from django.utils.translation import gettext_lazy as _

class Voucher(models.Model):
    CATEGORY_CHOICES = [
        ("Shopping", "Shopping"),
        ("Food", "Food"),
        ("Travel", "Travel"),
        ("Entertainment", "Entertainment"),
        ("Grocery", "Grocery"),
        ("Fashion", "Fashion"),
        ("Electronics", "Electronics"),
        ("Health", "Health"),
        ("Other", "Other"),
    ]

    name = models.CharField(_("Name"), max_length=255, db_index=True)
    logo = models.URLField(_("Logo URL"), blank=True)
    category = models.CharField(_("Category"), max_length=50, choices=CATEGORY_CHOICES, db_index=True)
    site_link = models.URLField(_("Site Link"), blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class VoucherAlias(models.Model):
    name = models.CharField(_("Alias Name"), max_length=255, unique=True, db_index=True)
    voucher = models.ForeignKey(Voucher, on_delete=models.CASCADE, related_name="aliases")

    def __str__(self):
        return f"{self.name} -> {self.voucher.name}"

class Platform(models.Model):
    name = models.CharField(_("Platform Name"), max_length=255, unique=True)
    icon_url = models.URLField(_("Icon URL"), blank=True)

    def __str__(self):
        return self.name

class VoucherPlatform(models.Model):
    voucher = models.ForeignKey(Voucher, on_delete=models.CASCADE, related_name="platforms")
    platform = models.ForeignKey(Platform, on_delete=models.CASCADE, related_name="vouchers")
    cap = models.CharField(_("Cap"), max_length=255, blank=True)
    fee = models.CharField(_("Fee"), max_length=255, blank=True)
    denominations = models.JSONField(_("Denominations"), default=list)
    link = models.URLField(_("Link"), blank=True)
    color = models.CharField(_("Color"), max_length=50, blank=True)
    priority = models.IntegerField(_("Priority"), default=0)
    external_id = models.CharField(_("External ID"), max_length=255, blank=True, db_index=True)

    class Meta:
        ordering = ["priority"]

    def __str__(self):
        return f"{self.voucher.name} on {self.platform.name}"
