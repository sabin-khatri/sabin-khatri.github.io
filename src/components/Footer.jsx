// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaArrowUp } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const socialLinks = [
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/sabin-khatri' },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/sabin-khatri-25460b26a/' },
    { name: 'Facebook', icon: <FaFacebook />, url: 'https://www.facebook.com/sabin.khatri.77312/' },
  ];

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const footerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <>
      <motion.footer
        className="relative bg-slate-900 pt-12 pb-8 overflow-hidden"
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <a href="#home" className="text-xl font-bold text-white transition-colors duration-300 hover:text-cyan-400">
                Sabin Khatri
              </a>
            </div>

            <div className="flex space-x-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="text-slate-400 hover:text-cyan-400 text-2xl"
                  whileHover={{ scale: 1.3, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <hr className="my-6 border-slate-800" />

          <div className="text-center text-sm text-slate-500">
            <p>© {currentYear} Sabin Khatri. All Rights Reserved.</p>
            <p className="mt-1">
              Crafted with <span className="text-red-500">❤</span> using React & Tailwind CSS
            </p>
          </div>
        </div>
      </motion.footer>

      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-cyan-600 focus:outline-none z-50"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <FaArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;