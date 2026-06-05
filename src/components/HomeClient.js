"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/about"), { ssr: false });

// Typing animation hook
function useTypingAnimation(strings, typeSpeed = 60, backSpeed = 40, pauseTime = 1500) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentString = strings[currentIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentString.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentString.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayText(currentString.slice(0, displayText.length - 1));
        if (displayText.length - 1 === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % strings.length);
        }
      }
    }, isDeleting ? backSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, strings, typeSpeed, backSpeed, pauseTime]);

  return displayText;
}

export default function HomeClient({ skills = [] }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const typingStrings = [
    "Next.js Developer",
    "NestJS Engineer",
    "Full Stack Developer",
    "React Specialist",
    "Backend Architect",
    "Software Engineer",
  ];

  const typedText = useTypingAnimation(typingStrings, 65, 35, 1600);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleAboutModal = () => {
    setShowAboutModal(!showAboutModal);
    if (!showAboutModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
      document.body.style.overflowY = "scroll";
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "scroll";
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div
      className={`min-w-screen flex flex-col lg:flex-row text-[var(--foreground)] overflow-x-hidden transition-all duration-1000 ease-out ${
        isVisible ? "slide-enter" : "opacity-0"
      }`}
    >
      {/* Left side (image + yellow shape) */}
      <div
        className="flex flex-col w-full lg:w-1/2 items-center relative lg:justify-center pt-4 sm:pt-6 md:pt-4 lg:pt-0 pb-2 sm:pb-4 lg:pb-0 lg:h-screen"
        style={{ minHeight: "35vh", height: "auto" }}
      >
        {/* Yellow Skewed Shape - desktop */}
        <div
          className="hidden lg:block absolute"
          style={{
            position: "fixed",
            height: "200%",
            width: "100%",
            transform: "rotate(-15deg)",
            left: "-83%",
            top: "-50%",
            backgroundColor: "var(--primary)",
            zIndex: 1,
            borderRadius: "30px",
          }}
        ></div>

        {/* Yellow Skewed Shape - mobile */}
        <div
          className="lg:hidden absolute top-0 left-0 w-full"
          style={{
            height: "25vh",
            backgroundColor: "var(--primary)",
            zIndex: 1,
            borderBottomRightRadius: "40%",
            borderBottomLeftRadius: "40%",
            transform: "translateY(-30%)",
          }}
        >
          <div
            className="hidden sm:block absolute bottom-0 w-full h-6 bg-[var(--primary)]"
            style={{
              borderBottomRightRadius: "40%",
              borderBottomLeftRadius: "40%",
            }}
          ></div>
        </div>

        {/* Profile Image */}
        <div
          className={`relative mx-auto rounded-full lg:rounded-[30px] w-32 h-32 xs:w-36 xs:h-36 sm:w-48 sm:h-48 md:w-[280px] md:h-[280px] lg:w-[600px] lg:h-[calc(100vh-80px)] xl:w-[650px] overflow-hidden shadow-lg mt-6 sm:mt-8 md:mt-6 lg:mt-0 ${
            isVisible ? "profile-image-animate" : "opacity-0"
          }`}
          style={{
            backgroundImage: "url('/Images/Irfan.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            boxShadow: "0 0 10px rgba(0, 0, 0, .9)",
            zIndex: 11,
          }}
        >
          <Image
            src="/Images/Irfan-Pic.png"
            alt="Profile background"
            fill
            className="object-cover w-full h-full"
            style={{ borderRadius: "inherit" }}
            priority
          />
        </div>
      </div>

      {/* Main content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start lg:justify-center justify-start py-3 px-4 sm:p-6 md:p-8 lg:p-8 mt-2 sm:mt-6 md:mt-4 lg:mt-0 lg:h-screen">
        <div className="text-center lg:text-left space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 max-w-full sm:max-w-md md:max-w-2xl lg:max-w-lg w-full">

          {/* ✅ NEW: Software Engineer Tag - Top */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center lg:justify-start"
          >
            <span
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest uppercase"
              style={{ color: "var(--foreground)", opacity: 0.6 }}
            >
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>&lt;</span>
              Software Engineer
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>/&gt;</span>
            </span>
          </motion.div>

          {/* Name */}
          <h1
            className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl mt-0 overflow-hidden py-1 sm:py-2 font-bold text-[var(--primary)] ${
              isVisible ? "content-title-animate" : "opacity-0"
            } tracking-tight leading-tight`}
          >
            — HI, I'M IRFAN ARSHAD
          </h1>

          {/* ✅ UPDATED: Typing Animation Intro */}
          <p
            className={`text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl text-center sm:text-left text-[var(--foreground)] px-2 sm:px-0 ${
              isVisible ? "content-text-animate" : "opacity-0"
            } leading-relaxed`}
          >
            I'm a{" "}
            <span
              className="font-semibold"
              style={{ color: "var(--primary)" }}
            >
              {typedText}
              {/* Blinking cursor */}
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1.1em",
                  backgroundColor: "var(--primary)",
                  marginLeft: "2px",
                  verticalAlign: "middle",
                  animation: "blink 0.8s step-end infinite",
                }}
              />
            </span>{" "}
            — building scalable, high-performance web applications from frontend to backend.
          </p>

          {/* Tech Stack Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-2 justify-center lg:justify-start"
          >
            {["Next.js", "NestJS", "React", "Node.js", "TypeScript", "Python"].map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2 py-1 rounded"
                style={{
                  border: "1px solid var(--primary)",
                  color: "var(--foreground)",
                  opacity: 0.75,
                  letterSpacing: "0.05em",
                }}
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Button */}
          <button
            onClick={toggleAboutModal}
            className={`group active:scale-95 relative inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-4 lg:px-10 lg:py-3 mt-3 sm:mt-4 md:mt-5 rounded-full border border-[var(--primary)] overflow-hidden transition-all duration-300 text-[var(--foreground)] hover:text-[var(--nav-text-hover)] font-bold text-xs xs:text-sm sm:text-base md:text-lg ${
              isVisible ? "content-button-animate" : "opacity-0"
            }`}
            style={{
              textTransform: "uppercase",
              backgroundColor: "var(--background)",
              width: "auto",
              minWidth: "180px",
              maxWidth: "280px",
            }}
          >
            <span className="relative z-10 about-me-btn whitespace-nowrap pr-8 sm:pr-10 md:pr-12">
              Explore My Work
            </span>
            <span
              className="absolute inset-0 bg-[var(--primary)] translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-300 ease-out z-0"
              aria-hidden="true"
            ></span>
            <span className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-[var(--primary)] rounded-full group-hover:bg-[var(--primary-hover)] group-active:bg-[var(--primary-hover)] transition-colors duration-300 cursor-pointer text-[var(--nav-text-hover)]">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                className="bi bi-arrow-right transition-colors duration-300 text-[var(--nav-text-hover)] sm:w-3 sm:h-3 md:w-4 md:h-4"
                xmlns="http://www.w3.org/2000/svg"
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
          </button>
        </div>
      </div>

      {/* Blinking cursor CSS */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* About Modal */}
      <AnimatePresence mode="wait">
        {showAboutModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-1 xs:p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 bg-black bg-opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div
              className="relative w-full h-full xs:h-auto xs:max-h-[95vh] sm:max-h-[92vh] md:max-h-[90vh] lg:max-h-[88vh] max-w-full xs:max-w-[98vw] sm:max-w-[95vw] md:max-w-3xl lg:max-w-5xl xl:max-w-6xl bg-[var(--background)] rounded-none xs:rounded-lg sm:rounded-xl overflow-hidden shadow-xl"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
            >
              <button
                onClick={toggleAboutModal}
                className="absolute top-2 left-2 xs:top-3 xs:left-3 sm:top-4 sm:left-4 z-50 w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--background)] hover:bg-[var(--primary-hover)] transition-colors touch-manipulation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="overflow-y-auto h-full xs:max-h-[95vh] sm:max-h-[92vh] md:max-h-[90vh] lg:max-h-[88vh] custom-scrollbar p-1 xs:p-2 sm:p-3 md:p-4 lg:p-6 pb-16 xs:pb-20 sm:pb-16 md:pb-12 lg:pb-8 overflow-x-hidden">
                <About skills={skills} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}