/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiHome, HiUser, HiCode, HiMail } from "react-icons/hi";

/* ─── DATA ─────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home",     href: "#home",     icon: HiHome },
  { label: "About",   href: "#about",    icon: HiUser },
  { label: "Projects",href: "#projects", icon: HiCode },
  { label: "Contact", href: "#contact",  icon: HiMail },
];

const SOCIALS = [
  { href: "https://github.com/sabin-khatri",                     Icon: FaGithub,   label: "GitHub"   },
  { href: "https://www.linkedin.com/in/sabin-khatri-25460b26a/", Icon: FaLinkedin, label: "LinkedIn" },
];

/* ─── SPRING CONFIGS (GPU-friendly: only transform/opacity) ─ */
const SPRING_FAST  = { type: "spring", stiffness: 500, damping: 38, mass: 0.6 };
const SPRING_PILL  = { type: "spring", stiffness: 420, damping: 34, mass: 0.7 };
const DRAWER_EASE  = [0.16, 1, 0.3, 1];   // custom expo-out

/* ─── LOGO ──────────────────────────────────────────── */
const Logo = ({ onClick }) => (
  <motion.a
    href="#home"
    onClick={onClick}
    className="flex items-center gap-2.5 no-underline select-none"
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.93 }}
    transition={SPRING_FAST}
  >
    <motion.span
      className="w-[9px] h-[9px] rounded-full bg-amber-400 flex-shrink-0"
      animate={{ scale: [1, 0.65, 1], opacity: [1, 0.35, 1] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      style={{ boxShadow: "0 0 8px #f59e0b, 0 0 20px #f59e0b55", willChange: "transform, opacity" }}
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
      className="relative block px-5 py-2.5 no-underline group outline-none cursor-pointer"
    >
      {isActive && (
        <motion.div
          layoutId="desktop-bg"
          className="absolute inset-0 rounded-[18px]"
          style={{
            background: "rgba(245,158,11,0.10)",
            border: "1px solid rgba(245,158,11,0.22)",
            willChange: "transform",
          }}
          transition={SPRING_PILL}
        />
      )}
      <span
        className="relative z-10 text-[13.5px] font-semibold transition-colors duration-150"
        style={{
          fontFamily: "'Syne', sans-serif",
          color: isActive ? "#f59e0b" : undefined,
        }}
      >
        {!isActive && (
          <span className="text-slate-400 group-hover:text-white transition-colors duration-150">
            {link.label}
          </span>
        )}
        {isActive && link.label}
      </span>

      {isActive && (
        <motion.div
          layoutId="desktop-line"
          className="absolute bottom-[2px] left-1/2 -translate-x-1/2 h-[2px] w-3/5 rounded-full"
          style={{
            background: "linear-gradient(90deg,transparent,#f59e0b,transparent)",
            boxShadow: "0 0 10px #f59e0b, 0 0 24px #f59e0b66",
            willChange: "transform",
          }}
          transition={SPRING_PILL}
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
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: 0.04 + index * 0.055, duration: 0.32, ease: DRAWER_EASE }}
      className="relative flex items-center gap-4 px-5 py-[14px] rounded-2xl no-underline cursor-pointer select-none"
      style={{
        background: isActive ? "rgba(245,158,11,0.07)" : "transparent",
        color: isActive ? "#fff" : "rgb(148 163 184)",
        willChange: "transform, opacity",
      }}
      whileHover={!isActive ? { backgroundColor: "rgba(255,255,255,0.04)", color: "#fff" } : {}}
      whileTap={{ scale: 0.97 }}
      transition={SPRING_FAST}
    >
      {isActive && (
        <motion.div
          layoutId="drawer-bar"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[38px] rounded-r-full bg-amber-400"
          style={{ boxShadow: "0 0 12px #f59e0b, 0 0 26px #f59e0b44", willChange: "transform" }}
          transition={SPRING_PILL}
        />
      )}

      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
        style={{
          background: isActive ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.05)",
          color: isActive ? "#f59e0b" : "rgb(100 116 139)",
        }}
      >
        <Icon style={{ fontSize: 17 }} />
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-mono text-slate-600 tracking-widest mb-0.5">
          0{index + 1}
        </span>
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
          animate={{ scale: [1, 0.55, 1], opacity: [1, 0.35, 1] }}
          transition={{ duration: 1.9, repeat: Infinity }}
          style={{ boxShadow: "0 0 8px #f59e0b", willChange: "transform, opacity" }}
        />
      )}
    </motion.a>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN NAVBAR
