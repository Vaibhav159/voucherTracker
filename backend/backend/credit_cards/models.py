from django.db import models
from django.utils.translation import gettext_lazy as _
from django_prose_editor.fields import ProseEditorField

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
    slug = models.SlugField(_("Slug"), max_length=255, unique=True, blank=True, null=True)
    bank = models.CharField(_("Bank"), max_length=255, choices=BANK_CHOICES, db_index=True)
    category = models.CharField(_("Category"), max_length=255, blank=True, db_index=True)
    image = models.URLField(_("Image URL"), blank=True)

    # Structured JSON Fields
    fees = models.JSONField(_("Fees"), default=dict, blank=True)
    eligibility = models.JSONField(_("Eligibility"), default=dict, blank=True)
    rewards = models.JSONField(_("Rewards"), default=dict, blank=True)
    features = models.JSONField(_("Features"), default=dict, blank=True)
    metadata = models.JSONField(_("Metadata"), default=dict, blank=True)
    tags = models.JSONField(_("Tags"), default=list)

    # Content fields
    verdict = ProseEditorField(_("Verdict"), blank=True)
    detailed_guide = ProseEditorField(_("Detailed Guide"), blank=True)
    apply_link = models.URLField(_("Apply Link"), blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.bank} - {self.name}"
