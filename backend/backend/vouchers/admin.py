from django.contrib import admin
from django import forms
from django.db import models
from .models import Voucher, VoucherAlias, Platform, VoucherPlatform

class VoucherAliasInline(admin.TabularInline):
    model = VoucherAlias
    extra = 1

class VoucherPlatformInline(admin.TabularInline):
    model = VoucherPlatform
    extra = 1
    autocomplete_fields = ["platform"]
    formfield_overrides = {
        models.JSONField: {'widget': forms.Textarea(attrs={'rows': 2, 'cols': 40, 'style': 'font-family: monospace;'})},
    }

@admin.register(Voucher)
class VoucherAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "created_at"]
    search_fields = ["name", "aliases__name"]
    list_filter = ["category", "created_at"]
    inlines = [VoucherAliasInline, VoucherPlatformInline]

@admin.register(Platform)
class PlatformAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]

@admin.register(VoucherPlatform)
class VoucherPlatformAdmin(admin.ModelAdmin):
    list_display = ["voucher", "platform", "fee", "cap"]
    list_filter = ["platform"]
    search_fields = ["voucher__name", "platform__name"]
    autocomplete_fields = ["voucher", "platform"]

@admin.register(VoucherAlias)
class VoucherAliasAdmin(admin.ModelAdmin):
    list_display = ["name", "voucher"]
    search_fields = ["name", "voucher__name"]
    autocomplete_fields = ["voucher"]
