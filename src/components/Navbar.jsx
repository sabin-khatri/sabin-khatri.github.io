/* eslint-disable no-unused-vars */
// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const navLinks = [
  { title: 'Home', url: '#home' },
  { title: 'About', url: '#about' },
  { title: 'Projects', url: '#projects' },
  { title: 'Skills', url: '#skills' },
  { title: 'Contact', url: '#contact' },
];

// --- CHANGE 1: Update variants for a right-to-left slide ---
const navLinkVariants = {
  // The background starts completely to the right, hidden by the parent's overflow
  initial: {
    x: '100%',
  },
  // On hover, it slides in from the right to fill the space
  hover: {
    x: '0%',
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed w-full z-50 top-0 transition-all duration-300 ease-in-out ${
          isScrolled ? 'bg-slate-900/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand/Logo */}
            <a href="#home" className="text-3xl font-bold text-cyan-400 tracking-wider uppercase transition-colors duration-300 hover:text-cyan-500">
              SabinK
            </a>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.li
                  key={link.title}
                  className="relative cursor-pointer overflow-hidden"
                  initial="initial"
                  whileHover="hover"
                >
                  <a
                    href={link.url}
                    className="relative text-lg font-medium text-slate-200 transition-colors duration-300 hover:text-cyan-400 px-3 py-2"
                  >
                    {link.title}
                  </a>
                  {/* --- CHANGE 2: Updated the background color --- */}
                  <motion.div
                    className="absolute inset-0 bg-cyan-600/25 rounded-md -z-10" // A slightly more saturated and visible color
                    variants={navLinkVariants}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  />
                </motion.li>
              ))}
            </ul>

            {/* Mobile Menu Button (Hamburger) */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                aria-label="Toggle mobile menu"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                className="text-white focus:outline-none"
              >
                {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 bg-slate-900 z-40 flex flex-col items-center justify-center
                   transition-all duration-300 ease-in-out
                   ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}
      >
        <ul className="flex flex-col items-center space-y-8">
          {navLinks.map((link) => (
            <li key={link.title}>
              <a
                href={link.url}
                onClick={handleLinkClick}
                className="text-3xl font-semibold text-slate-100 hover:text-cyan-400 transition-colors duration-300"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;