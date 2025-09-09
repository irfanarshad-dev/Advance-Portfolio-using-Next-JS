"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  { id: 1, title: "Web Development", description: "Responsive websites with modern frameworks and cutting-edge design principles.", features: ["HTML, CSS, JS, Tailwind, Bootstrap", "Next.js applications (SSR & Client-side)", "Admin Panels / Dashboards", "Single Page Applications (SPAs)"], icon: "🌐", gradient: "from-blue-500 to-purple-600" },
  { id: 2, title: "Fullstack Development", description: "Complete web application development from backend APIs to frontend integration.", features: ["Backend APIs with NestJS / Node.js", "Database integration (MongoDB, MySQL)", "JWT / token-based access", "User login and role-based access control"], icon: "🚀", gradient: "from-green-500 to-teal-600" },
  { id: 3, title: "Portfolio & Landing Pages", description: "Professional portfolio websites and landing pages for businesses and startups.", features: ["Personal or business portfolio websites", "Landing pages for startups or products", "Modern responsive design", "SEO optimized structure"], icon: "🎨", gradient: "from-orange-500 to-red-600" },
  { id: 4, title: "Flutter Apps / Mobile Development", description: "Cross-platform mobile applications with Flutter and modern backend integration.", features: ["Mobile apps with Flutter + Firebase", "SQLite-based local apps", "Chat apps or chatbot integration", "Cross-platform compatibility"], icon: "📱", gradient: "from-pink-500 to-rose-600" },
  { id: 5, title: "WordPress Development", description: "Custom WordPress websites with modern themes and powerful functionality.", features: ["Custom WordPress themes", "Plugin development & customization", "E-commerce with WooCommerce", "Content management systems"], icon: "📝", gradient: "from-purple-500 to-indigo-600" },
  { id: 6, title: "Website Optimization & Modernization", description: "Performance optimization and SEO enhancement for existing websites.", features: ["SEO-ready pages", "Performance optimization with Next.js & Tailwind", "Server-side rendering for SEO and speed", "Modern UI/UX improvements"], icon: "⚡", gradient: "from-yellow-500 to-orange-600" }
];

export default function ServicesClient() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] overflow-y-auto overflow-x-hidden py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 relative" style={{ minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }} transition={{ duration: 0.6 }} className="relative text-center mb-16">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-[var(--nav-text)]/20 absolute top-0 left-0 right-0 text-center sm:pt-3">
          SERVICES
        </h1>
        <h2 className="text-3xl md:text-3xl lg:text-6xl font-extrabold text-center relative z-10 text-[var(--foreground)] pt-2 md:pt-6 lg:pt-8 mb-6">
          MY <span className="text-[var(--primary)]">SERVICES</span>
        </h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-[var(--nav-text)]">Transforming ideas into digital reality with cutting-edge web development solutions</p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-16 px-2 sm:px-0">
        {services.map((service, index) => (
          <motion.div 
            key={service.id} 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50, scale: isVisible ? 1 : 0.9 }} 
            transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 100 }}
            whileHover={{ y: -10, scale: 1.02, rotateY: 5 }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/80 backdrop-blur-sm rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-700 border border-white/10 hover:border-[var(--primary)]/30 overflow-hidden cursor-pointer"
          >
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 0.1 }}
            ></motion.div>
            
            <motion.div 
              className="relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <motion.div 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 md:mb-6"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {service.icon}
              </motion.div>
              
              <motion.h3 
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 group-hover:text-[var(--primary)] transition-colors duration-500"
                whileHover={{ x: 5 }}
              >
                {service.title}
              </motion.h3>
              
              <motion.p 
                className="text-xs sm:text-sm md:text-base text-[var(--nav-text)] mb-3 sm:mb-4 md:mb-6 leading-relaxed"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {service.description}
              </motion.p>
              
              <motion.ul 
                className="space-y-1 sm:space-y-2"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {service.features.map((feature, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex items-start text-xs sm:text-sm group/item"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 }
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.span 
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-[var(--primary)] rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    ></motion.span>
                    <span className="leading-relaxed group-hover/item:text-[var(--primary)] transition-colors duration-300">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -right-2 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[var(--primary)]/10 to-transparent rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }} transition={{ duration: 0.6, delay: 0.8 }} className="max-w-6xl mx-auto mb-16 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">My <span className="text-[var(--primary)]">Process</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {[
            { step: "01", title: "Discovery", desc: "Understanding your vision and requirements" },
            { step: "02", title: "Design", desc: "Creating wireframes and visual concepts" },
            { step: "03", title: "Development", desc: "Building with modern technologies" },
            { step: "04", title: "Delivery", desc: "Testing, deployment, and support" }
          ].map((item, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[var(--primary)] text-[var(--nav-text-hover)] rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-active:scale-105 transition-transform duration-300 touch-manipulation">{item.step}</div>
              <h3 className="text-sm sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-[var(--nav-text)] leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }} transition={{ duration: 0.6, delay: 1 }} className="text-center bg-[var(--card-bg)] rounded-2xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto mb-20 sm:mb-16 md:mb-12 lg:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Your <span className="text-[var(--primary)]">Project</span>?</h2>
        <p className="text-sm sm:text-base md:text-lg text-[var(--nav-text)] mb-6 sm:mb-8 max-w-2xl mx-auto">Let's discuss your ideas and create something amazing together. I'm here to bring your vision to life.</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link href="/contact">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[var(--primary)] text-[var(--nav-text-hover)] rounded-full font-semibold hover:bg-[var(--primary-hover)] active:bg-[var(--primary-hover)] active:scale-95 transition-all duration-300 transform hover:scale-105 touch-manipulation">Get In Touch</button>
          </Link>
          <Link href="/portfolio">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[var(--primary)] text-[var(--primary)] rounded-full font-semibold hover:bg-[var(--primary)] hover:text-[var(--nav-text-hover)] active:bg-[var(--primary)] active:text-[var(--nav-text-hover)] active:scale-95 transition-all duration-300 touch-manipulation">View Portfolio</button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}