import React, { useMemo, useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring, transform } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { HiOutlineArrowRight, HiOutlineChevronDoubleDown } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import profilePic from "../assets/profile.jpg";
import { TypeAnimation } from "react-type-animation";

const socialLinks = [
  { name: "GitHub", icon: <FaGithub />, url: "https://github.com/sabin-khatri" },
  { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/sabin-khatri-25460b26a/" },
];

const Particle = ({ left, size, duration, delay }) => (
  <motion.div
    className="absolute rounded-full"
    style={{ left, width: size, height: size }}
    initial={{ y: "110vh" }}
    animate={{ 
      y: "-10vh",
      background: `radial-gradient(circle at center, rgba(0, 255, 255, 0.3), rgba(147, 51, 234, 0.2))`
    }}
    transition={{ repeat: Infinity, repeatType: "loop", duration, delay, ease: "linear" }}
  />
);

const BackgroundParticles = ({ count = 75 }) => {
  const particles = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 15,
  })), [count]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {particles.map((p) => <Particle key={p.id} {...p} />)}
    </div>
  );
};

const AnimatedHeading = ({ text }) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.5 * i },
    }),
  };
  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  return (
    <motion.h1
      className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-cyan-400/80"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: "1rem" }} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const Hero = () => {
  const [text] = useTypewriter({
    words: ["Frontend Developer", "Learner", "IT Student", "React Enthusiast"],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxX = useSpring(0, { stiffness: 50, damping: 20 });
  const parallaxY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const newX = transform(mousePosition.x, [0, window.innerWidth], [-15, 15]);
    const newY = transform(mousePosition.y, [0, window.innerHeight], [-15, 15]);
    parallaxX.set(newX);
    parallaxY.set(newY);
  }, [mousePosition, parallaxX, parallaxY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-slate-900 to-cyan-900/10 text-white min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 191, 255, 0.2), transparent 80%)`,
        }}
      />

      <BackgroundParticles count={60} />

      <div className="container mx-auto max-w-7xl relative z-10 flex-grow flex items-center">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 items-center gap-y-16 lg:gap-x-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center lg:text-left">
            <AnimatedHeading text="Hi, I'm" />

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-2"
              variants={itemVariants}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                <TypeAnimation sequence={["Sabin Khatri", 2000]} wrapper="span" speed={30} repeat={0} />
              </span>
            </motion.h1>

            <motion.h2
              className="mt-4 text-2xl sm:text-3xl text-slate-300 font-medium"
              variants={itemVariants}
            >
              <span className="mr-2">{text}</span>
              <Cursor cursorColor="#06b6d4" />
            </motion.h2>

            <motion.p
              className="mt-6 text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              I craft beautiful and highly functional web experiences, specializing in responsive UIs with React and Tailwind CSS.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.a
                href="#projects"
                className="group inline-flex items-center gap-3 px-7 py-3 text-base font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg shadow-lg"
                initial={{ boxShadow: "0px 0px 0px rgba(6, 182, 212, 0)" }}
                whileHover={{ scale: 1.1, y: -5, boxShadow: "0px 15px 30px rgba(6, 182, 212, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                View My Work
                <HiOutlineArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
              </motion.a>
              <div className="flex items-center gap-5">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`My ${link.name} profile`}
                    className="text-3xl text-slate-400"
                    whileHover={{ scale: 1.3, y: -3, color: "#9333ea" }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div className="flex justify-center lg:justify-end" style={{ x: parallaxX, y: parallaxY }}>
            <motion.div
              className="relative group"
              animate={{ y: ["-3%", "3%"] }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" }}
            >
              <div
                className="absolute -inset-2 bg-gradient-to-r from-purple-600/40 to-cyan-400/40 rounded-full blur-xl opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:blur-2xl"
              />
              <img
                src={profilePic}
                alt="Sabin Khatri"
                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full object-cover shadow-[0_10px_40px_rgba(0,191,255,0.5)]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        transition={{ delay: 3, duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <HiOutlineChevronDoubleDown className="h-8 w-8 text-slate-500 animate-pulse" />
      </motion.div>
    </section>
  );
};

export default Hero;