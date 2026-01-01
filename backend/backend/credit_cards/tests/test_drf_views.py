import pytest
from backend.credit_cards.models import CreditCard

@pytest.mark.django_db
def test_credit_card_list(client):
    CreditCard.objects.create(
        name="HDFC Infinia", 
        bank="HDFC Bank",
        fees={"joining": 12500, "annual": 12500},
        eligibility={"income": 2400000},
        rewards={"type": "points"},
        metadata={"rating": 4.8}
    )
    response = client.get("/api/credit-cards/")
    assert response.status_code == 200
    data = response.data['results'] if 'results' in response.data else response.data
    assert len(data) >= 1
    
    # Find the card we just created
    card = next((c for c in data if c["name"] == "HDFC Infinia"), None)
    assert card is not None
    assert "fees" in card
    assert "eligibility" in card
    assert "rewards" in card
    assert "metadata" in card
    assert card["fees"]["joining"] == 12500

@pytest.mark.django_db
def test_credit_card_search(client):
    CreditCard.objects.create(name="UniqueCard Search", bank="UniqueBank")
    response = client.get("/api/credit-cards/?search=UniqueCard")
    assert response.status_code == 200
    data = response.data['results'] if 'results' in response.data else response.data
    assert len(data) >= 1
    assert any(c["name"] == "UniqueCard Search" for c in data)
@pytest.mark.django_db
def test_credit_card_related_guides(client):
    from backend.guides.models import Guide
    
    # Create a guide with specific tag
    Guide.objects.create(
        title="DCB Metal Guide",
        tags=["DCB", "Guide", "HDFC"]
    )
    
    # Create a card that should match
    card = CreditCard.objects.create(
        name="Diners Club Black Metal",
        slug="hdfc-diners-black-metal",
        bank="HDFC Bank"
    )
    
    response = client.get(f"/api/credit-cards/{card.id}/")
    assert response.status_code == 200
    assert "related_guides" in response.data
    assert len(response.data["related_guides"]) >= 1
    assert response.data["related_guides"][0]["title"] == "DCB Metal Guide"
