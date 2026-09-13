import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 32, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children }) => (
  <p className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold flex items-center gap-3">
    <span className="inline-block h-px w-8 bg-gold/60" />
    {children}
  </p>
);
