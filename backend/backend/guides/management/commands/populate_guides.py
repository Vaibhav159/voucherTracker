import json
import os
from django.core.management.base import BaseCommand
from backend.guides.models import Guide

class Command(BaseCommand):
    help = 'Populate guides from guides.json'

    def handle(self, *args, **options):
        file_path = '/app/guides.json'
        if not os.path.exists(file_path):
             self.stdout.write(self.style.ERROR(f'File not found: {file_path}'))
             return

        with open(file_path, 'r') as f:
            data = json.load(f)

        for item in data:
            title = item.get('title')
            
            guide, created = Guide.objects.get_or_create(
                title=title,
                defaults={
                    'description': item.get('description', ''),
                    'link': item.get('link', ''),
                    'tags': item.get('tags', []),
                    'author': item.get('author', ''),
                    'embed_html': item.get('embedHtml', '')
                }
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f'Created Guide: {title}'))
            else:
                self.stdout.write(f'Updated Guide: {title}')
                guide.description = item.get('description', '')
                guide.link = item.get('link', '')
                guide.tags = item.get('tags', [])
                guide.author = item.get('author', '')
                guide.embed_html = item.get('embedHtml', '')
                guide.save()
        
        self.stdout.write(self.style.SUCCESS('Successfully populated guides'))
