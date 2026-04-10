/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { HiOutlineArrowRight, HiOutlineChevronDoubleDown } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import profilePic from "../assets/profile.jpg";

const socialLinks = [
  { name: "GitHub", icon: <FaGithub />, url: "https://github.com/sabin-khatri" },
  { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/sabin-khatri-25460b26a/" },
];

const Particle = ({ left, size, duration, delay }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-b from-cyan-400/40 to-purple-500/20"
    style={{ left, width: size, height: size }}
    initial={{ y: "110vh", opacity: 0.6 }}
    animate={{
      y: "-15vh",
      opacity: [0.6, 0.9, 0.4],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
    }}
  />
);

const BackgroundParticles = ({ count = 65 }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2.5,
      duration: Math.random() * 18 + 14,
      delay: Math.random() * -20,
    })), 
  [count]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </div>
  );
};

const Hero = () => {
  const [text] = useTypewriter({
    words: ["Frontend Developer", "React Enthusiast", "UI/UX Creator", "Lifelong Learner"],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1800,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const parallaxX = useTransform(smoothX, [0, window.innerWidth || 1920], [-30, 30]);
  const parallaxY = useTransform(smoothY, [0, window.innerHeight || 1080], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/30 text-white py-20 px-4"
    >
      {/* Dynamic Mouse Glow */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(34, 211, 238, 0.22), transparent 75%)`,
        }}
      />

      <BackgroundParticles count={65} />

      <div className="container mx-auto max-w-7xl relative z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          
          {/* Left Content - Bigger & Stronger */}
          <motion.div
            className="text-center lg:text-left space-y-10"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <motion.p 
                className="text-cyan-400 font-mono tracking-[6px] text-base uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                HELLO, WORLD 👋
              </motion.p>

              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none">
                I'm{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-300">
                  Sabin Khatri
                </span>
              </h1>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-200 font-light min-h-[4.5rem]">
                {text}
                <Cursor cursorColor="#22d3ee" cursorStyle="|" />
              </h2>
            </div>

            <p className="text-xl text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              I craft exceptional digital experiences with clean code, 
              stunning interfaces, and pixel-perfect attention to detail.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 justify-center lg:justify-start">
              <motion.a
                href="#projects"
                className="group relative inline-flex items-center gap-4 px-10 py-5 text-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-600 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/40"
                whileHover={{ scale: 1.08, y: -6 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="relative z-10">View My Projects</span>
                <HiOutlineArrowRight className="w-7 h-7 group-hover:rotate-45 transition-transform duration-300" />

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                  initial={{ x: "-150%" }}
                  whileHover={{ x: "150%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.a>

              <div className="flex gap-8">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="text-5xl text-slate-400 hover:text-white transition-all"
                    whileHover={{ 
                      scale: 1.4, 
                      y: -8,
                      color: "#a855f7"
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Profile Image - Enhanced */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            style={{ x: parallaxX, y: parallaxY }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Stronger Glow Ring */}
              <div className="absolute -inset-12 bg-gradient-to-br from-cyan-400/40 via-purple-500/40 to-transparent rounded-full blur-3xl opacity-80" />

              <motion.div
                className="relative rounded-full overflow-hidden border-4 border-cyan-400/30 shadow-2xl shadow-cyan-500/50"
                animate={{ 
                  boxShadow: [
                    "0 0 70px rgba(34, 211, 238, 0.5)",
                    "0 0 110px rgba(168, 85, 247, 0.6)",
                    "0 0 70px rgba(34, 211, 238, 0.5)"
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <img
                  src={profilePic}
                  alt="Sabin Khatri"
                  className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] object-cover rounded-full"
                  loading="eager"
                />
              </motion.div>

              {/* Rotating Border */}
              <motion.div
                className="absolute -inset-4 border border-cyan-400/40 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - More Prominent */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 1 }}
      >
        <span className="text-xs font-mono tracking-[4px] text-slate-500">SCROLL TO EXPLORE</span>
        <HiOutlineChevronDoubleDown className="h-9 w-9 text-cyan-400 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;