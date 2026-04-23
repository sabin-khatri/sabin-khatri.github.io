/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { HiOutlineArrowRight, HiOutlineChevronDoubleDown } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import profilePic from "../assets/p1.jpeg";

const socialLinks = [
  { name: "GitHub", icon: <FaGithub />, url: "https://github.com/sabin-khatri" },
  { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/sabin-khatri-25460b26a/" },
];

const Particle = ({ left, size, duration, delay }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-b from-amber-400/30 to-orange-500/20"
    style={{ left, width: size, height: size }}
    initial={{ y: "110vh", opacity: 0 }}
    animate={{ 
      y: "-15vh", 
      opacity: [0, 0.6, 0.3, 0] 
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

const BackgroundParticles = ({ count = 40 }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 22 + 16,
      delay: Math.random() * -25,
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
    words: ["Frontend Developer", "React Developer", "UI/UX Enthusiast"],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 2200,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const parallaxX = useTransform(smoothX, [0, 1920], [-20, 20]);
  const parallaxY = useTransform(smoothY, [0, 1080], [-20, 20]);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden 
                 bg-[#0a0a0a] text-white"
    >
      {/* Subtle constellation background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_0.8px,transparent_1px)] 
                      [background-size:60px_60px] opacity-20" />

      <BackgroundParticles count={45} />

      {/* Mouse Glow (Golden) */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(700px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.12), transparent 70%)`,
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10 px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content - Chiloane Style */}
          <motion.div
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-none">
                <span className="text-[#f59e0b]">Sabin</span> Khatri
              </h1>
              <p className="text-2xl sm:text-3xl text-slate-300 mt-3 font-light tracking-wide">
                {text}
                <Cursor cursorColor="#f59e0b" cursorStyle="|" />
              </p>
            </div>

            <p className="text-lg text-slate-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Building elegant digital experiences with modern web technologies. 
              Passionate about clean code, smooth animations, and meaningful interfaces.
            </p>

            {/* CTA Buttons - Chiloane Style */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 justify-center lg:justify-start">
              <motion.a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 
                           text-lg font-semibold bg-[#f59e0b] hover:bg-amber-500 
                           text-black rounded-xl overflow-hidden transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Explore My Work</span>
                <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="#contact"
                className="px-10 py-4 text-lg font-medium border border-amber-400/70 
                           hover:border-amber-400 rounded-xl transition-all duration-300
                           hover:bg-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Get In Touch
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex gap-8 justify-center lg:justify-start text-4xl text-slate-400 pt-4">
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

          {/* Right Side - Large Golden Circle (Chiloane Style) */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            style={{ x: parallaxX, y: parallaxY }}
          >
            <motion.div
              className="relative w-[380px] h-[380px] lg:w-[460px] lg:h-[460px]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            >
              {/* Large Golden Circle */}
              <div className="absolute inset-0 rounded-full border border-amber-400/30 
                              bg-gradient-to-br from-amber-900/30 to-transparent 
                              backdrop-blur-3xl shadow-2xl shadow-amber-500/10" />

              {/* Inner Glow Ring */}
              <div className="absolute inset-8 rounded-full border border-amber-400/20" />

              {/* Your Logo / Initials / Profile */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <img
                    src={profilePic}
                    alt="Sabin Khatri"
                    className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-8 border-amber-400/30 
                               shadow-2xl shadow-black/80"
                  />
                  
                  {/* Golden Hexagon Overlay (Chiloane inspired) */}
                  <div className="absolute -inset-6 border-2 border-amber-400/40 rounded-[3rem] rotate-12 
                                  pointer-events-none" />
                </div>
              </div>

              {/* Subtle orbiting dots */}
              <motion.div 
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${i * 45}deg) translateY(-170px)`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

    
    </section>
  );
};

export default Hero;