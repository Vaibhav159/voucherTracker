from django.db import models
from django.utils.translation import gettext_lazy as _
from django_prose_editor.fields import ProseEditorField

class Guide(models.Model):
    title = models.CharField(_("Title"), max_length=255)
    description = ProseEditorField(_("Description"), blank=True)
    link = models.URLField(_("Link"), max_length=500, blank=True)
    tags = models.JSONField(_("Tags"), default=list)
    author = models.CharField(_("Author"), max_length=255, blank=True)
    embed_html = models.TextField(_("Embed HTML"), blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
