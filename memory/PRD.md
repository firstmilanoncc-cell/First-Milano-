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

## Aggiornamento (13/09/2026 — SEO tecnico)
- Aggiunti public/robots.txt (Disallow /pagamento, sitemap link) e public/sitemap.xml (https://firstmilanoncc.it/)
- index.html: canonical, robots index/follow, geo meta (IT-MI/Milano), OG completi (og:url, og:image=/images/hero.jpg, og:locale it_IT+en_US), Twitter card, JSON-LD LocalBusiness arricchito (telefono, email, geo coordinates, priceRange, areaServed, openingHours 24/7)
- NOTA: modifiche a public/ richiedono re-publish per andare live sul dominio; restart frontend necessario per rigenerare index.html in preview
- Da fare lato utente: abilitare "Enable Search Engine Crawling" nel pannello Publish, registrare Google Search Console e inviare sitemap

## Aggiornamento (13/09/2026 — pagine SEO dedicate)
- 5 landing page SEO: /transfer-malpensa, /transfer-linate, /transfer-orio-al-serio, /autista-a-disposizione, /eventi-fashion-week (src/servicePages.js + components/ServicePage.jsx), IT/EN con meta title/description/canonical per pagina
- Titoli gestiti per-pagina (rimosso dal LanguageProvider; Home e ServicePage li impostano)
- Sitemap aggiornata con le 5 pagine; footer con link interni alle pagine servizio; header/footer navigano verso home+anchor anche dalle sottopagine
- Verificato: title IT/EN per pagina, H1 localizzati, CTA → home#preventivo funzionante
- RICHIEDE re-publish per andare live + reinvio sitemap in Search Console

## Aggiornamento (14/09/2026 — immagini più luminose + pacchetto Google Ads)
- Overlay e brightness alleggeriti due volte su hero/flotta/pannelli/pagine servizio (brightness 1.2, gradienti ridotti)
- Asset pubblicitari in /app/ad-assets/ (6 immagini brandizzate 1200x628 e 1200x1200 con Cormorant/Jakarta) + CAMPAGNA_GOOGLE_ADS.md con 5 gruppi RSA (titoli ≤30 car., descrizioni ≤90), keyword, negative, sitelink e piano budget 4 settimane
- DA FARE: tag conversione Google Ads (clic WhatsApp + invio form) prima dell'attivazione campagne

## Aggiornamento (14/09/2026 — immagini pubblicitarie generate AI)
- 6 immagini generate con Gemini Nano Banana (chiave universale, crediti utente): NCC/Duomo, transfer aeroporto, autista a disposizione (Via Monte Napoleone), eventi/palazzo con red carpet, business (Porta Nuova), lunga percorrenza (Lago di Como)
- Raw in /app/ad-assets/raw_gen_*.png; finali brandizzate (logo + oro + payoff, Cormorant/Jakarta in /app/ad-assets/fonts/): new_*_1200x628.jpg e new_*_1200x1200.jpg — 12 file totali
- Script rigenerazione: /app/scripts/gen_ad_images.py

## Aggiornamento (16/09/2026 — ottimizzazione mobile)
- FAB WhatsApp ora appare solo dopo 350px di scroll (non copre più hero e feature strip al caricamento)
- Input dei moduli a 16px su mobile (text-base, sm:text-sm) per evitare l'auto-zoom di iOS al tocco
- Overlay hero mobile leggermente rinforzato (via /20) per leggibilità su foto schiarita
- Footer: padding bottom extra su mobile per non finire sotto il FAB
- Verificato a 390px: nessun overflow orizzontale, FAB 0→1 allo scroll, input 16px, footer libero
- GA4 G-22NMGM3J1F installato in index.html; Cookie Policy aggiornata con sezione Analytics (IT/EN)
- Asset ads scaricabili anche via /ads/ in public (richiede re-publish)

## Aggiornamento (16/09/2026 — video commerciale)
- Video 7s 720p generato con Seedance 1.0 Pro (image-to-video via Fal/Universal Key; Seedance 2.0 non presente nel catalogo): Malpensa Arrivi al tramonto, autista apre la porta scorrevole del V-Class, cliente con trolley, end card FIRST MILANO (overlay PIL+ffmpeg, drawtext non disponibile nel build ffmpeg → overlay PNG)
- Immagine di riferimento: /app/frontend/public/ads/ref_malpensa_van.png (Gemini); video: /app/frontend/public/ads/commercial_malpensa_7s.mp4 (grezzo 10s tagliato a 7s, 24fps, 1248x704)
- Script: /app/scripts/gen_video_commercial.py (ATTENZIONE: poll senza retry su timeout — il job Fal continua anche se il poll cade; non risottomettere, riprendere lo status_url)

## Aggiornamento (16/09/2026 — pagina conversione /grazie)
- Nuova pagina /grazie (ThankYou.jsx, noindex): modulo preventivo ora reindirizza lì dopo l'invio (non apre più WhatsApp automaticamente; la pagina offre il pulsante WhatsApp rapido)
- URL conversione per Google Ads: https://firstmilanoncc.it/grazie (richiede re-publish)

## Da completare (richiede dati dal cliente)
- P1: URL social Instagram/Facebook/LinkedIn (ora "#")
- P2: Dati societari (P.IVA/sede legale) da aggiungere a policy e footer quando disponibili
- P2: Foto reali della flotta se si vuole sostituire quelle del mockup

## Nessuna credenziale di accesso
Il sito non ha area riservata/login.

## Aggiornamento (17/09/2026 — ottimizzazione mobile completa, seconda iterazione)
- Audit completo a 390x844 su home + pagine SEO + moduli + modali
- Hero mobile: overlay rinforzato (via /45, bottom /75) per leggibilità su foto schiarita; CTA full-width su mobile; bottone WhatsApp hero con fondo scuro/backdrop-blur
- Scroll lock robusto condiviso: hook useScrollLock in lib/scroll.js (ferma Lenis + overflow hidden su html E body) usato da menu mobile, modale WhatsApp rapida, modali Privacy/Cookie — prima la wheel scrollava la pagina sotto le modali
- Autofill mobile: autoComplete name/tel/email + inputMode su moduli preventivo e WhatsApp; viewport-fit=cover; FAB WhatsApp con safe-area-inset-bottom; CSS prefers-reduced-motion + tap-highlight trasparente
- Fix estetico desktop: nav header con whitespace-nowrap (etichette non vanno più a capo a 1200-1400px)
- Test: testing agent iteration_5 (backend 100%, frontend 95%) + self-test fix scroll lock (menu aperto 0→0, modale WA 0→0, scroll riprende dopo chiusura)
- RICHIEDE re-publish per portare tutto su firstmilanoncc.it (insieme a /grazie e asset ads/video)
