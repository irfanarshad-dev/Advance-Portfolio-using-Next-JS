"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";

// Sample blog posts data - replace with your actual blog posts
const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the emerging technologies and methodologies that are shaping the future of web development in 2024 and beyond.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/Images/myPic.jpg", // Replace with actual blog image
    author: "Irfan Arshad",
    date: "June 15, 2024",
    readTime: "5 min read",
    category: "Web Development",
    featured: true,
    tags: ["React", "Next.js", "Web Trends"],
  },
  {
    id: 2,
    title: "Building Accessible Web Applications: A Comprehensive Guide",
    excerpt: "Learn how to create web applications that are accessible to all users, including those with disabilities.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/Images/myPic.jpg", // Replace with actual blog image
    author: "Irfan Arshad",
    date: "May 28, 2024",
    readTime: "8 min read",
    category: "Accessibility",
    featured: false,
    tags: ["Accessibility", "ARIA", "UX Design"],
  },
  {
    id: 3,
    title: "Optimizing React Performance: Advanced Techniques",
    excerpt: "Discover advanced techniques to optimize your React applications for better performance and user experience.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/Images/myPic.jpg", // Replace with actual blog image
    author: "Irfan Arshad",
    date: "May 10, 2024",
    readTime: "6 min read",
    category: "React",
    featured: true,
    tags: ["React", "Performance", "Optimization"],
  },
  {
    id: 4,
    title: "The Role of AI in Modern Web Development",
    excerpt: "Explore how artificial intelligence is transforming the landscape of web development and what it means for developers.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/Images/myPic.jpg", // Replace with actual blog image
    author: "Irfan Arshad",
    date: "April 22, 2024",
    readTime: "7 min read",
    category: "AI",
    featured: false,
    tags: ["AI", "Machine Learning", "Future Tech"],
  },
  {
    id: 5,
    title: "Creating Responsive Designs with Modern CSS",
    excerpt: "Learn how to use modern CSS features to create responsive and adaptive web designs that work across all devices.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/Images/myPic.jpg", // Replace with actual blog image
    author: "Irfan Arshad",
    date: "April 5, 2024",
    readTime: "5 min read",
    category: "CSS",
    featured: false,
    tags: ["CSS", "Responsive Design", "Mobile First"],
  },
  {
    id: 6,
    title: "The Complete Guide to Next.js 14",
    excerpt: "Explore the new features and improvements in Next.js 14 and how they can enhance your web development workflow.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/Images/myPic.jpg", // Replace with actual blog image
    author: "Irfan Arshad",
    date: "March 18, 2024",
    readTime: "9 min read",
    category: "Next.js",
    featured: true,
    tags: ["Next.js", "React", "Server Components"],
  },
];

// Extract unique categories from blog posts
const categories = ["All", ...new Set(blogPosts.map(post => post.category))];

export default function BlogPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  
  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

  useEffect(() => {
    setIsVisible(true);
    
    // Filter posts based on selected category and search query
    let filtered = blogPosts;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredPosts(filtered);
  }, [selectedCategory, searchQuery]);

  return (
    <div 
      className="bg-[var(--background)] text-[var(--foreground)] overflow-y-auto overflow-x-hidden py-22 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-[30px] relative custom-scrollbar" 
      style={{
        minHeight: '100vh',
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
          <span className="text-[var(--primary)]">My</span> Blog
        </h1>
        <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          Thoughts, stories and ideas about web development, design, and technology.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-md mx-auto mb-8"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300"
          />
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--foreground)] opacity-60" />
        </div>
      </motion.div>

      {/* Filter Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12"
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

      {/* Featured Posts Section (only show if not filtering) */}
      {selectedCategory === "All" && searchQuery === "" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BookmarkIcon className="mr-2 text-[var(--primary)]" />
            Featured Posts
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              >
                {/* Post Image */}
                <div className={`relative ${index === 0 ? 'h-64 sm:h-72 lg:h-80' : 'h-48 sm:h-56'} overflow-hidden`}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[var(--primary)] text-[var(--nav-text-hover)] text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                
                {/* Post Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center text-xs text-[var(--foreground)] opacity-70 mb-3">
                    <span className="flex items-center mr-4">
                      <AccessTimeIcon fontSize="small" className="mr-1" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center">
                      <PersonIcon fontSize="small" className="mr-1" />
                      {post.author}
                    </span>
                  </div>
                  
                  <h3 className={`font-bold mb-2 ${index === 0 ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                    {post.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base mb-4 opacity-80">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs opacity-70">{post.date}</span>
                    <Link href={`/blog/${post.id}`} className="text-[var(--primary)] font-semibold text-sm hover:underline">
                      Read More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All Posts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory === "All" ? "All Posts" : selectedCategory + " Posts"}
        </h2>
        
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]"
              >
                {/* Post Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[var(--primary)] text-[var(--nav-text-hover)] text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                
                {/* Post Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center text-xs text-[var(--foreground)] opacity-70 mb-3">
                    <span className="flex items-center mr-4">
                      <AccessTimeIcon fontSize="small" className="mr-1" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center">
                      <PersonIcon fontSize="small" className="mr-1" />
                      {post.author}
                    </span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base mb-4 opacity-80">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs opacity-70">{post.date}</span>
                    <Link href={`/blog/${post.id}`} className="text-[var(--primary)] font-semibold text-sm hover:underline">
                      Read More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[var(--card-bg)] rounded-xl">
            <p className="text-lg">No posts found matching your criteria.</p>
            <button 
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-6 py-2 bg-[var(--primary)] text-[var(--nav-text-hover)] rounded-full hover:bg-[var(--primary-hover)] transition-colors duration-300"
            >
              Reset Filters
            </button>
          </div>
        )}
      </motion.div>

      {/* Newsletter Subscription */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-16 text-center bg-[var(--card-bg)] rounded-xl p-6 sm:p-8 max-w-3xl mx-auto"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Subscribe to My Newsletter
        </h2>
        <p className="mb-6 text-sm sm:text-base">
          Get notified when I publish new articles. No spam, just quality content.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow px-4 py-3 rounded-full bg-[var(--background)] border border-[var(--border-color)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300"
          />
          <button className="px-6 py-3 bg-[var(--primary)] text-[var(--nav-text-hover)] rounded-full hover:bg-[var(--primary-hover)] transition-colors duration-300 font-bold">
            Subscribe
          </button>
        </div>
      </motion.div>
    </div>
  );
}
