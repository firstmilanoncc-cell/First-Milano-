# FIRST MILANO — Private Chauffeur Service

## Problem statement (originale)
Sito one-page luxury per servizio NCC premium con base a Milano (brand: FIRST MILANO — Private Chauffeur Service). Obiettivo: richieste di preventivo e contatti WhatsApp/telefono. Stile: nero/antracite, avorio, oro champagne, serif elegante + sans moderno, foto cinematografiche, animazioni sobrie. Sezioni: header con switch IT/EN, hero Milano, 6 servizi, flotta Mercedes (berlina + van), transfer aeroportuali (MXP/LIN/BGY), NCC con guardia del corpo (secondario), perché noi, modulo preventivo, contatti, footer, WhatsApp flottante. SEO NCC Milano. Lingua IT principale + EN completa.

## Architettura
- Frontend: React + Tailwind + framer-motion (reveal on scroll, hero masked line-by-line, parallax) + lenis (smooth scroll). i18n custom (src/i18n.js) con provider IT/EN. Config contatti centralizzata in src/config.js.
- Backend: FastAPI `/api/quote` (salvataggio MongoDB + email via proxy email gestito Emergent, template server-side con guardrail), `/api/health`.
- Immagini: estratte dal mockup fornito dal cliente, in /app/frontend/public/images/.

## User personas
- Manager/aziende (business & corporate), viaggiatori aeroportuali, ospiti eventi/Fashion Week, clienti VIP che richiedono protezione personale.

## Implementato (13/09/2026)
- Sito one-page completo IT/EN con tutte le sezioni richieste e traduzione integrale
- Hero cinetico con reveal mascherato, parallasse, foto Duomo+Mercedes+autista dal mockup
- Flotta con foto mockup (berlina nera, van nero), aeroporti MXP/LIN/BGY con foto tramonto/torre dal mockup
- Sezione guardia del corpo con foto professionista (frame cinematografico)
- Modulo preventivo: salvataggio DB + email al titolare + apertura WhatsApp con riepilogo precompilato (verificato: email_sent=true, popup wa.me corretto)
- Marquee editoriale, manifesto numerato, header vetro→nero on scroll, menu mobile, WhatsApp flottante, modali Privacy/Cookie placeholder
- SEO: meta title/description, JSON-LD LocalBusiness, testi con keyword naturali

## Da completare (richiede dati dal cliente)
- P0: Numero WhatsApp reale (ora placeholder 390000000000 in src/config.js)
- P0: Email titolare reale per ricevere i preventivi (ora OWNER_EMAIL=delivered@resend.dev di test in backend/.env)
- P1: Telefono ed email pubblici nei Contatti (ora "DA INSERIRE")
- P1: URL social Instagram/Facebook/LinkedIn (ora "#")
- P2: Testi legali completi Privacy/Cookie Policy
- P2: Foto aggiuntive reali della flotta se disponibili

## Nessuna credenziale di accesso
Il sito non ha area riservata/login.
