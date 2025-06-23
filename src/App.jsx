// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPalette,
  FaServer,
  FaEnvelope,
  FaArrowRight,
  FaArrowDown,
  FaRegLightbulb,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaCode,
  FaMobileAlt,
  FaVideo,
  FaLaptopCode,
  FaDesktop,
  FaPhone,
  FaWhatsapp
} from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaP } from "react-icons/fa6";

export default function App() {
  // State management
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  // Navigation sections defined in one place for consistency
  const navigationSections = useMemo(
    () => ["home", "services", "work", "testimonials", "contact"],
    []
  );

  // Testimonials data - easily add new testimonials here
  const testimonials = [
    {
      text: "I expected a simple site over a long time, but the next day they surprised me with a stunning, modern website with an amazing UI. Truly, a site worth thousands made in just a day!",
      name: "Ashish Philip",
      position: "CEO",
      company: "Popcone",
      rating: 5,
      avatar: null, // Add image URL here if available
    },
    {
      text: "Hey bro! Your design looks really cool and professional. The color combination is perfect, layout is clean, and overall it's very user-friendly. Great work, keep it going strong!",
      name: "Tamil",
      position: "Student",
      company: "College Project",
      rating: 5,
      avatar: null,
    },
  ];

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) {
        // Use transform for better performance instead of setting top/left directly
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Add smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  // Track scroll position - with throttling for performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentPosition = window.pageYOffset + window.innerHeight / 3;

          for (const section of navigationSections) {
            const element = document.getElementById(section);
            if (element) {
              const { offsetTop, offsetHeight } = element;

              if (
                currentPosition >= offsetTop &&
                currentPosition < offsetTop + offsetHeight
              ) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize active section
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigationSections]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect the email to a service or handle it as needed
    const mailtoLink = `mailto:doodlebyte@gmail.com?subject=${encodeURIComponent(
      `Contact from ${contact.name}`
    )}&body=${encodeURIComponent(
      `Email: ${contact.email}\n\n${contact.message}`
    )}`;

    window.open(mailtoLink, "_blank");
    // Reset the form
    setContact({ name: "", email: "", message: "" });
  };

  // Memoized animation variants for better performance
  const fadeInUp = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
    }),
    []
  );

  return (
    <div className="font-sans text-white min-h-screen bg-black overflow-hidden relative">
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full border-2 border-[#80CBC4] pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{
          transition:
            "transform 0.1s ease, width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
      />

      {/* Background gradients - optimized for performance */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-[#80CBC4]/20 via-transparent to-transparent opacity-60"
          style={{
            transform: `translate(${
              (mousePosition.x / (window.innerWidth || 1)) * 20 - 10
            }px, ${(mousePosition.y / (window.innerHeight || 1)) * 20 - 10}px)`,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-full h-full bg-gradient-radial from-[#FFB433]/20 via-transparent to-transparent opacity-40"
          style={{
            transform: `translate(${
              (mousePosition.x / (window.innerWidth || 1)) * -20 + 10
            }px, ${
              (mousePosition.y / (window.innerHeight || 1)) * -20 + 10
            }px)`,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Animated particles/dots background - reduced number for better performance */}
      <div className="fixed inset-0 -z-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            initial={{
              x: Math.random() * (window.innerWidth || 1000),
              y: Math.random() * (window.innerHeight || 800),
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.4 + 0.1,
            }}
            animate={{
              x: [
                null,
                Math.random() * (window.innerWidth || 1000),
                Math.random() * (window.innerWidth || 1000),
              ],
              y: [
                null,
                Math.random() * (window.innerHeight || 800),
                Math.random() * (window.innerHeight || 800),
              ],
              opacity: [
                null,
                Math.random() * 0.4 + 0.1,
                Math.random() * 0.4 + 0.1,
              ],
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
            }}
          />
        ))}
      </div>

      {/* Navbar - Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <a href="#home" className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#80CBC4] to-[#FFB433] flex items-center justify-center p-[2px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#80CBC4] to-[#FFB433] opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-[1px] rounded-[9px] bg-black/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <FaRegLightbulb className="text-white" size={20} />
                  </div>
                </div>
                <h1 className="text-2xl font-bold">
                  <span className="text-[#80CBC4]">Doodle</span>
                  <span className="text-[#FFB433]">Byte</span>
                </h1>
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-6 lg:gap-10 font-medium">
              {navigationSections.map((section) => (
                <motion.li
                  key={section}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <a
                    href={`#${section}`}
                    className={`relative px-1 py-2 transition-all duration-300 uppercase tracking-wider text-sm font-medium ${
                      activeSection === section
                        ? "text-[#80CBC4]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {section === "home"
                      ? "Home"
                      : section.charAt(0).toUpperCase() + section.slice(1)}
                    <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#80CBC4] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                    {activeSection === section && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#80CBC4] to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-white/5 transition-colors relative"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden backdrop-blur-xl bg-black/40 overflow-hidden border-b border-white/10"
            >
              <div className="px-6 py-6">
                <ul className="flex flex-col gap-4">
                  {navigationSections.map((section, index) => (
                    <motion.li
                      key={section}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                      }}
                    >
                      <a
                        href={`#${section}`}
                        className={`block py-2 text-lg ${
                          activeSection === section
                            ? "text-[#80CBC4]"
                            : "text-white/70"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {section === "home"
                          ? "Home"
                          : section.charAt(0).toUpperCase() + section.slice(1)}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - Glassmorphism */}
      <motion.section
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 pt-20"
      >
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 inline-block">
                <span className="bg-gradient-to-r from-[#80CBC4] to-[#FFB433] px-4 py-1 rounded-full text-sm font-medium uppercase tracking-wider">
                  Design Studio
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Craft <span className="text-[#80CBC4]">Digital</span>{" "}
                Experiences
              </h2>

              <p className="text-base sm:text-lg max-w-xl mb-8 text-white/70 leading-relaxed">
                We're a design and development studio creating websites,
                applications, and digital brands that help businesses connect
                with their audience.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.a
                  href="#contact"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 15px 2px rgba(128, 203, 196, 0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 bg-gradient-to-r from-[#80CBC4] to-[#B4EBE6] text-black rounded-xl font-medium flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <span className="relative z-10 font-medium">
                    Start a Project
                  </span>
                  <FaArrowRight className="ml-1 relative z-10" size={14} />
                </motion.a>

                <motion.a
                  href="#work"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 bg-transparent border border-white/20 text-white rounded-xl font-medium flex items-center justify-center gap-2 backdrop-blur-sm hover:bg-white/5 transition-colors"
                >
                  View Our Work
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#80CBC4]/20 to-[#FFB433]/20 rounded-2xl blur-xl opacity-70"></div>
                <div className="w-full h-[400px] rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-1 relative overflow-hidden shadow-2xl">
                  {/* Abstract design elements */}
                  <div className="absolute top-5 left-5 w-20 h-20 rounded-full bg-gradient-to-br from-[#80CBC4]/30 to-transparent blur-md"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-gradient-to-tl from-[#FFB433]/30 to-transparent blur-xl"></div>

                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    {/* Design grid lines */}
                    <svg
                      className="absolute inset-0 w-full h-full opacity-20"
                      width="100%"
                      height="100%"
                      aria-hidden="true"
                    >
                      <defs>
                        <pattern
                          id="grid"
                          width="40"
                          height="40"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>

                    {/* Design elements */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full px-10">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                          <FaPalette className="text-[#80CBC4]" size={20} />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                          <FaCode className="text-[#FFB433]" size={20} />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                          <FaDesktop className="text-white/80" size={20} />
                        </div>
                      </div>

                      <div className="h-2 w-32 bg-gradient-to-r from-[#80CBC4] to-[#FFB433] rounded-full mb-6"></div>
                      <div className="w-3/4 h-10 bg-white/10 rounded-lg mb-4"></div>
                      <div className="w-full h-28 bg-white/5 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a
            href="#services"
            className="block p-2 text-white/50 hover:text-white transition-colors"
            aria-label="Scroll to services"
          >
            <FaArrowDown size={20} />
          </a>
        </div>
      </motion.section>

      {/* Services Section - Glassmorphism */}
      <section
        id="services"
        className="min-h-screen flex items-center py-20 sm:py-28 px-4 sm:px-6 relative"
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h3 className="text-3xl sm:text-4xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Our Services</span>
              <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-gradient-to-r from-transparent via-[#80CBC4] to-transparent"></span>
            </h3>
            <p className="text-white/70 max-w-xl mx-auto mt-6 text-base sm:text-lg">
              We offer a range of digital services to help bring your vision to
              life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <FaCode />,
                color: "#80CBC4",
                title: "Frontend Development",
                description:
                  "Modern, responsive interfaces built with React, ensuring seamless user experiences across all devices.",
              },
              {
                icon: <FaServer />,
                color: "#FFB433",
                title: "Backend Development",
                description:
                  "Robust server solutions that power your applications with reliable and scalable infrastructure.",
              },
              {
                icon: <FaPalette />,
                color: "#B4EBE6",
                title: "UI/UX Design",
                description:
                  "Intuitive and appealing user interfaces designed to enhance user engagement and satisfaction.",
              },
              {
                icon: <FaMobileAlt />,
                color: "#80CBC4",
                title: "Branding",
                description:
                  "Develop a cohesive visual identity that communicates your values and resonates with your audience.",
              },
              {
                icon: <FaLaptopCode />,
                color: "#FFB433",
                title: "Web Applications",
                description:
                  "Custom web applications tailored to your business needs with focus on performance and usability.",
              },
              {
                icon: <FaVideo />,
                color: "#B4EBE6",
                title: "Video Editing",
                description:
                  "Professional video editing to create engaging content for marketing, presentations, or social media.",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-14 h-14 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-5 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#80CBC4]/10 to-[#FFB433]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div style={{ color: service.color }} className="text-xl">
                    {service.icon}
                  </div>
                </div>
                <h4 className="font-bold text-xl mb-3 group-hover:text-[#80CBC4] transition-colors duration-300">
                  {service.title}
                </h4>
                <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section - Glassmorphism */}
      <section
        id="work"
        className="min-h-screen flex items-center py-20 sm:py-28 px-4 sm:px-6 relative"
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h3 className="text-3xl sm:text-4xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Our Work</span>
              <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-gradient-to-r from-transparent via-[#FFB433] to-transparent"></span>
            </h3>
            <p className="text-white/70 max-w-xl mx-auto mt-6 text-base sm:text-lg">
              Here are some of the projects we've had the privilege to work on.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {[
              {
                title: "Digizen",
                type: "Blog & Content Platform",
                description:
                  "A full website for Digizen, a blog article sharing company. Includes content management, user authentication, and responsive design.",
                technologies: ["React", "Node.js", "MongoDB"],
                web_url: "https://digizenhub.in/",
                color: "#80CBC4",
              },
              {
                title: "Student Portfolio",
                type: "Personal Website",
                description:
                  "A clean, professional portfolio website for a college student, showcasing their projects, skills, and academic achievements.",
                technologies: ["HTML/CSS", "JavaScript", "Figma"],
                web_url: "#",
                color: "#FFB433",
              },
              {
                title: "Popcone",
                type: "Brand Showcase",
                description:
                  "A vibrant brand showcase website for Popcone, featuring their products, promotions, and a store locator.",
                technologies: ["React", "TailwindCSS", "Firebase"],
                web_url: "https://popcone.shop/",
                color: "#AF52BF",
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#80CBC4]/10 to-[#FFB433]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="h-56 bg-black/20 relative flex items-center justify-center overflow-hidden">
                  {/* Abstract design elements in project preview */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/60 to-transparent"></div>
                    <div
                      className="absolute bottom-0 right-0 w-56 h-56 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${project.color}30 0%, transparent 70%)`,
                        filter: "blur(30px)",
                      }}
                    ></div>
                  </div>

                  {/* Grid lines */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    width="100%"
                    height="100%"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id={`grid-${i}`}
                        width="30"
                        height="30"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 30 0 L 0 0 0 30"
                          fill="none"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${i})`} />
                  </svg>

                  <h3 className="text-3xl font-bold text-center z-10 relative">
                    <span
                      className="bg-clip-text text-transparent bg-gradient-to-r"
                      style={{
                        backgroundImage:
                          i % 2 === 0
                            ? "linear-gradient(to right, #80CBC4, #FFFFFF)"
                            : "linear-gradient(to right, #FFB433, #FFFFFF)",
                      }}
                    >
                      {project.title}
                    </span>
                  </h3>

                  <div className="absolute top-4 right-4 px-3 py-1 backdrop-blur-md bg-white/10 border border-white/20 rounded-full text-xs">
                    {project.type}
                  </div>
                </div>

                <div className="p-6 sm:p-7 relative">
                  <p className="text-white/70 mb-5">{project.description}</p>

                  {/* Technologies used */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-black/30 border border-white/10 text-xs rounded-full backdrop-blur-sm"
                        style={{ color: project.color }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <motion.a
                    href={project.web_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-sm font-medium"
                    style={{ color: project.color }}
                  >
                    View Project <FaArrowRight size={12} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12 sm:mt-16 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-[#80CBC4]/10 to-transparent blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-br from-[#FFB433]/10 to-transparent blur-3xl"></div>

            <h4 className="font-bold text-xl sm:text-2xl mb-3">
              Looking for more examples?
            </h4>
            <p className="text-white/70 max-w-xl mx-auto mb-6">
              We're a new studio actively expanding our portfolio. Contact us to
              discuss how we can create something amazing together.
            </p>
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 15px 2px rgba(255, 180, 51, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-7 py-3.5 bg-gradient-to-r from-[#FFB433] to-[#FFB433]/80 text-black rounded-xl font-medium relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <span className="relative z-10">Start a Conversation</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - Glassmorphism */}
      <section
        id="testimonials"
        className="min-h-screen flex items-center py-20 sm:py-28 px-4 sm:px-6 relative"
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h3 className="text-3xl sm:text-4xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Client Feedback</span>
              <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-gradient-to-r from-transparent via-[#B4EBE6] to-transparent"></span>
            </h3>
            <p className="text-white/70 max-w-xl mx-auto mt-6 text-base sm:text-lg">
              Here's what our clients have to say about working with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group h-full flex flex-col"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br from-[#80CBC4]/10 to-transparent blur-xl opacity-60"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-[#FFB433]/10 to-transparent blur-xl opacity-60"></div>

                {/* Quote icon */}
                <div className="text-4xl text-[#80CBC4]/20 mb-4">"</div>

                {/* Testimonial content */}
                <p className="text-white/80 mb-6 relative z-10 flex-grow">
                  {testimonial.text}
                </p>

                {/* Client info */}
                <div className="flex items-center gap-4 relative z-10 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden backdrop-blur-sm bg-black/40 border border-white/10 flex items-center justify-center">
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-lg font-medium"
                        style={{
                          background: index % 2 === 0 ? "#80CBC4" : "#FFB433",
                        }}
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-white group-hover:text-[#80CBC4] transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-white/50 text-sm">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Rating stars if available */}
                {testimonial.rating && (
                  <div className="absolute top-6 right-6 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < testimonial.rating
                            ? "text-[#FFB433]"
                            : "text-white/20"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12 sm:mt-16 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-[#80CBC4]/10 to-transparent blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-br from-[#FFB433]/10 to-transparent blur-3xl"></div>

            <h4 className="font-bold text-xl sm:text-2xl mb-3">
              Ready to join our happy clients?
            </h4>
            <p className="text-white/70 max-w-xl mx-auto mb-6">
              Let's collaborate to bring your vision to life and create
              something amazing together.
            </p>
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 15px 2px rgba(128, 203, 196, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-7 py-3.5 bg-gradient-to-r from-[#80CBC4] to-[#B4EBE6] text-black rounded-xl font-medium relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <span className="relative z-10">Get in Touch</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Contact - Glassmorphism */}
      <section
        id="contact"
        className="min-h-screen flex items-center py-20 sm:py-28 px-4 sm:px-6 relative"
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h3 className="text-3xl sm:text-4xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Get In Touch</span>
              <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-gradient-to-r from-transparent via-[#80CBC4] to-transparent"></span>
            </h3>
            <p className="text-white/70 max-w-xl mx-auto mt-6 text-base sm:text-lg">
              Have a project in mind? We'd love to hear about it. Send us a
              message and let's create something great together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 h-full relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#80CBC4]/10 blur-3xl"></div>

                <h4 className="font-bold text-xl sm:text-2xl mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#80CBC4]"></span>
                  <span>Contact Info</span>
                </h4>

                <div className="space-y-8 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl backdrop-blur-sm bg-black/30 border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <FaEnvelope className="text-[#80CBC4]" size={16} />
                    </div>
                    <div>
                      <p className="text-white/50 text-sm mb-1">Email us at</p>
                      <a
                        href="mailto:doodlebyte.studio@gmail.com"
                        className="text-white font-medium text-sm hover:text-[#80CBC4] transition-colors"
                      >
                        doodlebyte.studio@gmail.com
                      </a>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-lg mb-4">Follow Us</h5>
                    <div className="flex gap-4">
                      {[
                        { icon: FaPhone, label: "Phone", url: "tel:+91 7358004687" },
                        { icon: FaWhatsapp, label: "WhatsApp", url: "https://wa.me/+916384260325" },
                        { icon: FaLinkedin, label: "LinkedIn", url: "https://www.linkedin.com/company/doodlebyte/" },
                      ].map((item, i) => (
                        <motion.a
                          key={i}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -3 }}
                          className="group relative"
                          aria-label={item.label}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#80CBC4]/30 to-[#FFB433]/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="w-12 h-12 rounded-xl backdrop-blur-sm bg-black/30 border border-white/10 flex flex-col items-center justify-center hover:border-white/30 transition-colors relative">
                            <item.icon size={16} />
                            <span className="text-[8px] mt-1 text-white/60">
                              {item.label}
                            </span>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <form
                onSubmit={handleSubmit}
                className="backdrop-blur-lg bg-white/5 border border-white/10 p-6 sm:p-7 rounded-2xl space-y-6 relative overflow-hidden"
              >
                <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#FFB433]/5 blur-3xl"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative z-10">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-white/80"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full p-3 rounded-xl bg-black/30 border border-white/10 focus:border-[#80CBC4] focus:outline-none text-white backdrop-blur-sm"
                      value={contact.name}
                      onChange={(e) =>
                        setContact({ ...contact, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="relative z-10">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-white/80"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="w-full p-3 rounded-xl bg-black/30 border border-white/10 focus:border-[#80CBC4] focus:outline-none text-white backdrop-blur-sm"
                      value={contact.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="relative z-10">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-white/80"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    className="w-full p-3 rounded-xl bg-black/30 border border-white/10 focus:border-[#80CBC4] focus:outline-none text-white backdrop-blur-sm"
                    rows="5"
                    value={contact.message}
                    onChange={(e) =>
                      setContact({ ...contact, message: e.target.value })
                    }
                    required
                  ></textarea>
                </div>

                <div className="flex items-center gap-2 relative z-10">
                  <input
                    type="checkbox"
                    id="privacy"
                    className="rounded text-[#80CBC4] focus:ring-[#80CBC4] bg-black/30 border-white/20"
                    required
                  />
                  <label htmlFor="privacy" className="text-sm text-white/60">
                    I agree to the privacy policy and terms of service.
                  </label>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 15px 2px rgba(128, 203, 196, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl font-medium bg-gradient-to-r from-[#80CBC4] to-[#B4EBE6] text-black text-sm flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <span className="relative z-10 font-medium">
                    Send Message
                  </span>
                  <FaArrowRight size={12} className="relative z-10" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Glassmorphism */}
      <footer className="border-t border-white/10 py-10 sm:py-12 px-4 sm:px-6 backdrop-blur-xl bg-black/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute -top-80 left-1/3 w-64 h-64 rounded-full bg-[#80CBC4]/5 blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-64 h-64 rounded-full bg-[#FFB433]/5 blur-3xl"></div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <a
                href="#home"
                className="flex items-center gap-3 mb-4 inline-block"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#80CBC4] to-[#FFB433] flex items-center justify-center p-[2px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#80CBC4] to-[#FFB433] opacity-75"></div>
                  <div className="absolute inset-[1px] rounded-[9px] bg-black/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <FaRegLightbulb className="text-white text-lg" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold">
                  <span className="text-[#80CBC4]">Doodle</span>
                  <span className="text-[#FFB433]">Byte</span>
                </h1>
              </a>
              <p className="text-white/60 mb-4">
                A creative design and development studio focused on crafting
                exceptional digital experiences.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigationSections.map((section) => (
                  <li key={section}>
                    <a
                      href={`#${section}`}
                      className="text-white/60 hover:text-[#80CBC4] transition-colors"
                    >
                      {section === "home"
                        ? "Home"
                        : section.charAt(0).toUpperCase() + section.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Get In Touch</h4>
              <a
                href="mailto:doodlebyte.studio@gmail.com"
                className="text-white/60 hover:text-[#80CBC4] transition-colors mb-2 inline-block"
              >
                doodlebyte.studio@gmail.com
              </a>
              <div className="flex gap-3 mt-4">
                {[
                  { icon: FaGithub, url: "#", label: "GitHub" },
                  { icon: FaLinkedin, url: "#", label: "LinkedIn" },
                  { icon: FaTwitter, url: "#", label: "Twitter" },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    aria-label={item.label}
                  >
                    <item.icon size={14} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} DoodleByte. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-white/40 text-sm hover:text-white/60 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white/40 text-sm hover:text-white/60 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
