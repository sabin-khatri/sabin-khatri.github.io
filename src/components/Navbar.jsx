/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiHome, HiUser, HiCode, HiMail } from "react-icons/hi";

const navLinks = [
  { label: "Home",     href: "#home",     icon: <HiHome     className="text-[18px]" /> },
  { label: "About",    href: "#about",    icon: <HiUser     className="text-[18px]" /> },
  { label: "Projects", href: "#projects", icon: <HiCode     className="text-[18px]" /> },
  { label: "Contact",  href: "#contact",  icon: <HiMail     className="text-[18px]" /> },
];

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("Home");
  const isManualClick = useRef(false);

  /* ── scroll → background ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close menu on desktop resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── body scroll lock when menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Scroll → auto-active section ── */
  useEffect(() => {
    const onScroll = () => {
      if (isManualClick.current) return;

      const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
      const offset     = 120; // navbar height + buffer

      // find which section's top is closest to (but above) the offset line
      let current = navLinks[0].label;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset) {
          const matched = navLinks.find((l) => l.href === `#${id}`);
          if (matched) current = matched.label;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (link) => {
    setActive(link.label);
    setMenuOpen(false);
    isManualClick.current = true;
    setTimeout(() => { isManualClick.current = false; }, 1000);

    const section = document.querySelector(link.href);
    if (section) {
      const topPos = section.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ══════════════════ NAVBAR BAR ══════════════════ */}
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
            onClick={(e) => { e.preventDefault(); handleNavClick({ label: "Home", href: "#home" }); }}
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
                  const isAct = active === link.label;
                  return (
                    <li key={link.label} className="relative">
                      <a
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(link); }}
                        className="relative block px-6 py-2.5 text-[14px] font-medium no-underline group"
                      >
                        {isAct && (
                          <motion.div
                            layoutId="pill-bg"
                            className="absolute inset-0 bg-amber-400/10 rounded-[20px]"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className={`relative z-10 transition-colors duration-200 ${
                          isAct ? "text-[#f59e0b]" : "text-slate-400 group-hover:text-white"
                        }`}>
                          {link.label}
                        </span>
                        {isAct && (
                          <motion.div
                            layoutId="tube-light"
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] w-3/5 rounded-full"
                            style={{
                              background:  "linear-gradient(90deg, transparent, #f59e0b, transparent)",
                              boxShadow:   "0 0 10px #f59e0b, 0 0 22px #f59e0b88",
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

          {/* ── Hamburger (mobile only) ── */}
          <motion.button
            className="md:hidden relative w-10 h-10 flex items-center justify-center
                       rounded-xl border border-white/10 bg-white/[0.04] text-white
                       hover:border-amber-400/40 hover:text-amber-400 transition-colors duration-300"
            onClick={() => setMenuOpen((v) => !v)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  90,  opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiX className="text-[20px]" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90,  opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate: -90,  opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiMenuAlt3 className="text-[20px]" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

        </div>
      </motion.nav>

      {/* ══════════════════ MOBILE OVERLAY ══════════════════ */}
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
            {/* tap outside to close */}
            <div className="absolute inset-0" onClick={() => setMenuOpen(false)} />

            {/* Menu Content */}
            <div className="relative z-10 flex flex-col h-full pt-[88px] pb-10 px-6">

              {/* Nav links */}
              <div className="flex-1 flex flex-col justify-center gap-2">
                {navLinks.map((link, i) => {
                  const isAct = active === link.label;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{   opacity: 0, x: -20 }}
                      transition={{ delay: 0.05 + i * 0.07, duration: 0.38, ease: "easeOut" }}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link); }}
                      className={`relative flex items-center gap-4 px-6 py-5 rounded-3xl
                                 text-[20px] font-semibold no-underline transition-all duration-200
                                 active:scale-[0.98] ${
                        isAct
                          ? "text-white bg-white/[0.07]"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {/* amber glow bar */}
                      {isAct && (
                        <motion.div
                          layoutId="mob-glow-bar"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[44px] rounded-r-full bg-[#f59e0b]"
                          style={{ boxShadow: "0 0 14px #f59e0b, 0 0 28px #f59e0b66" }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      {/* icon bubble */}
                      <motion.div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                                    transition-all duration-300 ${
                          isAct
                            ? "bg-amber-400/15 text-amber-400"
                            : "bg-white/[0.05] text-slate-500"
                        }`}
                        animate={isAct ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        {link.icon}
                      </motion.div>

                      {/* number + label */}
                      <div className="flex flex-col leading-tight">
                        <span className="text-[11px] font-mono text-slate-600 leading-none mb-0.5">
                          0{i + 1}
                        </span>
                        <span>{link.label}</span>
                      </div>

                      {/* active dot */}
                      {isAct && (
                        <motion.span
                          className="ml-auto w-2 h-2 rounded-full bg-[#f59e0b]"
                          animate={{ scale: [1, 0.7, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* Bottom social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.4 }}
                className="flex items-center justify-center gap-4 pt-6 border-t border-white/[0.06]"
              >
                {[
                  { href: "https://github.com/sabin-khatri",                    icon: <FaGithub />,   label: "GitHub"   },
                  { href: "https://www.linkedin.com/in/sabin-khatri-25460b26a/", icon: <FaLinkedin />, label: "LinkedIn" },
                ].map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                               border border-white/10 text-slate-400 hover:border-amber-400/40
                               hover:text-amber-400 transition-all duration-300"
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {s.icon}
                    {s.label}
                  </motion.a>
                ))}
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;