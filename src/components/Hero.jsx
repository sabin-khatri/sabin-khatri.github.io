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

const BackgroundParticles = ({ count = 70 }) => {
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
    typeSpeed: 80,
    deleteSpeed: 60,
    delaySpeed: 2200,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const parallaxX = useTransform(smoothX, [0, window.innerWidth || 1920], [-25, 25]);
  const parallaxY = useTransform(smoothY, [0, window.innerHeight || 1080], [-25, 25]);

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
          background: `radial-gradient(700px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(34, 211, 238, 0.18), transparent 70%)`,
        }}
      />

      <BackgroundParticles count={65} />

      <div className="container mx-auto max-w-7xl relative z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="space-y-3">
              <motion.p 
                className="text-cyan-400 font-mono tracking-[4px] text-sm uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                HELLO, WORLD
              </motion.p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter">
                I'm{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400">
                  Sabin Khatri
                </span>
              </h1>

              <h2 className="text-2xl sm:text-3xl text-slate-300 font-light min-h-[3.5rem]">
                {text}
                <Cursor cursorColor="#22d3ee" cursorStyle="|" />
              </h2>
            </div>

            <p className="text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              I build exceptional digital experiences with clean code, beautiful interfaces, 
              and attention to every pixel.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pt-4 justify-center lg:justify-start">
              <motion.a
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl overflow-hidden shadow-xl shadow-cyan-500/30"
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="relative z-10">View My Projects</span>
                <HiOutlineArrowRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />

                {/* Shine Effect */}
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
                    aria-label={link.name}
                    className="text-4xl text-slate-400 hover:text-white transition-colors"
                    whileHover={{ 
                      scale: 1.3, 
                      y: -6,
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

          {/* Profile Image */}
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
              <div className="absolute -inset-8 bg-gradient-to-br from-cyan-400/30 via-purple-500/30 to-transparent rounded-full blur-3xl opacity-75" />

              <motion.div
                className="relative rounded-full overflow-hidden border border-cyan-400/20 shadow-2xl shadow-cyan-500/40"
                animate={{ 
                  boxShadow: [
                    "0 0 60px rgba(34, 211, 238, 0.4)",
                    "0 0 90px rgba(168, 85, 247, 0.5)",
                    "0 0 60px rgba(34, 211, 238, 0.4)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <img
                  src={profilePic}
                  alt="Sabin Khatri"
                  className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-full"
                  loading="eager"
                />
              </motion.div>

              {/* Subtle rotating border */}
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
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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