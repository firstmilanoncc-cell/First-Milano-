import { useEffect } from "react";

export const scrollTo = (hash) => {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(hash, { offset: -70, duration: 1.4 });
  } else {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }
};

// Blocca lo scroll della pagina quando menu/modali sono aperti:
// ferma Lenis (che intercetta la wheel) e blocca overflow su html+body.
export const useScrollLock = (locked) => {
  useEffect(() => {
    if (!locked) return;
    const lenis = window.__lenis;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [locked]);
};
