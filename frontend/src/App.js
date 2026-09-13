import { useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import { LanguageProvider } from "@/i18n";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import QuickWhatsApp from "@/components/QuickWhatsApp";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Fleet from "@/components/Fleet";
import Airports from "@/components/Airports";
import WhyUs from "@/components/WhyUs";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PaymentPage from "@/components/PaymentPage";
import PaymentResult from "@/components/PaymentResult";

function Home() {
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
        <QuoteForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pagamento" element={<PaymentPage />} />
            <Route path="/pagamento/successo" element={<PaymentResult />} />
            <Route path="/pagamento/annullato" element={<PaymentResult cancelled />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" theme="dark" />
      </div>
    </LanguageProvider>
  );
}

export default App;
