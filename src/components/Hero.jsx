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
          
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
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

            <div className="flex flex-col sm:flex-row items-center gap-5 pt-4 justify-center lg:justify-start">
              <motion.a
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl overflow-hidden shadow-xl shadow-cyan-500/30"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.96 }}
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

          {/* Right Content - Hanging ID Card Animation */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 perspective-1000">
            <motion.div
              className="relative flex flex-col items-center"
              initial={{ y: -200, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                rotate: [-4, 4, -4] // The Swing Motion
              }}
              style={{ transformOrigin: "top center" }} // Critical for "hanging" look
              transition={{ 
                y: { duration: 1.5, ease: "easeOut" },
                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* The String / Rope */}
              <div className="w-[3px] h-24 bg-gradient-to-b from-slate-700 via-cyan-500/50 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
              
              {/* Connection Ring */}
              <div className="w-4 h-4 bg-slate-800 border-2 border-cyan-400 rounded-full -mt-2 z-20 shadow-lg" />

              {/* ID Card Frame */}
              <motion.div
                className="relative mt-0 group"
                whileHover={{ scale: 1.02 }}
              >
                {/* Glow behind the card */}
                <div className="absolute -inset-4 bg-cyan-500/20 rounded-3xl blur-2xl group-hover:bg-cyan-500/30 transition-colors" />
                
                <div className="relative p-3 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Internal ID Card Design */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />
                  
                  <img
                    src={profilePic}
                    alt="Sabin Khatri"
                    className="w-64 h-80 sm:w-72 sm:h-96 object-cover rounded-lg grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  />
                  
                  {/* Card Badge Text */}
                  <div className="mt-4 pb-2 text-center">
                    <h3 className="text-cyan-400 font-mono text-xs tracking-widest uppercase opacity-70">
                      Access Granted / Developer
                    </h3>
                  </div>
                </div>

                {/* Glossy Plastic Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none rounded-2xl" />
              </motion.div>
            </motion.div>
          </div>
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