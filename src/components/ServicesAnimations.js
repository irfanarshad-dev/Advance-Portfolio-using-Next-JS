"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { TbWorldWww, TbStack2, TbLayoutDashboard, TbDeviceMobile, TbBrandWordpress, TbBolt } from "react-icons/tb";

// Icons are mapped here (client-side) because functions/components can't be
// passed as props from a Server Component — ServicesServer.js only sends
// plain string identifiers, and we resolve them to real components here.
const ICONS = {
  web: TbWorldWww,
  stack: TbStack2,
  layout: TbLayoutDashboard,
  mobile: TbDeviceMobile,
  wordpress: TbBrandWordpress,
  bolt: TbBolt,
};

export default function ServicesAnimations({ services, processSteps }) {
  return (
    <div
      className="bg-[var(--background)] text-[var(--foreground)] overflow-y-auto overflow-x-hidden py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Hero Heading ── */}
      <ScrollReveal variant="flipUp" delay={0.1} className="relative text-center mb-16 min-h-[80px] md:min-h-[100px] lg:min-h-[120px]">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-[var(--nav-text)]/20 absolute top-0 left-0 right-0 text-center sm:pt-3 pointer-events-none select-none">
          SERVICES
        </h1>
        <h2 className="text-3xl md:text-3xl lg:text-6xl font-extrabold text-center relative z-10 text-[var(--foreground)] pt-2 md:pt-6 lg:pt-8 mb-6">
          MY <span className="text-[var(--primary)]">SERVICES</span>
        </h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-[var(--nav-text)]">
          Transforming ideas into digital reality with cutting-edge web development solutions
        </p>
      </ScrollReveal>

      {/* ── Services Grid ── */}
      <StaggerContainer
        staggerDelay={0.1}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-16 px-2 sm:px-0"
      >
        {services.map((service) => {
          const Icon = ICONS[service.icon];
          return (
          <StaggerItem key={service.id} variant="scaleIn">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-[var(--card-bg)] rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-[var(--border-color)] hover:border-[var(--primary)] overflow-hidden cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
              />

              {/* Top Border Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <motion.div
                  className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${service.gradient} mb-4 sm:mb-5 md:mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="text-white" size={28} />
                </motion.div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-[var(--primary)] transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-sm sm:text-base text-[var(--nav-text)] mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 sm:space-y-2.5">
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start text-xs sm:text-sm group/item"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--primary)] rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                      <span className="leading-relaxed group-hover/item:text-[var(--primary)] transition-colors duration-300">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Bottom Right Glow */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[var(--primary)] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            </motion.div>
          </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* ── Process ── */}
      <ScrollReveal variant="fadeUp" delay={0.2} className="max-w-6xl mx-auto mb-16 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          My <span className="text-[var(--primary)]">Process</span>
        </h2>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {processSteps.map((item) => (
            <StaggerItem key={item.step} variant="scaleIn">
              <div className="text-center group cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[var(--primary)] text-[var(--nav-text-hover)] rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4 group-hover:shadow-lg group-hover:shadow-[var(--primary)]/50 transition-all duration-300 touch-manipulation"
                >
                  {item.step}
                </motion.div>
                <h3 className="text-sm sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[var(--nav-text)] leading-tight">
                  {item.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollReveal>

      {/* ── CTA ── */}
      <ScrollReveal variant="fadeUp" delay={0.3} className="text-center bg-[var(--card-bg)] border-2 border-[var(--border-color)] rounded-2xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto mb-20 sm:mb-16 md:mb-12 lg:mb-8 shadow-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
          Ready to Start Your <span className="text-[var(--primary)]">Project</span>?
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[var(--nav-text)] mb-6 sm:mb-8 max-w-2xl mx-auto">
          Let's discuss your ideas and create something amazing together. I'm here to bring your vision to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[var(--primary)] text-[var(--nav-text-hover)] rounded-full font-semibold hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-[var(--primary)]/50 transition-all duration-300 touch-manipulation text-center"
            >
              Get In Touch
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/portfolio"
              className="block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[var(--primary)] text-[var(--primary)] rounded-full font-semibold hover:bg-[var(--primary)] hover:text-[var(--nav-text-hover)] hover:shadow-lg hover:shadow-[var(--primary)]/50 transition-all duration-300 touch-manipulation text-center"
            >
              View Portfolio
            </Link>
          </motion.div>
        </div>
      </ScrollReveal>
    </div>
  );
}