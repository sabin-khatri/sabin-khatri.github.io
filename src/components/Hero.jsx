/* eslint-disable no-unused-vars */
import React, { useMemo, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue, useSpring, useTransform,
  useAnimationFrame, useMotionTemplate,
} from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { HiOutlineArrowRight } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import profilePic from "../assets/p1.jpeg";

const socialLinks = [
  { name: "GitHub",   icon: <FaGithub />,  url: "https://github.com/sabin-khatri" },
  { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/sabin-khatri-25460b26a/" },
];

/* ── Floating particles ──────────────────────────────────────────────────── */
const Particle = ({ left, size, duration, delay }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-b from-amber-400/30 to-orange-500/20"
    style={{ left, width: size, height: size }}
    initial={{ y: "110vh", opacity: 0 }}
    animate={{ y: "-15vh", opacity: [0, 0.6, 0.3, 0] }}
    transition={{ duration, delay, repeat: Infinity, repeatType: "loop", ease: "linear" }}
  />
);

const BackgroundParticles = ({ count = 40 }) => {
  const particles = useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left:     `${Math.random() * 100}%`,
      size:     Math.random() * 3 + 1.5,
      duration: Math.random() * 22 + 16,
      delay:    Math.random() * -25,
    })),
  [count]);
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => <Particle key={p.id} {...p} />)}
    </div>
  );
};

/* ── Moving Border ───────────────────────────────────────────────────────── */
const MovingBorder = ({ children, duration = 2000, rx, ry, ...rest }) => {
  const pathRef   = useRef(null);
  const progress  = useMotionValue(0);

  useAnimationFrame((time) => {
    const len = pathRef.current?.getTotalLength();
    if (len) progress.set((time * (len / duration)) % len);
  });

  const x = useTransform(progress, (v) => pathRef.current?.getPointAtLength(v).x);
  const y = useTransform(progress, (v) => pathRef.current?.getPointAtLength(v).y);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%" height="100%"
        {...rest}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}>
        {children}
      </motion.div>
    </>
  );
};

const MovingBorderBtn = ({
  href,
  children,
  duration      = 2000,
  borderRadius  = "0.75rem",
  borderClass   = "",
  innerClass    = "",
  hoverShadow   = "",
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden p-[1.5px] inline-flex"
      style={{
        borderRadius,
        boxShadow: hovered ? hoverShadow : "none",
        transform: hovered ? "translateY(-3px) scale(1.04)" : "translateY(0) scale(1)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* animated border dot */}
      <div className="absolute inset-0" style={{ borderRadius }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div className={`h-14 w-14 opacity-90 ${borderClass}`} />
        </MovingBorder>
      </div>

      {/* button content */}
      <div
        className={`relative z-10 flex items-center gap-2.5 px-8 py-3.5 text-base font-semibold backdrop-blur-xl ${innerClass}`}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </a>
  );
};

/* ── Hero ────────────────────────────────────────────────────────────────── */
const Hero = () => {
  const [text] = useTypewriter({
    words: ["Frontend Developer", "React Developer", "UI/UX Enthusiast"],
    loop: true, typeSpeed: 80, deleteSpeed: 50, delaySpeed: 2200,
  });

  const mouseX   = useMotionValue(0);
  const mouseY   = useMotionValue(0);
  const smoothX  = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY  = useSpring(mouseY, { stiffness: 40, damping: 25 });
  const parallaxX = useTransform(smoothX, [0, 1920], [-20, 20]);
  const parallaxY = useTransform(smoothY, [0, 1080], [-20, 20]);

  useEffect(() => {
    const handle = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* dot-grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_0.8px,transparent_1px)] [background-size:60px_60px] opacity-20" />

      <BackgroundParticles count={45} />

      {/* mouse glow — desktop only */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none hidden lg:block"
        style={{
          background: `radial-gradient(700px circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(245,158,11,0.12), transparent 70%)`,
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10 px-5 sm:px-6 pt-24 pb-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-24 items-center gap-10">

          {/* ── IMAGE — top on mobile, right on desktop ── */}
          <motion.div
            className="flex justify-center lg:justify-end lg:order-2 w-full"
            style={{ x: parallaxX, y: parallaxY }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[460px] lg:h-[460px]">
              <div className="absolute inset-0 rounded-full border border-amber-400/30
                              bg-gradient-to-br from-amber-900/30 to-transparent
                              backdrop-blur-3xl shadow-2xl shadow-amber-500/10" />
              <div className="absolute inset-5 lg:inset-8 rounded-full border border-amber-400/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <img
                    src={profilePic}
                    alt="Sabin Khatri"
                    className="w-44 h-44 sm:w-56 sm:h-56 lg:w-80 lg:h-80
                               rounded-full object-cover
                               border-4 lg:border-8 border-amber-400/30
                               shadow-2xl shadow-black/80"
                  />
                  <div className="absolute -inset-4 lg:-inset-6 border-2 border-amber-400/40
                                  rounded-[2rem] lg:rounded-[3rem] rotate-12 pointer-events-none" />
                </div>
              </div>
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 lg:w-1.5 lg:h-1.5 bg-amber-400 rounded-full"
                    style={{
                      top: "50%", left: "50%",
                      transform: `rotate(${i * 45}deg) translateY(-110px)`,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* ── TEXT — bottom on mobile, left on desktop ── */}
          <motion.div
            className="lg:order-1 text-center lg:text-left space-y-6 lg:space-y-8 w-full"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* name */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-none">
                <span className="text-[#f59e0b]">Sabin</span> Khatri
              </h1>
              <p className="text-lg sm:text-2xl lg:text-3xl text-slate-300 mt-2 lg:mt-3 font-light tracking-wide min-h-[2rem]">
                {text}
                <Cursor cursorColor="#f59e0b" cursorStyle="|" />
              </p>
            </div>

            {/* description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-sm mx-auto lg:mx-0 leading-relaxed">
              Building elegant digital experiences with modern web technologies.
              Passionate about clean code, smooth animations, and meaningful interfaces.
            </p>

            {/* ── Moving Border CTA Buttons ── */}
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start pt-2">

              <MovingBorderBtn
                href="#projects"
                duration={2500}
                borderClass="bg-[radial-gradient(#f59e0b_40%,transparent_60%)]"
                innerClass="bg-amber-400/10 border border-amber-400/30 text-white hover:text-amber-300"
                hoverShadow="0 8px 30px rgba(245,158,11,0.4), 0 0 0 1px rgba(245,158,11,0.25)"
              >
                Explore My Work
                <HiOutlineArrowRight className="w-4 h-4" />
              </MovingBorderBtn>

              <MovingBorderBtn
                href="#contact"
                duration={3200}
                borderClass="bg-[radial-gradient(#fb923c_40%,transparent_60%)]"
                innerClass="bg-white/[0.03] border border-white/15 text-slate-300 hover:text-white"
                hoverShadow="0 8px 30px rgba(251,146,60,0.25)"
              >
                Get In Touch
              </MovingBorderBtn>

            </div>

            {/* social links */}
            <div className="flex gap-6 justify-center lg:justify-start text-3xl lg:text-4xl text-slate-400">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, color: "#f59e0b" }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;