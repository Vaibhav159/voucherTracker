import json
import os
from django.core.management.base import BaseCommand
from backend.credit_cards.models import CreditCard

class Command(BaseCommand):
    help = 'Populate credit cards from creditCards.json'

    def handle(self, *args, **options):
        file_path = '/app/creditCards.json'
        if not os.path.exists(file_path):
             self.stdout.write(self.style.ERROR(f'File not found: {file_path}'))
             return

        with open(file_path, 'r') as f:
            data = json.load(f)

        for item in data:
            name = item.get('name')
            bank = item.get('bank', '')
            
            # Map JS fields to Model fields
            defaults = {
                'category': item.get('category', ''),
                'image': item.get('image', ''),
                'annual_fee': item.get('annualFee', ''),
                'reward_rate': item.get('rewardRate', ''),
                'fx_markup': item.get('fxMarkup', ''),
                'best_for': item.get('bestFor', ''),
                'reward_type': item.get('rewardType', ''),
                'reward_caps': item.get('rewardCaps', {}),
                'verdict': item.get('verdict', ''),
                'detailed_guide': item.get('detailedGuide', ''),
                'apply_link': item.get('applyLink', ''),
                'features': item.get('features', []),
                'tags': item.get('tags', [])
            }

            obj, created = CreditCard.objects.get_or_create(
                name=name,
                bank=bank,
                defaults=defaults
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f'Created Card: {name}'))
            else:
                self.stdout.write(f'Updated Card: {name}')
                for key, value in defaults.items():
                    setattr(obj, key, value)
                obj.save()
        
        self.stdout.write(self.style.SUCCESS('Successfully populated credit cards'))
