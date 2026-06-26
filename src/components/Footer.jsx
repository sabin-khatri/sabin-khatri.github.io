import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const socialLinks = [
  { name: 'GitHub',   icon: <FaGithub />,  url: 'https://github.com/sabin-khatri' },
  { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/sabin-khatri-25460b26a/' },
  { name: 'Facebook', icon: <FaFacebook />, url: 'https://www.facebook.com/sabin.khatri.77312/' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-section pt-12 pb-10 overflow-hidden">
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(var(--accent-rgb), 0.5), transparent)' }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 dot-grid-sm" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">

          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <a href="#home" className="text-3xl font-black tracking-tighter text-os-text">
              SABIN<span className="text-accent">.</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 sm:gap-6">
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.name}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-os text-os-muted hover:text-accent transition-all duration-300"
                whileHover={{ y: -5, backgroundColor: 'rgba(var(--accent-rgb), 0.1)' }}
              >
                <span className="text-xl">{link.icon}</span>
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
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