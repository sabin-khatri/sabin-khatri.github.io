// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { title: 'Home', url: '#home' },
  { title: 'About', url: '#about' },
  { title: 'Projects', url: '#projects' },
  { title: 'Skills', url: '#skills' },
  { title: 'Contact', url: '#contact' }, // Assuming you will add a contact section
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll and change navbar background
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state to true if page is scrolled more than 10px
      setIsScrolled(window.scrollY > 10);
    };

    // Add event listener on component mount
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the mobile menu when a link is clicked
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
                <li key={link.title}>
                  <a
                    href={link.url}
                    className="relative text-lg font-medium text-slate-200 transition-colors duration-300 hover:text-cyan-400 
                               after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-cyan-400 
                               after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.title}
                  </a>
                </li>
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