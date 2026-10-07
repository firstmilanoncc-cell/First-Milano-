import os
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://premium-ncc-milano.preview.emergentagent.com").rstrip("/")


def test_quote_submission_regression():
    payload = {
        "name": "TEST_Mario Rossi",
        "phone": "+39 333 1234567",
        "email": "test_regression@example.com",
        "pickup": "Milano Centrale",
        "destination": "Malpensa T1",
        "date": "2026-05-01",
        "time": "10:00",
        "passengers": 2,
        "luggage": 2,
        "service_type": "Transfer aeroportuale",
        "notes": "regression test",
        "privacy": True,
        "lang": "it",
    }
    r = requests.post(f"{BASE_URL}/api/quote", json=payload, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("ok") is True or data.get("success") is True or "id" in data or data.get("email_sent") is True, data


def test_service_pages_load_html():
    slugs = [
        "transfer-malpensa", "transfer-linate", "transfer-orio-al-serio",
        "milano-lago-di-como", "milano-st-moritz", "milano-portofino",
        "milano-venezia", "milano-firenze", "milano-roma",
    ]
    for slug in slugs:
        r = requests.get(f"{BASE_URL}/{slug}", timeout=20)
        assert r.status_code == 200, f"{slug} -> {r.status_code}"


def test_sitemap_contains_all():
    r = requests.get(f"{BASE_URL}/sitemap.xml", timeout=20)
    assert r.status_code == 200
    body = r.text
    for slug in ["transfer-malpensa","transfer-linate","transfer-orio-al-serio",
                 "autista-a-disposizione","eventi-fashion-week",
                 "milano-lago-di-como","milano-st-moritz","milano-portofino",
                 "milano-venezia","milano-firenze","milano-roma"]:
        assert slug in body, f"missing {slug}"
