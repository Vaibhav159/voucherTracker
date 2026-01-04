from django import forms
from django.contrib import admin

from .models import CreditCard


class CreditCardAdminForm(forms.ModelForm):
    class Meta:
        model = CreditCard
        fields = "__all__"
        widgets = {
            "features": forms.Textarea(
                attrs={"rows": 6, "cols": 80, "style": "font-family: monospace;", "class": "vLargeTextField"},
            ),
            "tags": forms.Textarea(
                attrs={"rows": 3, "cols": 80, "style": "font-family: monospace;", "class": "vLargeTextField"},
            ),
        }


@admin.register(CreditCard)
class CreditCardAdmin(admin.ModelAdmin):
    form = CreditCardAdminForm
    list_display = ["name", "bank", "category"]
    list_filter = ["bank", "category", "created_at"]
    search_fields = ["name", "bank"]
    fieldsets = (
        (
            None,
            {
                "fields": ("name", "bank", "category", "image", "slug"),
            },
        ),
        (
            "Structured Data",
            {
                "fields": ("fees", "eligibility", "rewards", "features", "metadata", "tags"),
            },
        ),
        (
            "Content",
            {
                "fields": ("verdict", "detailed_guide", "apply_link"),
            },
        ),
    )
