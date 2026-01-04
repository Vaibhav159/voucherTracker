from django import forms
from django.contrib import admin

from .models import Guide


class GuideAdminForm(forms.ModelForm):
    class Meta:
        model = Guide
        fields = "__all__"
        widgets = {
            "embed_html": forms.Textarea(
                attrs={"rows": 8, "cols": 80, "style": "font-family: monospace;", "class": "vLargeTextField"},
            ),
            "tags": forms.Textarea(
                attrs={"rows": 4, "cols": 80, "style": "font-family: monospace;", "class": "vLargeTextField"},
            ),
        }


@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    form = GuideAdminForm
    list_display = ("title", "author", "created_at", "updated_at")
    search_fields = ("title", "author", "description")
    list_filter = ("created_at", "updated_at")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (
            None,
            {
                "fields": ("title", "author", "link"),
            },
        ),
        (
            "Content",
            {
                "fields": ("description", "embed_html", "tags"),
            },
        ),
        (
            "Metadata",
            {
                "fields": ("created_at", "updated_at"),
                "classes": ("collapse",),
            },
        ),
    )
