/* eslint-disable no-unused-vars */
import React, { useMemo, useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue, useSpring, useTransform,
} from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { HiOutlineArrowRight } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import profilePic from "../assets/p1.jpeg";

const socialLinks = [
  { name: "GitHub",   icon: <FaGithub />,  url: "https://github.com/sabin-khatri" },
  { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/sabin-khatri-25460b26a/" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   FLOATING PARTICLES
───────────────────────────────────────────────────────────────────────────── */
const Particle = ({ left, size, duration, delay }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left,
      width: size,
      height: size,
      background: "radial-gradient(circle, rgba(245,158,11,0.55) 0%, rgba(251,146,60,0.15) 100%)",
      filter: "blur(0.5px)",
    }}
    initial={{ y: "110vh", opacity: 0 }}
    animate={{ y: "-15vh", opacity: [0, 0.7, 0.4, 0] }}
    transition={{ duration, delay, repeat: Infinity, repeatType: "loop", ease: "linear" }}
  />
);

const BackgroundParticles = ({ count = 45 }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left:     `${Math.random() * 100}%`,
        size:     Math.random() * 3 + 1.5,
        duration: Math.random() * 22 + 16,
        delay:    Math.random() * -28,
      })),
    [count]
  );
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => <Particle key={p.id} {...p} />)}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MOVING BORDER BUTTON
   Fix: use performance.now() + perimeter math directly — no getTotalLength()
   so the dot never stutters or pauses.