══════════════════════════════════════════════════════ */
const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("Home");
  const manualRef   = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  /* ── Scroll → navbar style (throttled) */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Resize → close drawer on md+ */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Active section on scroll (throttled) */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (manualRef.current || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        let current = NAV_LINKS[0].label;
        for (const { href, label } of NAV_LINKS) {
          const el = document.getElementById(href.slice(1));
          if (el && el.getBoundingClientRect().top <= 120) current = label;
        }
        setActive(current);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback((link) => {
    setActive(link.label);
    setMenuOpen(false);
    manualRef.current = true;

    const el = document.querySelector(link.href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setTimeout(() => { manualRef.current = false; }, 1100);
  }, []);

  /* ── Shared transition settings (respects prefers-reduced-motion) */
  const drawerTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: DRAWER_EASE };

  return (
    <>
      {/* ── Navbar ────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: DRAWER_EASE }}
        className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 lg:px-8"
        style={{
          willChange: "transform",
          transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
          background: scrolled ? "rgba(7,7,10,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(245,158,11,0.11)" : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 48px rgba(0,0,0,0.55)" : "none",
        }}
      >
        {/* Top amber line */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              key="accent-line"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute top-0 left-0 right-0 h-[1.5px] origin-left pointer-events-none"
              style={{
                background: "linear-gradient(90deg,transparent,#f59e0b70,#f59e0b,#f59e0b70,transparent)",
                willChange: "transform, opacity",
              }}
            />
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto flex items-center justify-between h-[66px] sm:h-[72px]">
          {/* Logo */}
          <Logo onClick={(e) => { e.preventDefault(); handleClick({ label: "Home", href: "#home" }); }} />

          {/* Desktop nav */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1,  y: 0   }}
            transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}
          >
            <div
              className="px-2 py-1.5 rounded-[26px]"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
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

          {/* Hamburger */}
          <motion.button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl
                       border border-white/[0.09] bg-white/[0.04] text-white
                       hover:border-amber-400/40 hover:text-amber-400 transition-colors duration-200"
            onClick={() => setMenuOpen((v) => !v)}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.91 }}
            transition={SPRING_FAST}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                  exit={  { opacity: 0, rotate:  60, scale: 0.7 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{ display: "flex", willChange: "transform, opacity" }}
                >
                  <HiX style={{ fontSize: 22 }} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate:  60, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                  exit={  { opacity: 0, rotate: -60, scale: 0.7 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{ display: "flex", willChange: "transform, opacity" }}
                >
                  <HiMenuAlt3 style={{ fontSize: 22 }} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ─────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-[98] md:hidden"
              style={{
                background: "rgba(3,3,6,0.72)",
                backdropFilter: "blur(5px)",
                willChange: "opacity",
              }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={drawerTransition}
              className="fixed top-0 right-0 bottom-0 z-[99] md:hidden flex flex-col"
              style={{
                width: "min(82vw, 320px)",
                background: "linear-gradient(170deg,#0e0e13 0%,#0a0a0f 55%,#0d0b07 100%)",
                borderLeft: "1px solid rgba(245,158,11,0.12)",
                boxShadow: "-20px 0 70px rgba(0,0,0,0.65)",
                willChange: "transform",
              }}
            >
              {/* Decorative glows */}
              <div className="absolute top-0 right-0 w-56 h-44 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top right,rgba(245,158,11,0.13) 0%,transparent 70%)" }} />
              <div className="absolute bottom-0 left-0 w-44 h-44 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at bottom left,rgba(245,158,11,0.06) 0%,transparent 70%)" }} />

              {/* Header */}
              <div className="relative flex items-center justify-between px-5 pt-[22px] pb-4">
                <Logo onClick={(e) => { e.preventDefault(); handleClick({ label: "Home", href: "#home" }); }} />
                <motion.button
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400
                             border border-white/[0.09] bg-white/[0.04]
                             hover:border-amber-400/40 hover:text-amber-400 transition-colors duration-150"
                  onClick={() => setMenuOpen(false)}
                  whileTap={{ scale: 0.88 }}
                  transition={SPRING_FAST}
                >
                  <HiX style={{ fontSize: 18 }} />
                </motion.button>
              </div>

              <div className="mx-5 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

              {/* Links */}
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

              <div className="mx-5 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ delay: 0.32, duration: 0.32 }}
                className="relative flex items-center justify-center gap-3 px-5 py-5"
                style={{ willChange: "transform, opacity" }}
              >
                {SOCIALS.map(({ href, Icon, label }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold no-underline
                               border border-white/[0.09] text-slate-400 transition-colors duration-150"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                    whileHover={{ scale: 1.06, y: -2, color: "#f59e0b", borderColor: "rgba(245,158,11,0.4)" }}
                    whileTap={{ scale: 0.93 }}
                    transition={SPRING_FAST}
                  >
                    <Icon style={{ fontSize: 15 }} />
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