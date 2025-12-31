import pytest
from backend.credit_cards.models import CreditCard

@pytest.mark.django_db
def test_credit_card_list(client):
    CreditCard.objects.create(name="HDFC Infinia", bank="HDFC Bank")
    response = client.get("/api/credit-cards/")
    assert response.status_code == 200
    data = response.data['results'] if 'results' in response.data else response.data
    assert len(data) >= 1
    assert data[0]["name"] == "HDFC Infinia"

@pytest.mark.django_db
def test_credit_card_search(client):
    CreditCard.objects.create(name="Axis Atlas", bank="Axis Bank")
    response = client.get("/api/credit-cards/?search=Atlas")
    assert response.status_code == 200
    data = response.data['results'] if 'results' in response.data else response.data
    assert len(data) == 1
    assert data[0]["name"] == "Axis Atlas"
