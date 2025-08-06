import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CountUp from "react-countup";
import Link from "next/link";

// Circular Progress component
const CircularProgress = ({ percentage, skill }) => {
  // Use React's useState and useEffect for client-side rendering
  const [radius, setRadius] = React.useState(60); // Default for server-side rendering
  const [strokeWidth, setStrokeWidth] = React.useState(8);
  // Use ref to track if component has been viewed before
  const hasBeenViewed = React.useRef(false);
  const [isInView, setIsInView] = React.useState(false);

  // Store animation progress in ref to maintain between renders
  const animationProgress = React.useRef(0);
  const [animationComplete, setAnimationComplete] = React.useState(false);

  // Use useEffect to update values on client-side only
  React.useEffect(() => {
    // This code only runs on the client after hydration
    const handleResize = () => {
      const newRadius = window.innerWidth < 640 ? 45 : 60;
      setRadius(newRadius);
      setStrokeWidth(newRadius === 45 ? 6 : 8);
    };

    // Set initial values
    handleResize();

    // Check if we should initialize animation state (e.g., if user refreshed while scrolled down)
    const checkInitialVisibility = () => {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        const element = document.getElementById(
          `skill-${skill.replace(/\s+/g, "-").toLowerCase()}`
        );
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
          if (isVisible) {
            setIsInView(true);
            hasBeenViewed.current = true;
            setAnimationComplete(true);
            animationProgress.current = 1;
          }
        }
      }
    };

    // Run initial visibility check after a short delay to ensure DOM is ready
    setTimeout(checkInitialVisibility, 100);

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, [skill]);

  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Always use primary color for consistency
  const progressColor = "var(--primary)";

  return (
    <motion.div
      id={`skill-${skill.replace(/\s+/g, "-").toLowerCase()}`}
      className="flex flex-col items-center"
      initial={
        animationComplete
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      animate={
        hasBeenViewed.current || animationComplete
          ? { opacity: 1, y: 0, scale: 1 }
          : {}
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: hasBeenViewed.current || animationComplete ? 0.3 : 0.7,
        },
      }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      onAnimationComplete={() => {
        animationProgress.current = 1;
        setAnimationComplete(true);
      }}
    >
      <div className="relative">
        {/* Background circle */}
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="grey"
            fill="var(--background)"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <motion.circle
            stroke={progressColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
            initial={
              animationComplete
                ? { strokeDashoffset: strokeDashoffset, rotate: 0 }
                : { strokeDashoffset: circumference, rotate: -90 }
            }
            animate={
              hasBeenViewed.current || animationComplete
                ? {
                    strokeDashoffset: strokeDashoffset,
                    rotate: 0,
                  }
                : {}
            }
            whileInView={{
              strokeDashoffset: strokeDashoffset,
              rotate: 0,
              transition: {
                duration:
                  hasBeenViewed.current || animationComplete ? 0.3 : 1.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: hasBeenViewed.current || animationComplete ? 0 : 0.2,
              },
            }}
            onAnimationComplete={() => {
              animationProgress.current = 1;
              setAnimationComplete(true);
            }}
            onViewportEnter={() => {
              setIsInView(true);
              hasBeenViewed.current = true;
            }}
            onViewportLeave={() => {
              // Don't reset animation state when leaving viewport
              // Just update the isInView state for conditional rendering
              if (animationComplete) {
                setIsInView(true); // Keep it true to maintain animation state
              } else {
                setIsInView(false);
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-xl sm:text-2xl md:text-3xl font-bold"
            initial={
              animationComplete
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.5, y: 10 }
            }
            animate={
              hasBeenViewed.current || animationComplete
                ? { opacity: 1, scale: 1, y: 0 }
                : {}
            }
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: hasBeenViewed.current || animationComplete ? 0 : 0.8,
              },
            }}
            viewport={{ once: true }}
            onAnimationComplete={() => {
              animationProgress.current = 1;
              setAnimationComplete(true);
            }}
          >
            <motion.span
              style={{ color: "var(--primary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 1.2,
              }}
            >
              {isInView || hasBeenViewed.current || animationComplete ? (
                <>
                  <CountUp
                    start={
                      hasBeenViewed.current || animationComplete
                        ? percentage
                        : 0
                    }
                    end={percentage}
                    duration={
                      hasBeenViewed.current || animationComplete ? 0 : 2
                    }
                    delay={hasBeenViewed.current || animationComplete ? 0 : 1.2}
                    preserveValue={true}
                    redraw={false}
                  />
                  %
                </>
              ) : (
                "0%"
              )}
            </motion.span>
          </motion.div>
        </div>
      </div>
      {/* Skill name */}
      <motion.p
        className="mt-3 sm:mt-4 md:mt-6 text-center text-sm sm:text-base font-semibold uppercase"
        initial={
          animationComplete
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 20, scale: 0.9 }
        }
        animate={
          hasBeenViewed.current || animationComplete
            ? { opacity: 1, y: 0, scale: 1 }
            : {}
        }
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            delay: hasBeenViewed.current || animationComplete ? 0 : 1.5,
          },
        }}
        viewport={{ once: true }}
        style={{ color: progressColor }}
        onAnimationComplete={() => {
          animationProgress.current = 1;
          setAnimationComplete(true);
        }}
      >
        {skill}
      </motion.p>
    </motion.div>
  );
};

