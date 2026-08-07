/* eslint-disable no-unused-vars */
import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { HiOutlineArrowRight } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Terminal from "./Terminal";

const socialLinks = [
  { name: "GitHub",   icon: <FaGithub />,  url: "https://github.com/sabin-khatri" },
  { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/sabin-khatri-25460b26a/" },
];

const Particle = ({ left, size, duration, delay }) => (
  <div
    className="css-particle"
    style={{ left, width: size, height: size, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
  />
);

const BackgroundParticles = ({ count = 45 }) => {
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setParticleCount(0);
      else if (w < 1024) setParticleCount(12);
      else setParticleCount(count);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, [count]);

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1.5,
        duration: Math.random() * 22 + 16,
        delay: Math.random() * -28,
      })),
    [particleCount]
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => <Particle key={p.id} {...p} />)}
    </div>
  );
};

const MovingBorderBtn = ({ href, children, innerClass = "", bg = 'rgba(var(--accent-rgb), 0.1)' }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={`relative inline-flex cursor-pointer items-center gap-2.5 px-7 py-3.5 text-base font-semibold rounded-xl transition-all duration-300 ${innerClass}`}
      style={{
        border: '1px solid rgba(var(--accent-rgb), 0.3)',
        background: bg,
        boxShadow: hovered ? '0 8px 36px rgba(var(--accent-rgb), 0.38), 0 0 0 1px rgba(var(--accent-rgb), 0.22)' : 'none',
      }}
    >
      {children}
    </motion.a>
  );
};

const Hero = () => {
  const [text] = useTypewriter({
    words: [
      "breaks production on Fridays",
      "turns tea into clean JavaScript",
      "crafts smooth 60fps animations",
      "builds premium React apps",
      "hates sloppy copy-paste code"
    ],
    loop: true, typeSpeed: 60, deleteSpeed: 40, delaySpeed: 2000,
  });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 200, damping: 20, delay },
  });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-os text-os-text">
      <BackgroundParticles />
      <div className="absolute inset-0 dot-grid opacity-[0.18] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10 px-5 sm:px-6 pt-28 pb-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-20 items-center gap-6 sm:gap-10 lg:gap-12">
          <motion.div
            className="flex justify-center lg:justify-end lg:order-2 w-full h-[220px] sm:h-[320px] lg:h-[500px]"
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.1 }}
          >
            <Terminal />
          </motion.div>

          <div className="lg:order-1 text-center lg:text-left space-y-6 lg:space-y-8 w-full">
            <motion.div
              {...fadeUp(0.08)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm text-accent text-[10px] font-mono tracking-wider uppercase mx-auto lg:mx-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              const status = "available_to_hire";
            </motion.div>

            <motion.div {...fadeUp(0.15)}>
              <span className="block text-[11px] font-mono text-os-muted uppercase tracking-[0.25em] mb-2">// TODO: Build something exceptional</span>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-[5.2rem] font-black tracking-[-0.04em] leading-[1.05] mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400 drop-shadow-sm">Sabin</span> 
                <span className="text-white drop-shadow-sm ml-2">Khatri</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 font-mono tracking-tight min-h-[2.5rem]">
                <span className="text-accent/80">sabin.</span><span className="text-white">{text}</span>
                <Cursor cursorColor="var(--os-accent)" cursorStyle="▊" />
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.25)} className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
              {[
                { key: 'const location', value: '"Biratnagar, NP"' },
                { key: 'let stack', value: '["React", "Three.js"]' },
                { key: 'let status', value: '"building_60fps"' },
              ].map((chip) => (
                <span key={chip.key} className="px-3.5 py-1 rounded-lg text-[10px] font-mono text-slate-400 border border-os bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <span className="text-accent/70">{chip.key}</span> = <span className="text-green-400">{chip.value}</span>;
                </span>
              ))}
            </motion.div>

            <motion.p {...fadeUp(0.32)} className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans font-light">
              Hey, I'm Sabin. I write clean, fast JavaScript and build web applications. I prefer dark themes, pixel-perfection, and custom UI components over templated layouts. Currently tweaking web vitals.
            </motion.p>

            <motion.div {...fadeUp(0.44)} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start pt-1">
              <MovingBorderBtn href="#projects" innerClass="text-white">
                Explore My Work <HiOutlineArrowRight className="w-4 h-4" />
              </MovingBorderBtn>
              <MovingBorderBtn href="#contact" innerClass="text-os-text/70 hover:text-os-text" bg="rgba(255,255,255,0.03)">
                Get In Touch
              </MovingBorderBtn>
            </motion.div>

            <motion.div {...fadeUp(0.56)} className="flex gap-5 justify-center lg:justify-start">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="w-11 h-11 flex items-center justify-center rounded-xl text-[20px] text-os-muted border transition-colors duration-250 hover:text-accent"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'var(--os-border)' }}
                  whileHover={{ scale: 1.18, y: -3, borderColor: 'rgba(var(--accent-rgb), 0.4)' }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 420, damping: 24 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
