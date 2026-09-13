from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import uuid
import httpx
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "FIRST MILANO")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL")

# ---- Email guardrail gate (managed email integration) ----
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r}")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r}")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r}")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r}")


async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None):
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    async with httpx.AsyncClient(timeout=30) as http:
        resp = await http.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


# ---- Quote requests ----
class QuoteRequest(BaseModel):
    name: str
    phone: str
    email: EmailStr
    pickup: str
    destination: str
    date: str
    time: str
    passengers: int = 1
    luggage: int = 0
    service_type: str
    notes: Optional[str] = ""
    privacy: bool
    lang: str = "it"


def _row(label: str, value: str) -> str:
    return (f'<tr><td style="padding:8px 16px;color:#A1A8B3;font-size:13px;'
            f'border-bottom:1px solid #24272c;white-space:nowrap">{escape(label)}</td>'
            f'<td style="padding:8px 16px;color:#F5F4F0;font-size:13px;'
            f'border-bottom:1px solid #24272c">{escape(value)}</td></tr>')


def _quote_email_html(q: QuoteRequest) -> str:
    rows = "".join([
        _row("Nome", q.name),
        _row("Telefono / WhatsApp", q.phone),
        _row("Email", q.email),
        _row("Servizio", q.service_type),
        _row("Partenza", q.pickup),
        _row("Destinazione", q.destination),
        _row("Data", q.date),
        _row("Ora", q.time),
        _row("Passeggeri", str(q.passengers)),
        _row("Bagagli", str(q.luggage)),
        _row("Note", q.notes or "-"),
    ])
    return (f'<table role="presentation" width="100%" style="background:#0B0C0E;padding:32px 0">'
            f'<tr><td align="center"><table role="presentation" width="560" '
            f'style="background:#141619;border:1px solid #2a2d33;font-family:Arial,sans-serif">'
            f'<tr><td style="padding:28px 32px;border-bottom:2px solid #D4AF37">'
            f'<div style="color:#F5F4F0;font-size:20px;letter-spacing:4px">FIRST MILANO</div>'
            f'<div style="color:#D4AF37;font-size:11px;letter-spacing:2px;margin-top:4px">'
            f'PRIVATE CHAUFFEUR SERVICE</div></td></tr>'
            f'<tr><td style="padding:20px 16px;color:#F5F4F0;font-size:14px">'
            f'Nuova richiesta di preventivo dal sito:</td></tr>'
            f'<tr><td style="padding:0 16px 16px"><table role="presentation" width="100%" '
            f'style="border-top:1px solid #24272c">{rows}</table></td></tr>'
            f'<tr><td style="padding:16px 32px 28px;color:#6E7582;font-size:11px">'
            f'Inviato dal modulo preventivi del sito FIRST MILANO.</td></tr>'
            f'</table></td></tr></table>')


@api_router.post("/quote")
async def create_quote(q: QuoteRequest):
    if not q.privacy:
        raise HTTPException(status_code=422, detail="Privacy consent required")
    doc = q.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.quotes.insert_one(doc)
    email_sent = False
    if OWNER_EMAIL and EMAIL_KEY:
        try:
            await send_email(
                to=OWNER_EMAIL,
                subject="Nuova richiesta preventivo — FIRST MILANO",
                html=_quote_email_html(q),
            )
            email_sent = True
        except Exception as e:
            logger.error(f"Quote email failed: {e}")
    return {"status": "success", "email_sent": email_sent}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