const About = () => {
  // Skills data
  const skills = [
    { skill: "HTML", percentage: 85, color: "#e34c26" },
    { skill: "JAVASCRIPT", percentage: 75, color: "#f0db4f" },
    { skill: "CSS", percentage: 80, color: "#264de4" },
    { skill: "BOOTSRAP 5", percentage: 70, color: "#777bb3" },
    { skill: "TAILWIND", percentage: 75, color: "#21759b" },
    { skill: "NEXTJS", percentage: 80, color: "#0769ad" },
    { skill: "NESTJS", percentage: 70, color: "#dd0031" },
    { skill: "PYTHON", percentage: 67, color: "#61dafb" },
    { skill: "MONGO DB", percentage: 70, color: "#61dafb" },
    { skill: "MYSQL", percentage: 75, color: "#61dafb" },
    { skill: "FIREBASE", percentage: 70, color: "#61dafb" },
    { skill: "JAVA", percentage: 50, color: "#61dafb" },
    { skill: "FLUTTER", percentage: 67, color: "#61dafb" },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: custom,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 12,
        ease: "easeOut",
      },
    }),
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        when: "beforeChildren"
      },
    },
  };

  return (
    <section className="w-full bg-[var(--background)] text-[var(--foreground)] py-20 lg:px-[100px]">
      <div className="container mx-auto px-8">
        {/* About Me Header with Background Text */}
        <motion.div
          className="relative mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-[var(--nav-text)]/20 absolute top-0 left-0 right-0 text-center">
            RESUME
          </h1>
          <h2 className="text-3xl md:text-3xl lg:text-5xl font-extrabold text-center relative z-10 text-[var(--foreground)] pt-2 md:pt-6 lg:pt-6 secondary-heading">
            ABOUT <span className="text-yellow-300">ME</span>
          </h2>

          {/* Mobile-only profile image */}
          <motion.div
            className="sm:hidden mx-auto mt-8 relative w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--primary)] shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Image
              src="/Images/Irfan.png"
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Personal Information */}
          <motion.div variants={fadeIn}>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 md:mb-8">
              PERSONAL INFOS
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div>
                <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                  <span className="font-bold">First Name:</span> Irfan
                </p>
                <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                  <span className="font-bold">Age:</span> 22 Years
                </p>
                <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                  <span className="font-bold">Freelance:</span>{" "}
                  <span className="text-green-500">Available</span>
                </p>
                <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                  <span className="font-bold block sm:inline">Phone:</span>{" "}
                  <Link
                    href="tel:+923221649011"
                    className="text-[var(--primary)] hover:underline transition-all duration-300 inline-flex items-center group"
                  >
                    <span className="truncate">+92 322 1649011</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 ml-1 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </Link>
                </p>

                <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                  <span className="font-bold">Skype:</span> john.doe
                </p>
              </div>

              <div>
                <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                  <span className="font-bold">Last Name:</span> Arshad
                </p>
                <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                  <span className="font-bold">Nationality:</span> Pakistani
                </p>
                <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                  <span className="font-bold">Address:</span> Raiwind,LHR
                </p>
                <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                  <span className="font-bold block sm:inline">Email:</span>{" "}
                  <Link
                    href="mailto:chirfanarshad1@gmail.com"
                    className="text-[var(--primary)] hover:underline transition-all duration-300 inline-flex items-center group"
                  >
                    <span className="truncate">chirfanarshad1@gmail.com</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 ml-1 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </Link>
                </p>
                <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                  <span className="font-bold block sm:inline">Languages:</span>{" "}
                  <span>Pnjabi, &nbsp;Urdu, &nbsp;English</span>
                </p>
              </div>
            </div>

            {/* Download CV Button */}
            <div className="mt-4 sm:mt-6 md:mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="https://drive.google.com/file/d/1KmwX2FZbvFtkcJurkiPQvm5l3P6F4ufA/view?usp=sharing"
                  className="inline-flex items-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full border-2 border-[var(--primary)] text-[var(--foreground)] text-xs sm:text-sm md:text-base font-bold hover:bg-[var(--primary)] hover:text-[var(--background)] transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DOWNLOAD CV
                  <svg
                    className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
            {/* Years of Experience */}
            <motion.div
              className="bg-[var(--card-bg)] bg-card-hover p-4 sm:p-6 md:p-8 rounded-lg transition-colors duration-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <motion.h3
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--primary)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                02<span className="text-xl sm:text-2xl md:text-3xl">+</span>
              </motion.h3>
              <div className="w-8 sm:w-10 md:w-12 h-1 bg-[var(--border-color)] my-2 sm:my-3 md:my-4"></div>
              <p className="uppercase font-semibold text-xs sm:text-sm md:text-base">
                YEARS OF
                <br />
                EXPERIENCE
              </p>
            </motion.div>

            {/* Completed Projects */}
            <motion.div
              className="bg-[var(--card-bg)] bg-card-hover p-4 sm:p-6 md:p-8 rounded-lg transition-colors duration-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <motion.h3
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--primary)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                10<span className="text-xl sm:text-2xl md:text-3xl">+</span>
              </motion.h3>
              <div className="w-8 sm:w-10 md:w-12 h-1 bg-[var(--border-color)] my-2 sm:my-3 md:my-4"></div>
              <p className="uppercase font-semibold text-xs sm:text-sm md:text-base">
                COMPLETED
                <br />
                PROJECTS
              </p>
            </motion.div>

            {/* Happy Customers */}
            <motion.div
              className="bg-[var(--card-bg)] bg-card-hover p-4 sm:p-6 md:p-8 rounded-lg transition-colors duration-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <motion.h3
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--primary)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                0<span className="text-xl sm:text-2xl md:text-3xl">+</span>
              </motion.h3>
              <div className="w-8 sm:w-10 md:w-12 h-1 bg-[var(--border-color)] my-2 sm:my-3 md:my-4"></div>
              <p className="uppercase font-semibold text-xs sm:text-sm md:text-base">
                HAPPY
                <br />
                CUSTOMERS
              </p>
            </motion.div>

            {/* Awards Won */}
            <motion.div
              className="bg-[var(--card-bg)] bg-card-hover p-4 sm:p-6 md:p-8 rounded-lg transition-colors duration-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <motion.h3
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--primary)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                0<span className="text-xl sm:text-2xl md:text-3xl">+</span>
              </motion.h3>
              <div className="w-8 sm:w-10 md:w-12 h-1 bg-[var(--border-color)] my-2 sm:my-3 md:my-4"></div>
              <p className="uppercase font-semibold text-xs sm:text-sm md:text-base">
                AWARDS
                <br />
                WON
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="mt-16 md:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="relative mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center relative z-10 text-[var(--foreground)] pt-4 md:pt-6 lg:pt-8 secondary-heading">
              MY SKILLS
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {skills.map((item, index) => (
              <motion.div key={index} variants={fadeIn} custom={index * 0.1}>
                <CircularProgress
                  percentage={item.percentage}
                  skill={item.skill}
                  color={item.color}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience & Education Section */}
        <motion.div
          className="mt-16 md:mt-20 px-4 sm:px-6 md:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="relative mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center relative z-10 text-[var(--foreground)] pt-4 md:pt-6 lg:pt-8 secondary-heading">
              EXPERIENCE & EDUCATION
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {/* Experience Column */}
            <div className="space-y-12">
              {/* Experience Item 1 */}
              <motion.div
                className="relative pl-10 sm:pl-12 border-l-2 border-[var(--border-color)]"
                variants={fadeIn}
                custom={0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px", amount: 0.3 }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 -ml-4 sm:-ml-5 md:-ml-6 rounded-full bg-[var(--primary)] flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[var(--nav-text-hover)]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-1 text-xs sm:text-sm font-semibold text-[var(--nav-text)]">
                    2022 - PRESENT
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                    WEB DEVELOPER{" "}
                    <span className="text-[var(--nav-text)]">— FULLSTACK</span>
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-[var(--nav-text)] leading-relaxed sm:leading-relaxed md:leading-relaxed tracking-wide max-w-full overflow-hidden break-words">
                    I am a skilled Full-Stack Web Developer with hands-on experience in building responsive, high-performance web applications using modern technologies like HTML, CSS, JavaScript, Bootstrap 5, Tailwind CSS, and frameworks such as Next.js and NestJS. I have a solid understanding of both frontend and backend development, enabling me to create dynamic and data-driven websites. I work efficiently with databases like MongoDB, MySQL, and Firebase to build secure and scalable solutions.
                  </p>
                </motion.div>
              </motion.div>

              {/* Experience Item 2 */}
              <motion.div
                className="relative pl-10 sm:pl-12 border-l-2 border-[var(--border-color)]"
                variants={fadeIn}
                custom={0.2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px", amount: 0.3 }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 -ml-4 sm:-ml-5 md:-ml-6 rounded-full bg-[var(--primary)] flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[var(--nav-text-hover)]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"></path>
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-3.76 0-7.17-.83-10-2.308z"></path>
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-1 text-xs sm:text-sm font-semibold text-[var(--nav-text)]">
                    2023 - PRESENT

                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                    MOBILE FRONTEND DEVELOPER{" "}

                    <span className="text-[var(--nav-text)]">
                      — UI/UX DESIGNER
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-[var(--nav-text)] leading-relaxed sm:leading-relaxed md:leading-relaxed tracking-wide max-w-full overflow-hidden break-words">
                    As a Mobile Frontend Developer, I specialize in building visually appealing and performance-optimized mobile applications using Flutter. My focus is on crafting clean UI/UX designs that provide a seamless experience across both Android and iOS devices. I have experience integrating APIs, managing responsive layouts, and utilizing Flutter widgets to develop fast, functional, and modern mobile frontends. Whether it's a small business app or a startup MVP, I can transform design concepts into real, working applications that stand out in today's competitive mobile market.
                  </p>
                </motion.div>
              </motion.div>

              {/* Experience Item 3 */}
             
            </div>

            {/* Education Column */}
            <div className="space-y-12">
              <motion.div
                className="relative pl-10 sm:pl-12 border-l-2 border-[var(--border-color)]"
                variants={fadeIn}
                custom={0.3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px", amount: 0.3 }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 -ml-4 sm:-ml-5 md:-ml-6 rounded-full bg-[var(--primary)] flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[var(--nav-text-hover)]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"></path>
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-3.76 0-7.17-.83-10-2.308z"></path>
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-1 text-xs sm:text-sm font-semibold text-[var(--nav-text)]">
                    2023 - PRESENT
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                    AI{" "}
                    <span className="text-[var(--nav-text)]">— Integration </span>
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-[var(--nav-text)] leading-relaxed sm:leading-relaxed md:leading-relaxed tracking-wide max-w-full overflow-hidden break-words">
                    I have a growing interest and working experience in integrating AI-powered tools and technologies into modern applications. From using AI-based APIs for chatbots and data analysis to experimenting with machine learning workflows in Python, I continuously explore innovative solutions to enhance user experience and automation. I stay updated with the latest trends in artificial intelligence and enjoy combining them with web and mobile technologies to create intelligent, future-ready digital products.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative pl-10 sm:pl-12 border-l-2 border-[var(--border-color)]"
                variants={fadeIn}
                custom={0.6}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px", amount: 0.3 }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 -ml-4 sm:-ml-5 md:-ml-6 rounded-full bg-yellow-500 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-1 text-xs sm:text-sm font-semibold text-[var(--nav-text)]">
                    2022 - 2026
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                    BACHELOR DEGREE{" "}
                    <span className="text-[var(--nav-text)]">
                      — SUPERIOR UNIVERSITY LAHORE
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-[var(--nav-text)] leading-relaxed sm:leading-relaxed md:leading-relaxed tracking-wide max-w-full overflow-hidden break-words">
                     I am currently pursuing a Bachelor's degree in Software Engineering (BSSE) from Superior University, Lahore – Gold Campus. My academic journey has equipped me with a solid foundation in core software development principles, including programming, database management, web development, and software design. Being part of a dynamic learning environment has allowed me to work on real-world projects, collaborate in teams, and continuously expand my technical and problem-solving skills to prepare for a successful career in the tech industry.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
