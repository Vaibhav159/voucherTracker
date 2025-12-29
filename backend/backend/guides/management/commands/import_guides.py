from django.core.management.base import BaseCommand
from backend.guides.models import Guide
import json
import os
from django.conf import settings

class Command(BaseCommand):
    help = 'Import guides from JSON file'

    def handle(self, *args, **options):
        # Path to the JSON file relative to the project root
        file_path = os.path.join(settings.BASE_DIR.parent, 'src', 'data', 'guides.json')

        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f'File not found: {file_path}'))
            return

        with open(file_path, 'r') as f:
            data = json.load(f)

        count = 0
        for item in data:
            _, created = Guide.objects.get_or_create(
                title=item['title'],
                defaults={
                    'description': item.get('description', ''),
                    'link': item.get('link', ''),
                    'tags': item.get('tags', []),
                    'author': item.get('author', ''),
                    'embed_html': item.get('embedHtml', ''),
                }
            )
            if created:
                count += 1
        
        self.stdout.write(self.style.SUCCESS(f'Successfully imported {count} guides'))
