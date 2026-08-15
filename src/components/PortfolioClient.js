"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import LaunchIcon from "@mui/icons-material/Launch";

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
      {/* ── Colored top accent bar ── */}
      <div
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${accent.dot}, ${accent.dot}00)`,
          width: "100%",
          flexShrink: 0,
        }}
      />

      {/* ── Image with hover overlay ── */}
      <div className="relative overflow-hidden" style={{ height: 200, flexShrink: 0, background: "var(--card-bg-secondary, #f5f5f5)" }}>
        <motion.div
          className="w-full h-full relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            style={{ objectPosition: "top center" }}
          />
        </motion.div>

        {/* gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)",
            opacity: 0,
          }}
          // CSS class handles opacity — we use group-hover via tailwind below
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />

        {/* Number badge — top-left */}
        <div
          className="absolute top-3 left-3 z-10"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "monospace",
            letterSpacing: "0.08em",
            padding: "3px 9px",
            borderRadius: 20,
          }}
        >
          {project.number}
        </div>

        {/* Live badge — top-right */}
        <div
          className="absolute top-10 right-3 z-10 flex items-center gap-1.5"
          style={{
            background: "rgba(16,185,129,0.18)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(16,185,129,0.45)",
            color: "#10B981",
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 9px",
            borderRadius: 20,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981", animation: "pulse 2s infinite", display: "inline-block" }} />
          Live
        </div>

        {/* Action buttons — appear on hover, centered */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <Link href={project.github} target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "50%",
                padding: 10,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <GitHubIcon style={{ fontSize: 20 }} />
            </motion.div>
          </Link>
          <Link href={project.demo} target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "50%",
                padding: 10,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <LaunchIcon style={{ fontSize: 20 }} />
            </motion.div>
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
          {/* GitHub micro-link */}
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-medium transition-opacity duration-200 opacity-50 hover:opacity-100"
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