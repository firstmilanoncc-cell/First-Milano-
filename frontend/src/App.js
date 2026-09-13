import { useEffect } from "react";
import Lenis from "lenis";
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
import Bodyguard from "@/components/Bodyguard";
import WhyUs from "@/components/WhyUs";
import QuoteForm from "@/components/QuoteForm";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

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
        <Header />
        <main>
          <Hero />
          <Marquee />
          <Services />
          <Fleet />
          <Airports />
          <Bodyguard />
          <WhyUs />
          <QuoteForm />
          <Contacts />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <QuickWhatsApp />
        <Toaster position="top-center" theme="dark" />
      </div>
    </LanguageProvider>
  );
}

export default App;
