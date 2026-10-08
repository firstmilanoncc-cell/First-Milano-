// Tracciamento GA4 + Google Ads per SPA React con consenso esplicito.
const GA4_ID = "G-22NMGM3J1F";
const ADS_ID = "AW-18450759460";
const CONSENT_KEY = "firstmilano_consent_v1";

let lastTrackedUrl = null;

export function getStoredConsent() {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(CONSENT_KEY));
    if (!parsed || typeof parsed !== "object") return null;
    return {
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
    };
  } catch {
    return null;
  }
}

export function saveConsent(consent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({
      analytics: consent.analytics === true,
      marketing: consent.marketing === true,
      updatedAt: new Date().toISOString(),
    }),
  );
}

export function applyConsent(consent) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });
}

export function trackPageView() {
  const consent = getStoredConsent();
  if (!consent?.analytics || typeof window.gtag !== "function") return;

  const url = window.location.pathname + window.location.search;
  if (url === lastTrackedUrl) return;
  lastTrackedUrl = url;

  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: url,
    send_to: GA4_ID,
  });
}

export function trackAdsConversion(conversionLabel) {
  const consent = getStoredConsent();
  if (!consent?.marketing || typeof window.gtag !== "function" || !conversionLabel) return;

  window.gtag("event", "conversion", {
    send_to: `${ADS_ID}/${conversionLabel}`,
  });
}
