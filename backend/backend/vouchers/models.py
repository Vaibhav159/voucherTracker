import json

from django.db import models
from django.utils.translation import gettext_lazy as _

from backend.vouchers.choices import PlatformName
from backend.vouchers.choices import VoucherCategory
from backend.vouchers.choices import VoucherMismatchStatus


class Voucher(models.Model):
    name = models.CharField(_("Name"), max_length=255, db_index=True)
    logo = models.URLField(_("Logo URL"), blank=True, max_length=1000)
    category = models.CharField(_("Category"), max_length=50, choices=VoucherCategory.choices, db_index=True)
    site_link = models.URLField(_("Site Link"), blank=True, max_length=1000)
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
        unique_together = [["voucher", "platform"]]

    def __str__(self):
        return f"{self.voucher.name} on {self.platform.name}"


class VoucherMismatch(models.Model):
    platform = models.ForeignKey(Platform, on_delete=models.CASCADE, related_name="mismatches")
    external_id = models.CharField(_("External ID"), max_length=255)
    brand_name = models.CharField(_("Brand Name"), max_length=255)  # Raw brand from source
    gift_card_name = models.CharField(_("Gift Card Name"), max_length=255)
    match_with_voucher = models.ForeignKey(
        Voucher,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="mismatches",
        verbose_name=_("Map to Voucher"),
    )
    raw_data = models.JSONField(_("Raw Data"), default=dict)
    status = models.CharField(
        _("Status"),
        max_length=20,
        choices=VoucherMismatchStatus.choices,
        default=VoucherMismatchStatus.PENDING,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ["platform", "external_id"]

    def __str__(self):
        return f"{self.brand_name} ({self.platform.name})"

    def get_category(self):
        if self.platform.name == PlatformName.MAXIMIZE:
            category_str_list = self.raw_data.get("category")
            if isinstance(category_str_list, str):
                category_list = json.loads(category_str_list)
                return category_list[0]
        if self.platform.name == PlatformName.ISHOP:
            return self.raw_data.get("sub_category")
        if self.platform.name == PlatformName.MAGNIFY:
            category_str_list = self.raw_data.get("categories")
            return category_str_list[0] if category_str_list else None
        return self.raw_data.get("category")

    def get_external_id(self):
        if self.platform.name == PlatformName.MAXIMIZE:
            return self.raw_data.get("id")
        if self.platform.name == PlatformName.ISHOP:
            return self.raw_data.get("_id")
        if self.platform.name == PlatformName.MAGNIFY:
            return self.raw_data.get("id")
        return self.raw_data.get("external_id") or self.raw_data.get("id")

    def get_logo(self):
        if self.platform.name == PlatformName.MAXIMIZE:
            return self.raw_data.get("giftCardLogo")
        if self.platform.name == PlatformName.GYFTR:
            return self.raw_data.get("brand_icon_url")
        if self.platform.name == PlatformName.ISHOP:
            image_gallery = self.raw_data.get("image_gallery", {})
            return image_gallery.get("image1") or image_gallery.get("image2")
        if self.platform.name == PlatformName.MAGNIFY:
            return self.raw_data.get("logoUrl")
        return self.raw_data.get("logo")
