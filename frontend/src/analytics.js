// Tracciamento GA4 + Google Ads per SPA React.
// Le page_view sono inviate manualmente a ogni cambio rotta (vedi AnalyticsRouteListener).

const GA4_ID = "G-22NMGM3J1F";
const ADS_ID = "AW-18450759460";

let lastTrackedUrl = null;

export function trackPageView() {
  if (typeof window.gtag !== "function") return;
  const url = window.location.pathname + window.location.search;
  if (url === lastTrackedUrl) return;
  lastTrackedUrl = url;
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: url,
    send_to: [GA4_ID, ADS_ID],
  });
}

// Conversione Google Ads: richiede l'etichetta (label) della conversione creata in Google Ads.
// Da usare solo se si sceglie una conversione di tipo "evento" invece di "caricamento pagina".
export function trackAdsConversion(conversionLabel) {
  if (typeof window.gtag !== "function" || !conversionLabel) return;
  window.gtag("event", "conversion", {
    send_to: `${ADS_ID}/${conversionLabel}`,
  });
}
