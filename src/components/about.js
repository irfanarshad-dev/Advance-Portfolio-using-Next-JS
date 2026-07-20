"use client";
import React from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  SiNextdotjs,
  SiNestjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiPython,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiFlutter,
  SiHtml5,
  SiCss,
  SiDjango,
} from "react-icons/si";

// ── Clean Card (no glow, border + subtle shadow) ───────────────────────────
const Card = ({ children, className = "", style = {} }) => (
  <div
    className={`card-base ${className}`}
    style={{
      position: "relative",
      borderRadius: 14,
      border: "1px solid var(--card-border, rgba(0,0,0,0.1))",
      background: "var(--card-bg, var(--background))",
      boxShadow: "0 2px 16px 0 rgba(0,0,0,0.06)",
      overflow: "hidden",
      transition: "box-shadow 0.3s ease, transform 0.3s ease",
      ...style,
    }}
  >
    {children}
    <style jsx>{`
      .card-base:hover {
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.12);
      }
      /* dark mode border */
      .dark .card-base,
      [data-theme="dark"] .card-base {
        border-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.3);
      }
      .dark .card-base:hover,
      [data-theme="dark"] .card-base:hover {
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
      }
      @media (prefers-color-scheme: dark) {
        .card-base {
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.3);
        }
        .card-base:hover {
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
        }
      }
    `}</style>
  </div>
);

// ── Skill icon map (brand colors kept for recognition) ─────────────────────
const SkillIconMap = {
  "Next.js": <SiNextdotjs size={26} />,
  NestJS: <SiNestjs size={26} color="#E0234E" />,
  React: <SiReact size={26} color="#61DAFB" />,
  TypeScript: <SiTypescript size={26} color="#3178C6" />,
  "Node.js": <SiNodedotjs size={26} color="#83CD29" />,
  MongoDB: <SiMongodb size={26} color="#47A248" />,
  Tailwind: <SiTailwindcss size={26} color="#38BDF8" />,
  Python: <SiPython size={26} color="#3776AB" />,
  MySQL: <SiMysql size={26} color="#00618A" />,
  PostgreSQL: <SiPostgresql size={26} color="#336791" />,
  Firebase: <SiFirebase size={26} color="#FFCA28" />,
  Flutter: <SiFlutter size={26} color="#54C5F8" />,
  HTML: <SiHtml5 size={26} color="#E44D26" />,
  CSS: <SiCss size={26} color="#1572B6" />,
  Django: <SiDjango size={26} color="#092E20" />,
};

// ── Skill Card ─────────────────────────────────────────────────────────────
const SkillCard = ({ skill, index }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -5,
        scale: 1.07,
        transition: { duration: 0.18, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.96 }}
    >
      <Card>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 7,
            padding: "16px 10px",
          }}
        >
          <div style={{ lineHeight: 1 }}>
            {SkillIconMap[skill] || <span style={{ fontSize: 24 }}>⬡</span>}
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--foreground)",
              textAlign: "center",
            }}
          >
            {skill}
          </span>
        </div>
      </Card>
    </motion.div>
  );
};

// ── Timeline icon wrapper — always visible on both modes ───────────────────
const TimelineDot = ({ icon }) => (
  <div
    className="timeline-dot"
    style={{
      position: "absolute",
      left: -34,
      top: 12,
      width: 32,
      height: 32,
      borderRadius: "50%",
      border: "2px solid var(--primary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
    }}
  >
    {icon}
    <style jsx>{`
      /* light mode: dark bg so icon (which uses currentColor / fixed colours) is visible */
      .timeline-dot {
        background: #1a1a2e;
      }
      /* dark mode: keep same dark bg */
      .dark .timeline-dot,
      [data-theme="dark"] .timeline-dot {
        background: #1a1a2e;
      }
      @media (prefers-color-scheme: dark) {
        .timeline-dot {
          background: #1a1a2e;
        }
      }
    `}</style>
  </div>
);

// ── Timeline Entry with clean Card ────────────────────────────────────────
const TimelineEntry = ({ item, index }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24, scale: 0.97 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ position: "relative" }}
    >
      <TimelineDot icon={item.icon} />
      <motion.div
        whileHover={{
          y: -3,
          scale: 1.015,
          transition: { duration: 0.18, ease: "easeOut" },
        }}
        whileTap={{ scale: 0.99 }}
      >
        <Card>
          <div className="p-4 sm:p-5">
            <p className="text-xs sm:text-sm font-semibold text-[var(--primary)] uppercase tracking-wider">
              {item.year}
            </p>
            <h4 className="text-base sm:text-lg font-bold mt-1">
              {item.title}{" "}
              <span className="text-sm font-normal text-[var(--nav-text)]">
                {item.subtitle}
              </span>
            </h4>
            <p className="text-sm text-[var(--nav-text)] mt-2 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// ── Scroll-triggered section wrapper ──────────────────────────────────────
