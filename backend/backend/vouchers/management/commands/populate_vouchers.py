import json
import os
from django.core.management.base import BaseCommand
from backend.vouchers.models import Voucher, Platform, VoucherPlatform, VoucherAlias

# Platform logos hardcoded from src/utils/platformLogos.js since we can't easily import JS
PLATFORM_STYLES = {
    "iShop": {
        "logo": "https://d35fe9hjas7aql.cloudfront.net/ishop1.0/prod/shared-ui/v1/assets/images/icons/logo.svg",
    },
    "Gyftr": {
        "logo": "https://www.gyftr.com/instantvouchers/static/images/logo_gv.svg",
    },
    "MagicPin": {
        "logo": "https://cdn.brandfetch.io/idYiJB0V8Y/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667563687342",
    },
    "Maximize": {
        "logo": "https://www.google.com/s2/favicons?domain=www.maximize.money&sz=128",
    },
    "Amazon": {
        "logo": "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/amazon-white-icon.svg",
    },
    "SaveSage": {
        "logo": "https://savesage.club/SaveSage-Symbol-on-Light-Background.png",
    }
}

class Command(BaseCommand):
    help = 'Populate vouchers from vouchers.json and brand_aliases.json'

    def handle(self, *args, **options):
        # 1. Populate Vouchers
        file_path = '/app/vouchers.json'
        if not os.path.exists(file_path):
             self.stdout.write(self.style.ERROR(f'File not found: {file_path}'))
             return

        # Pre-populate platforms with icons
        for p_name, p_data in PLATFORM_STYLES.items():
            Platform.objects.update_or_create(
                name=p_name,
                defaults={'icon_url': p_data.get('logo', '')}
            )

        with open(file_path, 'r') as f:
            data = json.load(f)

        for item in data:
            name = item.get('brand')
            logo = item.get('logo', '')
            category = item.get('category', 'Other')
            site_link = item.get('site', '')

            voucher, created = Voucher.objects.get_or_create(
                name=name,
                defaults={
                    'logo': logo,
                    'category': category,
                    'site_link': site_link
                }
            )
            
            if not created:
                voucher.logo = logo
                voucher.category = category
                voucher.site_link = site_link
                voucher.save()

            if created:
                self.stdout.write(self.style.SUCCESS(f'Created Voucher: {name}'))

            platforms_data = item.get('platforms', [])
            
            for i, p_data in enumerate(platforms_data):
                p_name = p_data.get('name')
                if not p_name:
                    continue

                platform, _ = Platform.objects.get_or_create(name=p_name)

                VoucherPlatform.objects.update_or_create(
                    voucher=voucher,
                    platform=platform,
                    defaults={
                        'cap': p_data.get('cap', ''),
                        'fee': p_data.get('fee', ''),
                        'denominations': p_data.get('denominations', []),
                        'link': p_data.get('link', ''),
                        'color': p_data.get('color', ''),
                        'priority': i
                    }
                )

        self.stdout.write(self.style.SUCCESS('Successfully populated vouchers'))

        # 2. Populate Aliases
        alias_file_path = '/app/brand_aliases.json'
        if not os.path.exists(alias_file_path):
             self.stdout.write(self.style.WARNING(f'Alias file not found: {alias_file_path}, skipping aliases.'))
             return

        with open(alias_file_path, 'r') as f:
            alias_data = json.load(f)
        
        for alias_name, voucher_name in alias_data.items():
            try:
                # Find the target voucher. Case-insensitive lookup might be safer but starting with exact match
                voucher = Voucher.objects.filter(name__iexact=voucher_name).first()
                if not voucher:
                     self.stdout.write(self.style.WARNING(f'Voucher not found for alias "{alias_name}" -> "{voucher_name}"'))
                     continue
                
                _, created = VoucherAlias.objects.get_or_create(
                    name=alias_name,
                    voucher=voucher
                )
                if created:
                     self.stdout.write(self.style.SUCCESS(f'Created Alias: "{alias_name}" -> "{voucher_name}"'))

            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error creating alias {alias_name}: {e}'))

        self.stdout.write(self.style.SUCCESS('Successfully populated aliases'))
