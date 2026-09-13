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

## Aggiornamento (13/09/2026 — recapiti e policy)
- Recapiti reali integrati: Tel./WhatsApp +39 333 422 0189, email Firstmilanoncc@gmail.com
- OWNER_EMAIL backend puntato alla Gmail reale (test invio riuscito: email_sent=true)
- Privacy Policy e Cookie Policy complete (IT/EN, GDPR art. 6, diritti interessato, cookie solo tecnici) in modali scorrevoli

## Aggiornamento (13/09/2026 — modulo WhatsApp rapido)
- Nuovo modulo "Richiesta rapida via WhatsApp" (components/QuickWhatsApp.jsx): modale con campi essenziali (nome, partenza, destinazione, data, ora, passeggeri, note) che apre wa.me con messaggio strutturato
- Trigger: pulsante WhatsApp flottante e CTA hero "Contattaci su WhatsApp". Verificato: popup wa.me verso 393334220189 con testo compilato correttamente

## Da completare (richiede dati dal cliente)
- P1: URL social Instagram/Facebook/LinkedIn (ora "#")
- P2: Dati societari (P.IVA/sede legale) da aggiungere a policy e footer quando disponibili
- P2: Foto reali della flotta se si vuole sostituire quelle del mockup

## Nessuna credenziale di accesso
Il sito non ha area riservata/login.
