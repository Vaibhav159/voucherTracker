from django.db import models
from django.utils.translation import gettext_lazy as _

class CreditCard(models.Model):
    BANK_CHOICES = [
        ("SBI Card", "SBI Card"),
        ("ICICI Bank", "ICICI Bank"),
        ("HDFC Bank", "HDFC Bank"),
        ("Axis Bank", "Axis Bank"),
        ("HSBC", "HSBC"),
        ("American Express", "American Express"),
        ("AU Small Finance Bank", "AU Small Finance Bank"),
        ("IDFC First Bank", "IDFC First Bank"),
        ("Kotak Mahindra Bank", "Kotak Mahindra Bank"),
        ("IndusInd Bank", "IndusInd Bank"),
        ("RBL Bank", "RBL Bank"),
        ("Federal Bank", "Federal Bank"),
        ("Yes Bank", "Yes Bank"),
        ("Bank of Baroda", "Bank of Baroda"),
        ("Standard Chartered", "Standard Chartered"),
    ]

    name = models.CharField(_("Name"), max_length=255)
    bank = models.CharField(_("Bank"), max_length=255, choices=BANK_CHOICES)
    category = models.CharField(_("Category"), max_length=255, blank=True)
    image = models.URLField(_("Image URL"), blank=True)
    annual_fee = models.CharField(_("Annual Fee"), max_length=255, blank=True)
    reward_rate = models.CharField(_("Reward Rate"), max_length=255, blank=True)
    fx_markup = models.CharField(_("Forex Markup"), max_length=255, blank=True)
    best_for = models.CharField(_("Best For"), max_length=255, blank=True)
    verdict = models.TextField(_("Verdict"), blank=True)
    detailed_guide = models.TextField(_("Detailed Guide"), blank=True)
    apply_link = models.URLField(_("Apply Link"), blank=True)
    features = models.JSONField(_("Features"), default=list)
    tags = models.JSONField(_("Tags"), default=list)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
