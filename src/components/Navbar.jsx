/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { title: "Home", url: "#home" },
  { title: "About", url: "#about" },
  { title: "Projects", url: "#projects" },
  { title: "Contact", url: "#contact" },
];

const AnimatedHamburgerIcon = ({ isOpen, toggle }) => {
  return (
    <motion.button
      onClick={toggle}
      aria-label="Toggle mobile menu"
      aria-expanded={isOpen}
      className="text-white focus:outline-none w-9 h-9 flex flex-col justify-center items-center z-50 relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-6 h-0.5 bg-white rounded-full origin-center"
          style={{ margin: i === 1 ? "4px 0" : "0" }}
          animate={{
            rotate: isOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
            y: isOpen ? (i === 0 ? 6 : i === 2 ? -6 : 0) : 0,
            opacity: isOpen && i === 1 ? 0 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      ))}
    </motion.button>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Smooth scroll + close mobile menu
  const scrollToSection = useCallback((url) => {
    const section = document.querySelector(url);
    if (section) {
      const offset = 80;
      const topPos = section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: topPos,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  }, []);

  // Scroll handler with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          let current = "home";
          for (const link of navLinks) {
            const section = document.getElementById(link.url.substring(1));
            if (section) {
              const sectionTop = section.offsetTop - 100;
              if (window.scrollY >= sectionTop) {
                current = link.url.substring(1);
              }
            }
          }
          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close menu on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const underlineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { 
      scaleX: 1, 
      transition: { duration: 0.4, ease: "easeOut" } 
    },
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      x: "100%", 
      transition: { type: "spring", stiffness: 320, damping: 35 } 
    },
    open: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "spring", 
        stiffness: 280, 
        damping: 30,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      } 
    },
  };

  const mobileLinkVariants = {
    closed: { opacity: 0, y: 30, scale: 0.95 },
    open: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 280, damping: 22 }
    },
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 top-0 transition-all duration-300 ${
          isScrolled
            ? "bg-gradient-to-r from-slate-950/95 via-cyan-950/80 to-slate-950/95 backdrop-blur-2xl shadow-[0_8px_40px_-10px_rgb(0,255,255)] border-b border-cyan-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
              className="relative text-3xl font-bold text-cyan-400 tracking-[3px] uppercase select-none hover:text-cyan-300 transition-colors logo-glow"
            >
              SabinK
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent scan-line" />
            </a>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-x-10">
              {navLinks.map((link) => (
                <motion.li
                  key={link.title}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <a
                    href={link.url}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.url);
                    }}
                    className={`relative text-lg font-medium tracking-wide transition-all duration-300 pb-1 ${
                      activeSection === link.url.substring(1)
                        ? "text-cyan-400"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {link.title}
                    <AnimatePresence mode="wait">
                      {activeSection === link.url.substring(1) && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-500"
                          variants={underlineVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        />
                      )}
                    </AnimatePresence>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <AnimatedHamburgerIcon isOpen={isOpen} toggle={toggleMenu} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center overflow-hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]" />

            <motion.ul className="flex flex-col items-center gap-y-10 text-center">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.title}
                  variants={mobileLinkVariants}
                  custom={index}
                >
                  <a
                    href={link.url}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.url);
                    }}
                    className={`text-4xl font-semibold tracking-wider transition-all duration-300 ${
                      activeSection === link.url.substring(1)
                        ? "text-cyan-400"
                        : "text-white hover:text-cyan-300"
                    }`}
                  >
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="absolute bottom-12 text-xs uppercase tracking-[2px] text-cyan-400/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Tap anywhere or press ESC to close
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo Glow & Scan Line Animation */}
      <style jsx>{`
        @keyframes logoGlow {
          0%, 100% { text-shadow: 0 0 12px rgba(0, 255, 255, 0.6); }
          50% { text-shadow: 0 0 25px rgba(0, 255, 255, 0.9), 0 0 35px rgba(0, 255, 255, 0.4); }
        }
        .logo-glow {
          animation: logoGlow 3s ease-in-out infinite;
        }

        .scan-line {
          animation: scan 4s linear infinite;
        }
        @keyframes scan {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
      `}</style>
    </>
  );
};

export default Navbar;