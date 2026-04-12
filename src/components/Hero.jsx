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

const BackgroundParticles = ({ count = 45 }) => {
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
    words: ["Frontend Developer", "React Enthusiast",],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1800,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  const parallaxX = useTransform(smoothX, [0, window.innerWidth || 1920], [-18, 18]);
  const parallaxY = useTransform(smoothY, [0, window.innerHeight || 1080], [-18, 18]);

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
          background: `radial-gradient(650px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(34, 211, 238, 0.18), transparent 75%)`,
        }}
      />

      <BackgroundParticles count={45} />

      <div className="container mx-auto max-w-6xl relative z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Content - Programmer Style */}
          <motion.div
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="space-y-5">
              

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-2px] leading-none">
                Hi, I'm{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-300">
                  Sabin Khatri
                </span>
              </h1>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-slate-200 font-light min-h-[4rem] font-mono">
                {text}
                <Cursor cursorColor="#22d3ee" cursorStyle="_" />
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-slate-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Turning coffee into clean code • Making pixels behave • 
              Debugging life one component at a time.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pt-6 justify-center lg:justify-start">
              <motion.a
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-9 py-4 text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl overflow-hidden shadow-xl shadow-cyan-500/30"
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="relative z-10">See My Projects</span>
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
                    whileHover={{ scale: 1.35, y: -6, rotate: 8 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Funny Hanging Programmer Card */}
          <motion.div 
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            style={{ x: parallaxX, y: parallaxY }}
          >
            <motion.div
              className="relative"
              initial={{ y: -180, rotate: -12 }}
              animate={{ 
                y: 0, 
                rotate: [-6, 6, -6] 
              }}
              transition={{ 
                y: { duration: 1.4, ease: "easeOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Hanging Rope */}
              <div className="absolute left-1/2 -top-20 w-0.5 h-20 bg-gradient-to-b from-transparent via-cyan-400/60 to-cyan-400 mx-auto" />

              {/* Card Container */}
              <motion.div
                className="relative bg-slate-900 border border-cyan-400/30 rounded-3xl p-4 shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.04, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />

                <img
                  src={profilePic}
                  alt="Sabin Khatri"
                  className="w-72 h-80 sm:w-80 sm:h-96 object-cover rounded-2xl"
                />

                {/* Funny Badge */}
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-4 py-1 rounded-full text-xs font-mono text-cyan-400 border border-cyan-400/50">
                  CTRL + S = Saved Life
                </div>

                {/* Glossy Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-3xl" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        <span className="text-xs font-mono tracking-widest text-slate-500">SCROLL TO EXPLORE</span>
        <HiOutlineChevronDoubleDown className="h-7 w-7 text-cyan-400 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;