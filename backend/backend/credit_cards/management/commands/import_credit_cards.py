import os
import re
import json
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings
from backend.credit_cards.models import CreditCard

class Command(BaseCommand):
    help = 'Import credit cards from JS file'

    def handle(self, *args, **kwargs):
        # Possible paths to the source JS file
        possible_paths = [
            settings.BASE_DIR.parent / "src/data/creditCards.js", # Standard project structure (local)
            settings.BASE_DIR / "creditCards.js",                # Fallback for Docker (if copied manually)
            settings.BASE_DIR / "management/commands/creditCards.js", # Another fallback
            Path("/app/creditCards.js"),                         # Container absolute path (if copied to backend root)
            Path("/app/src/data/creditCards.js"),                # Container absolute path (if mounted)
        ]
        
        js_file_path = None
        for path in possible_paths:
            if os.path.exists(path):
                js_file_path = path
                break
        
        if not js_file_path:
            self.stdout.write(self.style.ERROR(f"Source file creditCards.js not found in any of the expected locations."))
            return

        self.stdout.write(f"Reading from {js_file_path}")

        try:
            with open(js_file_path, "r", encoding='utf-8') as f:
                content = f.read()

            # Extract the array from the JS file using regex
            match = re.search(r'export const creditCards = (\[.*\]);', content, re.DOTALL)
            if not match:
                # Try without trailing semicolon
                match = re.search(r'export const creditCards = (\[.*\])', content, re.DOTALL)

            if not match:
                self.stdout.write(self.style.ERROR("Could not find creditCards array in the JS file"))
                return

            json_str = match.group(1)
            cards_data = json.loads(json_str)

            # Delete existing data as requested
            self.stdout.write("Deleting existing credit card records...")
            CreditCard.objects.all().delete()

            count = 0
            for item in cards_data:
                metadata = item.get("metadata", {})
                fees = item.get("fees", {})
                rewards = item.get("rewards", {})
                features = item.get("features", {})
                eligibility = item.get("eligibility", {})

                # Extract apply link
                apply_link = item.get("link") or item.get("applyLink", "")

                # Extract tags
                tags = item.get("tags")
                if not tags and metadata:
                    tags = metadata.get("tags", [])

                # Extract category
                category = item.get("category", "")
                if not category and tags:
                    for t in ['Travel', 'Cashback', 'Premium', 'Shopping', 'Dining', 'Fuel', 'Co-branded']:
                        if t in tags:
                            category = t
                            break

                # For verdict, we can try to extract from metadata if not present at root
                verdict = item.get("verdict")
                if not verdict and metadata:
                    verdict = metadata.get("verdict")

                # Create the card with NEW structured fields only
                card = CreditCard.objects.create(
                    name=item.get("name"),
                    slug=item.get("slug") or item.get("id"),
                    bank=item.get("bank"),
                    category=category,
                    image=item.get("image"),
                    fees=fees,
                    eligibility=eligibility,
                    rewards=rewards,
                    features=features,
                    metadata=metadata,
                    tags=tags if tags is not None else [],
                    apply_link=apply_link,
                    verdict=verdict or "",
                    detailed_guide=item.get("detailedGuide") or item.get("detailed_guide", ""),
                )
                count += 1
                self.stdout.write(self.style.SUCCESS(f"Imported card: {card.name}"))

            self.stdout.write(self.style.SUCCESS(f"Successfully imported {count} cards"))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error importing: {str(e)}"))
            import traceback
            self.stdout.write(traceback.format_exc())
