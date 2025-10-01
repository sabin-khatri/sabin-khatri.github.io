/* eslint-disable no-unused-vars */
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
  const barVariants = {
    closed: { opacity: 1, rotate: 0, translateY: 0 },
    open: (i) => ({
      opacity: i === 1 ? 0 : 1,
      rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
      translateY: i === 0 ? 8 : i === 2 ? -8 : 0,
    }),
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle mobile menu"
      className="text-white focus:outline-none w-7 h-6 flex flex-col justify-between z-50"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-full h-0.5 bg-white origin-center"
          custom={i}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={barVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      ))}
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
      <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${isScrolled ? "bg-gradient-to-r from-slate-900/70 via-cyan-900/30 to-slate-900/70 backdrop-blur-md shadow-[0_6px_30px_rgba(0,191,255,0.4)]" : "bg-transparent shadow-none"}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a
              href="#home"
              className="relative overflow-hidden text-3xl font-bold text-cyan-400 tracking-wider uppercase transition-all duration-300 hover:text-cyan-300 transform hover:scale-105 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[linear-gradient(to_right,transparent_0%,#00ffff_50%,transparent_100%)] before:animate-scan before:opacity-20 before:blur-md"
            >
              SabinK
            </a>

            <ul className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.li
                  key={link.title}
                  className="relative"
                  initial="hidden"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  <a
                    href={link.url}
                    onClick={toggleMenu}
                    className={`relative text-lg font-medium transition-all duration-300 ${activeSection === link.url.substring(1) ? "text-cyan-400" : "text-slate-300 hover:text-cyan-400"}`}
                    onFocus={(e) => (e.target.style.boxShadow = "0 0 20px #00ffff, 0 0 30px #00ffff")}
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                    style={{ outline: 'none' }}
                  >
                    {link.title}
                  </a>
                  <motion.div
                    className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-cyan-400"
                    variants={underlineVariants}
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-gradient-to-br from-slate-900 to-cyan-900/40 z-40 flex flex-col items-center justify-center backdrop-blur-md"
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
                  <a
                    href={link.url}
                    onClick={toggleMenu}
                    className="text-3xl font-semibold text-slate-100 hover:text-cyan-400 transition-all duration-300"
                    onFocus={(e) => (e.target.style.boxShadow = "0 0 20px #00ffff, 0 0 30px #00ffff")}
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                    style={{ outline: 'none' }}
                  >
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