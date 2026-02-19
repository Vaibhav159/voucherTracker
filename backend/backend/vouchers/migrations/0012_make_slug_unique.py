from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("vouchers", "0011_add_slug_to_voucher"),
    ]

    operations = [
        migrations.AlterField(
            model_name='voucher',
            name='slug',
            field=models.SlugField(blank=True, max_length=255, unique=True, verbose_name='Slug'),
        ),
    ]
