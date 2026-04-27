/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiHome, HiUser, HiCode, HiMail } from "react-icons/hi";

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

const SPRING = { type: "spring", stiffness: 400, damping: 30 };
const EASE = [0.22, 1, 0.36, 1];

const Logo = memo(({ onClick }) => (
  <motion.a
    href="#home"
    onClick={onClick}
    className="flex items-center gap-2.5 no-underline select-none z-[101]"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <motion.span
      className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0"
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ boxShadow: "0 0 10px #f59e0b" }}
    />
    <span className="text-xl sm:text-2xl font-black text-white tracking-tighter">
      Sabin<span className="text-amber-400">.</span>
    </span>
  </motion.a>
));

const DesktopLink = memo(({ link, isActive, onClick }) => (
  <li className="relative list-none">
    <button
      onClick={() => onClick(link)}
      className={`relative px-5 py-2 text-[13px] font-bold transition-colors duration-300 outline-none ${
        isActive ? "text-amber-400" : "text-slate-400 hover:text-white"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-amber-400/10 border border-amber-400/20 rounded-full -z-10"
          transition={SPRING}
        />
      )}
      {link.label}
    </button>
  </li>
));

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const manualScroll = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      
      if (!manualScroll.current) {
        const sections = NAV_LINKS.map(link => ({
          id: link.href.slice(1),
          label: link.label
        }));

        for (const section of [...sections].reverse()) {
          const el = document.getElementById(section.id);
          if (el && el.getBoundingClientRect().top <= 150) {
            setActive(section.label);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); 
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const handleNavClick = (link) => {
    setActive(link.label);
    setMenuOpen(false);
    manualScroll.current = true;

    const el = document.querySelector(link.href);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    setTimeout(() => { manualScroll.current = false; }, 1000);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled 
          ? "py-3 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5" 
          : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Logo onClick={(e) => { e.preventDefault(); handleNavClick({ label: "Home", href: "#home" }); }} />

          <div className="hidden md:flex items-center bg-white/[0.03] border border-white/10 px-1.5 py-1.5 rounded-full backdrop-blur-md">
            <ul className="flex items-center gap-1 m-0 p-0">
              {NAV_LINKS.map((link) => (
                <DesktopLink
                  key={link.label}
                  link={link}
                  isActive={active === link.label}
                  onClick={handleNavClick}
                />
              ))}
            </ul>
          </div>

          <button
            className="md:hidden p-2 text-white bg-white/5 border border-white/10 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#0a0a0a] border-l border-white/10 z-[120] md:hidden p-8 flex flex-col"
            >
              <div className="flex flex-col gap-6 mt-12">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleNavClick(link)}
                    className={`flex items-center gap-4 text-xl font-bold ${
                      active === link.label ? "text-amber-400" : "text-slate-400"
                    }`}
                  >
                    <link.icon size={20} />
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <div className="mt-auto flex gap-4">
                {SOCIALS.map(({ href, Icon }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;