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
  FaWhatsapp,
  FaCamera,
  FaBlog,
  FaShoppingCart,
  FaGraduationCap,
  FaUniversity,
  FaUtensils,
  FaRocket,
  FaStar,
  FaGem,
  FaMoon,
  FaSun,
  FaMagic, // New icon for AI/integration
  FaFigma, // New icon for design tools
  FaDumbbell, // New icon for fitness app
  FaHome,
  FaInstagram,
  FaWhatsappSquare, // New icon for smart home
  FaCoins, // New icon for pricing
  FaBriefcase, // Another icon for business
  FaUsers, // Another icon for enterprise/team
} from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, useEffect, useRef, useMemo } from "react";

export default function App() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
    plan: "",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  // Theme colors - Modern Purple-Teal color scheme
  const themeColors = {
    dark: {
      primary: "#9333ea", // Purple-700
      secondary: "#a855f7", // Purple-500
      accent: "#14b8a6", // Teal-500
      background: "#0F172A", // Slate-900
      surface: "#1E293B", // Slate-800
      text: "#F8FAFC", // Slate-50
      textSecondary: "#CBD5E1", // Slate-300
      border: "#334155", // Slate-700
    },
    light: {
      primary: "#7e22ce", // Purple-800
      secondary: "#9333ea", // Purple-700
      accent: "#0d9488", // Teal-600
      background: "#F8FAFC", // Slate-50
      surface: "#FFFFFF", // White
      text: "#0F172A", // Slate-900
      textSecondary: "#475569", // Slate-600
      border: "#E2E8F0", // Slate-200
    },
  };

  const theme = isDarkMode ? themeColors.dark : themeColors.light;

  // Navigation sections defined in one place for consistency
  const navigationSections = useMemo(
    () => ["home", "services", "work", "pricing", "testimonials", "contact"],
    []
  );

  // Testimonials data - easily add new testimonials here
  const testimonials = [
    {
      text: "DoodleByte transformed our vision into a stunning, highly functional website. Their attention to detail and creative approach truly set them apart. The UI is simply amazing!",
      name: "Ashish Philip",
      position: "CEO",
      company: "Popcone",
      rating: 5,
      avatar: null,
    },
    {
      text: "The design work is incredibly professional and visually appealing. The color schemes and layouts are clean and intuitive, making for an excellent user experience. Highly recommended!",
      name: "Tamil",
      position: "Student",
      company: "College Project",
      rating: 5,
      avatar: null,
    },
    {
      text: "Our photography portfolio website is absolutely breathtaking. The responsive design works flawlessly, beautifully showcasing my work on all devices. A truly fantastic job!",
      name: "Sarvesh Raj",
      position: "Photographer",
      company: "SarveshRaj Studio",
      rating: 5,
      avatar: null,
    },
    {
      text: "The team delivered a modern and clean blog website that exceeded our expectations. The content management system is incredibly user-friendly, making updates a breeze.",
      name: "Popcone Team",
      position: "Content Creator",
      company: "Popcone Blog",
      rating: 5,
      avatar: null,
    },
  ];

  // Pricing data
  const pricingTiers = [
    {
      name: "Students & Startups",
      price: "499+",
      unit: "one-time",
      features: [
        "Basic Website/Portfolio",
        "Responsive Design",
        "24/7 Support",
        "Up to 5 pages",
        "Basic SEO Optimization",
      ],
      icon: FaGraduationCap,
      color: "#a855f7",
      buttonText: "Get Started",
      value: "Students & Startups (Basic Plan)",
    },
    {
      name: "Small-Scale Businesses",
      price: "1999+",
      unit: "per month",
      features: [
        "Custom Web Application",
        "Full Stack Development",
        "3-month Support & Maintenance",
        "E-commerce Integration",
        "Advanced SEO & Analytics",
      ],
      icon: FaBriefcase,
      color: "#14b8a6",
      buttonText: "Choose Plan",
      isHighlighted: true,
      value: "Small-Scale Businesses (Standard Plan)",
    },
    {
      name: "Enterprise Solutions",
      price: "Contact Us",
      unit: "",
      features: [
        "Complex Enterprise Systems",
        "Dedicated Development Team",
        "Custom Integrations",
        "Ongoing Premium Support",
        "Scalability & Security Audits",
      ],
      icon: FaUsers,
      color: "#9333ea",
      buttonText: "Inquire Now",
      value: "Enterprise Solutions (Premium Plan)",
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
  const mailtoLink = `mailto:doodlebyte.studio@gmail.com?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${contact.name}`
  )}&body=${encodeURIComponent(
    `Email: ${contact.email}\nPlan: ${contact.plan}\n\n${contact.message}`
  )}`; // Included contact.plan in the email body

  window.open(mailtoLink, "_blank");
  // Reset the form
  setContact({ name: "", email: "", message: "", plan: "" }); // Reset plan as well
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
    <div
      className={`font-sans min-h-screen overflow-hidden relative transition-all duration-500 ${
        isDarkMode ? "bg-slate-900 text-slate-50" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={`fixed w-8 h-8 rounded-full border-2 pointer-events-none z-[100] mix-blend-difference hidden md:block transition-colors duration-300`}
        style={{
          borderColor: theme.primary,
          transition:
            "transform 0.1s ease, width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
      />

      {/* Background gradients - optimized for performance */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ${
            isDarkMode
              ? "bg-gradient-radial from-purple-700/20 via-transparent to-transparent opacity-60"
              : "bg-gradient-radial from-purple-500/30 via-transparent to-transparent opacity-40"
          }`}
          style={{
            transform: `translate(${
              (mousePosition.x / (window.innerWidth || 1)) * 20 - 10
            }px, ${(mousePosition.y / (window.innerHeight || 1)) * 20 - 10}px)`,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div
          className={`absolute bottom-0 right-0 w-full h-full transition-all duration-500 ${
            isDarkMode
              ? "bg-gradient-radial from-teal-500/20 via-transparent to-transparent opacity-40"
              : "bg-gradient-radial from-teal-400/25 via-transparent to-transparent opacity-30"
          }`}
          style={{
            transform: `translate(${
              (mousePosition.x / (window.innerWidth || 1)) * -20 + 10
            }px, ${
              (mousePosition.y / (window.innerHeight || 1)) * -20 + 10
            }px)`,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div
          className={`absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none ${
            isDarkMode ? 'bg-[url("/noise.png")]' : 'bg-[url("/noise.png")]'
          }`}
        ></div>
      </div>

      {/* Animated particles/dots background - reduced number for better performance */}
      <div className="fixed inset-0 -z-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              isDarkMode ? "bg-slate-50/10" : "bg-slate-900/10"
            } transition-colors duration-500`}
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
          isDarkMode
            ? "bg-slate-900/80 border-slate-700/50"
            : "bg-slate-50/80 border-slate-200/50"
        }`}
      >
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
                <div>
                  <h1 className="text-2xl font-bold leading-tight">
                    <span className="text-purple-500">Doodle</span>
                    <span className="text-teal-500">Byte</span>
                  </h1>
                  <p
                    className={`text-xs font-medium tracking-wide ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Design Studio
                  </p>
                </div>
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10">
              <ul className="flex gap-6 lg:gap-10 font-medium">
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
                          ? "text-purple-500"
                          : isDarkMode
                          ? "text-slate-400 hover:text-slate-100"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {section === "home"
                        ? "Home"
                        : section.charAt(0).toUpperCase() + section.slice(1)}
                      <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                      {activeSection === section && (
                        <motion.span
                          layoutId="navIndicator"
                          className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Theme Toggle Button */}
              <motion.button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-slate-800/50 border-slate-600 hover:bg-slate-700/50"
                    : "bg-slate-100/50 border-slate-300 hover:bg-slate-200/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isDarkMode ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {isDarkMode ? (
                    <FaSun className="text-yellow-400" size={16} />
                  ) : (
                    <FaMoon className="text-purple-700" size={16} />
                  )}
                </motion.div>
              </motion.button>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden flex items-center gap-3">
              {/* Mobile Theme Toggle */}
              <motion.button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-slate-800/50 border-slate-600 hover:bg-slate-700/50"
                    : "bg-slate-100/50 border-slate-300 hover:bg-slate-200/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isDarkMode ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {isDarkMode ? (
                    <FaSun className="text-yellow-400" size={14} />
                  ) : (
                    <FaMoon className="text-purple-700" size={14} />
                  )}
                </motion.div>
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-full transition-colors relative ${
                  isDarkMode ? "hover:bg-slate-800/50" : "hover:bg-slate-100/50"
                }`}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <div
                  className={`absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                    isDarkMode ? "bg-slate-800/50" : "bg-slate-100/50"
                  }`}
                ></div>
                {isMenuOpen ? (
                  <HiX
                    size={24}
                    className={isDarkMode ? "text-slate-100" : "text-slate-900"}
                  />
                ) : (
                  <HiMenu
                    size={24}
                    className={isDarkMode ? "text-slate-100" : "text-slate-900"}
                  />
                )}
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
              className={`md:hidden backdrop-blur-xl overflow-hidden border-b transition-all duration-300 ${
                isDarkMode
                  ? "bg-slate-800/90 border-slate-700/50"
                  : "bg-slate-100/90 border-slate-200/50"
              }`}
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
                        className={`block py-2 text-lg transition-colors duration-300 ${
                          activeSection === section
                            ? "text-purple-500"
                            : isDarkMode
                            ? "text-slate-300 hover:text-slate-100"
                            : "text-slate-700 hover:text-slate-900"
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
              <div className="mb-8 inline-block">
                <span
                  className={`bg-gradient-to-r from-purple-500 to-purple-600 px-5 py-2 rounded-full text-sm font-medium uppercase tracking-wider shadow-lg ${
                    isDarkMode ? "text-white" : "text-white"
                  }`}
                >
                  <FaRocket className="inline mr-2" size={12} />
                  Digital Creators
                </span>
              </div>

              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Crafting <span className="text-purple-500">Exceptional</span>{" "}
                <span className="relative inline-block">
                  Digital Art
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"></div>
                </span>
              </h2>

              <p
                className={`text-base sm:text-lg max-w-xl mb-10 leading-relaxed ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                We are a creative studio dedicated to building captivating web
                experiences, innovative applications, and powerful digital
                brands that leave a lasting impression.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.a
                  href="#work"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: `0 0 20px 3px ${
                      isDarkMode
                        ? "rgba(147, 51, 234, 0.4)"
                        : "rgba(147, 51, 234, 0.3)"
                    }`,
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 relative overflow-hidden group shadow-lg"
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <FaGem className="relative z-10" size={16} />
                  <span className="relative z-10 font-bold">
                    View Our Projects
                  </span>
                  <FaArrowRight className="relative z-10" size={14} />
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-8 py-4 bg-transparent border-2 rounded-xl font-medium flex items-center justify-center gap-3 backdrop-blur-sm transition-colors ${
                    isDarkMode
                      ? "border-slate-600 text-slate-100 hover:bg-slate-800/20"
                      : "border-slate-300 text-slate-900 hover:bg-slate-100/20"
                  }`}
                >
                  <FaEnvelope size={14} />
                  Get In Touch
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
                <div
                  className={`absolute -inset-4 bg-gradient-to-br rounded-2xl blur-xl opacity-70 ${
                    isDarkMode
                      ? "from-purple-500/20 to-teal-500/20"
                      : "from-purple-400/30 to-teal-400/30"
                  }`}
                ></div>
                <div
                  className={`w-full h-[400px] rounded-2xl backdrop-blur-md border p-1 relative overflow-hidden shadow-2xl ${
                    isDarkMode
                      ? "bg-slate-800/20 border-slate-700/30"
                      : "bg-slate-100/20 border-slate-200/30"
                  }`}
                >
                  {/* Abstract design elements */}
                  <div
                    className={`absolute top-5 left-5 w-20 h-20 rounded-full blur-md ${
                      isDarkMode
                        ? "bg-gradient-to-br from-purple-500/30 to-transparent"
                        : "bg-gradient-to-br from-purple-400/40 to-transparent"
                    }`}
                  ></div>
                  <div
                    className={`absolute bottom-10 right-10 w-32 h-32 rounded-full blur-xl ${
                      isDarkMode
                        ? "bg-gradient-to-tl from-teal-500/30 to-transparent"
                        : "bg-gradient-to-tl from-teal-400/40 to-transparent"
                    }`}
                  ></div>

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
                            stroke={isDarkMode ? "white" : "black"}
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>

                    {/* Design elements */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full px-10">
                      <div className="flex items-center gap-4 mb-8">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isDarkMode ? "bg-slate-700/50" : "bg-slate-200/50"
                          }`}
                        >
                          <FaPalette className="text-purple-500" size={20} />
                        </div>
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isDarkMode ? "bg-slate-700/50" : "bg-slate-200/50"
                          }`}
                        >
                          <FaCode className="text-teal-500" size={20} />
                        </div>
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isDarkMode ? "bg-slate-700/50" : "bg-slate-200/50"
                          }`}
                        >
                          <FaDesktop
                            className={`${
                              isDarkMode ? "text-slate-300" : "text-slate-600"
                            }`}
                            size={20}
                          />
                        </div>
                      </div>

                      <div className="h-2 w-32 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full mb-6"></div>
                      <div
                        className={`w-3/4 h-10 rounded-lg mb-4 ${
                          isDarkMode ? "bg-slate-700/50" : "bg-slate-200/50"
                        }`}
                      ></div>
                      <div
                        className={`w-full h-28 rounded-lg ${
                          isDarkMode ? "bg-slate-700/30" : "bg-slate-200/30"
                        }`}
                      ></div>
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
            className={`block p-2 transition-colors ${
              isDarkMode
                ? "text-slate-400 hover:text-slate-100"
                : "text-slate-600 hover:text-slate-900"
            }`}
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
              <span className="relative z-10">Our Expertise</span>
              <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></span>
            </h3>
            <p
              className={`max-w-xl mx-auto mt-6 text-base sm:text-lg ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              We offer a comprehensive suite of digital services designed to
              elevate your brand and captivate your audience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <FaCode />,
                color: "#a855f7", // Purple-500
                title: "Frontend Development",
                description:
                  "Building visually stunning and highly interactive user interfaces with modern frameworks like React and Next.js.",
              },
              {
                icon: <FaServer />,
                color: "#14b8a6", // Teal-500
                title: "Backend Development",
                description:
                  "Crafting robust, scalable, and secure server-side applications and APIs for seamless data management.",
              },
              {
                icon: <FaPalette />,
                color: "#9333ea", // Purple-700
                title: "UI/UX Design",
                description:
                  "Designing intuitive and engaging user experiences, from wireframing to pixel-perfect mockups with Figma.",
              },
              {
                icon: <FaMobileAlt />,
                color: "#a855f7",
                title: "Mobile App Development",
                description:
                  "Developing native and cross-platform mobile applications that offer exceptional performance and user satisfaction.",
              },
              {
                icon: <FaLaptopCode />,
                color: "#14b8a6",
                title: "Web Applications",
                description:
                  "Delivering custom web applications tailored to your unique business logic, focusing on efficiency and user-friendliness.",
              },
              {
                icon: <FaVideo />,
                color: "#9333ea",
                title: "Digital Content Creation",
                description:
                  "Producing compelling video, graphic, and written content to enhance your brand storytelling and online presence.",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`backdrop-blur-lg border rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden hover:shadow-2xl ${
                  isDarkMode
                    ? "bg-slate-800/20 border-slate-700/30 hover:border-slate-600/50"
                    : "bg-slate-100/20 border-slate-200/30 hover:border-slate-300/50"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDarkMode
                      ? "from-slate-700/20 to-transparent"
                      : "from-slate-200/20 to-transparent"
                  }`}
                ></div>
                <div
                  className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, ${service.color}30 0%, transparent 70%)`,
                  }}
                ></div>

                <div
                  className={`w-16 h-16 rounded-2xl backdrop-blur-sm border flex items-center justify-center mb-6 relative group-hover:scale-105 transition-transform duration-300 ${
                    isDarkMode
                      ? "bg-slate-800/50 border-slate-700/50"
                      : "bg-slate-100/50 border-slate-200/50"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div
                    style={{ color: service.color }}
                    className="text-2xl relative z-10"
                  >
                    {service.icon}
                  </div>
                  <div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
                    style={{ backgroundColor: service.color }}
                  ></div>
                </div>

                <h4
                  className={`font-bold text-xl mb-4 group-hover:text-purple-500 transition-colors duration-300 ${
                    isDarkMode ? "text-slate-100" : "text-slate-900"
                  }`}
                >
                  {service.title}
                </h4>
                <p
                  className={`group-hover:text-opacity-100 transition-colors duration-300 leading-relaxed ${
                    isDarkMode
                      ? "text-slate-400 group-hover:text-slate-200"
                      : "text-slate-600 group-hover:text-slate-800"
                  }`}
                >
                  {service.description}
                </p>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/20 to-teal-500/20 flex items-center justify-center">
                    <FaArrowRight size={12} style={{ color: service.color }} />
                  </div>
                </div>
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
              <span className="relative z-10">Our Portfolio</span>
              <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></span>
            </h3>
            <p
              className={`max-w-xl mx-auto mt-6 text-base sm:text-lg ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Explore a selection of our most recent and impactful projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                title: "Digizen",
                type: "Blog & Content Platform",
                description:
                  "A full-featured platform for seamless blog content sharing, complete with robust content management and secure user authentication.",
                technologies: ["React", "Node.js", "MongoDB"],
                web_url: "https://digizenhub.in/",
                color: "#a855f7", // Purple-500
                icon: <FaBlog />,
              },
              {
                title: "SarveshRaj Photography",
                type: "Photography Portfolio",
                description:
                  "An elegant and responsive online portfolio to beautifully showcase professional photography work with a stunning gallery system.",
                technologies: ["React", "TailwindCSS", "JavaScript"],
                web_url: "https://sarveshraj-photography.onrender.com/",
                color: "#14b8a6", // Teal-500
                icon: <FaCamera />,
              },
              {
                title: "Popcone Blog",
                type: "Interactive Blog Platform",
                description:
                  "A dynamic blog for Popcone, offering intuitive content publishing, engaging user features, and a sleek, modern design.",
                technologies: ["Next.js", "Cloudinary", "Firebase"],
                web_url: "https://popcone-blog.onrender.com/",
                color: "#9333ea", // Purple-700
                icon: <FaBlog />,
              },
              {
                title: "Popcone Shop",
                type: "E-commerce Platform",
                description:
                  "A vibrant e-commerce solution for Popcone, featuring a seamless shopping experience, secure payments, and engaging product displays.",
                technologies: ["React", "TailwindCSS", "Firebase"],
                web_url: "https://popcone.shop/",
                color: "#a855f7",
                icon: <FaShoppingCart />,
              },
              {
                title: "SAAP",
                type: "College Portal",
                description:
                  "A comprehensive portal for college students to manage their achievements, awards and more.",
                technologies: ["React", "TailwindCSS", "Firebase"],
                web_url: "https://saapsairamcse.vercel.app/",
                color: "#14b8a6",
                icon: <FaUniversity />,
              },
              {
                title: "Zcan",
                type: "Canteen Food Ordering",
                description:
                  " A user-friendly platform for canteen food ordering, allowing students to browse menus, place orders, and manage their food preferences.",
                technologies: ["React", "PhonePe", "Firebase"],
                web_url: "https://zcan.vercel.app/",
                color: "#9333ea",
                icon: <FaUtensils />,
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`backdrop-blur-lg border rounded-2xl overflow-hidden group relative ${
                  isDarkMode
                    ? "bg-slate-800/20 border-slate-700/30"
                    : "bg-slate-100/20 border-slate-200/30"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div
                  className={`h-64 relative flex items-center justify-center overflow-hidden ${
                    isDarkMode ? "bg-slate-900/40" : "bg-slate-100/40"
                  }`}
                >
                  {/* Project icon in corner */}
                  <div
                    className={`absolute top-4 left-4 w-12 h-12 backdrop-blur-md border rounded-xl flex items-center justify-center ${
                      isDarkMode
                        ? "bg-slate-800/50 border-slate-700/50"
                        : "bg-slate-100/50 border-slate-200/50"
                    }`}
                  >
                    <div style={{ color: project.color }} className="text-xl">
                      {project.icon}
                    </div>
                  </div>

                  {/* Abstract design elements in project preview */}
                  <div className="absolute inset-0">
                    <div
                      className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${
                        isDarkMode
                          ? "from-slate-900/60 to-transparent"
                          : "from-slate-100/60 to-transparent"
                      }`}
                    ></div>
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
                          stroke={isDarkMode ? "white" : "black"}
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${i})`} />
                  </svg>

                  <div className="text-center z-10 relative">
                    <h3 className="text-3xl font-bold mb-2">
                      <span
                        className="bg-clip-text text-transparent bg-gradient-to-r"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${
                            project.color
                          }, ${isDarkMode ? "#FFFFFF" : theme.text})`,
                        }}
                      >
                        {project.title}
                      </span>
                    </h3>
                    <p
                      className={`text-sm font-medium tracking-wide ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {project.type}
                    </p>
                  </div>

                  <div
                    className={`absolute top-4 right-4 px-3 py-1 backdrop-blur-md border rounded-full text-xs flex items-center gap-1 ${
                      isDarkMode
                        ? "bg-slate-800/50 border-slate-700/50"
                        : "bg-slate-100/50 border-slate-200/50"
                    }`}
                  >
                    <FaStar className="text-yellow-400" size={10} />
                    Live
                  </div>
                </div>

                <div className="p-6 sm:p-7 relative">
                  <p
                    className={`mb-5 leading-relaxed ${
                      isDarkMode ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* Technologies used */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 border text-xs rounded-full backdrop-blur-sm font-medium transition-all duration-300 ${
                          isDarkMode
                            ? "bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50"
                            : "bg-slate-100/50 border-slate-200/50 hover:border-slate-300/50"
                        }`}
                        style={{ color: project.color }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <motion.a
                      href={project.web_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                      style={{ color: project.color }}
                    >
                      <FaRocket size={12} />
                      View Project <FaArrowRight size={12} />
                    </motion.a>

                    <div
                      className={`flex items-center gap-1 text-xs ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      <FaRegLightbulb className="text-yellow-400" size={10} />{" "}
                      {/* Changed FaStar to FaRegLightbulb for 'Live' indicator */}
                      <span>Live</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16 sm:mt-20 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-teal-500/10 to-transparent blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 mb-6">
                <FaRegLightbulb className="text-white" size={24} />
              </div>
              <h4 className="font-bold text-2xl sm:text-3xl mb-4">
                Ready to Bring Your Idea to Life?
              </h4>
              <p
                className={`max-w-2xl mx-auto mb-8 text-lg ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                We're passionate about crafting exceptional digital experiences.
                Let's collaborate to transform your vision into a stunning
                reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="#contact"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: `0 0 20px 3px ${
                      isDarkMode
                        ? "rgba(147, 51, 234, 0.4)"
                        : "rgba(147, 51, 234, 0.3)"
                    }`,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-xl font-bold relative overflow-hidden group shadow-lg"
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <FaRocket className="mr-3 relative z-10" size={16} />
                  <span className="relative z-10 font-bold">
                    Start a Project
                  </span>
                </motion.a>

                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center justify-center px-8 py-4 border-2 rounded-xl font-medium backdrop-blur-sm transition-colors ${
                    isDarkMode
                      ? "border-slate-600 text-slate-100 hover:bg-slate-800/20"
                      : "border-slate-300 text-slate-900 hover:bg-slate-100/20"
                  }`}
                >
                  <FaRegLightbulb className="mr-3" size={16} />
                  Our Services
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section - Glassmorphism */}
      <section
        id="pricing"
        className="min-h-screen flex items-center py-20 sm:py-28 px-4 sm:px-6 relative"
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h3 className="text-3xl sm:text-4xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Flexible Pricing</span>
              <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></span>
            </h3>
            <p
              className={`max-w-xl mx-auto mt-6 text-base sm:text-lg ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Find the perfect plan for your digital needs, from startups to
              enterprises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`backdrop-blur-lg border rounded-2xl p-6 relative overflow-hidden group flex flex-col justify-between ${
                  isDarkMode
                    ? "bg-slate-800/20 border-slate-700/30"
                    : "bg-slate-100/20 border-slate-200/30"
                } ${
                  tier.isHighlighted
                    ? isDarkMode
                      ? "border-purple-500/50 shadow-lg shadow-purple-500/20"
                      : "border-purple-500/50 shadow-lg shadow-purple-400/20"
                    : ""
                }`}
              >
                {tier.isHighlighted && (
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-teal-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-md">
                    Popular
                  </div>
                )}

                <div
                  className={`absolute -top-10 -right-10 w-24 h-24 rounded-full blur-xl opacity-60 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-purple-500/10 to-transparent"
                      : "bg-gradient-to-br from-purple-400/20 to-transparent"
                  }`}
                ></div>

                <div className="text-center mb-6 pt-4">
                  <div
                    className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center backdrop-blur-sm border ${
                      isDarkMode
                        ? "bg-slate-800/50 border-slate-700/50"
                        : "bg-slate-100/50 border-slate-200/50"
                    }`}
                  >
                    <tier.icon
                      size={24}
                      style={{ color: tier.color }}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h4
                    className={`font-bold text-2xl mb-2 ${
                      isDarkMode ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    {tier.name}
                  </h4>
                  {tier.price !== "Contact Us" ? (
                    <p className="text-4xl font-extrabold text-purple-500">
                      ₹{tier.price}
                      <br />
                      <span
                        className={`text-base font-medium ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {tier.unit}
                      </span>
                    </p>
                  ) : (
                    <p className="text-3xl font-extrabold text-teal-500">
                      {tier.price}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-3 ${
                        isDarkMode ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      <FaArrowRight size={14} className="text-teal-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="#contact"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 0 15px 2px ${
                      tier.isHighlighted
                        ? isDarkMode
                          ? "rgba(147, 51, 234, 0.4)"
                          : "rgba(147, 51, 234, 0.3)"
                        : isDarkMode
                        ? "rgba(20, 184, 166, 0.3)"
                        : "rgba(13, 148, 136, 0.2)"
                    }`,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 relative overflow-hidden group text-sm ${
                    tier.isHighlighted
                      ? "bg-gradient-to-r from-purple-500 to-teal-500 text-white"
                      : isDarkMode
                      ? "bg-slate-700/50 text-slate-100 border border-slate-600 hover:bg-slate-600/50"
                      : "bg-slate-200/50 text-slate-900 border border-slate-300 hover:bg-slate-300/50"
                  }`}
                >
                  <span
                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                      tier.isHighlighted ? "bg-white" : ""
                    }`}
                  ></span>
                  <span className="relative z-10">{tier.buttonText}</span>
                  {tier.price !== "Contact Us" && (
                    <FaArrowRight size={12} className="relative z-10" />
                  )}
                </motion.a>
              </motion.div>
            ))}
          </div>
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
              <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></span>
            </h3>
            <p
              className={`max-w-xl mx-auto mt-6 text-base sm:text-lg ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
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
                className={`backdrop-blur-lg border rounded-2xl p-6 relative overflow-hidden group h-full flex flex-col ${
                  isDarkMode
                    ? "bg-slate-800/20 border-slate-700/30"
                    : "bg-slate-100/20 border-slate-200/30"
                }`}
              >
                {/* Decorative elements */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-xl opacity-60 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-purple-500/10 to-transparent"
                      : "bg-gradient-to-br from-purple-400/20 to-transparent"
                  }`}
                ></div>
                <div
                  className={`absolute -bottom-10 -left-10 w-24 h-24 rounded-full blur-xl opacity-60 ${
                    isDarkMode
                      ? "bg-gradient-to-tr from-teal-500/10 to-transparent"
                      : "bg-gradient-to-tr from-teal-400/20 to-transparent"
                  }`}
                ></div>

                {/* Quote icon */}
                <div className="text-4xl text-purple-500/20 mb-4">"</div>

                {/* Testimonial content */}
                <p
                  className={`mb-6 relative z-10 flex-grow ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {testimonial.text}
                </p>

                {/* Client info */}
                <div className="flex items-center gap-4 relative z-10 mt-auto">
                  <div
                    className={`w-12 h-12 rounded-full overflow-hidden backdrop-blur-sm border flex items-center justify-center ${
                      isDarkMode
                        ? "bg-slate-800/50 border-slate-700/50"
                        : "bg-slate-100/50 border-slate-200/50"
                    }`}
                  >
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-lg font-medium text-white"
                        style={{
                          background: index % 2 === 0 ? "#9333ea" : "#14b8a6", // Purple-700 or Teal-500
                        }}
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-medium group-hover:text-purple-500 transition-colors duration-300 ${
                        isDarkMode ? "text-slate-100" : "text-slate-900"
                      }`}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
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
                            ? "text-yellow-400"
                            : isDarkMode
                            ? "text-slate-600"
                            : "text-slate-300"
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
            <div
              className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl ${
                isDarkMode
                  ? "bg-gradient-to-br from-purple-500/10 to-transparent"
                  : "bg-gradient-to-br from-purple-400/20 to-transparent"
              }`}
            ></div>
            <div
              className={`absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl ${
                isDarkMode
                  ? "bg-gradient-to-br from-teal-500/10 to-transparent"
                  : "bg-gradient-to-br from-teal-400/20 to-transparent"
              }`}
            ></div>

            <h4 className="font-bold text-xl sm:text-2xl mb-3">
              Ready to collaborate on your next big idea?
            </h4>
            <p
              className={`max-w-xl mx-auto mb-6 ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Let's connect and discuss how we can bring your digital vision to
              life with our expertise and creativity.
            </p>
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.03,
                boxShadow: `0 0 15px 2px ${
                  isDarkMode
                    ? "rgba(147, 51, 234, 0.3)"
                    : "rgba(147, 51, 234, 0.2)"
                }`,
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-7 py-3.5 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-xl font-medium relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <span className="relative z-10">Get a Free Consultation</span>
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
              <span className="relative z-10">Let's Connect</span>
              <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></span>
            </h3>
            <p
              className={`max-w-xl mx-auto mt-6 text-base sm:text-lg ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Have an exciting project in mind or just want to chat? Reach out
              to us, and let's make something amazing together.
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
              <div
                className={`backdrop-blur-lg border rounded-2xl p-6 sm:p-7 h-full relative overflow-hidden ${
                  isDarkMode
                    ? "bg-slate-800/20 border-slate-700/30"
                    : "bg-slate-100/20 border-slate-200/30"
                }`}
              >
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl ${
                    isDarkMode ? "bg-teal-500/10" : "bg-teal-400/10"
                  }`}
                ></div>

                <h4 className="font-bold text-xl sm:text-2xl mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-teal-500"></span>
                  <span>Contact Details</span>
                </h4>

                <div className="space-y-8 relative z-10">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl backdrop-blur-sm border flex items-center justify-center flex-shrink-0 mt-1 ${
                        isDarkMode
                          ? "bg-slate-800/50 border-slate-700/50"
                          : "bg-slate-100/50 border-slate-200/50"
                      }`}
                    >
                      <FaEnvelope className="text-teal-500" size={16} />
                    </div>
                    <div>
                      <p
                        className={`text-sm mb-1 ${
                          isDarkMode ? "text-white/70" : "text-slate-600"
                        }`}
                      >
                        Email us at
                      </p>
                      <a
                        href="mailto:doodlebyte.studio@gmail.com"
                        className={`font-medium text-sm hover:text-teal-500 transition-colors ${
                          isDarkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        doodlebyte.studio@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl backdrop-blur-sm border flex items-center justify-center flex-shrink-0 mt-1 ${
                        isDarkMode
                          ? "bg-slate-800/50 border-slate-700/50"
                          : "bg-slate-100/50 border-slate-200/50"
                      }`}
                    >
                      <FaPhone className="text-purple-500" size={16} />
                    </div>
                    <div>
                      <p
                        className={`text-sm mb-1 ${
                          isDarkMode ? "text-white/70" : "text-slate-600"
                        }`}
                      >
                        Call us
                      </p>
                      <a
                        href="tel:+917358004687"
                        className={`font-medium text-sm hover:text-purple-500 transition-colors ${
                          isDarkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        +91 7358004687
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl backdrop-blur-sm border flex items-center justify-center flex-shrink-0 mt-1 ${
                        isDarkMode
                          ? "bg-slate-800/50 border-slate-700/50"
                          : "bg-slate-100/50 border-slate-200/50"
                      }`}
                    >
                      <FaWhatsapp className="text-green-500" size={16} />
                    </div>
                    <div>
                      <p
                        className={`text-sm mb-1 ${
                          isDarkMode ? "text-white/70" : "text-slate-600"
                        }`}
                      >
                        WhatsApp Us
                      </p>
                      <a
                        href="https://wa.me/+916384260325"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium text-sm hover:text-green-500 transition-colors ${
                          isDarkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        +91 6384260325
                      </a>
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
                className={`backdrop-blur-lg border p-6 sm:p-7 rounded-2xl space-y-6 relative overflow-hidden ${
                  isDarkMode
                    ? "bg-slate-800/20 border-slate-700/30"
                    : "bg-slate-100/20 border-slate-200/30"
                }`}
              >
                <div
                  className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl ${
                    isDarkMode ? "bg-purple-500/5" : "bg-purple-400/5"
                  }`}
                ></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative z-10">
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-white/80" : "text-slate-700"
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className={`w-full p-3 rounded-xl border focus:outline-none backdrop-blur-sm ${
                        isDarkMode
                          ? "bg-slate-800/50 border-slate-700/50 focus:border-teal-500 text-white"
                          : "bg-slate-100/50 border-slate-200/50 focus:border-purple-500 text-slate-900"
                      }`}
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
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-white/80" : "text-slate-700"
                      }`}
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className={`w-full p-3 rounded-xl border focus:outline-none backdrop-blur-sm ${
                        isDarkMode
                          ? "bg-slate-800/50 border-slate-700/50 focus:border-teal-500 text-white"
                          : "bg-slate-100/50 border-slate-200/50 focus:border-purple-500 text-slate-900"
                      }`}
                      value={contact.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* INSERT THE NEW DROPDOWN HERE */}
                  <div className="relative z-10">
                    <label
                      htmlFor="plan"
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-white/80" : "text-slate-700"
                      }`}
                    >
                      Your Plan
                    </label>
                    <select
                      id="plan"
                      className={`w-full p-3 rounded-xl border focus:outline-none backdrop-blur-sm ${
                        isDarkMode
                          ? "bg-slate-800/50 border-slate-700/50 focus:border-teal-500 text-white"
                          : "bg-slate-100/50 border-slate-200/50 focus:border-purple-500 text-slate-900"
                      }`}
                      value={contact.plan}
                      onChange={(e) =>
                        setContact({ ...contact, plan: e.target.value })
                      }
                      required
                    >
                      <option value="" disabled>
                        Select a plan
                      </option>
                      {pricingTiers.map((tier) => (
                        <option key={tier.name} value={tier.value}>
                          {tier.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="relative z-10">
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-white/80" : "text-slate-700"
                    }`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    className={`w-full p-3 rounded-xl border focus:outline-none backdrop-blur-sm ${
                      isDarkMode
                        ? "bg-slate-800/50 border-slate-700/50 focus:border-teal-500 text-white"
                        : "bg-slate-100/50 border-slate-200/50 focus:border-purple-500 text-slate-900"
                    }`}
                    rows="5"
                    value={contact.message}
                    onChange={(e) =>
                      setContact({ ...contact, message: e.target.value })
                    }
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 0 15px 2px ${
                      isDarkMode
                        ? "rgba(147, 51, 234, 0.3)"
                        : "rgba(147, 51, 234, 0.2)"
                    }`,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl font-medium bg-gradient-to-r from-purple-500 to-teal-500 text-white text-sm flex items-center justify-center gap-2 relative overflow-hidden group"
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
      <footer
        className={`border-t py-10 sm:py-12 px-4 sm:px-6 backdrop-blur-xl relative overflow-hidden ${
          isDarkMode
            ? "border-slate-700/30 bg-slate-900/60"
            : "border-slate-200/30 bg-slate-50/60"
        }`}
      >
        <div
          className={`absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none ${
            isDarkMode ? 'bg-[url("/noise.png")]' : 'bg-[url("/noise.png")]'
          }`}
        ></div>
        <div
          className={`absolute -top-80 left-1/3 w-64 h-64 rounded-full blur-3xl ${
            isDarkMode ? "bg-teal-500/5" : "bg-teal-400/5"
          }`}
        ></div>
        <div
          className={`absolute -bottom-20 right-1/4 w-64 h-64 rounded-full blur-3xl ${
            isDarkMode ? "bg-purple-500/5" : "bg-purple-400/5"
          }`}
        ></div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <a
                href="#home"
                className="flex items-center gap-3 mb-4 inline-block"
              >
                <div>
                  <h1 className="text-2xl font-bold leading-tight">
                    <span className="text-purple-500">Doodle</span>
                    <span className="text-teal-500">Byte</span>
                  </h1>
                  <p
                    className={`text-xs font-medium tracking-wide ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Design Studio
                  </p>
                </div>
              </a>
              <p
                className={`mb-4 ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
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
                      className={`${
                        isDarkMode
                          ? "text-slate-400 hover:text-purple-400"
                          : "text-slate-600 hover:text-purple-700"
                      } transition-colors`}
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
              <h4 className="text-lg font-medium mb-4">Connect With Us</h4>
              <a
                href="mailto:doodlebyte.studio@gmail.com"
                className={`${
                  isDarkMode
                    ? "text-slate-400 hover:text-teal-400"
                    : "text-slate-600 hover:text-teal-700"
                } transition-colors mb-2 inline-block`}
              >
                doodlebyte.studio@gmail.com
              </a>
              <div className="flex gap-3 mt-4">
                {[
                  {
                    icon: FaWhatsappSquare,
                    url: "https://wa.me/+916384260325",
                    label: "WhatsApp",
                  },
                  {
                    icon: FaLinkedin,
                    url: "https://www.linkedin.com/company/doodlebyte/",
                    label: "LinkedIn",
                  },
                  {
                    icon: FaInstagram,
                    url: "https://www.instagram.com/doodlebyte.studio/",
                    label: "Instagram",
                  },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isDarkMode
                        ? "bg-slate-800/50 hover:bg-slate-700/50 text-slate-400"
                        : "bg-slate-100/50 hover:bg-slate-200/50 text-slate-600"
                    }`}
                    aria-label={item.label}
                  >
                    <item.icon size={14} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 ${
              isDarkMode ? "border-slate-700/30" : "border-slate-200/30"
            }`}
          >
            <p
              className={`text-sm text-center md:text-left ${
                isDarkMode ? "text-slate-500" : "text-slate-500"
              }`}
            >
              &copy; {new Date().getFullYear()} DoodleByte. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className={`${
                  isDarkMode
                    ? "text-slate-500 hover:text-slate-300"
                    : "text-slate-500 hover:text-slate-700"
                } text-sm transition-colors`}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className={`${
                  isDarkMode
                    ? "text-slate-500 hover:text-slate-300"
                    : "text-slate-500 hover:text-slate-700"
                } text-sm transition-colors`}
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