───────────────────────────────────────────────────────────────────────────── */
const MovingBorderBtn = ({
  href,
  children,
  duration      = 3000,
  borderRadius  = "0.75rem",
  glowColor     = "rgba(245,158,11,0.55)",
  innerClass    = "",
  hoverShadow   = "",
}) => {
  const dotRef   = useRef(null);
  const rafRef   = useRef(null);
  const wrapRef  = useRef(null);
  const startRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const animate = useCallback((ts) => {
    if (startRef.current === null) startRef.current = ts;
    const elapsed = ts - startRef.current;

    const el = wrapRef.current;
    const dot = dotRef.current;
    if (!el || !dot) { rafRef.current = requestAnimationFrame(animate); return; }

    const W = el.offsetWidth;
    const H = el.offsetHeight;
    const perimeter = 2 * (W + H);
    const progress  = (elapsed % duration) / duration; // 0 → 1
    const dist      = progress * perimeter;

    let x, y;
    if (dist < W) {                    // top edge →
      x = dist;           y = 0;
    } else if (dist < W + H) {         // right edge ↓
      x = W;              y = dist - W;
    } else if (dist < 2 * W + H) {     // bottom edge ←
      x = W - (dist - W - H); y = H;
    } else {                           // left edge ↑
      x = 0;              y = H - (dist - 2 * W - H);
    }

    dot.style.transform = `translate(${x - 7}px, ${y - 7}px)`;
    rafRef.current = requestAnimationFrame(animate);
  }, [duration]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  return (
    <motion.a
      href={href}
      ref={wrapRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className="relative overflow-hidden inline-flex cursor-pointer no-underline"
      style={{
        borderRadius,
        boxShadow: hovered ? hoverShadow : "none",
        transition: "box-shadow 0.3s ease",
        padding: "1.5px",
      }}
    >
      {/* Animated border glow dot */}
      <div
        ref={dotRef}
        className="absolute pointer-events-none z-0"
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: glowColor,
          filter: `blur(5px)`,
          opacity: 0.9,
          top: 0,
          left: 0,
        }}
      />

      {/* Subtle border outline */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          borderRadius,
          border: "1px solid rgba(245,158,11,0.22)",
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 flex items-center gap-2.5 px-7 py-3.5 text-base font-semibold backdrop-blur-xl ${innerClass}`}
        style={{ borderRadius: `calc(${borderRadius} - 1.5px)` }}
      >
        {children}
      </div>
    </motion.a>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────────────────────── */
const Hero = () => {
  const [text] = useTypewriter({
    words: ["Frontend Developer", "React Developer", "UI/UX Enthusiast"],
    loop: true, typeSpeed: 80, deleteSpeed: 50, delaySpeed: 2200,
  });

  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  const parallaxX = useTransform(smoothX, [0, 1920], [-18, 18]);
  const parallaxY = useTransform(smoothY, [0, 1080], [-18, 18]);

  useEffect(() => {
    const handle = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  /* stagger helper */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* dot-grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#f59e0b 0.8px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      />

      <BackgroundParticles count={48} />

      {/* ambient mouse glow */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none hidden lg:block"
        style={{
          background: "radial-gradient(600px circle at 50% 50%, rgba(245,158,11,0.11), transparent 70%)",
        }}
      />

      {/* large ambient orbs */}
      <div
        className="absolute top-[-8%] left-[-12%] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-8%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(251,146,60,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10 px-5 sm:px-6 pt-28 pb-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-20 items-center gap-12">

          {/* ── PROFILE IMAGE ── right on desktop, top on mobile */}
          <motion.div
            className="flex justify-center lg:justify-end lg:order-2 w-full"
            style={{ x: parallaxX, y: parallaxY }}
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[460px] lg:h-[460px]">

              {/* outer ring */}
              <div className="absolute inset-0 rounded-full border border-amber-400/25
                              bg-gradient-to-br from-amber-900/20 to-transparent
                              backdrop-blur-3xl shadow-2xl shadow-amber-500/10" />

              {/* middle ring */}
              <div className="absolute inset-5 lg:inset-8 rounded-full border border-amber-400/15" />

              {/* photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <img
                    src={profilePic}
                    alt="Sabin Khatri"
                    className="w-44 h-44 sm:w-56 sm:h-56 lg:w-80 lg:h-80
                               rounded-full object-cover
                               border-4 lg:border-[6px] border-amber-400/35
                               shadow-2xl shadow-black/80"
                  />
                  {/* rotated corner frame */}
                  <div className="absolute -inset-4 lg:-inset-6 border-2 border-amber-400/35
                                  rounded-[2rem] lg:rounded-[3rem] rotate-12 pointer-events-none" />
                </div>
              </div>

              {/* orbiting dots — slow, continuous */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 lg:w-1.5 lg:h-1.5 bg-amber-400 rounded-full"
                    style={{
                      top: "50%", left: "50%",
                      transform: `rotate(${i * 45}deg) translateY(-112px)`,
                      boxShadow: "0 0 6px #f59e0b",
                    }}
                  />
                ))}
              </motion.div>

              {/* counter-rotating ring */}
              <motion.div
                className="absolute inset-2 lg:inset-4 rounded-full"
                style={{ border: "1px dashed rgba(245,158,11,0.18)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* ── TEXT CONTENT ── left on desktop, bottom on mobile */}
          <div className="lg:order-1 text-center lg:text-left space-y-6 lg:space-y-8 w-full">

            {/* badge */}
            <motion.div
              {...fadeUp(0.1)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                         border border-amber-400/20 bg-amber-400/[0.06] backdrop-blur-sm
                         text-amber-400 text-xs font-semibold tracking-widest uppercase mx-auto lg:mx-0"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-amber-400"
                style={{ boxShadow: "0 0 6px #f59e0b" }}
              />
              Available for opportunities
            </motion.div>

            {/* name */}
            <motion.div {...fadeUp(0.2)}>
              <h1
                className="text-4xl sm:text-5xl lg:text-[4.5rem] font-black tracking-tighter leading-[1.0]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <span style={{ color: "#f59e0b", textShadow: "0 0 40px rgba(245,158,11,0.3)" }}>
                  Sabin
                </span>{" "}
                Khatri
              </h1>
              <p
                className="text-lg sm:text-2xl lg:text-3xl text-slate-300 mt-2 lg:mt-3 font-light tracking-wide min-h-[2.25rem]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {text}
                <Cursor cursorColor="#f59e0b" cursorStyle="|" />
              </p>
            </motion.div>

            {/* description */}
            <motion.p
              {...fadeUp(0.32)}
              className="text-sm sm:text-base lg:text-[1.05rem] text-slate-400 max-w-sm
                         mx-auto lg:mx-0 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Building elegant digital experiences with modern web technologies.
              Passionate about clean code, smooth animations, and meaningful interfaces.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              {...fadeUp(0.44)}
              className="flex flex-wrap items-center gap-4 justify-center lg:justify-start pt-1"
            >
              <MovingBorderBtn
                href="#projects"
                duration={2800}
                glowColor="rgba(245,158,11,0.7)"
                innerClass="bg-amber-400/10 text-white hover:text-amber-300"
                hoverShadow="0 8px 36px rgba(245,158,11,0.38), 0 0 0 1px rgba(245,158,11,0.22)"
              >
                Explore My Work
                <HiOutlineArrowRight className="w-4 h-4" />
              </MovingBorderBtn>

              <MovingBorderBtn
                href="#contact"
                duration={3800}
                glowColor="rgba(251,146,60,0.65)"
                innerClass="bg-white/[0.03] text-slate-300 hover:text-white"
                hoverShadow="0 8px 30px rgba(251,146,60,0.22)"
              >
                Get In Touch
              </MovingBorderBtn>
            </motion.div>

            {/* social links */}
            <motion.div
              {...fadeUp(0.56)}
              className="flex gap-5 justify-center lg:justify-start"
            >
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="w-11 h-11 flex items-center justify-center rounded-xl
                             text-[20px] text-slate-500
                             border border-white/[0.08] bg-white/[0.03]
                             hover:text-amber-400 hover:border-amber-400/40
                             transition-colors duration-250"
                  whileHover={{ scale: 1.18, y: -3 }}
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