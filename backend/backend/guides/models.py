from django.db import models
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey
from taggit.models import TaggedItemBase
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField
from wagtail.blocks import CharBlock
from wagtail.blocks import RawHTMLBlock
from wagtail.blocks import RichTextBlock
from wagtail.fields import RichTextField
from wagtail.fields import StreamField
from wagtail.models import Page


class GuidePageTag(TaggedItemBase):
    content_object = ParentalKey("GuidePage", on_delete=models.CASCADE, related_name="tagged_items")


class GuidePage(Page):
    intro = models.CharField(max_length=250, blank=True)
    author = models.CharField(max_length=255, blank=True)
    external_link = models.URLField(blank=True)
    body = StreamField(
        [
            ("heading", CharBlock(form_classname="title")),
            ("paragraph", RichTextBlock()),
            ("embed", RawHTMLBlock()),
        ],
        use_json_field=True,
    )
    tags = ClusterTaggableManager(through=GuidePageTag, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("author"),
        FieldPanel("external_link"),
        FieldPanel("body"),
        FieldPanel("tags"),
    ]

    api_fields = [
        APIField("intro"),
        APIField("author"),
        APIField("external_link"),
        APIField("body"),
        APIField("tags"),
    ]


class GuideIndexPage(Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
    ]

    subpage_types = ["GuidePage"]

    def get_context(self, request):
        context = super().get_context(request)
        # Get all published guides, reversed chronologically
        context["guides"] = GuidePage.objects.child_of(self).live().order_by("-first_published_at")
        return context
