"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] overflow-y-scroll overflow-x-hidden py-8 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-[30px] pb-24 sm:pb-28 md:pb-20 lg:pb-12 relative" style={{ minHeight: '100vh', height: '50vw', scrollbarWidth: 'thin', scrollbarColor: 'var(--nav-text) var(--background)', '--tw-screen-xs': '480px' }}>
      {/* Background Text */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none overflow-hidden">
        <h1 className="text-[var(--card-bg)] text-4xl sm:text-5xl md:text-[5.5rem] lg:text-[6rem] xl:text-[7rem] font-extrabold tracking-tighter select-none pt-7  md:pt-14 lg:pt-8">CONTACT</h1>
      </div>
    
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-8 md:mb-10 text-center relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-3 sm:mb-4 md:mb-6"
        >
          <span className="text-[var(--foreground)]">GET IN </span>
          <span className="text-[var(--primary)]">TOUCH</span>
        </motion.h1>
      </motion.div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative z-10 mt-10 sm:mt-12 md:mt-16 lg:mt-20">
        {/* Left Side - Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 sm:space-y-7 md:space-y-8 pr-0 md:pr-4 lg:pr-6"
        >
          <div className="mb-2 sm:mb-3 md:mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">DON'T BE SHY !</h2>
            <p className="text-[var(--nav-text)] max-w-xl text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8">
              Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
          </div>

          {/* Location Icon */}
          <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
            <div className="bg-[var(--primary)] p-2 xs:p-2.5 sm:p-3 md:p-3.5 lg:p-4 rounded-full flex-shrink-0 inline-flex items-center justify-center">
              <Link 
                href="https://maps.google.com/?q=Lahore+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer inline-flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" preserveAspectRatio="xMidYMid meet">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1 md:mb-2">ADDRESS POINT</h3>
              <p className="text-xs sm:text-sm md:text-base text-[var(--nav-text)]">
                <Link href="https://maps.google.com/?q=Lahore+Pakistan" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition-colors duration-300">
                  Lahore, Pakistan
                </Link>
              </p>
            </div>
          </div>

          {/* Email Icon */}
          <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
            <div className="bg-[var(--primary)] p-2 xs:p-2.5 sm:p-3 md:p-3.5 lg:p-4 rounded-full flex-shrink-0 inline-flex items-center justify-center">
              <Link 
                href="mailto:chirfanarshad1@gmail.com"
                className="cursor-pointer inline-flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" preserveAspectRatio="xMidYMid meet">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1 md:mb-2">MAIL ME</h3>
              <p className="text-xs sm:text-sm md:text-base text-[var(--nav-text)]">
                <Link href="mailto:chirfanarshad1@gmail.com" className="hover:text-[var(--primary)] transition-colors duration-300">
                  chirfanarshad1@gmail.com
                </Link>
              </p>
            </div>
          </div>

          {/* Phone Icon */}
          <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
            <div className="bg-[var(--primary)] p-2 xs:p-2.5 sm:p-3 md:p-3.5 lg:p-4 rounded-full flex-shrink-0 inline-flex items-center justify-center">
              <Link 
                href="tel:+923221649011"
                className="cursor-pointer inline-flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" preserveAspectRatio="xMidYMid meet">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </Link>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1 md:mb-2">CALL ME</h3>
              <p className="text-xs sm:text-sm md:text-base text-[var(--nav-text)]">
                <Link href="tel:+923221649011" className="hover:text-[var(--primary)] transition-colors duration-300">
                  +92 322 1649011
                </Link>
              </p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-5 mt-4 sm:mt-6 md:mt-8">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="#"
                className="bg-[var(--card-bg)] p-1.5 xs:p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-[var(--primary)] transition-colors duration-300 inline-block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="#"
                className="bg-[var(--card-bg)] p-1.5 xs:p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-[var(--primary)] transition-colors duration-300 inline-block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="#"
                className="bg-[var(--card-bg)] p-1.5 xs:p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-[var(--primary)] transition-colors duration-300 inline-block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="#"
                className="bg-[var(--card-bg)] p-1.5 xs:p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-[var(--primary)] transition-colors duration-300 inline-block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-5 md:space-y-6 px-0 sm:px-4 md:px-0 mt-6 sm:mt-4 md:mt-0 lg:mt-0 mb-8 sm:mb-6 md:mb-4 lg:mb-0"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="YOUR NAME"
                className="w-full bg-[var(--card-bg)] rounded-full px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base text-[var(--foreground)] placeholder-[var(--nav-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-300"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="YOUR EMAIL"
                className="w-full bg-[var(--card-bg)] rounded-full px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base text-[var(--foreground)] placeholder-[var(--nav-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-300"
                required
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="YOUR SUBJECT"
              className="w-full bg-[var(--card-bg)] rounded-full px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base text-[var(--foreground)] placeholder-[var(--nav-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-300"
              required
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="YOUR MESSAGE"
              rows="5"
              className="w-full bg-[var(--card-bg)] rounded-3xl px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base text-[var(--foreground)] placeholder-[var(--nav-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-300 resize-none"
              required
            ></textarea>
          </div>

          <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center px-4 xs:px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full border border-[var(--primary)] overflow-hidden transition-colors duration-300 text-[var(--foreground)] hover:text-[var(--nav-text-hover)] font-bold text-xs xs:text-sm sm:text-base mb-6 sm:mb-4 md:mb-2 lg:mb-0"
              style={{ textTransform: "uppercase", backgroundColor: 'var(--card-bg)' }}
            >
            <span className="relative z-10 pr-4 xs:pr-5 sm:pr-6 md:pr-8">SEND MESSAGE</span>
            {/* Animated yellow background */}
            <span
              className="absolute inset-0 bg-[var(--primary)] translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"
              aria-hidden="true"
            ></span>
            {/* Forward arrow circle */}
            <span className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-[var(--primary)] rounded-full group-hover:bg-[var(--primary-hover)] transition-colors duration-300 cursor-pointer group-hover:text-[var(--nav-text-hover)]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="bi bi-arrow-right transition-colors duration-300 text-[var(--nav-text-hover)]"
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
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
