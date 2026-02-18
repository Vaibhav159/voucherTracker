from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("vouchers", "0011_add_slug_to_voucher"),
    ]

    operations = [
        migrations.RunSQL(
            sql="ALTER TABLE vouchers_voucher ADD CONSTRAINT vouchers_voucher_slug_unique UNIQUE (slug);",
            reverse_sql="ALTER TABLE vouchers_voucher DROP CONSTRAINT IF EXISTS vouchers_voucher_slug_unique;",
        ),
    ]
