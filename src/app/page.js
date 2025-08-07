"use client";
import Image from "next/image";
import Navbar from "@/components/navbar";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

// Dynamically import the About component with SSR disabled
const About = dynamic(() => import("@/components/about"), { ssr: false });

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleAboutModal = () => {
    setShowAboutModal(!showAboutModal);
    // Prevent body scrolling when modal is open
    if (!showAboutModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row text-[var(--foreground)] overflow-x-hidden overflow-y-auto transition-all duration-1000 ease-out ${
        isVisible ? 'slide-enter' : 'opacity-0'
      }`}
    >

      {/* Left side (image + yellow shape) */}
      <div
        className="flex flex-col w-full md:w-1/2 items-center relative md:justify-center pt-6 sm:pt-8 md:pt-4 lg:pt-0 pb-0 md:pb-0"
        style={{ minHeight: "30vh", height: "auto" }}
      >
        {/* Yellow Skewed Shape - desktop and tablet landscape */}
        <div
          className="hidden md:block absolute"
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
        
        {/* Yellow Skewed Shape - mobile and tablet portrait */}
        <div
          className="md:hidden absolute top-0 left-0 w-full"
          style={{
            height: "30vh",
            backgroundColor: "var(--primary)",
            zIndex: 1,
            borderBottomRightRadius: "40%",
            borderBottomLeftRadius: "40%",
            transform: "translateY(-40%)",
          }}
        >
          <div className="hidden sm:block absolute bottom-0 w-full h-8 bg-[var(--primary)]" style={{ borderBottomRightRadius: "40%", borderBottomLeftRadius: "40%" }}></div>
        </div>
        {/* Profile Image Container */}
        <div
          className={`
            relative mx-auto
            rounded-full md:rounded-[30px]
            w-40 h-40 sm:w-60 sm:h-60 md:w-[300px] md:h-[300px] lg:w-[600px] lg:h-[calc(100vh-80px)] xl:w-[650px]
            overflow-hidden
            shadow-lg
            mt-10 sm:mt-12 md:mt-8 lg:mt-0
            ${isVisible ? 'profile-image-animate' : 'opacity-0'}
          `}
          style={{
            backgroundImage: "url('/Images/Irfan.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            boxShadow: "0 0 10px rgba(0, 0, 0, .9)",
            zIndex: 11,
          }}
        >
          <Image
            src="/Images/Irfan.png"
            alt="Profile background"
            fill
            className="object-cover w-full h-full"
            style={{
              borderRadius: "inherit",
            }}
            priority
          />
        </div>
      </div>

      {/* Main content (centered on right, or under image on mobile/tablet) */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start md:justify-center justify-start py-2 sm:p-6 md:p-5 lg:p-8 mt-0 sm:mt-10 md:mt-0 lg:mt-0">
        <div className="text-center md:text-left space-y-4 sm:space-y-5 md:space-y-5 sm:px-6 md:px-6 lg:px-12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg md:mx-0 w-full">
          <h1 className={`text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl mt-10 py-2 font-bold text-[var(--primary)] ${isVisible ? 'content-title-animate' : 'opacity-0'} tracking-tight leading-tight`}>
            — I&#39;M IRFAN ARSHAD
          </h1>
          <p className={`text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-justify text-[var(--foreground)] m-2 sm:mb-3 md:mb-4 ${isVisible ? 'content-text-animate' : 'opacity-0'}`}>
            I&#39;m a <span className="text-[var(--primary)] font-semibold">Full Stack Developer</span> with expertise in creating responsive and user-friendly web applications. I specialize in React, Next.js, and Node.js, and I'm passionate about building innovative solutions that solve real-world problems.
          </p>
          <button
            onClick={toggleAboutModal}
            className={`group relative inline-flex items-center justify-center sm:px-6 sm:py-2.5 md:px-8 md:py-3 lg:px-10 lg:py-3 mt-4 sm:mt-5 md:mt-6 rounded-full border border-[var(--primary)] overflow-hidden transition-colors duration-300 text-[var(--foreground)] hover:text-[var(--nav-text-hover)] font-bold text-sm sm:text-base md:text-lg ${isVisible ? 'content-button-animate' : 'opacity-0'}`}
            style={{ textTransform: "uppercase", backgroundColor: 'var(--background)', width: 'auto', minWidth: '200px', maxWidth: '100%' }}
          >
            <span className="relative z-10 about-me-btn">More About Me</span>
            {/* Animated yellow background */}
            <span
              className="absolute inset-0 bg-[var(--primary)] translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"
              aria-hidden="true"
            ></span>
            {/* Forward arrow circle */}
            <span className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[var(--primary)] rounded-full group-hover:bg-[var(--primary-hover)] transition-colors duration-300 cursor-pointer group-hover:text-[var(--nav-text-hover)]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                className="bi bi-arrow-right transition-colors duration-300 text-[var(--nav-text-hover)] sm:w-4 sm:h-4 md:w-5 md:h-5"
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
        {/* Show Navbar at bottom for mobile only */}
        <div className="md:hidden w-full mt-8 sm:mt-10">
          <Navbar />
        </div>
      </div>
      
      {/* About Modal */}
      <AnimatePresence>
        {showAboutModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 bg-black bg-opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[85vh] sm:max-h-[90vh] bg-[var(--background)] rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close button */}
              <button 
                onClick={toggleAboutModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--background)] hover:bg-[var(--primary-hover)] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Scrollable content container */}
              <div className="overflow-y-auto max-h-[85vh] sm:max-h-[90vh] custom-scrollbar p-3 sm:p-4 md:p-6">
                <About />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
