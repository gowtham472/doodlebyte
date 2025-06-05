// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPalette, FaServer, FaEnvelope, FaArrowRight, 
  FaRegLightbulb, FaGithub, FaLinkedin, FaTwitter,
  FaCode, FaMobileAlt, FaVideo, FaLaptopCode
} from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";

export default function App() {
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const sections = ['services', 'work', 'contact'];
    
    const handleScroll = () => {
      const currentPosition = window.pageYOffset + 300;
      
      for (const section of sections) {
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
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out!");
    setContact({ name: '', email: '', message: '' });
  };

  return (
    <div className="font-sans bg-gradient-to-br from-[#4A102A] via-[#85193C] to-[#C5172E] text-white min-h-screen">
      {/* Subtle Background Element */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-[#C5172E]/20 to-[#FCF259]/20 blur-3xl"></div>
      </div>

      {/* Navbar - Minimalist */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#4A102A]/30 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C5172E] to-[#FCF259] flex items-center justify-center">
                <FaRegLightbulb className="text-[#4A102A] text-sm" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#C5172E] to-[#FCF259] inline-block text-transparent bg-clip-text">
                DoodleByte
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-8 font-medium">
              {['services', 'work', 'contact'].map(section => (
                <motion.li key={section} whileHover={{ scale: 1.05 }}>
                  <a 
                    href={`#${section}`} 
                    className={`relative px-1 py-2 transition-all duration-300 ${activeSection === section ? 'text-[#FCF259]' : 'text-white/80 hover:text-white'}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                    {activeSection === section && (
                      <motion.div 
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FCF259]"
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
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#4A102A]/60 backdrop-blur-lg overflow-hidden"
            >
              <div className="px-6 py-4">
                <ul className="flex flex-col gap-4">
                  {['services', 'work', 'contact'].map(section => (
                    <li key={section}>
                      <a 
                        href={`#${section}`} 
                        className={`block py-2 ${activeSection === section ? 'text-[#FCF259]' : 'text-white/80'}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - Minimalist */}
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }} 
        className="relative pt-32 pb-20 px-6"
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Transforming ideas into <span className="bg-gradient-to-r from-[#FCF259] to-[#C5172E] inline-block text-transparent bg-clip-text">digital experiences</span>
            </h2>
            
            <p className="text-lg max-w-2xl mx-auto mb-8 text-white/80">
              We're a new design and development studio creating websites, applications, 
              and digital brands that help businesses connect with their audience.
            </p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-gradient-to-r from-[#C5172E] to-[#85193C] rounded-lg font-medium flex items-center justify-center gap-2"
              >
                Start a Project <FaArrowRight className="ml-1" size={14} />
              </motion.a>
              <motion.a 
                href="#work" 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg font-medium"
              >
                View Our Work
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section - Minimalist */}
      <section id="services" className="py-20 px-6 relative bg-[#4A102A]/90">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold mb-4">Our Services</h3>
            <div className="w-16 h-0.5 bg-[#FCF259] mx-auto mb-6"></div>
            <p className="text-white/70 max-w-xl mx-auto">
              We offer a range of digital services to help bring your vision to life.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <FaCode />,
                title: "Frontend Development",
                description: "Modern, responsive interfaces built with React, ensuring seamless user experiences across all devices."
              },
              {
                icon: <FaServer />,
                title: "Backend Development",
                description: "Robust server solutions that power your applications with reliable and scalable infrastructure."
              },
              {
                icon: <FaPalette />,
                title: "UI/UX Design",
                description: "Intuitive and appealing user interfaces designed to enhance user engagement and satisfaction."
              },
              {
                icon: <FaMobileAlt />,
                title: "Branding",
                description: "Develop a cohesive visual identity that communicates your values and resonates with your audience."
              },
              {
                icon: <FaLaptopCode />,
                title: "Web Applications",
                description: "Custom web applications tailored to your business needs with focus on performance and usability."
              },
              {
                icon: <FaVideo />,
                title: "Video Editing",
                description: "Professional video editing to create engaging content for marketing, presentations, or social media."
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#C5172E]/30 to-[#FCF259]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{service.title}</h4>
                    <p className="text-white/70 text-sm">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section - Minimalist */}
      <section id="work" className="py-20 px-6 relative bg-gradient-to-br from-[#85193C] to-[#4A102A]">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold mb-4">Our Work</h3>
            <div className="w-16 h-0.5 bg-[#FCF259] mx-auto mb-6"></div>
            <p className="text-white/70 max-w-xl mx-auto">
              Here are some of the projects we've had the privilege to work on.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Digizen",
                type: "Blog & Content Platform",
                description: "A full website for Digizen, a blog article sharing company. Includes content management, user authentication, and responsive design.",
                technologies: ["React", "Node.js", "MongoDB"],
                web_url: "https://digizenhub.in/",
              },
              {
                title: "Student Portfolio",
                type: "Personal Website",
                description: "A clean, professional portfolio website for a college student, showcasing their projects, skills, and academic achievements.",
                technologies: ["HTML/CSS", "JavaScript", "Figma"]
              }
            ].map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-[#85193C]/30 to-[#4A102A]/30 relative flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-center">{project.title}</h3>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#FCF259]/10 rounded-full text-xs text-[#FCF259]">
                    {project.type}
                  </div>
                </div>
                
                <div className="p-5">
                  <p className="text-white/70 mb-4 text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, j) => (
                      <span key={j} className="px-2 py-1 bg-[#85193C]/20 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                
                  <motion.a 
                    href={`${project.web_url || "#"}`}
                    target="_blank" 
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-[#FCF259] text-sm"
                  >
                    View details <FaArrowRight size={10} />
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
            className="text-center mt-12 bg-white/5 border border-white/10 rounded-lg p-6"
          >
            <h4 className="font-medium mb-2">Looking for more examples?</h4>
            <p className="text-white/70 text-sm mb-4">
              We're a new studio actively expanding our portfolio. Contact us to discuss how we can create something amazing together.
            </p>
            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-5 py-2 bg-gradient-to-r from-[#C5172E]/70 to-[#85193C]/70 rounded-lg text-sm font-medium"
            >
              Start a Conversation
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Contact - Minimalist */}
      <section id="contact" className="py-20 px-6 relative bg-[#4A102A]">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold mb-4">Get In Touch</h3>
            <div className="w-16 h-0.5 bg-[#FCF259] mx-auto mb-6"></div>
            <p className="text-white/70 max-w-xl mx-auto">
              Have a project in mind? We'd love to hear about it. Send us a message and let's create something great together.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-1"
            >
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-5 h-full">
                <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FCF259]/10 flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-[#FCF259]" size={14} />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Email</p>
                      <p className="text-[#FCF259]">hello@doodlebyte.com</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm mb-2">Follow Us</h5>
                    <div className="flex gap-3">
                      {[FaGithub, FaLinkedin, FaTwitter].map((Icon, i) => (
                        <motion.a 
                          key={i}
                          href="#" 
                          whileHover={{ y: -2 }}
                          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Icon size={14} />
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
              className="md:col-span-2"
            >
              <form onSubmit={handleSubmit} className="backdrop-blur-sm bg-white/5 border border-white/10 p-5 rounded-lg space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      type="text" 
                      placeholder="Your name" 
                      className="w-full p-2 rounded-md bg-white/5 border border-white/10 focus:border-[#FCF259] focus:outline-none text-sm" 
                      value={contact.name} 
                      onChange={e => setContact({ ...contact, name: e.target.value })} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      className="w-full p-2 rounded-md bg-white/5 border border-white/10 focus:border-[#FCF259] focus:outline-none text-sm" 
                      value={contact.email} 
                      onChange={e => setContact({ ...contact, email: e.target.value })} 
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea 
                    placeholder="Tell us about your project..." 
                    className="w-full p-2 rounded-md bg-white/5 border border-white/10 focus:border-[#FCF259] focus:outline-none text-sm" 
                    rows="4" 
                    value={contact.message} 
                    onChange={e => setContact({ ...contact, message: e.target.value })} 
                    required
                  ></textarea>
                </div>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="privacy" className="rounded text-[#C5172E] focus:ring-[#FCF259]" />
                  <label htmlFor="privacy" className="text-xs text-white/60">
                    I agree to the privacy policy and terms of service.
                  </label>
                </div>
                
                <motion.button 
                  type="submit" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 rounded-md font-medium bg-gradient-to-r from-[#C5172E] to-[#85193C] text-sm flex items-center justify-center gap-2"
                >
                  Send Message <FaArrowRight size={12} />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Minimalist */}
      <footer className="border-t border-white/10 py-8 px-6 backdrop-blur-md bg-[#4A102A]/90">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#C5172E] to-[#FCF259] flex items-center justify-center">
                <FaRegLightbulb className="text-[#4A102A]" size={12} />
              </div>
              <span className="text-sm font-medium">DoodleByte</span>
            </div>
            
            <div>
              <p className="text-white/40 text-xs text-center md:text-right">
                &copy; {new Date().getFullYear()} DoodleByte. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}