"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

export default function PageTransition({ children }) {
  const pathname = usePathname();

  // NOTE: mode="wait" was removed intentionally. It makes AnimatePresence
  // block mounting the new page until the outgoing page's exit animation
  // fully resolves — and that resolution can get stuck (a known Framer
  // Motion + Next.js App Router interaction), leaving the screen blank
  // until a hard refresh. Without mode="wait", the new page mounts
  // immediately while the old one fades out independently — a safer
  // tradeoff than a page that can silently break.
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}