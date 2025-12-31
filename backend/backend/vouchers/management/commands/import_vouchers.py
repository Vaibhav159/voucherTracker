import json
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from backend.vouchers.models import Voucher, Platform, VoucherPlatform
from backend.vouchers.choices import VoucherCategory

class Command(BaseCommand):
    help = "Import vouchers from src/data/vouchers.json"

    def handle(self, *args, **options):
        # Path to the JSON file
        # Assuming the structure is relative to the backend root or project root
        json_file_path = os.path.join(settings.ROOT_DIR.parent, "src", "data", "vouchers.json")
        
        if not os.path.exists(json_file_path):
             # Try alternate path if running from backend dir directly
            json_file_path = os.path.join(os.getcwd(), "..", "src", "data", "vouchers.json")
        
        if not os.path.exists(json_file_path):
             self.stdout.write(self.style.ERROR(f"File not found: {json_file_path}"))
             return

        with open(json_file_path, "r") as f:
            vouchers_data = json.load(f)

        self.stdout.write(f"Found {len(vouchers_data)} vouchers to import.")

        # platform cache
        platform_cache = {}

        for voucher_item in vouchers_data:
            brand = voucher_item.get("brand")
            logo = voucher_item.get("logo", "")
            category = voucher_item.get("category", "Shopping")
            site = voucher_item.get("site", "")
            
            # Create or update Voucher
            voucher, created = Voucher.objects.update_or_create(
                name=brand,
                defaults={
                    "logo": logo,
                    "category": category, # Note: Ensure choices match or relax validation if needed. Category in DB has choices.
                    "site_link": site
                }
            )
            
            action = "Created" if created else "Updated"
            # self.stdout.write(f"{action} Voucher: {brand}")

            # Handle Platforms
            platforms_data = voucher_item.get("platforms", [])
            
            # Clear existing platforms for this voucher to ensure sync (or we can upsert carefully)
            # Strategy: Delete all existing VoucherPlatforms for this voucher and recreate them 
            # to match frontend completely (including order which comes from array order).
            # But we might lose external_id if we have sync logic.
            # However, this reference file is the "frontend static data", so it is the source of truth for "static" display.
            # The previous sync logic (sync_maximize/gyftr) might have populated external_ids.
            # If we delete, we lose external_ids.
            # Better strategy: Upsert based on Platform name.
            
            for index, p_data in enumerate(platforms_data):
                p_name = p_data.get("name")
                if not p_name:
                    continue
                
                # Get or Create Platform
                if p_name not in platform_cache:
                    platform_obj, _ = Platform.objects.get_or_create(name=p_name)
                    # We might want to update icon/logo if available in p_data but p_data usually has 'name', 'cap', 'fee' etc.
                    # Frontend has 'getPlatformStyle' in utils/platformLogos.js. 
                    # vouchers.json usually doesn't carried platform icon url, but frontend logic does.
                    # We will leave platform icon_url empty or manual for now unless data has it.
                    platform_cache[p_name] = platform_obj
                
                platform_obj = platform_cache[p_name]
                
                # Update VoucherPlatform
                # We need to preserve external_id if it exists.
                # So we try to get existing one.
                
                defaults = {
                    "cap": p_data.get("cap", ""),
                    "fee": p_data.get("fee", ""),
                    "denominations": p_data.get("denominations", []),
                    "link": p_data.get("link", ""),
                    "color": p_data.get("color", ""),
                    "priority": index
                }
                
                vp, vp_created = VoucherPlatform.objects.update_or_create(
                    voucher=voucher,
                    platform=platform_obj,
                    defaults=defaults
                )

        self.stdout.write(self.style.SUCCESS("Import completed successfully."))
