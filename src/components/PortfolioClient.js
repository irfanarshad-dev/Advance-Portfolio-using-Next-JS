"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
    image: "/Images/myPic.jpg",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/username/project1",
    demo: "https://project1-demo.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "/Images/myPic.jpg",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
    github: "https://github.com/username/project2",
    demo: "https://project2-demo.com",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js and Framer Motion for smooth animations.",
    image: "/Images/myPic.jpg",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/username/project3",
    demo: "https://project3-demo.com",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current and forecasted weather data for multiple locations.",
    image: "/Images/myPic.jpg",
    tags: ["React", "OpenWeather API", "Chart.js"],
    github: "https://github.com/username/project4",
    demo: "https://project4-demo.com",
  },
];

const categories = ["All", "React", "Next.js", "Node.js", "Flutter"];

export default function PortfolioClient() {
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
    <div className="bg-[var(--background)] text-[var(--foreground)] overflow-y-auto overflow-x-hidden py-22 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-10 lg:px-[30px] relative custom-scrollbar" style={{ minHeight: '100vh', height: '100%', scrollbarWidth: 'thin', scrollbarColor: 'var(--nav-text) var(--background)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }} transition={{ duration: 0.5 }} className="relative text-center mb-10">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-[var(--nav-text)]/20 absolute top-0 left-0 right-0 text-center sm:pt-3">
          WORKS
        </h1>
        <h2 className="text-3xl md:text-3xl lg:text-6xl font-extrabold text-center relative z-10 text-[var(--foreground)] pt-2 md:pt-6 lg:pt-8 mb-4">
          MY <span className="text-[var(--primary)]">PORTFOLIO</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto">Explore my recent projects showcasing my skills and expertise in web development. Each project represents a unique challenge and solution.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
        {categories.map((category, index) => (
          <button key={index} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 active:scale-95 touch-manipulation ${selectedCategory === category ? 'bg-[var(--primary)] text-[var(--nav-text-hover)]' : 'bg-[var(--card-bg)] hover:bg-[var(--primary-hover)] hover:text-[var(--nav-text-hover)] active:bg-[var(--primary)] active:text-[var(--nav-text-hover)]'}`}>
            {category}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-20 sm:mb-16 lg:mb-12">
        {filteredProjects.map((project, index) => (
          <motion.div 
            key={project.id} 
            initial={{ opacity: 0, y: 30, scale: 0.9 }} 
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30, scale: isVisible ? 1 : 0.9 }} 
            transition={{ 
              duration: 0.6, 
              delay: 0.1 + index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }} 
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              rotateY: 2,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-white/5 hover:border-[var(--primary)]/20 touch-manipulation"
          >
            <div className="relative h-40 sm:h-48 md:h-52 lg:h-48 xl:h-56 overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full h-full"
              >
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover" 
                />
              </motion.div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 opacity-0 group-hover:opacity-100"
              >
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[var(--primary)] p-2.5 sm:p-3 rounded-full hover:bg-[var(--primary-hover)] active:bg-[var(--primary-hover)] transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation"
                  >
                    <GitHubIcon className="text-[var(--nav-text-hover)] text-lg sm:text-xl" />
                  </motion.div>
                </Link>
                <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[var(--primary)] p-2.5 sm:p-3 rounded-full hover:bg-[var(--primary-hover)] active:bg-[var(--primary-hover)] transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation"
                  >
                    <LaunchIcon className="text-[var(--nav-text-hover)] text-lg sm:text-xl" />
                  </motion.div>
                </Link>
              </motion.div>
              
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg"
              >
                Live
              </motion.div>
            </div>
            
            <motion.div 
              className="p-4 sm:p-5 md:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <motion.h3 
                className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 group-hover:text-[var(--primary)] transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                {project.title}
              </motion.h3>
              
              <motion.p 
                className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 text-[var(--nav-text)] leading-relaxed line-clamp-3"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {project.description}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-1.5 sm:gap-2"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3 + index * 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {project.tags.map((tag, tagIndex) => (
                  <motion.span 
                    key={tagIndex} 
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      show: { opacity: 1, scale: 1 }
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-[var(--primary)]/20 to-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 hover:border-[var(--primary)]/40 transition-all duration-300 cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-[var(--primary)] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              animate={{
                borderRadius: ["1rem", "1.2rem", "1rem"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }} transition={{ duration: 0.5, delay: 0.5 }} className="mt-16 text-center bg-[var(--card-bg)] rounded-xl p-6 sm:p-8 max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Interested in working together?</h2>
        <p className="mb-6 text-sm sm:text-base">I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.</p>
        <Link href="/contact">
          <button className="group relative inline-flex items-center px-6 sm:px-8 py-3 rounded-full border border-[var(--primary)] overflow-hidden transition-all duration-300 text-[var(--foreground)] hover:text-[var(--nav-text-hover)] active:text-[var(--nav-text-hover)] font-bold text-sm active:scale-95 touch-manipulation">
            <span className="relative z-10">Get In Touch</span>
            <span className="absolute inset-0 bg-[var(--primary)] translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-300 ease-out z-0" aria-hidden="true"></span>
          </button>
        </Link>
      </motion.div>
    </div>
  );
}