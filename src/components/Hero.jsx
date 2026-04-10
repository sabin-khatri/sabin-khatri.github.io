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
    className="absolute rounded-full bg-gradient-to-b from-cyan-400/30 to-purple-500/20"
    style={{ left, width: size, height: size }}
    initial={{ y: "110vh", opacity: 0.5 }}
    animate={{ y: "-15vh", opacity: [0.5, 0.8, 0.3] }}
    transition={{ duration, delay, repeat: Infinity, repeatType: "loop", ease: "linear" }}
  />
);

const BackgroundParticles = ({ count = 50 }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3.5 + 2,
      duration: Math.random() * 16 + 12,
      delay: Math.random() * -15,
    })), 
  [count]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => <Particle key={p.id} {...p} />)}
    </div>
  );
};

const Hero = () => {
  const [text] = useTypewriter({
    words: ["Frontend Developer", "React Enthusiast", "UI/UX Creator", "Lifelong Learner"],
    loop: true,
    typeSpeed: 75,
    deleteSpeed: 55,
    delaySpeed: 2000,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const parallaxX = useTransform(smoothX, [0, window.innerWidth || 1920], [-20, 20]);
  const parallaxY = useTransform(smoothY, [0, window.innerHeight || 1080], [-20, 20]);

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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/30 text-white py-16 px-4"
    >
      {/* Dynamic Mouse Glow */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(34, 211, 238, 0.15), transparent 70%)`,
        }}
      />

      <BackgroundParticles count={50} />

      <div className="container mx-auto max-w-6xl relative z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
          
          {/* Left Content - More Balanced Size */}
          <motion.div
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <motion.p 
                className="text-cyan-400 font-mono tracking-[4px] text-sm uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                HELLO, WORLD
              </motion.p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none">
                I'm{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-300">
                  Sabin Khatri
                </span>
              </h1>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-slate-200 font-light min-h-[3.8rem]">
                {text}
                <Cursor cursorColor="#22d3ee" cursorStyle="|" />
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-slate-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
              I build beautiful, responsive, and high-performance web experiences with modern technologies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pt-4 justify-center lg:justify-start">
              <motion.a
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl overflow-hidden shadow-xl shadow-cyan-500/30"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="relative z-10">View My Projects</span>
                <HiOutlineArrowRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  initial={{ x: "-150%" }}
                  whileHover={{ x: "150%" }}
                  transition={{ duration: 0.7 }}
                />
              </motion.a>

              <div className="flex gap-6">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-4xl text-slate-400 hover:text-white transition-all"
                    whileHover={{ scale: 1.3, y: -6 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Profile Image - Responsive Size */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            style={{ x: parallaxX, y: parallaxY }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Glow Ring */}
              <div className="absolute -inset-8 bg-gradient-to-br from-cyan-400/30 via-purple-500/30 to-transparent rounded-full blur-3xl opacity-70" />

              <motion.div
                className="relative rounded-full overflow-hidden border border-cyan-400/20 shadow-2xl shadow-cyan-500/40"
                animate={{ 
                  boxShadow: [
                    "0 0 50px rgba(34, 211, 238, 0.4)",
                    "0 0 80px rgba(168, 85, 247, 0.5)",
                    "0 0 50px rgba(34, 211, 238, 0.4)"
                  ]
                }}
                transition={{ duration: 4.5, repeat: Infinity }}
              >
                <img
                  src={profilePic}
                  alt="Sabin Khatri"
                  className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full"
                  loading="eager"
                />
              </motion.div>

              {/* Rotating Border */}
              <motion.div
                className="absolute -inset-3 border border-cyan-400/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span className="text-xs font-mono tracking-widest text-slate-500">SCROLL TO EXPLORE</span>
        <HiOutlineChevronDoubleDown className="h-7 w-7 text-cyan-400 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;