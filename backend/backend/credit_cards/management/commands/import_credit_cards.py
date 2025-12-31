from django.core.management.base import BaseCommand
import os
import re
from django.conf import settings
from backend.credit_cards.models import CreditCard
import ast
import json

class Command(BaseCommand):
    help = 'Import credit cards from JS file'

    def handle(self, *args, **kwargs):
        # We assume the JSON file is in the same directory as this command file or similar
        # But actually we generated it at backend/backend/credit_cards/management/commands/credit_cards.json
        # which is where this file resides.
        
        # settings.BASE_DIR is backend/
        # This file is backend/backend/credit_cards/management/commands/import_credit_cards.py
        # JSON is backend/backend/credit_cards/management/commands/credit_cards.json
        
        json_file_path = settings.BASE_DIR / "backend/credit_cards/management/commands/credit_cards.json"
        
        self.stdout.write(f"Reading from {json_file_path}")
        
        try:
            with open(json_file_path, "r") as f:
                cards_data = json.load(f)

            for item in cards_data:
                # Map fields from JSON (camelCase) to Model (snake_case)
                # Ensure we handle missing fields gracefully
                
                # Handling nested or special format fields if necessary
                # rewardCaps is object in JSON, JSONField in model
                # features/tags are arrays
                
                card, created = CreditCard.objects.update_or_create(
                    id=item.get("id"),
                    defaults={
                        "name": item.get("name"),
                        "bank": item.get("bank"),
                        "category": item.get("category"),
                        "image": item.get("image"),
                        "annual_fee": item.get("annualFee"),
                        "reward_rate": item.get("rewardRate"),
                        "fx_markup": item.get("fxMarkup", ""),
                        "best_for": item.get("bestFor", ""),
                        "verdict": item.get("verdict", ""),
                        "detailed_guide": item.get("detailedGuide", ""),
                        "apply_link": item.get("applyLink", ""),
                        "features": item.get("features", []),
                        "tags": item.get("tags", []),
                        "reward_type": item.get("rewardType", ""),
                        "reward_caps": item.get("rewardCaps", {}),
                    }
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Created card: {card.name}"))
                else:
                    self.stdout.write(f"Updated card: {card.name}")

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error importing: {str(e)}"))
