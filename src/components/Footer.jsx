import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaArrowUp } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: <FaGithub />, 
      url: 'https://github.com/sabin-khatri' 
    },
    { 
      name: 'LinkedIn', 
      icon: <FaLinkedin />, 
      url: 'https://www.linkedin.com/in/sabin-khatri-25460b26a/' 
    },
    { 
      name: 'Facebook', 
      icon: <FaFacebook />, 
      url: 'https://www.facebook.com/sabin.khatri.77312/' 
    },
  ];

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <footer className="relative bg-gradient-to-br from-slate-950 to-slate-900 pt-16 pb-10 border-t border-cyan-900/30 overflow-hidden">
        {/* Subtle top glow line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            
            {/* Left - Brand */}
            <div className="flex flex-col items-center md:items-start">
              <a 
                href="#home" 
                className="text-2xl font-bold tracking-wider text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text hover:brightness-110 transition-all"
              >
                SABIN KHATRI
              </a>
              <p className="text-slate-500 text-sm mt-1">Frontend Developer</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-8">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="text-3xl text-slate-400 hover:text-cyan-400 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.35, 
                    y: -6,
                    color: "#67e8f9"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="text-slate-500 text-sm">
              © {currentYear} Sabin Khatri. All Rights Reserved.
            </div>

            <div className="text-slate-500 text-sm flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
              <p>
                Crafted with <span className="text-red-500">❤</span> using React & Tailwind
              </p>
              <div className="hidden sm:block w-1 h-1 bg-slate-700 rounded-full" />
              <a 
                href="mailto:sabinkhatri77312@gmail.com" 
                className="hover:text-cyan-400 transition-colors"
              >
                sabink802@gmail.com
              </a>
            </div>

            <a 
              href="https://sabinkhatri18.com.np/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyan-400 text-sm transition-colors"
            >
              sabinkhatri18.com.np
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-600 
                       rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/30 
                       hover:shadow-cyan-500/50 border border-cyan-400/20 group"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ 
              scale: 1.15,
              rotate: 360,
              boxShadow: "0 0 30px rgba(103, 232, 249, 0.6)"
            }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            aria-label="Scroll to top"
          >
            <FaArrowUp 
              size={22} 
              className="group-hover:-translate-y-0.5 transition-transform duration-300" 
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;