"use client";
import { motion } from "framer-motion";

const revealVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 60, rotateX: 4, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60, rotateY: 6, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60, rotateY: -6, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.7, rotateZ: 2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  flipUp: {
    hidden: { opacity: 0, rotateX: 90, y: 40 },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
};

export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration,
  className = "",
  once = true,
  amount = 0.2,
  style = {},
}) {
  const selectedVariant = revealVariants[variant] || revealVariants.fadeUp;

  return (
    <motion.div
      className={className}
      variants={selectedVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{
        delay,
        ...(duration ? { duration } : {}),
      }}
      style={{ transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container — wraps children and animates them one by one */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
  amount = 0.1,
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* Stagger item — must be a direct child of StaggerContainer */
export function StaggerItem({
  children,
  variant = "fadeUp",
  className = "",
  style = {},
}) {
  const selectedVariant = revealVariants[variant] || revealVariants.fadeUp;

  return (
    <motion.div
      className={className}
      variants={selectedVariant}
      style={{ transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </motion.div>
  );
}
