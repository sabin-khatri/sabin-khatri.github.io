/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (link) => {
    setActive(link.label);
    setMenuOpen(false);
    const section = document.querySelector(link.href);
    if (section) {
      const topPos = section.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ─────────────────────────────────────────────
          NAVBAR BAR  (always on top, z-[100])
      ───────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-amber-400/15 shadow-2xl shadow-black/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[68px] sm:h-[74px]">

          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick({ label: "Home", href: "#home" });
            }}
            className="flex items-center gap-2.5 no-underline select-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="w-[10px] h-[10px] rounded-full bg-[#f59e0b] flex-shrink-0"
              animate={{ scale: [1, 0.75, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[22px] sm:text-[24px] font-bold tracking-tighter text-white leading-none">
              Sabin<span className="text-[#f59e0b]">.</span>
            </span>
          </motion.a>

          {/* ── Desktop Pill Nav ── */}
          <div className="hidden md:block">
            <motion.div
              className="relative px-2 py-1.5 rounded-[28px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55, ease: "easeOut" }}
            >
              <ul className="flex items-center gap-0.5 list-none m-0 p-0">
                {navLinks.map((link) => {
                  const isActive = active === link.label;
                  return (
                    <li key={link.label} className="relative">
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link);
                        }}
                        className="relative block px-6 py-2.5 text-[14px] font-medium no-underline group"
                      >
                        {isActive && (
                          <motion.div
                            layoutId="pill-bg"
                            className="absolute inset-0 bg-amber-400/10 rounded-[20px]"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span
                          className={`relative z-10 transition-colors duration-200 ${
                            isActive
                              ? "text-[#f59e0b]"
                              : "text-slate-400 group-hover:text-white"
                          }`}
                        >
                          {link.label}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="tube-light"
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] w-3/5 rounded-full"
                            style={{
                              background: "linear-gradient(90deg, transparent, #f59e0b, transparent)",
                              boxShadow: "0 0 10px #f59e0b, 0 0 22px #f59e0b88",
                            }}
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>

         
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[99] md:hidden"
            style={{ background: "rgba(5,5,8,0.97)", backdropFilter: "blur(24px)" }}
          >
           
            <div
              className="absolute inset-0"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Content */}
            <div className="relative z-10 flex flex-col h-full pt-[88px] pb-10 px-6">

              {/* Nav links — vertically centered */}
              <div className="flex-1 flex flex-col justify-center gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.05 + i * 0.07, duration: 0.38, ease: "easeOut" }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link);
                    }}
                    className={`relative flex items-center gap-4 px-6 py-5 rounded-3xl text-[22px]
                               font-semibold no-underline transition-all duration-200
                               active:scale-[0.98] ${
                      active === link.label
                        ? "text-white bg-white/[0.07]"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Amber glow bar */}
                    {active === link.label && (
                      <motion.div
                        layoutId="mob-glow-bar"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[44px] rounded-r-full bg-[#f59e0b]"
                        style={{ boxShadow: "0 0 14px #f59e0b, 0 0 28px #f59e0b66" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Number */}
                    <span className="text-[13px] font-mono text-slate-600 w-5 flex-shrink-0">
                      0{navLinks.indexOf(link) + 1}
                    </span>

                    {link.label}

                    {/* Active dot */}
                    {active === link.label && (
                      <motion.span
                        className="ml-auto w-2 h-2 rounded-full bg-[#f59e0b]"
                        animate={{ scale: [1, 0.7, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.4 }}
                className="flex flex-col gap-5"
              >
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;