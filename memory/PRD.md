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
- Nuovo modulo "Richiesta rapida via WhatsApp" (components/QuickWhatsApp.jsx): modale con campi essenziali (nome, tipologia servizio, partenza, destinazione, data, ora, passeggeri, note) che apre wa.me con messaggio strutturato
- Trigger: pulsante WhatsApp flottante e CTA hero "Contattaci su WhatsApp". Verificato: popup wa.me verso 393334220189 con testo compilato correttamente

## Aggiornamento (13/09/2026 — autocomplete indirizzi)
- Nuovo componente AddressInput.jsx (Photon photon.komoot.io, no API key, debounce 300ms, min 3 caratteri, bias Milano, countrycode IT; NOTA: lang=it NON supportato da Photon, ometterlo)
- Integrato in entrambi i moduli (WhatsApp rapido + preventivo email) su partenza/destinazione; inserimento manuale sempre consentito
- Verificato: "Malpensa aeroporto" → suggerimenti T1/T2; "Milano Centrale" → Piazza Duca d'Aosta

## Aggiornamento (13/09/2026 — hero)
- Ritaglio hero rifatto (620,58,1310,385 dal mockup, 2x) + zoom ridotto (h-108%, parallasse 10%, object-position 58%)
- Mobile (<lg): hero NON cover ma immagine a dimensione naturale in cima (pt-[70px], w-full h-auto + fade verso il nero), testo sotto — nitida e non zoomata; desktop resta full-screen con parallasse

## Aggiornamento (13/09/2026 — redesign da riferimento Lovable)
- Replicate design di https://firstmilanoncc-luxury-chauffeur.lovable.app: foto scaricate dagli asset Lovable (hero, berlina, van, aeroporto, guardia) in public/images/
- Hero: titolo FIRST/MILANO su due righe, gradiente da sinistra, CTA con icone, strip feature; testi sovrapposti alla foto su tutti i dispositivi (mobile: dimensioni ridotte, object-position 64%)
- Servizi e Perché FIRST MILANO su fondo avorio (cream #F4F0E6, oro scuro golddeep #A5882F), titoli serif centrati con divisore oro
- Flotta: card a tutta foto con testo sovrapposto e checkmark oro
- Aeroporti + Guardia: due pannelli fotografici affiancati full-bleed con "SCOPRI DI PIÙ" (Bodyguard.jsx rimosso, ancore #aeroporti/#guardia nei pannelli)
- Footer: 3 colonne (brand, Contatti con icone, Navigazione a due colonne) + social quadrati oro + barra legale
- Copy servizi allineato alla versione Lovable

## Aggiornamento (13/09/2026 — pagamenti con carta)
- Pagina nascosta /pagamento (non linkata nel sito): PIN operatore (env PAYMENT_PIN, default FIRST2026), form importo/cliente/riferimento/descrizione → Stripe Checkout link (EUR) condivisibile via copia o WhatsApp; storico ultimi 20 pagamenti con stato (in attesa/pagato/fallito/scaduto)
- Pagine /pagamento/successo (polling status ogni 2.5s) e /pagamento/annullato
- Backend: POST /api/payments/create-link (PIN), GET /api/payments?pin=, GET /api/payments/status/{id}, webhook /api/stripe/webhook idempotente
- Stripe sandbox claimable (Flow A, paese IT): chiavi in backend/.env; tax_mode "full" (managed payments) con fallback automatic_tax; tax code txcd_20030000 (servizi generici) su product_data inline
- Verificato end-to-end: link generato → checkout Stripe €150 → pagamento carta test 4242 → redirect successo → stato PAGATO nello storico

## Aggiornamento (13/09/2026 — sezione Contatti rimossa)
- Eliminata la sezione Contatti dedicata (Contacts.jsx rimosso); i recapiti restano nella colonna "Contatti" del footer
- La voce di menu "Contatti" ora scrolla al footer (id="contatti" sul footer)

## Da completare (richiede dati dal cliente)
- P1: URL social Instagram/Facebook/LinkedIn (ora "#")
- P2: Dati societari (P.IVA/sede legale) da aggiungere a policy e footer quando disponibili
- P2: Foto reali della flotta se si vuole sostituire quelle del mockup

## Nessuna credenziale di accesso
Il sito non ha area riservata/login.
