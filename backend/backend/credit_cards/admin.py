from django.contrib import admin
from django import forms
from ckeditor.widgets import CKEditorWidget
from .models import CreditCard

class CreditCardAdminForm(forms.ModelForm):
    detailed_guide = forms.CharField(widget=CKEditorWidget())
    verdict = forms.CharField(widget=CKEditorWidget())
    class Meta:
        model = CreditCard
        fields = "__all__"
        widgets = {
            "features": forms.Textarea(attrs={"rows": 6, "cols": 80, "style": "font-family: monospace;", "class": "vLargeTextField"}),
            "tags": forms.Textarea(attrs={"rows": 3, "cols": 80, "style": "font-family: monospace;", "class": "vLargeTextField"}),
        }

@admin.register(CreditCard)
class CreditCardAdmin(admin.ModelAdmin):
    form = CreditCardAdminForm
    list_display = ["name", "bank", "category", "reward_rate", "annual_fee"]
    list_filter = ["bank", "category", "created_at"]
    search_fields = ["name", "bank"]
    fieldsets = (
        (None, {
            "fields": ("name", "bank", "category", "image")
        }),
        ("Details", {
            "fields": ("annual_fee", "reward_rate", "fx_markup", "best_for", "verdict")
        }),
        ("Content", {
            "fields": ("detailed_guide", "features", "tags", "apply_link")
        }),
    )
