import { useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import { LanguageProvider, useLanguage, translations } from "@/i18n";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import QuickWhatsApp from "@/components/QuickWhatsApp";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Fleet from "@/components/Fleet";
import Airports from "@/components/Airports";
import WhyUs from "@/components/WhyUs";
import Reviews from "@/components/Reviews";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PaymentPage from "@/components/PaymentPage";
import PaymentResult from "@/components/PaymentResult";
import ThankYou from "@/components/ThankYou";
import ServicePage from "@/components/ServicePage";
import AnalyticsRouteListener from "@/components/AnalyticsRouteListener";
import MobileCtaBar from "@/components/MobileCtaBar";
import { scrollTo } from "@/lib/scroll";

function Home() {
  const { lang } = useLanguage();
  useEffect(() => {
    const meta = translations[lang].meta;
    const homeUrl = "https://firstmilanoncc.it/";
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", homeUrl);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", homeUrl);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", meta.description);
  }, [lang]);
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => scrollTo(window.location.hash), 600);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Fleet />
        <Airports />
        <WhyUs />
        <Reviews />
        <QuoteForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileCtaBar />
      <QuickWhatsApp />
    </>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="App grain bg-obsidian text-ivory font-sans antialiased">
        <BrowserRouter>
          <AnalyticsRouteListener />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pagamento" element={<PaymentPage />} />
            <Route path="/pagamento/successo" element={<PaymentResult />} />
            <Route path="/pagamento/annullato" element={<PaymentResult cancelled />} />
            <Route path="/grazie" element={<ThankYou />} />
            <Route path="/transfer-malpensa" element={<ServicePage slug="transfer-malpensa" />} />
            <Route path="/transfer-linate" element={<ServicePage slug="transfer-linate" />} />
            <Route path="/transfer-orio-al-serio" element={<ServicePage slug="transfer-orio-al-serio" />} />
            <Route path="/autista-a-disposizione" element={<ServicePage slug="autista-a-disposizione" />} />
            <Route path="/eventi-fashion-week" element={<ServicePage slug="eventi-fashion-week" />} />
            <Route path="/milano-lago-di-como" element={<ServicePage slug="milano-lago-di-como" />} />
            <Route path="/milano-st-moritz" element={<ServicePage slug="milano-st-moritz" />} />
            <Route path="/milano-portofino" element={<ServicePage slug="milano-portofino" />} />
            <Route path="/milano-venezia" element={<ServicePage slug="milano-venezia" />} />
            <Route path="/milano-firenze" element={<ServicePage slug="milano-firenze" />} />
            <Route path="/milano-roma" element={<ServicePage slug="milano-roma" />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" theme="dark" />
      </div>
    </LanguageProvider>
  );
}

export default App;
