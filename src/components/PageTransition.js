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

  // mode="popLayout" removes the exiting page from normal document flow
  // (position: absolute) the instant a new page starts entering. This avoids
  // two failure modes we hit with the alternatives:
  //  - mode="wait": blocks the new page from mounting until the old page's
  //    exit fully resolves, which can get stuck and leave a permanent blank
  //    screen (the bug we fixed earlier).
  //  - no mode at all: both pages sit in normal flow simultaneously while
  //    the old one fades out, so its full height still pushes the new
  //    page's content down — a big blank gap where the invisible old page
  //    used to be (the bug reported just now).
  return (
    <AnimatePresence mode="popLayout" initial={false}>
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