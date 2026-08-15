"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import LaunchIcon from "@mui/icons-material/Launch";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Repos are private — instead of a dead/blocked GitHub link, route interested
// visitors to a pre-filled WhatsApp message so Irfan can share access manually.
const WHATSAPP_NUMBER = "923221649011";
const getWhatsAppLink = (projectTitle) => {
  const message = `Hi Irfan! I checked out your "${projectTitle}" project on your portfolio and I'd like to see the source code. Could you share access?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// ─── Scroll reveal helper ────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 28, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ─── Category accent colors ──────────────────────────────────────────────────
const CATEGORY_ACCENTS = {
  "Voice":               { dot: "#8B5CF6", label: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300" },
  "E-Commerce":          { dot: "#F59E0B", label: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" },
  "Final Yeatr Project": { dot: "#10B981", label: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
  "Dashboard":           { dot: "#3B82F6", label: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" },
  "default":             { dot: "#6B7280", label: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
};

// ─── Project Card ────────────────────────────────────────────────────────────
const ProjectCard = ({ project, tagColors, index, onOpen }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const accent = CATEGORY_ACCENTS[project.category] || CATEGORY_ACCENTS.default;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07, ease: "easeOut" }}
      onClick={() => onOpen(project)}
      className="group relative flex flex-col h-full cursor-pointer"
      style={{
        borderRadius: 10,
        background: "var(--card-bg, var(--background))",
        border: "1px solid var(--border-color, rgba(0,0,0,0.08))",
        overflow: "hidden",
        transition: "border-color 0.2s ease",
      }}
      whileHover={{ y: -3 }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden" style={{ height: 168, flexShrink: 0, background: "var(--card-bg-secondary, #f5f5f5)" }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          style={{ objectPosition: "top center" }}
        />

        {/* Persistent "clickable" hint — visible even before hover */}
        <div
          className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full transition-all duration-200 group-hover:scale-105"
          style={{ background: "rgba(0,0,0,0.55)", color: "#fff", backdropFilter: "blur(4px)" }}
        >
          <VisibilityIcon style={{ fontSize: 12 }} />
          Details
        </div>

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors duration-250 flex items-center justify-center gap-3">
          <span
            onClick={(e) => { e.stopPropagation(); window.open(getWhatsAppLink(project.title), "_blank", "noopener,noreferrer"); }}
            title="Request source access on WhatsApp"
            className="w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            style={{ background: "rgba(255,255,255,0.9)", color: "#25D366" }}
          >
            <FaWhatsapp size={17} />
          </span>
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: "rgba(255,255,255,0.9)", color: "#171717" }}
          >
            <LaunchIcon style={{ fontSize: 17 }} />
          </Link>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-grow" style={{ padding: "14px 16px 12px" }}>

        {/* Category chip */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${accent.label}`}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent.dot, flexShrink: 0 }} />
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-extrabold leading-snug mb-1.5"
          style={{ fontSize: 15, color: "var(--foreground)", letterSpacing: "-0.01em" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-xs leading-relaxed mb-3 line-clamp-2"
          style={{ color: "var(--nav-text)", fontWeight: 400 }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${
                tagColors[tag] || "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
              }`}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-md border font-medium"
              style={{
                background: "var(--card-bg-secondary)",
                color: "var(--nav-text)",
                borderColor: "var(--border-color)",
              }}
            >
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div
          className="mt-auto flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid var(--border-color, rgba(0,0,0,0.07))" }}
        >
          {/* WhatsApp — request source access */}
          <span
            onClick={(e) => { e.stopPropagation(); window.open(getWhatsAppLink(project.title), "_blank", "noopener,noreferrer"); }}
            className="flex items-center gap-1.5 text-[11px] font-medium transition-opacity duration-200 opacity-50 hover:opacity-100 cursor-pointer"
            style={{ color: "var(--foreground)" }}
          >
            <FaWhatsapp size={13} />
            Request Access
          </span>

          {/* View project */}
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[11px] font-semibold transition-all duration-200 hover:gap-2"
            style={{ color: accent.dot }}
          >
            View Project
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Project Detail Modal ───────────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, onClose]);

  if (!project) return null;
  const accent = CATEGORY_ACCENTS[project.category] || CATEGORY_ACCENTS.default;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(3px)" }}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full sm:max-w-lg md:max-w-xl overflow-y-auto custom-scrollbar"
          style={{
            maxHeight: "92dvh",
            borderRadius: 16,
            background: "var(--card-bg, var(--background))",
            border: "1px solid var(--border-color, rgba(0,0,0,0.08))",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
            style={{ background: "rgba(0,0,0,0.6)", color: "#fff", backdropFilter: "blur(4px)" }}
          >
            <CloseIcon style={{ fontSize: 18 }} />
          </button>

          {/* Image — scales cleanly across breakpoints, keeps full image visible on small screens */}
          <div className="relative w-full h-44 xs:h-48 sm:h-56 md:h-64" style={{ background: "var(--card-bg-secondary, #f5f5f5)" }}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, 576px"
              className="object-cover"
              style={{ objectPosition: "top center" }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>

          {/* Body */}
          <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-5 sm:pb-6">
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${accent.label}`}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent.dot, flexShrink: 0 }} />
                {project.category}
              </span>
              {project.number && (
                <span className="text-[10px] font-mono opacity-40" style={{ color: "var(--foreground)" }}>
                  #{project.number}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold mb-3" style={{ color: "var(--foreground)" }}>
              {project.title}
            </h2>

            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--nav-text)" }}>
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-60" style={{ color: "var(--foreground)" }}>
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 rounded-md border font-medium bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm"
                style={{ background: "var(--primary)", color: "var(--nav-text-hover, #fff)" }}
              >
                <LaunchIcon style={{ fontSize: 16 }} />
                Live Demo
              </Link>
              <button
                onClick={() => window.open(getWhatsAppLink(project.title), "_blank", "noopener,noreferrer")}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm border"
                style={{ borderColor: "#25D366", color: "#25D366" }}
              >
                <FaWhatsapp size={16} />
                Request Source Access
              </button>
            </div>
            <p className="text-[11px] mt-2.5 text-center opacity-50" style={{ color: "var(--nav-text)" }}>
              Source repos are private — message on WhatsApp for access.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
export default function PortfolioClient({
  projects = [],
  tagColors = {},
  categories = [],
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(selectedCategory));

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] py-16 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">

      {/* ── Header ── */}
      <Reveal className="relative text-center mb-10">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-[var(--nav-text)]/20 absolute top-0 left-0 right-0 text-center sm:pt-3 select-none pointer-events-none">
          WORKS
        </h1>
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-center relative z-10 text-[var(--foreground)] pt-2 md:pt-6 lg:pt-8 mb-3">
          MY <span className="text-[var(--primary)]">PORTFOLIO</span>
        </h2>
        <p className="text-sm sm:text-base text-[var(--nav-text)] max-w-xl mx-auto leading-relaxed">
          Explore my recent projects showcasing my skills and expertise in web development.
          Each project represents a unique challenge and solution.
        </p>
      </Reveal>

      {/* ── Filter Pills ── */}
      <Reveal delay={0.1} className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
        {categories.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer transition-colors duration-200"
              style={{
                backgroundColor: active ? "var(--primary)" : "var(--card-bg-secondary, rgba(0,0,0,0.05))",
                color: active ? "var(--nav-text-hover, #fff)" : "var(--foreground)",
                border: active ? "none" : "1px solid var(--border-color, rgba(0,0,0,0.1))",
              }}
            >
              {active && (
                <motion.div
                  layoutId="filter-active-bg"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--primary)" }}
                  transition={{ type: "spring", stiffness: 360, damping: 28 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          );
        })}
      </Reveal>

      {/* ── Project count ── */}
      <Reveal delay={0.15} className="text-center mb-6">
        <span
          className="text-xs font-mono uppercase tracking-widest"
          style={{ color: "var(--nav-text)" }}
        >
          {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          {selectedCategory !== "All" ? ` in ${selectedCategory}` : " total"}
        </span>
      </Reveal>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto mb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                tagColors={tagColors}
                index={index}
                onOpen={setSelectedProject}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-3"
          >
            <span className="text-4xl opacity-20">⬡</span>
            <p className="text-sm" style={{ color: "var(--nav-text)" }}>
              No projects found for &ldquo;{selectedCategory}&rdquo;
            </p>
          </motion.div>
        )}
      </div>

      {/* ── CTA ── */}
      <Reveal delay={0.1}>
        <div
          className="text-center rounded-2xl p-8 sm:p-10 max-w-2xl mx-auto"
          style={{
            background: "var(--card-bg-secondary, rgba(0,0,0,0.03))",
            border: "1px solid var(--border-color, rgba(0,0,0,0.07))",
          }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Interested in working together?</h2>
          <p className="mb-6 text-sm sm:text-base" style={{ color: "var(--nav-text)" }}>
            I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex items-center px-7 py-2.5 rounded-full border border-[var(--primary)] overflow-hidden font-bold text-sm text-[var(--foreground)] hover:text-[var(--nav-text-hover)] cursor-pointer"
              style={{ background: "var(--background)" }}
            >
              <span className="relative z-10 transition-colors duration-300">Get In Touch</span>
              <span className="absolute inset-0 bg-[var(--primary)] translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
            </motion.button>
          </Link>
        </div>
      </Reveal>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}