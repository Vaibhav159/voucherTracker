from django.contrib.contenttypes.models import ContentType
from django.core.management.base import BaseCommand
from django.db import connection
from wagtail.models import Page

from backend.guides.models import GuideIndexPage


class Command(BaseCommand):
    help = "Converts the Root Page (ID 2) to a GuideIndexPage to enable the guides listing."

    def handle(self, *args, **options):
        self.stdout.write("Checking Page ID 2...")

        try:
            page = Page.objects.get(id=2)
        except Page.DoesNotExist:
            self.stdout.write(self.style.ERROR("Page ID 2 not found!"))
            return

        new_ct = ContentType.objects.get_for_model(GuideIndexPage)

        if page.content_type == new_ct:
            self.stdout.write(self.style.SUCCESS("Page 2 is already a GuideIndexPage. No action needed."))
            return

        self.stdout.write(f"Converting Page 2 (Type: {page.content_type}) to GuideIndexPage...")

        # Direct DB manipulation to change the type
        with connection.cursor() as cursor:
            # 1. Insert into guides_guideindexpage
            cursor.execute("INSERT INTO guides_guideindexpage (page_ptr_id, intro) VALUES (%s, %s)", [2, ""])

            # 2. Update wagtailcore_page content_type
            cursor.execute("UPDATE wagtailcore_page SET content_type_id = %s WHERE id = %s", [new_ct.id, 2])

        # Clear Wagtail cache if any (not strictly needed for local dev usually)
        self.stdout.write(self.style.SUCCESS("Successfully converted Page 2 to GuideIndexPage!"))
        self.stdout.write("You should now see the Guides Index at /guides/")
