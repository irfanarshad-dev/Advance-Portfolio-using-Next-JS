"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/about"), { ssr: false });

export default function HomeClient() {
  const [isVisible, setIsVisible] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleAboutModal = () => {
    setShowAboutModal(!showAboutModal);
    if (!showAboutModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row text-[var(--foreground)] overflow-x-hidden overflow-y-auto transition-all duration-1000 ease-out ${isVisible ? 'slide-enter' : 'opacity-0'}`}>
      {/* Left side (image + yellow shape) */}
      <div className="flex flex-col w-full lg:w-1/2 items-center relative lg:justify-center pt-6 sm:pt-8 md:pt-4 lg:pt-0 pb-0 lg:pb-0" style={{ minHeight: "30vh", height: "auto", minHeight: "calc(50vh - 40px)" }}>
        {/* Yellow Skewed Shape - desktop and tablet landscape */}
        <div className="hidden lg:block absolute" style={{ position: "fixed", height: "200%", width: "100%", transform: "rotate(-15deg)", left: "-83%", top: "-50%", backgroundColor: "var(--primary)", zIndex: 1, borderRadius: "30px" }}></div>
        
        {/* Yellow Skewed Shape - mobile and tablet portrait */}
        <div className="lg:hidden absolute top-0 left-0 w-full" style={{ height: "30vh", backgroundColor: "var(--primary)", zIndex: 1, borderBottomRightRadius: "40%", borderBottomLeftRadius: "40%", transform: "translateY(-40%)" }}>
          <div className="hidden sm:block absolute bottom-0 w-full h-8 bg-[var(--primary)]" style={{ borderBottomRightRadius: "40%", borderBottomLeftRadius: "40%" }}></div>
        </div>
        
        {/* Profile Image Container */}
        <div className={`relative mx-auto rounded-full lg:rounded-[30px] w-40 h-40 sm:w-60 sm:h-60 md:w-[350px] md:h-[350px] lg:w-[600px] lg:h-[calc(100vh-80px)] xl:w-[650px] overflow-hidden shadow-lg mt-10 sm:mt-12 md:mt-8 lg:mt-0 ${isVisible ? 'profile-image-animate' : 'opacity-0'}`} style={{ backgroundImage: "url('/Images/Irfan.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "top center", boxShadow: "0 0 10px rgba(0, 0, 0, .9)", zIndex: 11 }}>
          <Image src="/Images/Irfan.png" alt="Profile background" fill className="object-cover w-full h-full" style={{ borderRadius: "inherit" }} priority />
        </div>
      </div>

      {/* Main content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start lg:justify-center justify-start py-2 sm:p-6 md:p-8 lg:p-8 mt-0 sm:mt-10 md:mt-6 lg:mt-0">
        <div className="text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-6 sm:px-4 md:px-10 lg:px-12 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-lg lg:mx-0 w-full">
          <h1 className={`text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-4xl mt-0 overflow-hidden py-2 font-bold text-[var(--primary)] ${isVisible ? 'content-title-animate' : 'opacity-0'} tracking-tight leading-tight`}>
            — I'M IRFAN ARSHAD
          </h1>
          <p className={`text-base sm:text-lg md:text-2xl lg:text-xl xl:text-xl text-justify text-[var(--foreground)] m-2 sm:mb-3 md:mb-4 ${isVisible ? 'content-text-animate' : 'opacity-0'}`}>
            I'm a <span className="text-[var(--primary)] font-semibold">Full Stack Developer</span> with expertise in creating responsive and user-friendly web applications. I specialize in React, Next.js, and Node.js, and I'm passionate about building innovative solutions that solve real-world problems.
          </p>
          <button onClick={toggleAboutModal} className={`group active:scale-95 relative inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 md:px-10 md:py-4 lg:px-10 lg:py-3 mt-4 sm:mt-5 md:mt-6 rounded-full border border-[var(--primary)] overflow-hidden transition-all duration-300 text-[var(--foreground)] hover:text-[var(--nav-text-hover)] font-bold text-sm sm:text-base md:text-xl ${isVisible ? 'content-button-animate' : 'opacity-0'}`} style={{ textTransform: "uppercase", backgroundColor: 'var(--background)', width: 'auto', minWidth: '200px', maxWidth: '100%' }}>
            <span className="relative z-10 about-me-btn whitespace-nowrap lg:pr-4 md:pl-3 sm:pr-5">More About Me</span>
            <span className="absolute inset-0 bg-[var(--primary)] translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-300 ease-out z-0" aria-hidden="true"></span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[var(--primary)] rounded-full group-hover:bg-[var(--primary-hover)] group-active:bg-[var(--primary-hover)] transition-colors duration-300 cursor-pointer text-[var(--nav-text-hover)]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="bi bi-arrow-right transition-colors duration-300 text-[var(--nav-text-hover)] sm:w-4 sm:h-4 md:w-5 md:h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      
      {/* About Modal */}
      <AnimatePresence mode="wait">
        {showAboutModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 bg-black bg-opacity-80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
            <motion.div className="relative w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[85vh] sm:max-h-[90vh] bg-[var(--background)] rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl" initial={{ scale: 0.8, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}>
              <button onClick={toggleAboutModal} className="absolute top-4 right-3 sm:top-4 sm:right-4 z-50 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--background)] hover:bg-[var(--primary-hover)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="overflow-y-auto max-h-[85vh] sm:max-h-[90vh] custom-scrollbar p-3 sm:p-4 md:p-6 overflow-x-hidden">
                <About />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}