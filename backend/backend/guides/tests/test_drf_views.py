import pytest
from backend.guides.models import Guide

@pytest.mark.django_db
def test_guide_list(client):
    Guide.objects.create(title="Guide 1", description="Desc")
    response = client.get("/api/guides/")
    assert response.status_code == 200
    data = response.data['results'] if 'results' in response.data else response.data
    assert len(data) >= 1
    assert data[0]["title"] == "Guide 1"
