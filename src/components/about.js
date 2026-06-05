"use client"
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Animated border card wrapper
const AnimatedBorderCard = ({ children, className = "", speed = "3s", reverse = false, style = {} }) => {
  return (
    <div
      className={`animated-border-card ${className}`}
      style={{
        position: "relative",
        borderRadius: "14px",
        padding: "1px",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        className="animated-border-spinner"
        style={{
          position: "absolute",
          inset: "-100%",
          background: "conic-gradient(from 0deg, transparent 55%, var(--primary) 75%, transparent 100%)",
          animation: `${reverse ? "spin-reverse" : "spin-border"} ${speed} linear infinite`,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "13px",
          background: "var(--background)",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
      <style jsx>{`
        @keyframes spin-border {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

// Skill Card with animated border
const SkillCard = ({ skill, icon, level, speed = "3s", reverse = false }) => {
  const levelColors = {
    Expert: { bg: "#FFF3CC", text: "#7A5C00" },
    Advanced: { bg: "#E8F5E9", text: "#2E7D32" },
    Intermediate: { bg: "#E3F2FD", text: "#1565C0" },
  };
  const colors = levelColors[level] || levelColors["Intermediate"];

  return (
    <AnimatedBorderCard speed={speed} reverse={reverse}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          padding: "14px 16px",
          minWidth: "80px",
        }}
      >
        <span style={{ fontSize: "24px", color: "var(--primary)" }}>{icon}</span>
        <span style={{ fontSize: "12px", color: "var(--foreground)", fontWeight: 500 }}>{skill}</span>
        <span
          style={{
            fontSize: "10px",
            padding: "2px 8px",
            borderRadius: "10px",
            background: colors.bg,
            color: colors.text,
            fontWeight: 500,
          }}
        >
          {level}
        </span>
      </div>
    </AnimatedBorderCard>
  );
};

const About = ({ skills = [] }) => {

  const fadeIn = {
    hidden: { opacity: 0, y: 18, scale: 0.97 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: custom,
        duration: 0.7,
        type: "spring",
        stiffness: 80,
        damping: 16,
        mass: 0.9,
      },
    }),
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  // Skill data with icons and levels
  const skillData = [
    { skill: "Next.js",     icon: "▲", level: "Expert",       speed: "3s",   reverse: false },
    { skill: "NestJS",      icon: "🔧", level: "Advanced",     speed: "4s",   reverse: true  },
    { skill: "React",       icon: "⚛", level: "Expert",       speed: "3.5s", reverse: false },
    { skill: "TypeScript",  icon: "TS", level: "Advanced",     speed: "5s",   reverse: true  },
    { skill: "Node.js",     icon: "⬡", level: "Expert",       speed: "2.5s", reverse: false },
    { skill: "MongoDB",     icon: "🍃", level: "Advanced",     speed: "4.5s", reverse: true  },
    { skill: "Tailwind",    icon: "🌊", level: "Expert",       speed: "3.2s", reverse: false },
    { skill: "Python",      icon: "🐍", level: "Intermediate", speed: "3.8s", reverse: true  },
    { skill: "MySQL",       icon: "🐬", level: "Advanced",     speed: "4.2s", reverse: false },
    { skill: "PostgreSQL",  icon: "🐘", level: "Intermediate", speed: "3s",   reverse: true  },
    { skill: "Firebase",    icon: "🔥", level: "Intermediate", speed: "4s",   reverse: false },
    { skill: "Flutter",     icon: "💙", level: "Intermediate", speed: "3.5s", reverse: true  },
    { skill: "HTML",        icon: "🧡", level: "Expert",       speed: "2.8s", reverse: false },
    { skill: "CSS",         icon: "💅", level: "Expert",       speed: "4.5s", reverse: true  },
    { skill: "Django",      icon: "🎸", level: "Intermediate", speed: "3.3s", reverse: false },
  ];

  return (
    <section className="w-full bg-[var(--background)] text-[var(--foreground)] py-8 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4 lg:px-[100px]">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="relative mb-8 sm:mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-[var(--nav-text)]/20 absolute top-0 left-0 right-0 text-center sm:pt-3">
            RESUME
          </h1>
          <h2 className="text-3xl md:text-3xl lg:text-6xl font-extrabold text-center relative z-10 text-[var(--foreground)] pt-2 md:pt-6 lg:pt-8 secondary-heading">
            ABOUT <span className="text-yellow-300">ME</span>
          </h2>
          <motion.div
            className="sm:hidden mx-auto mt-6 relative w-24 h-24 xs:w-28 xs:h-28 rounded-full overflow-hidden border-3 border-[var(--primary)] shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Image src="/Images/Irfan.png" alt="Profile" fill className="object-cover" priority />
          </motion.div>
        </motion.div>

        {/* Personal Info + Stats */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Personal Info Card — animated border slow */}
          <motion.div variants={fadeIn}>
            <AnimatedBorderCard speed="6s" reverse={false}>
              <div className="p-5 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5">
                  PERSONAL INFOS
                </h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    { label: "First Name", value: "Irfan" },
                    { label: "Last Name",  value: "Arshad" },
                    { label: "Age",        value: "22 Years" },
                    { label: "Nationality",value: "Pakistani" },
                    { label: "Address",    value: "Lahore, Pakistan" },
                    { label: "Languages",  value: "Urdu & English" },
                  ].map(({ label, value }) => (
                    <p key={label} className="mb-2 text-xs sm:text-sm md:text-base">
                      <span className="font-bold">{label}:</span>{" "}
                      <span className="text-[var(--nav-text)]">{value}</span>
                    </p>
                  ))}

                  <p className="mb-2 text-xs sm:text-sm md:text-base">
                    <span className="font-bold">Freelance:</span>{" "}
                    <span className="text-green-500 font-medium">● Available</span>
                  </p>

                  <p className="mb-2 text-xs sm:text-sm md:text-base">
                    <span className="font-bold block sm:inline">Phone:</span>{" "}
                    <Link href="tel:+923221649011" className="text-[var(--primary)] hover:underline transition-all duration-300 inline-flex items-center group">
                      <span className="truncate">+92 322 1649011</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </Link>
                  </p>

                  <p className="mb-2 text-xs sm:text-sm md:text-base col-span-2">
                    <span className="font-bold block sm:inline">Email:</span>{" "}
                    <Link href="mailto:chirfanarshad1@gmail.com" className="text-[var(--primary)] hover:underline transition-all duration-300 inline-flex items-center group">
                      <span className="truncate">chirfanarshad1@gmail.com</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </Link>
                  </p>
                </div>

                {/* Download CV */}
                <div className="mt-4 sm:mt-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="https://drive.google.com/file/d/1HURyAX5G8zvnty1o9FuLWDn22KhlRy4X/view?usp=drive_link"
                      className="group active:scale-95 relative inline-flex items-center justify-center px-4 py-2 xs:px-6 xs:py-2.5 sm:px-8 sm:py-3 rounded-full border border-[var(--primary)] overflow-hidden transition-all duration-300 text-[var(--foreground)] hover:text-[var(--nav-text-hover)] font-bold text-xs xs:text-sm sm:text-base"
                      style={{ textTransform: "uppercase", backgroundColor: "var(--background)", minWidth: "160px" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="relative z-10 whitespace-nowrap pr-8 sm:pr-10">Download CV</span>
                      <span className="absolute inset-0 bg-[var(--primary)] translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" aria-hidden="true"></span>
                      <span className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-[var(--primary)] rounded-full group-hover:bg-[var(--primary-hover)] transition-colors duration-300 text-[var(--nav-text-hover)]">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </AnimatedBorderCard>
          </motion.div>

          {/* Stats Cards — animated border reverse */}
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-md">
              <AnimatedBorderCard speed="4s" reverse={false}>
                <motion.div
                  className="p-4 sm:p-6 md:p-8 rounded-xl text-center"
                  variants={fadeIn}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--primary)] pt-4 sm:pt-6">
                    04<span className="text-lg sm:text-xl md:text-2xl">+</span>
                  </h3>
                  <div className="w-8 sm:w-10 h-1 bg-[var(--primary)] mx-auto my-2 rounded-full"></div>
                  <p className="uppercase font-semibold text-xs sm:text-sm leading-tight text-[var(--nav-text)]">
                    YEARS OF<br />EXPERIENCE
                  </p>
                </motion.div>
              </AnimatedBorderCard>

              <AnimatedBorderCard speed="4s" reverse={true}>
                <motion.div
                  className="p-4 sm:p-6 md:p-8 rounded-xl text-center"
                  variants={fadeIn}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--primary)] pt-4 sm:pt-6">
                    10<span className="text-lg sm:text-xl md:text-2xl">+</span>
                  </h3>
                  <div className="w-8 sm:w-10 h-1 bg-[var(--primary)] mx-auto my-2 rounded-full"></div>
                  <p className="uppercase font-semibold text-xs sm:text-sm leading-tight text-[var(--nav-text)]">
                    COMPLETED<br />PROJECTS
                  </p>
                </motion.div>
              </AnimatedBorderCard>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="mt-16 md:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="relative mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center relative z-10 text-[var(--foreground)] pt-4 secondary-heading">
              MY SKILLS
            </h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
            {skillData.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                custom={index * 0.05}
                whileHover={{ scale: 1.05 }}
              >
                <SkillCard
                  skill={item.skill}
                  icon={item.icon}
                  level={item.level}
                  speed={item.speed}
                  reverse={item.reverse}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience & Education */}
        <motion.div
          className="mt-16 md:mt-20 px-4 sm:px-6 md:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="relative mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center relative z-10 text-[var(--foreground)] pt-4 secondary-heading">
              EXPERIENCE & EDUCATION
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {/* Experience Column */}
            <div className="space-y-8">
              {[
                {
                  year: "2022 - PRESENT",
                  title: "WEB DEVELOPER",
                  subtitle: "— FULLSTACK",
                  desc: "Skilled Full-Stack Web Developer with hands-on experience building responsive, high-performance web apps using Next.js, NestJS, Tailwind CSS, MongoDB, MySQL, and Firebase.",
                  icon: (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--nav-text-hover)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                  ),
                  speed: "5s",
                  reverse: false,
                },
                {
                  year: "2023 - PRESENT",
                  title: "MOBILE FRONTEND DEVELOPER",
                  subtitle: "— UI/UX DESIGNER",
                  desc: "Specialize in building visually appealing, performance-optimized mobile apps using Flutter. Crafting clean UI/UX designs for seamless Android & iOS experiences.",
                  icon: (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--nav-text-hover)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-3.76 0-7.17-.83-10-2.308z" />
                    </svg>
                  ),
                  speed: "4s",
                  reverse: true,
                },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeIn} custom={i * 0.1}>
                  <AnimatedBorderCard speed={item.speed} reverse={item.reverse}>
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[var(--nav-text)]">{item.year}</div>
                          <h3 className="text-sm sm:text-base md:text-lg font-bold leading-tight">
                            {item.title}{" "}
                            <span className="text-[var(--nav-text)]">{item.subtitle}</span>
                          </h3>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--nav-text)] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </AnimatedBorderCard>
                </motion.div>
              ))}
            </div>

            {/* Education Column */}
            <div className="space-y-8">
              {[
                {
                  year: "2023 - PRESENT",
                  title: "AI",
                  subtitle: "— Integration",
                  desc: "Growing experience integrating AI-powered tools into modern apps. Using AI-based APIs for chatbots, data analysis, and ML workflows in Python to create intelligent digital products.",
                  icon: (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--nav-text-hover)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-3.76 0-7.17-.83-10-2.308z" />
                    </svg>
                  ),
                  speed: "4.5s",
                  reverse: false,
                },
                {
                  year: "2022 - 2026",
                  title: "BACHELOR DEGREE",
                  subtitle: "— SUPERIOR UNIVERSITY LAHORE",
                  desc: "Pursuing BSSE from Superior University, Lahore – Gold Campus. Strong foundation in software development, database management, web development, and software design.",
                  icon: (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  ),
                  speed: "3.5s",
                  reverse: true,
                },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeIn} custom={i * 0.1}>
                  <AnimatedBorderCard speed={item.speed} reverse={item.reverse}>
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[var(--nav-text)]">{item.year}</div>
                          <h3 className="text-sm sm:text-base md:text-lg font-bold leading-tight">
                            {item.title}{" "}
                            <span className="text-[var(--nav-text)]">{item.subtitle}</span>
                          </h3>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--nav-text)] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </AnimatedBorderCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;