from django.contrib import admin

from .models import GuidePage


@admin.register(GuidePage)
class GuidePageAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "intro", "live")
    search_fields = ("title", "intro", "author")
    list_filter = ("live", "author")
