/* eslint-disable no-unused-vars */
'use client';

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
    className="absolute rounded-full bg-gradient-to-b from-cyan-400/40 to-purple-500/30"
    style={{ left, width: size, height: size }}
    initial={{ y: "110vh", opacity: 0 }}
    animate={{ 
      y: "-15vh", 
      opacity: [0, 0.7, 0.4, 0] 
    }}
    transition={{ 
      duration, 
      delay, 
      repeat: Infinity, 
      repeatType: "loop", 
      ease: "linear" 
    }}
  />
);

const BackgroundParticles = ({ count = 50 }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
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
    words: ["Frontend Developer", "React Enthusiast", "UI/UX Creator"],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const parallaxX = useTransform(smoothX, [0, typeof window !== "undefined" ? window.innerWidth : 1920], [-25, 25]);
  const parallaxY = useTransform(smoothY, [0, typeof window !== "undefined" ? window.innerHeight : 1080], [-25, 25]);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/20 text-white"
    >
      {/* Dynamic Mouse Glow */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 211, 238, 0.15), transparent 70%)`,
        }}
      />

      <BackgroundParticles count={50} />

      <div className="container mx-auto max-w-6xl relative z-10 px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none">
                Hi, I'm{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-300">
                  Sabin Khatri
                </span>
              </h1>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-slate-200 font-light min-h-[4.5rem] font-mono tracking-wide">
                {text}
                <Cursor cursorColor="#22d3ee" cursorStyle="|" />
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Crafting beautiful, high-performance web experiences with React, 
              Tailwind &amp; Framer Motion.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 justify-center lg:justify-start">
              <motion.a
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-10 py-4.5 text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-shadow"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="relative z-10">View My Work</span>
                <HiOutlineArrowRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  initial={{ x: "-150%" }}
                  whileHover={{ x: "150%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.a>

              <div className="flex gap-7 text-4xl">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.4, y: -6, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Floating Profile Card */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            style={{ x: parallaxX, y: parallaxY }}
          >
            <motion.div
              className="relative"
              initial={{ y: -100, rotate: -8 }}
              animate={{ 
                y: 0, 
                rotate: [-4, 4, -4] 
              }}
              transition={{ 
                y: { duration: 1.2, ease: "easeOut" },
                rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Hanging Rope Effect */}
              <div className="absolute left-1/2 -top-16 w-0.5 h-16 bg-gradient-to-b from-transparent via-cyan-400/70 to-cyan-400 mx-auto" />

              <motion.div
                className="relative bg-slate-900/90 border border-cyan-400/30 backdrop-blur-xl rounded-3xl p-3 shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.03, rotate: 1.5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400" />

                <img
                  src={profilePic}
                  alt="Sabin Khatri"
                  className="w-80 h-96 sm:w-96 sm:h-[26rem] object-cover rounded-2xl shadow-inner"
                />

                {/* Status Badge */}
                <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md px-5 py-1.5 rounded-full text-xs font-mono text-emerald-400 border border-emerald-400/50 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Error 404: persons-are-not-found
                </div>

                {/* Subtle Gloss */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl pointer-events-none" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span className="text-xs font-mono tracking-[3px] text-slate-500">SCROLL TO EXPLORE</span>
        <HiOutlineChevronDoubleDown className="h-8 w-8 text-cyan-400 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;