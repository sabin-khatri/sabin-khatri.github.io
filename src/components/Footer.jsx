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

  const Particle = ({ x, y, size, duration, delay }) => (
    <motion.div
      className="absolute rounded-full bg-cyan-400/20"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      initial={{ opacity: 0.5, scale: 0 }}
      animate={{ opacity: [0.5, 0], scale: [0, 1.5], y: '-20vh' }}
      transition={{ duration, delay, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
    />
  );

  return (
    <>
      <motion.footer
        className="relative bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900 pt-12 pb-8 overflow-hidden"
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <Particle key={i} x={Math.random() * 100} y={Math.random() * 100} size={Math.random() * 5 + 2} duration={Math.random() * 10 + 10} delay={Math.random() * 5} />
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <a href="#home" className="text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text transition-colors duration-300 hover:text-cyan-400">
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
            <p className="mt-2">
              Email: <a href="mailto:sabinkhatri77312@gmail.com" className="text-cyan-400 hover:underline">sabink802@gmail.com</a> | Website: <a href="https://sabinkhatri18.com.np/" className="text-cyan-400 hover:underline">Sabin Khatri Portfolio</a>
            </p>
          </div>
        </div>
      </motion.footer>

      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-cyan-600 focus:outline-none z-50"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            whileHover={{ scale: 1.1, rotate: 360 }}
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