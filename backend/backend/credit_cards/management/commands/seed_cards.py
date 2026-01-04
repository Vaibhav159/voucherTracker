import json

from django.conf import settings
from django.core.management.base import BaseCommand

from backend.credit_cards.models import CreditCard


class Command(BaseCommand):
    help = "Seeds the database with credit card data from creditCards.json"

    def handle(self, *args, **options):
        # Determine the path to the JSON file
        # BASE_DIR is usually the folder containing manage.py
        json_path = settings.BASE_DIR / "creditCards.json"

        self.stdout.write(f"Reading data from {json_path}...")

        if not json_path.exists():
            self.stdout.write(self.style.ERROR(f"File not found: {json_path}"))
            return

        with open(json_path, encoding="utf-8") as f:
            cards_data = json.load(f)

        self.stdout.write(f"Found {len(cards_data)} cards. Starting seed...")

        created_count = 0
        updated_count = 0

        for card_data in cards_data:
            # Map JSON fields to Model fields
            # JSON: id -> Model: slug (or id if you prefer slug as unique identifier logic)
            # Use 'id' from JSON as 'slug' for uniqueness if acceptable

            slug = card_data.get("slug")
            if not slug:
                self.stdout.write(self.style.WARNING(f"Skipping card without slug: {card_data.get('name')}"))
                continue

            defaults = {
                "name": card_data.get("name", ""),
                "bank": card_data.get("bank", ""),
                "image": card_data.get("image", ""),
                "fees": card_data.get("fees", {}),
                "eligibility": card_data.get("eligibility", {}),
                "rewards": card_data.get("rewards", {}),
                "features": card_data.get("features", {}),
                "metadata": card_data.get("metadata", {}),
                "tags": card_data.get("metadata", {}).get("tags", []),  # Extract tags from metadata if not top level
                # Content fields
                "verdict": card_data.get("metadata", {}).get(
                    "verdict",
                    "",
                ),  # 'verdict' is often inside metadata in the JSON view
                "detailed_guide": card_data.get("detailedGuide", ""),
                "apply_link": card_data.get("link") or card_data.get("applyLink", ""),
            }

            # If 'category' is present in JSON, use it, else derive or leave blank
            if "category" in card_data:
                defaults["category"] = card_data["category"]

            # NOTE: Tag handling might need adjustment if logic was extracting it differently
            # In JSON view: metadata.tags exists.

            obj, created = CreditCard.objects.update_or_create(
                slug=slug,
                defaults=defaults,
            )

            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(self.style.SUCCESS("Successfully seeded cards."))
        self.stdout.write(f"Created: {created_count}")
        self.stdout.write(f"Updated: {updated_count}")
