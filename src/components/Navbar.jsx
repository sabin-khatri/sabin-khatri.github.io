/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiHome, HiUser, HiCode, HiMail } from "react-icons/hi";

/* ─── DATA ─────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "#home", icon: HiHome },
  { label: "About", href: "#about", icon: HiUser },
  { label: "Projects", href: "#projects", icon: HiCode },
  { label: "Contact", href: "#contact", icon: HiMail },
];

const SOCIALS = [
  { href: "https://github.com/sabin-khatri", Icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/sabin-khatri-25460b26a/", Icon: FaLinkedin, label: "LinkedIn" },
];

const SPRING = { type: "spring", stiffness: 400, damping: 32 };
const EASE = [0.22, 1, 0.36, 1];

/* ─── LOGO ──────────────────────────────────────────── */
const Logo = ({ onClick }) => (
  <motion.a
    href="#home"
    onClick={onClick}
    className="flex items-center gap-2.5 no-underline select-none"
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.span
      className="w-[9px] h-[9px] rounded-full bg-amber-400 flex-shrink-0"
      animate={{ scale: [1, 0.7, 1], opacity: [1, 0.4, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      style={{ boxShadow: "0 0 8px #f59e0b, 0 0 18px #f59e0b55" }}
    />
    <span
      className="text-[22px] sm:text-[24px] font-black text-white leading-none"
      style={{ fontFamily: "'Syne', 'DM Sans', sans-serif", letterSpacing: "-0.04em" }}
    >
      Sabin<span className="text-amber-400" style={{ textShadow: "0 0 14px #f59e0b" }}>.</span>
    </span>
  </motion.a>
);

/* ─── DESKTOP NAV LINK ──────────────────────────────── */
const DesktopLink = ({ link, isActive, onClick }) => (
  <li className="relative list-none">
    <a
      href={link.href}
      onClick={(e) => { e.preventDefault(); onClick(link); }}
      className="relative block px-5 py-2.5 no-underline group outline-none"
    >
      {isActive && (
        <motion.div
          layoutId="desktop-bg"
          className="absolute inset-0 rounded-[18px]"
          style={{
            background: "rgba(245,158,11,0.10)",
            border: "1px solid rgba(245,158,11,0.22)",
          }}
          transition={SPRING}
        />
      )}
      <span
        className={`relative z-10 text-[13.5px] font-semibold transition-colors duration-200 ${
          isActive ? "text-amber-400" : "text-slate-400 group-hover:text-white"
        }`}
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {link.label}
      </span>
      {isActive && (
        <motion.div
          layoutId="desktop-line"
          className="absolute bottom-[2px] left-1/2 -translate-x-1/2 h-[2px] w-3/5 rounded-full"
          style={{
            background: "linear-gradient(90deg,transparent,#f59e0b,transparent)",
            boxShadow: "0 0 10px #f59e0b, 0 0 24px #f59e0b66",
          }}
          transition={SPRING}
        />
      )}
    </a>
  </li>
);

/* ─── DRAWER NAV LINK ───────────────────────────────── */
const DrawerLink = ({ link, index, isActive, onClick }) => {
  const Icon = link.icon;
  return (
    <motion.a
      href={link.href}
      onClick={(e) => { e.preventDefault(); onClick(link); }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ delay: 0.05 + index * 0.065, duration: 0.4, ease: EASE }}
      className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl no-underline cursor-pointer select-none
                  transition-colors duration-200 active:scale-[0.98] ${
        isActive
          ? "text-white"
          : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
      }`}
      style={isActive ? { background: "rgba(245,158,11,0.07)" } : {}}
    >
      {isActive && (
        <motion.div
          layoutId="drawer-bar"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[38px] rounded-r-full bg-amber-400"
          style={{ boxShadow: "0 0 12px #f59e0b, 0 0 26px #f59e0b44" }}
          transition={SPRING}
        />
      )}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          isActive ? "bg-amber-400/15 text-amber-400" : "bg-white/[0.05] text-slate-500"
        }`}
      >
        <Icon className="text-[17px]" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-mono text-slate-600 tracking-widest mb-0.5">0{index + 1}</span>
        <span
          className="text-[18px] font-bold leading-none"
          style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}
        >
          {link.label}
        </span>
      </div>
      {isActive && (
        <motion.span
          className="ml-auto w-[7px] h-[7px] rounded-full bg-amber-400 flex-shrink-0"
          animate={{ scale: [1, 0.6, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ boxShadow: "0 0 8px #f59e0b" }}
        />
      )}
    </motion.a>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN NAVBAR COMPONENT (Improved + Fixed)
══════════════════════════════════════════════════════ */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const manualRef = useRef(false);

  /* Scroll detection for navbar style */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close drawer on large screens */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Prevent background scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Active section detection on scroll */
  useEffect(() => {
    const handleScrollActive = () => {
      if (manualRef.current) return;

      let current = NAV_LINKS[0].label;
      for (const { href, label } of NAV_LINKS) {
        const el = document.getElementById(href.slice(1));
        if (el && el.getBoundingClientRect().top <= 120) {
          current = label;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScrollActive, { passive: true });
    handleScrollActive();
    return () => window.removeEventListener("scroll", handleScrollActive);
  }, []);

  const handleClick = (link) => {
    setActive(link.label);
    setMenuOpen(false);
    manualRef.current = true;

    const el = document.querySelector(link.href);
    if (el) {
      const offset = 85;
      const topPos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    }

    // Reset manual flag after smooth scroll finishes
    setTimeout(() => { manualRef.current = false; }, 1200);
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        className={`fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
          scrolled
            ? "bg-[#07070a]/95 backdrop-blur-2xl border-b border-amber-400/[0.11] shadow-[0_8px_48px_rgba(0,0,0,0.55)]"
            : "bg-transparent"
        }`}
      >
        {/* Top amber accent line when scrolled */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="absolute top-0 left-0 right-0 h-[1.5px] origin-left pointer-events-none"
              style={{ background: "linear-gradient(90deg,transparent,#f59e0b70,#f59e0b,#f59e0b70,transparent)" }}
            />
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto flex items-center justify-between h-[66px] sm:h-[72px]">
          {/* Logo */}
          <Logo
            onClick={(e) => {
              e.preventDefault();
              handleClick({ label: "Home", href: "#home" });
            }}
          />

          {/* Desktop Navigation (pill style) */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <div
              className="px-2 py-1.5 rounded-[26px]"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
              }}
            >
              <ul className="flex items-center gap-0.5 m-0 p-0">
                {NAV_LINKS.map((link) => (
                  <DesktopLink
                    key={link.label}
                    link={link}
                    isActive={active === link.label}
                    onClick={handleClick}
                  />
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Mobile Hamburger Button - FIXED ICON ANIMATION */}
          <motion.button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl
                       border border-white/[0.09] bg-white/[0.04] text-white
                       hover:border-amber-400/40 hover:text-amber-400 transition-colors duration-300"
            onClick={() => setMenuOpen((v) => !v)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{
                rotate: menuOpen ? 90 : 0,
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HiX className="text-[22px]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HiMenuAlt3 className="text-[22px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-[98] md:hidden"
              style={{ background: "rgba(3,3,6,0.72)", backdropFilter: "blur(6px)" }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.44, ease: EASE }}
              className="fixed top-0 right-0 bottom-0 z-[99] md:hidden flex flex-col"
              style={{
                width: "min(80vw, 320px)",
                background: "linear-gradient(170deg,#0e0e13 0%,#0a0a0f 55%,#0d0b07 100%)",
                borderLeft: "1px solid rgba(245,158,11,0.12)",
                boxShadow: "-24px 0 80px rgba(0,0,0,0.7)",
              }}
            >
              {/* Decorative glows */}
              <div className="absolute top-0 right-0 w-56 h-40 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top right,rgba(245,158,11,0.12) 0%,transparent 70%)" }} />
              <div className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at bottom left,rgba(245,158,11,0.06) 0%,transparent 70%)" }} />

              {/* Header */}
              <div className="relative flex items-center justify-between px-5 pt-[22px] pb-4">
                <Logo
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick({ label: "Home", href: "#home" });
                  }}
                />
                <motion.button
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400
                             border border-white/[0.09] bg-white/[0.04]
                             hover:border-amber-400/40 hover:text-amber-400 transition-colors"
                  onClick={() => setMenuOpen(false)}
                  whileTap={{ scale: 0.9 }}
                >
                  <HiX className="text-[18px]" />
                </motion.button>
              </div>

              <div className="mx-5 h-px bg-white/[0.06]" />

              {/* Navigation Links */}
              <nav className="relative flex-1 flex flex-col justify-center gap-1 px-3">
                {NAV_LINKS.map((link, i) => (
                  <DrawerLink
                    key={link.label}
                    link={link}
                    index={i}
                    isActive={active === link.label}
                    onClick={handleClick}
                  />
                ))}
              </nav>

              <div className="mx-5 h-px bg-white/[0.06]" />

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="relative flex items-center justify-center gap-3 px-5 py-5"
              >
                
                {SOCIALS.map(({ href, Icon, label }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold no-underline
                               border border-white/[0.09] text-slate-400
                               hover:border-amber-400/40 hover:text-amber-400 transition-all duration-250"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    <Icon className="text-[15px]" />
                    {label}
                  </motion.a>
                ))}
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;