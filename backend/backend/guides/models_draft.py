from django.db import models
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField
from wagtail.blocks import CharBlock
from wagtail.blocks import RawHTMLBlock
from wagtail.blocks import RichTextBlock
from wagtail.fields import StreamField
from wagtail.models import Page


class GuidePage(Page):
    intro = models.CharField(max_length=250, blank=True)
    body = StreamField(
        [
            ("heading", CharBlock(form_classname="title")),
            ("paragraph", RichTextBlock()),
            ("embed", RawHTMLBlock()),
        ],
        use_json_field=True,
    )

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("body"),
    ]

    api_fields = [
        APIField("intro"),
        APIField("body"),
        APIField("tags"),  # If tagging is added
    ]
