from django.contrib import admin
from django import forms
from django.db import models
from .models import Voucher, VoucherAlias, Platform, VoucherPlatform, VoucherMismatch


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


@admin.register(VoucherMismatch)
class VoucherMismatchAdmin(admin.ModelAdmin):
    list_display = ["brand_name", "gift_card_name", "platform", "status", "match_with_voucher", "created_at",
                    "get_category", "get_external_id", "get_logo"]
    list_filter = ["status", "platform", "created_at"]
    search_fields = ["brand_name", "gift_card_name", "external_id"]
    readonly_fields = ["created_at", "updated_at", "raw_data", "get_category", "get_external_id", "get_logo"]
    list_editable = ["match_with_voucher"]
    autocomplete_fields = ["match_with_voucher"]
    actions = ["create_voucher_from_mismatch", "create_alias_from_mismatch"]
    ordering = ["match_with_voucher", "created_at"]

    def get_queryset(self, request):
        return super().get_queryset(request).exclude(status="PROCESSED")

    @admin.action(description="Create new Voucher(s) from selection")
    def create_voucher_from_mismatch(self, request, queryset: list[VoucherMismatch]):
        created_count = 0
        for mismatch in queryset:
            if mismatch.status == "PROCESSED":
                continue

            # Create Voucher
            voucher, created = Voucher.objects.get_or_create(
                name=mismatch.gift_card_name,  # Use brand name as default
                defaults={
                    "category": mismatch.get_category(),
                    "logo": mismatch.get_logo(),
                }  # Default category
            )

            if created:
                created_count += 1

            mismatch.status = "PROCESSED"
            mismatch.save()

        self.message_user(request, f"Created {created_count} new Vouchers.", level="SUCCESS")

    @admin.action(description="Convert to Alias for selected Voucher")
    def create_alias_from_mismatch(self, request, queryset: list[VoucherMismatch]):
        created_count = 0
        for mismatch in queryset:
            if not mismatch.match_with_voucher:
                continue

            _, created = VoucherAlias.objects.get_or_create(
                name=mismatch.gift_card_name,
                voucher=mismatch.match_with_voucher
            )

            if created:
                created_count += 1

            mismatch.status = "PROCESSED"
            mismatch.save()

        self.message_user(request, f"Created {created_count} new Aliases.", level="SUCCESS")