const ScrollSection = ({ children, delay = 0, className = "" }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────
const About = () => {
  const skillData = [
    "Next.js",
    "NestJS",
    "React",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Tailwind",
    "Python",
    "MySQL",
    "PostgreSQL",
    "Firebase",
    "Flutter",
    "HTML",
    "CSS",
    "Django",
  ];

  // Icons — white colour so they're visible on the dark dot bg
  const iconWeb = (
    <svg
      style={{ width: 16, height: 16, color: "#fff" }}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
        clipRule="evenodd"
      />
    </svg>
  );
  const iconMobile = (
    <svg
      style={{ width: 16, height: 16, color: "#fff" }}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-3.76 0-7.17-.83-10-2.308z" />
    </svg>
  );
  const iconEdu = (
    <svg
      style={{ width: 16, height: 16, color: "#fff" }}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
    </svg>
  );

  const expItems = [
    {
      year: "2022 - PRESENT",
      title: "WEB DEVELOPER",
      subtitle: "— FULLSTACK",
      desc: "Skilled Full-Stack Web Developer with hands-on experience building responsive, high-performance web apps using Next.js, NestJS, Tailwind CSS, MongoDB, MySQL, and Firebase.",
      icon: iconWeb,
    },
    {
      year: "2023 - PRESENT",
      title: "MOBILE FRONTEND DEVELOPER",
      subtitle: "— UI/UX DESIGNER",
      desc: "Specialize in building visually appealing, performance-optimized mobile apps using Flutter. Crafting clean UI/UX designs for seamless Android & iOS experiences.",
      icon: iconMobile,
    },
  ];

  const eduItems = [
    {
      year: "2023 - PRESENT",
      title: "AI",
      subtitle: "— Integration",
      desc: "Growing experience integrating AI-powered tools into modern apps. Using AI-based APIs for chatbots, data analysis, and ML workflows in Python to create intelligent digital products.",
      icon: iconMobile,
    },
    {
      year: "2022 - 2026",
      title: "BACHELOR DEGREE",
      subtitle: "— SUPERIOR UNIVERSITY LAHORE",
      desc: "Pursuing BSSE from Superior University, Lahore – Gold Campus. Strong foundation in software development, database management, web development, and software design.",
      icon: iconEdu,
    },
  ];

  // page-transition variants (used at top level)
  const pageVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -16,
      transition: { duration: 0.35, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="about-page"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ overflow: "hidden" }}
      >
        <section className="w-full bg-[var(--background)] text-[var(--foreground)] py-20 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4 lg:px-[100px]">
          <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            {/* ── Header ── */}
            <ScrollSection
              delay={0}
              className="relative mb-8 sm:mb-12 md:mb-16"
            >
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-[var(--nav-text)]/20 absolute top-0 left-0 right-0 text-center sm:pt-3 select-none">
                RESUME
              </h1>
              <h2 className="text-3xl md:text-3xl lg:text-6xl font-extrabold text-center relative z-10 text-[var(--foreground)] pt-2 md:pt-6 lg:pt-8 secondary-heading">
                ABOUT <span className="text-yellow-300">ME</span>
              </h2>
              {/* mobile profile pic */}
              <motion.div
                className="sm:hidden mx-auto mt-6 rounded-2xl border-2 border-[var(--primary)] shadow-md"
                style={{ width: 160, overflow: "hidden" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Image
                  src="/Images/Irfan-Pic.png"
                  alt="Profile"
                  width={160}
                  height={213}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>
            </ScrollSection>

            {/* ── Personal Info + Stats ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
              {/* Personal Info Card */}
              <ScrollSection delay={0.1}>
                <motion.div
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Card>
                    <div className="p-5 sm:p-6 md:p-8">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5">
                        PERSONAL INFOS
                      </h3>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                        {[
                          { label: "First Name", value: "Irfan" },
                          { label: "Last Name", value: "Arshad" },
                          { label: "Age", value: "22 Years" },
                          { label: "Nationality", value: "Pakistani" },
                          { label: "Address", value: "Lahore, Pakistan" },
                          { label: "Languages", value: "Urdu & English" },
                        ].map(({ label, value }) => (
                          <p
                            key={label}
                            className="mb-2 text-xs sm:text-sm md:text-base"
                          >
                            <span className="font-bold">{label}:</span>{" "}
                            <span className="text-[var(--nav-text)]">
                              {value}
                            </span>
                          </p>
                        ))}
                        <p className="mb-2 text-xs sm:text-sm md:text-base">
                          <span className="font-bold">Freelance:</span>{" "}
                          <span className="text-green-500 font-medium">
                            ● Available
                          </span>
                        </p>
                        <p className="mb-2 text-xs sm:text-sm md:text-base">
                          <span className="font-bold block sm:inline">
                            Phone:
                          </span>{" "}
                          <Link
                            href="tel:+923221649011"
                            className="text-[var(--primary)] hover:underline inline-flex items-center group"
                          >
                            <span className="truncate">+92 322 1649011</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 ml-1 group-hover:rotate-12 transition-transform duration-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                          </Link>
                        </p>
                        <p className="mb-2 text-xs sm:text-sm md:text-base col-span-2">
                          <span className="font-bold block sm:inline">
                            Email:
                          </span>{" "}
                          <Link
                            href="mailto:chirfanarshad1@gmail.com"
                            className="text-[var(--primary)] hover:underline inline-flex items-center group"
                          >
                            <span className="truncate">
                              chirfanarshad1@gmail.com
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 ml-1 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </Link>
                        </p>
                      </div>
                      <div className="mt-4 sm:mt-6">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            href="https://drive.google.com/file/d/1HURyAX5G8zvnty1o9FuLWDn22KhlRy4X/view?usp=drive_link"
                            className="group active:scale-95 relative inline-flex items-center justify-center px-4 py-2 xs:px-6 xs:py-2.5 sm:px-8 sm:py-3 rounded-full border border-[var(--primary)] overflow-hidden transition-all duration-300 text-[var(--foreground)] hover:text-[var(--nav-text-hover)] font-bold text-xs xs:text-sm sm:text-base"
                            style={{
                              textTransform: "uppercase",
                              backgroundColor: "var(--background)",
                              minWidth: "160px",
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="relative z-10 whitespace-nowrap pr-8 sm:pr-10">
                              Download CV
                            </span>
                            <span
                              className="absolute inset-0 bg-[var(--primary)] translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"
                              aria-hidden="true"
                            />
                            <span className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-[var(--primary)] rounded-full group-hover:bg-[var(--primary-hover)] transition-colors duration-300 text-[var(--nav-text-hover)]">
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M5 12h12M13 6l6 6-6 6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </ScrollSection>

              {/* Stats Cards */}
              <ScrollSection
                delay={0.2}
                className="flex justify-center items-center"
              >
                <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-md">
                  {[
                    { num: "04", label: "YEARS OF\nEXPERIENCE", delay: 0.25 },
                    { num: "10", label: "COMPLETED\nPROJECTS", delay: 0.35 },
                  ].map(({ num, label, delay: d }) => (
                    <ScrollSection key={label} delay={d}>
                      <motion.div
                        whileHover={{
                          y: -5,
                          scale: 1.04,
                          transition: { duration: 0.18, ease: "easeOut" },
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Card>
                          <div className="p-4 sm:p-6 md:p-8 text-center">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--primary)] pt-4 sm:pt-6">
                              {num}
                              <span className="text-lg sm:text-xl md:text-2xl">
                                +
                              </span>
                            </h3>
                            <div className="w-8 sm:w-10 h-1 bg-[var(--primary)] mx-auto my-2 rounded-full" />
                            <p
                              className="uppercase font-semibold text-xs sm:text-sm leading-tight text-[var(--nav-text)]"
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {label}
                            </p>
                          </div>
                        </Card>
                      </motion.div>
                    </ScrollSection>
                  ))}
                </div>
              </ScrollSection>
            </div>

            {/* ── Skills ── */}
            <ScrollSection delay={0} className="mt-16 md:mt-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-[var(--foreground)] mb-10 md:mb-14 secondary-heading">
                MY SKILLS
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
                {skillData.map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} />
                ))}
              </div>
            </ScrollSection>

            {/* ── Experience & Education ── */}
            <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
              {/* Experience */}
              <ScrollSection delay={0}>
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
                  EXPERIENCE
                </h3>
                <div className="relative border-l-2 border-[var(--primary)] pl-8 space-y-6">
                  <span className="absolute -left-[5px] top-0 w-[10px] h-[10px] rounded-full bg-[var(--primary)]" />
                  {expItems.map((item, i) => (
                    <TimelineEntry key={i} item={item} index={i} />
                  ))}
                </div>
              </ScrollSection>

              {/* Education */}
              <ScrollSection delay={0.1}>
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
                  EDUCATION
                </h3>
                <div className="relative border-l-2 border-[var(--primary)] pl-8 space-y-8">
                  <span className="absolute -left-[5px] top-0 w-[10px] h-[10px] rounded-full bg-[var(--primary)]" />
                  {eduItems.map((item, i) => (
                    <TimelineEntry key={i} item={item} index={i} />
                  ))}
                </div>
              </ScrollSection>
            </div>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
};

export default About;
