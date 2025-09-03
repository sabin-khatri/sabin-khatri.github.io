/* eslint-disable no-unused-vars */
// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { title: "Home", url: "#home" },
  { title: "About", url: "#about" },
  { title: "Projects", url: "#projects" },
  { title: "Skills", url: "#skills" },
  { title: "Contact", url: "#contact" },
];

const AnimatedHamburgerIcon = ({ isOpen, toggle }) => {
  const topVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 8 },
  };
  const middleVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };
  const bottomVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -8 },
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle mobile menu"
      className="text-white focus:outline-none w-7 h-6 flex flex-col justify-between"
    >
      <motion.div className="w-full h-0.5 bg-white origin-center" variants={topVariants} initial={false} animate={isOpen ? "open" : "closed"} transition={{ duration: 0.3, ease: "easeInOut" }} />
      <motion.div className="w-full h-0.5 bg-white" variants={middleVariants} initial={false} animate={isOpen ? "open" : "closed"} transition={{ duration: 0.3, ease: "easeInOut" }} />
      <motion.div className="w-full h-0.5 bg-white origin-center" variants={bottomVariants} initial={false} animate={isOpen ? "open" : "closed"} transition={{ duration: 0.3, ease: "easeInOut" }} />
    </button>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = navLinks.map(link => document.getElementById(link.url.substring(1)));
      let currentSection = 'home';
      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop - 80;
          if (window.scrollY >= sectionTop) {
            currentSection = section.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // --- Animation Variants for the new Underline ---
  const underlineVariants = {
    hidden: { scaleX: 0, originX: 0.5 },
    visible: { scaleX: 1, originX: 0.5, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const mobileMenuVariants = {
    closed: { x: '100%', transition: { type: 'spring', stiffness: 400, damping: 40 } },
    open: { x: 0, transition: { type: 'spring', stiffness: 400, damping: 40, staggerChildren: 0.07, delayChildren: 0.2 } },
  };

  const mobileLinkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
      <nav className={`fixed w-full z-50 top-0 transition-colors duration-300 ${isScrolled ? "bg-slate-900/80 backdrop-blur-sm shadow-lg" : "bg-transparent"}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* NO CHANGES to your awesome logo */}
            <a
              href="#home"
              className="relative overflow-hidden text-3xl font-bold text-cyan-400 tracking-wider uppercase transition-colors duration-300 hover:text-cyan-500 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[linear-gradient(to_right,transparent_0%,white_50%,transparent_100%)] before:animate-scan before:opacity-40 before:blur-lg"
            >
              SabinK
            </a>

            {/* --- ENHANCED: Desktop Menu with Underline Animation --- */}
            <ul className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.li
                  key={link.title}
                  className="relative"
                  initial="hidden"
                  whileHover="visible"
                >
                  <a
                    href={link.url}
                    className={`relative text-lg font-medium transition-colors duration-300 ${activeSection === link.url.substring(1) ? "text-cyan-400" : "text-slate-300 hover:text-cyan-400"}`}
                  >
                    {link.title}
                  </a>
                  <motion.div
                    className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-cyan-400"
                    variants={underlineVariants}
                    // The underline is hidden by default but shown if the section is active
                    animate={activeSection === link.url.substring(1) ? "visible" : "hidden"}
                  />
                </motion.li>
              ))}
            </ul>

            <div className="md:hidden">
              <AnimatedHamburgerIcon isOpen={isOpen} toggle={toggleMenu} />
            </div>
          </div>
        </div>
      </nav>

      {/*  Mobile Menu Logic */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-slate-900 z-40 flex flex-col items-center justify-center"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.ul
              className="flex flex-col items-center space-y-8"
              variants={{ open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }, closed: {} }}
            >
              {navLinks.map((link) => (
                <motion.li key={link.title} variants={mobileLinkVariants}>
                  <a href={link.url} onClick={toggleMenu} className="text-3xl font-semibold text-slate-100 hover:text-cyan-400 transition-colors duration-300">
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 
