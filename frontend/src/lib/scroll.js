export const scrollTo = (hash) => {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(hash, { offset: -70, duration: 1.4 });
  } else {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }
};
