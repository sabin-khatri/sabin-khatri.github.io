import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const socialLinks = [
  { name: 'GitHub',   icon: <FaGithub />,  url: 'https://github.com' },
  { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://linkedin.com' },
  { name: 'Facebook', icon: <FaFacebook />, url: 'https://facebook.com' },
];

const Rocket = () => {
  const [isFlying, setIsFlying] = useState(false);

  const handleLaunch = () => {
    if (isFlying) return;
    setIsFlying(true);

  
    const duration = 3000;
    const startPos = window.pageYOffset;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
    
      const ease = 1 - Math.pow(1 - progress, 4);

      window.scrollTo(0, startPos * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
       
        setTimeout(() => setIsFlying(false), 1000);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <>
     
      <div 
        className={`z-[999] transition-all duration-300 ${
          isFlying 
            ? 'fixed left-1/2 -translate-x-1/2 bottom-20'
            : 'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' 
        }`}
      >
        <motion.div
          onClick={handleLaunch}
          className="cursor-pointer relative"
          animate={
            isFlying
              ? { 
                  y: [0, -20, -window.innerHeight - 500], 
                  rotate: [0, -1, 1, -1, 0], 
                  scale: [1, 1.2, 0.8] 
                }
              : { y: [0, -10, 0] } // idle floating
          }
          transition={
            isFlying
              ? { duration: 3.5, ease: "easeInOut" }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
        >
        
          <AnimatePresence>
            {isFlying && (
              <motion.div
                className="absolute top-[90%] left-1/2 -translate-x-1/2 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0.5, 1], scaleY: [1, 2.5, 1.5] }}
                exit={{ opacity: 0 }}
              >
                <div className="w-6 h-24 bg-gradient-to-t from-transparent via-orange-600 to-yellow-300 blur-md rounded-full" />
                <div className="w-2 h-10 -mt-20 mx-auto bg-white blur-sm rounded-full opacity-70" />
              </motion.div>
            )}
          </AnimatePresence>

         
          <svg
            width="65" height="95"
            viewBox="0 0 36 56"
            fill="none"
            className="drop-shadow-[0_0_20px_rgba(245,158,11,0.8)]"
          >
            <path d="M18 2 C18 2 6 14 6 30 L12 30 L12 42 L24 42 L24 30 L30 30 C30 14 18 2 18 2Z"
              fill="url(#rocket_grad_main)" stroke="#f59e0b" strokeWidth="1" />
            <circle cx="18" cy="24" r="5" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            <path d="M12 38 L4 50 L12 45 Z" fill="#92400e" stroke="#f59e0b" />
            <path d="M24 38 L32 50 L24 45 Z" fill="#92400e" stroke="#f59e0b" />
            <defs>
              <linearGradient id="rocket_grad_main" x1="18" y1="2" x2="18" y2="47" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] pt-28 pb-12 overflow-visible">
    
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

    
      <Rocket />

      
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_0.8px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <a href="#home" className="text-3xl font-black tracking-tighter text-white">
              SABIN<span className="text-amber-500">.</span>
            </a>
            <p className="text-amber-500/60 text-[10px] font-mono tracking-[0.3em] uppercase mt-1">
              Creative Developer
            </p>
          </div>

        
          <div className="flex gap-6">
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all duration-300"
                whileHover={{ y: -5, backgroundColor: "rgba(245, 158, 11, 0.1)" }}
              >
                <span className="text-xl">{link.icon}</span>
              </motion.a>
            ))}
          </div>

        
          <div className="text-center md:text-right">
            <p className="text-slate-500 text-xs font-mono mb-1">© {year} Sabin Khatri</p>
            <p className="text-white/40 text-[9px] uppercase tracking-widest">Built with React & ThreeJS</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;