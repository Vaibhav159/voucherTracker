from django.core.management.base import BaseCommand
import json
import os
from django.conf import settings
from backend.guides.models import Guide

class Command(BaseCommand):
    help = 'Import guides from JSON file'

    def handle(self, *args, **kwargs):
        # We copied guides.json to the same directory as this command
        json_file_path = settings.BASE_DIR / "backend/guides/management/commands/guides.json"
        
        self.stdout.write(f"Reading from {json_file_path}")
        
        try:
            with open(json_file_path, "r") as f:
                guides_data = json.load(f)
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"File not found: {json_file_path}"))
            return

        for item in guides_data:
            guide, created = Guide.objects.update_or_create(
                id=item.get("id"),
                defaults={
                    "title": item.get("title"),
                    "description": item.get("description"),
                    "link": item.get("link"),
                    "tags": item.get("tags", []),
                    "author": item.get("author"),
                    "embed_html": item.get("embedHtml", ""),
                }
            )
            
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created guide: {guide.title}"))
            else:
                self.stdout.write(f"Updated guide: {guide.title}")
