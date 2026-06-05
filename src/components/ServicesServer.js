import ServicesAnimations from "./ServicesAnimations";

const services = [
  { id: 1, title: "Web Development", description: "Responsive websites with modern frameworks and cutting-edge design principles.", features: ["HTML, CSS, JS, Tailwind, Bootstrap", "Next.js applications (SSR & Client-side)", "Admin Panels / Dashboards", "Single Page Applications (SPAs)"], icon: "🌐", gradient: "from-blue-500 to-purple-600" },
  { id: 2, title: "Fullstack Development", description: "Complete web application development from backend APIs to frontend integration.", features: ["Backend APIs with NestJS / Node.js", "Database integration (MongoDB, MySQL)", "JWT / token-based access", "User login and role-based access control"], icon: "🚀", gradient: "from-green-500 to-teal-600" },
  { id: 3, title: "Portfolio & Landing Pages", description: "Professional portfolio websites and landing pages for businesses and startups.", features: ["Personal or business portfolio websites", "Landing pages for startups or products", "Modern responsive design", "SEO optimized structure"], icon: "🎨", gradient: "from-orange-500 to-red-600" },
  { id: 4, title: "Flutter Apps / Mobile Development", description: "Cross-platform mobile applications with Flutter and modern backend integration.", features: ["Mobile apps with Flutter + Firebase", "SQLite-based local apps", "Chat apps or chatbot integration", "Cross-platform compatibility"], icon: "📱", gradient: "from-pink-500 to-rose-600" },
  { id: 5, title: "WordPress Development", description: "Custom WordPress websites with modern themes and powerful functionality.", features: ["Custom WordPress themes", "Plugin development & customization", "E-commerce with WooCommerce", "Content management systems"], icon: "📝", gradient: "from-purple-500 to-indigo-600" },
  { id: 6, title: "Website Optimization & Modernization", description: "Performance optimization and SEO enhancement for existing websites.", features: ["SEO-ready pages", "Performance optimization with Next.js & Tailwind", "Server-side rendering for SEO and speed", "Modern UI/UX improvements"], icon: "⚡", gradient: "from-yellow-500 to-orange-600" }
];

const processSteps = [
  { step: "01", title: "Discovery", desc: "Understanding your vision and requirements" },
  { step: "02", title: "Design", desc: "Creating wireframes and visual concepts" },
  { step: "03", title: "Development", desc: "Building with modern technologies" },
  { step: "04", title: "Delivery", desc: "Testing, deployment, and support" }
];

export default function ServicesServer() {
  return <ServicesAnimations services={services} processSteps={processSteps} />;
}
