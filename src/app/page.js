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
      className={`min-h-screen flex flex-col lg:flex-row text-[var(--foreground)] overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? 'slide-enter' : 'opacity-0'
      }`}
    >

      {/* Left side (image + yellow shape) */}
      <div
        className="flex flex-col w-full lg:w-1/2 items-center relative lg:justify-center pt-6 lg:pt-0 pb-0 lg:pb-0"
        style={{ minHeight: "35vh", height: "auto" }}
      >
        {/* Yellow Skewed Shape - only on desktop */}
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
        
        {/* Yellow Skewed Shape - mobile version */}
        <div
          className="lg:hidden absolute top-0 left-0 w-full"
          style={{
            height: "30vh",
            backgroundColor: "var(--primary)",
            zIndex: 1,
            borderBottomRightRadius: "40%",
            borderBottomLeftRadius: "40%",
            transform: "translateY(-40%)",
          }}
        ></div>
        {/* Profile Image Container */}
        <div
          className={`
            relative mx-auto
            ${"lg:rounded-[30px] rounded-full"}
            ${"lg:w-[600px] w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:h-[calc(100vh-80px)]"}
            overflow-hidden
            shadow-lg
            mt-10 sm:mt-12 md:mt-16 lg:mt-0
            ${isVisible ? 'profile-image-animate' : 'opacity-0'}
          `}
          style={{
            backgroundImage: "url('/Images/Irfan.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
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
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:justify-center justify-start lg:p-8 p-0 mt-8 sm:mt-10 lg:mt-0">
        <div className="text-center lg:text-left space-y-4 sm:space-y-5 pt-4 px-4 sm:px-8 lg:px-12 max-w-lg mx-auto lg:mx-0">
          <h1 className={`text-3xl sm:text-9xl md:text-4xl lg:text-4xl font-bold text-[var(--primary)] ${isVisible ? 'content-title-animate' : 'opacity-0'}`}>
            — I&#39;M IRFAN ARSHAD
          </h1>
          <p className={`text-xl text-justify sm:text-base md:text-4xl md:text-justify lg:text-xl text-[var(--foreground)] mb-2 sm:mb-4 ${isVisible ? 'content-text-animate' : 'opacity-0'}`}>
            I&#39;m a <span style={{ color: "var(--primary)" }}>Full Stack Developer</span> with expertise in creating responsive and user-friendly web applications. I specialize in React, Next.js, and Node.js, and I'm passionate about building innovative solutions that solve real-world problems.
          </p>
          <button
            onClick={toggleAboutModal}
            className={`group relative inline-flex items-center px-2 mx-0 sm:px-8 md:px-10 pt-10 mt-5 sm:py-3 rounded-full border border-[var(--primary)] overflow-hidden transition-colors duration-300 text-[var(--foreground)] hover:text-[var(--nav-text-hover)] font-bold text-[16px] sm:text-sm ${isVisible ? 'content-button-animate' : 'opacity-0'}`}
            style={{ textTransform: "uppercase", backgroundColor: 'var(--background)', width: '50%',}}
          >
            <span className="relative z-10 about-me-btn">More About Me</span>
            {/* Animated yellow background */}
            <span
              className="absolute inset-0 bg-[var(--primary)] translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"
              aria-hidden="true"
            ></span>
            {/* Forward arrow circle */}
            <span className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 sm:w-10 h-9 sm:h-10 bg-[var(--primary)] rounded-full group-hover:bg-[var(--primary-hover)] transition-colors duration-300 cursor-pointer group-hover:text-[var(--nav-text-hover)]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="bi bi-arrow-right transition-colors duration-300 text-[var(--nav-text-hover)] sm:w-5 sm:h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12h12M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="6_"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
        {/* Show Navbar at bottom for mobile/tablet */}
        <div className="lg:hidden w-full mt-10 sm:mt-14">
          <Navbar />
        </div>
      </div>
      
      {/* About Modal */}
      <AnimatePresence>
        {showAboutModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black bg-opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="relative w-full max-w-5xl max-h-[90vh] bg-[var(--background)] rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close button */}
              <button 
                onClick={toggleAboutModal}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--background)] hover:bg-[var(--primary-hover)] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Scrollable content container */}
              <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                <About />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
