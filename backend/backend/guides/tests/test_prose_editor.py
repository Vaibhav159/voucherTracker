import pytest
from backend.credit_cards.models import CreditCard
from backend.guides.models import Guide

@pytest.mark.django_db
def test_prose_editor_content_persistence():
    # Test CreditCard ProseEditorField
    html_content = "<p>This is a <strong>rich text</strong> guide.</p>"
    card = CreditCard.objects.create(
        name="Rich Card", 
        bank="HDFC Bank",
        detailed_guide=html_content,
        verdict=html_content
    )
    
    # Retrieve and verify
    fetched_card = CreditCard.objects.get(id=card.id)
    assert fetched_card.detailed_guide == html_content
    assert fetched_card.verdict == html_content

@pytest.mark.django_db
def test_guide_prose_editor_content():
    # Test Guide ProseEditorField
    html_desc = "<ul><li>Step 1</li><li>Step 2</li></ul>"
    guide = Guide.objects.create(title="Rich Guide", description=html_desc)
    
    fetched_guide = Guide.objects.get(id=guide.id)
    assert fetched_guide.description == html_desc
