from django.core.management.base import BaseCommand

from backend.vouchers.choices import PlatformName
from backend.vouchers.models import VoucherPlatform


class Command(BaseCommand):
    help = 'Resets discount fee to "Discount 0%" for MagicPin and SaveSage platforms.'

    def add_arguments(self, parser):
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Simulate the command without modifying the database.",
        )

    def handle(self, *args, **options):
        dry_run = options["dry_run"]

        target_platforms = [PlatformName.MAGICPIN, PlatformName.SAVESAGE]

        # Filter for vouchers on the target platforms
        vouchers_to_update = VoucherPlatform.objects.filter(
            platform__name__in=target_platforms,
        )

        count = vouchers_to_update.count()

        self.stdout.write(f"Found {count} vouchers to update.")

        if count == 0:
            self.stdout.write(self.style.WARNING("No vouchers found to update."))
            return

        for vp in vouchers_to_update:
            old_fee = vp.fee
            new_fee = "Variable"

            if old_fee == new_fee:
                if dry_run:
                    self.stdout.write(f"SKIPPING (Already updated): {vp} | Fee: {old_fee}")
                continue

            if dry_run:
                self.stdout.write(f"WOULD UPDATE: {vp} | Old Fee: {old_fee} -> New Fee: {new_fee}")
            else:
                vp.fee = new_fee
                vp.save()
                self.stdout.write(self.style.SUCCESS(f"UPDATED: {vp} | Old Fee: {old_fee} -> New Fee: {new_fee}"))

        if dry_run:
            self.stdout.write(self.style.WARNING("DRY RUN: No changes were made."))
        else:
            self.stdout.write(self.style.SUCCESS("All target vouchers have been updated."))
