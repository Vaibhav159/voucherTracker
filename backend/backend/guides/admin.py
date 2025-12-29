from django.contrib import admin
from .models import Guide

@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "created_at", "updated_at")
    search_fields = ("title", "author", "description")
    list_filter = ("created_at", "updated_at")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (None, {
            "fields": ("title", "author", "link")
        }),
        ("Content", {
            "fields": ("description", "embed_html", "tags")
        }),
        ("Metadata", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )
