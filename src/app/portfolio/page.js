"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

// Sample project data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
    image: "/Images/myPic.jpg", // Replace with actual project image
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/username/project1",
    demo: "https://project1-demo.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "/Images/myPic.jpg", // Replace with actual project image
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
    github: "https://github.com/username/project2",
    demo: "https://project2-demo.com",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js and Framer Motion for smooth animations.",
    image: "/Images/myPic.jpg", // Replace with actual project image
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/username/project3",
    demo: "https://project3-demo.com",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current and forecasted weather data for multiple locations.",
    image: "/Images/myPic.jpg", // Replace with actual project image
    tags: ["React", "OpenWeather API", "Chart.js"],
    github: "https://github.com/username/project4",
    demo: "https://project4-demo.com",
  },
];

// Filter categories
const categories = ["All", "React", "Next.js", "Node.js", "Flutter"];

export default function PortfolioPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    setIsVisible(true);
    
    // Filter projects based on selected category
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.tags.includes(selectedCategory)
      );
      setFilteredProjects(filtered);
    }
  }, [selectedCategory]);

  return (
    <div 
      className="bg-[var(--background)] text-[var(--foreground)] overflow-y-auto overflow-x-hidden py-22 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-10 lg:px-[30px] relative custom-scrollbar" 
      style={{
        minHeight: '100vh',
        height: '100%',
        scrollbarWidth: 'thin', 
        scrollbarColor: 'var(--nav-text) var(--background)',
      }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          <span className="text-[var(--primary)]">My</span> Portfolio
        </h1>
        <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          Explore my recent projects showcasing my skills and expertise in web development.
          Each project represents a unique challenge and solution.
        </p>
      </motion.div>

      {/* Filter Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8"
      >
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${selectedCategory === category 
              ? 'bg-[var(--primary)] text-[var(--nav-text-hover)]' 
              : 'bg-[var(--card-bg)] hover:bg-[var(--primary-hover)] hover:text-[var(--nav-text-hover)]'}`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group"
          >
            {/* Project Image */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <div className="bg-[var(--primary)] p-2 rounded-full hover:bg-[var(--primary-hover)] transition-colors duration-300">
                    <GitHubIcon className="text-[var(--nav-text-hover)]" />
                  </div>
                </Link>
                <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                  <div className="bg-[var(--primary)] p-2 rounded-full hover:bg-[var(--primary-hover)] transition-colors duration-300">
                    <LaunchIcon className="text-[var(--nav-text-hover)]" />
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Project Content */}
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm sm:text-base mb-4 text-opacity-80">{project.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="text-xs px-2 py-1 rounded-full bg-[var(--primary)] bg-opacity-20 text-[var(--primary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-16 text-center bg-[var(--card-bg)] rounded-xl p-6 sm:p-8 max-w-3xl mx-auto"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Interested in working together?
        </h2>
        <p className="mb-6 text-sm sm:text-base">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
        </p>
        <Link href="/contact">
          <button className="group relative inline-flex items-center px-6 sm:px-8 py-3 rounded-full border border-[var(--primary)] overflow-hidden transition-colors duration-300 text-[var(--foreground)] hover:text-[var(--nav-text-hover)] active:text-[var(--nav-text-hover)] font-bold text-sm active:scale-95">
            <span className="relative z-10">Get In Touch</span>
            {/* Animated background */}
            <span
              className="absolute inset-0 bg-[var(--primary)] translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-300 ease-out z-0"
              aria-hidden="true"
            ></span>
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
