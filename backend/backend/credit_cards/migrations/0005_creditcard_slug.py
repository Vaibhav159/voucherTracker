from django.db import migrations, models
from django.utils.text import slugify

def populate_slugs(apps, schema_editor):
    CreditCard = apps.get_model('credit_cards', 'CreditCard')
    for card in CreditCard.objects.all():
        if not card.slug:
            # Generate slug from name
            base_slug = slugify(card.name)
            slug = base_slug
            counter = 1
            while CreditCard.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            card.slug = slug
            card.save()

class Migration(migrations.Migration):

    dependencies = [
        ('credit_cards', '0004_auto_20251231_1103'),
    ]

    operations = [
        migrations.AddField(
            model_name='creditcard',
            name='slug',
            field=models.SlugField(blank=True, max_length=255, null=True, unique=True, verbose_name='Slug'),
        ),
        migrations.RunPython(populate_slugs, migrations.RunPython.noop),
    ]
