from django.db import models
from django.utils.translation import gettext_lazy as _


class VoucherCategory(models.TextChoices):
    SHOPPING = "Shopping", _("Shopping")
    FOOD = "Food", _("Food")
    TRAVEL = "Travel", _("Travel")
    ENTERTAINMENT = "Entertainment", _("Entertainment")
    GROCERY = "Grocery", _("Grocery")
    FASHION = "Fashion", _("Fashion")
    ELECTRONICS = "Electronics", _("Electronics")
    HEALTH = "Health", _("Health")
    OTHER = "Other", _("Other")


class VoucherMismatchStatus(models.TextChoices):
    PENDING = "PENDING", _("Pending")
    PROCESSED = "PROCESSED", _("Processed")
    IGNORED = "IGNORED", _("Ignored")


class PlatformName(models.TextChoices):
    AMAZON = "Amazon", _("Amazon")
    SAVESAGE = "SaveSage", _("SaveSage")
    MAGICPIN = "MagicPin", _("MagicPin")
    MAXIMIZE = "Maximize", _("Maximize")
    GYFTR = "Gyftr", _("Gyftr")
    ISHOP = "iShop", _("iShop")
