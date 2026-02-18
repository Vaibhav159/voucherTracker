from django.db import migrations, models
from django.utils.text import slugify


def populate_slugs(apps, schema_editor):
    Voucher = apps.get_model("vouchers", "Voucher")
    used_slugs = set()
    for voucher in Voucher.objects.all():
        if voucher.slug:
            used_slugs.add(voucher.slug)
            continue
        slug = slugify(voucher.name)
        original_slug = slug
        counter = 1
        while slug in used_slugs:
            slug = f"{original_slug}-{counter}"
            counter += 1
        used_slugs.add(slug)
        voucher.slug = slug
        voucher.save(update_fields=["slug"])


class Migration(migrations.Migration):

    dependencies = [
        ("vouchers", "0010_voucherplatform_out_of_stock_at"),
    ]

    operations = [
        migrations.AddField(
            model_name="voucher",
            name="slug",
            field=models.SlugField(
                blank=True,
                max_length=255,
                null=True,
                verbose_name="Slug",
            ),
        ),
        migrations.RunPython(populate_slugs, migrations.RunPython.noop),
    ]
