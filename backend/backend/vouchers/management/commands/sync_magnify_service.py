from django.core.management.base import BaseCommand

from backend.vouchers.services.magnify import MagnifySyncService


class Command(BaseCommand):
    help = "Sync Magnify vouchers"

    def handle(self, *args, **options):
        self.stdout.write("Syncing Magnify vouchers...")
        service = MagnifySyncService()
        result = service.fetch_and_sync()

        if result["status"] == "success":
            self.stdout.write(self.style.SUCCESS(f"Done! {result['message']}"))
            self.stdout.write(f"Created: {result.get('created', 0)}")
            self.stdout.write(f"Updated: {result.get('updated', 0)}")
            self.stdout.write(f"Skipped: {result.get('skipped_count', 0)}")
        else:
            self.stdout.write(self.style.ERROR(f"Error: {result['message']}"))
