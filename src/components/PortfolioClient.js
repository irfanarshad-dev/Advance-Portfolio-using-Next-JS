"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

export default function PortfolioClient({
  projects = [],
  tagColors = {},
  categories = []
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    setIsVisible(true);
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.tags.includes(selectedCategory));
      setFilteredProjects(filtered);
    }
  }, [selectedCategory]);

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] overflow-y-auto overflow-x-hidden py-22 sm:py-8 md:py-10 lg:py-12 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative custom-scrollbar" style={{ minHeight: '100vh', height: '100%', scrollbarWidth: 'thin', scrollbarColor: 'var(--nav-text) var(--background)' }}>
      <ScrollReveal variant="flipUp" className="relative text-center mb-10">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-[var(--nav-text)]/20 absolute top-0 left-0 right-0 text-center sm:pt-3">
          WORKS
        </h1>
        <h2 className="text-3xl md:text-3xl lg:text-6xl font-extrabold text-center relative z-10 text-[var(--foreground)] pt-2 md:pt-6 lg:pt-8 mb-4">
          MY <span className="text-[var(--primary)]">PORTFOLIO</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto">Explore my recent projects showcasing my skills and expertise in web development. Each project represents a unique challenge and solution.</p>
      </ScrollReveal>

      <ScrollReveal variant="fadeUp" delay={0.15} className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
        {categories.map((category, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 active:scale-95 touch-manipulation cursor-pointer ${selectedCategory === category ? 'text-[var(--nav-text-hover)]' : 'hover:bg-[var(--primary-hover)] hover:text-[var(--nav-text-hover)] active:bg-[var(--primary)] active:text-[var(--nav-text-hover)]'}`}
            style={{ backgroundColor: selectedCategory === category ? 'var(--primary)' : 'var(--card-bg-secondary)' }}
          >
            {selectedCategory === category && (
              <motion.div layoutId="filter-pill" className="absolute inset-0 bg-[var(--primary)] rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
            )}
            <span className="relative z-10">{category}</span>
          </motion.button>
        ))}
      </ScrollReveal>

      <div className="max-w-7xl mx-auto mb-20 sm:mb-16 lg:mb-12">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6" staggerDelay={0.08}>
          {filteredProjects.map((project, index) => (
            <StaggerItem key={`${project.id}-${selectedCategory}`} variant="flipUp">
              <motion.div 
                className="rounded-xl overflow-hidden shadow-md border transition-all duration-500 group cursor-pointer flex flex-col h-full"
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  borderColor: 'var(--border-color)',
                  perspective: "1000px",
                }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              >
                {/* Image Container */}
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full relative"
                  >
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-cover" 
                      style={{ transform: 'scale(0.9)' }}
                    />
                  </motion.div>
                  
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Action Buttons - Centered on hover */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      <motion.div 
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="backdrop-blur-md bg-white/10 border border-white/30 p-2.5 sm:p-3 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg touch-manipulation"
                      >
                        <GitHubIcon className="text-white text-lg sm:text-xl" />
                      </motion.div>
                    </Link>
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                      <motion.div 
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="backdrop-blur-md bg-white/10 border border-white/30 p-2.5 sm:p-3 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg touch-manipulation"
                      >
                        <LaunchIcon className="text-white text-lg sm:text-xl" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
                
                {/* Text Content Below Image */}
                <div className="p-3 sm:p-3.5 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-500 dark:text-amber-400">
                      {project.number} — {project.category}
                    </div>
                    <div className="bg-green-500 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-semibold shadow-lg flex items-center gap-1">
                      <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
                      Live
                    </div>
                  </div>
                  
                  <h3 className="text-sm sm:text-base font-bold mb-1 group-hover:text-[var(--primary)] transition-colors duration-300" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 800, color: 'var(--foreground)' }}>
                    {project.title}
                  </h3>
                  
                  <p className="text-[11px] sm:text-xs mb-2 line-clamp-2" style={{ fontWeight: 300, color: 'var(--nav-text)' }}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-md border transition-all duration-300 cursor-default ${tagColors[tag] || 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto pt-2 border-t flex items-center justify-end" style={{ borderColor: 'var(--border-color)' }}>
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-1 text-[10px] sm:text-xs text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:gap-2 transition-all duration-300 font-medium">
                      <span>View Project</span>
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <ScrollReveal variant="fadeUp" delay={0.3} className="mt-16 text-center rounded-xl p-6 sm:p-8 max-w-3xl mx-auto" style={{ backgroundColor: 'var(--card-bg-secondary)' }}>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Interested in working together?</h2>
        <p className="mb-6 text-sm sm:text-base">I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.</p>
        <Link href="/contact">
          <button className="group relative inline-flex items-center px-6 sm:px-8 py-3 rounded-full border border-[var(--primary)] overflow-hidden transition-all duration-300 text-[var(--foreground)] hover:text-[var(--nav-text-hover)] active:text-[var(--nav-text-hover)] font-bold text-sm active:scale-95 touch-manipulation cursor-pointer">
            <span className="relative z-10">Get In Touch</span>
            <span className="absolute inset-0 bg-[var(--primary)] translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-300 ease-out z-0" aria-hidden="true"></span>
          </button>
        </Link>
      </ScrollReveal>
    </div>
  );
}
