/* eslint-disable no-unused-vars */
// src/components/Hero.jsx
import React from 'react'; // Import React
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profilePic from '../assets/profile.png';

const socialLinks = [
  { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/sabin-khatri' },
  { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/sabin-khatri-25460b26a/' },
];

const Hero = () => {
  // Hook for the attractive typewriter effect
  const [text] = useTypewriter({
    words: ['Frontend Developer', 'Learner', 'IT Student'],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  // Framer Motion variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="bg-slate-900 text-white min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 items-center gap-y-16 lg:gap-x-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ====== Text Content ====== */}
          <div className="text-center lg:text-left z-10">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
              variants={itemVariants}
            >
              Hi, I'm{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                Sabin Khatri
              </span>
            </motion.h1>

            <motion.h2
              className="mt-4 text-2xl sm:text-3xl text-slate-300 font-medium"
              variants={itemVariants}
            >
              <span className="mr-2">{text}</span>
              <Cursor cursorColor="#06b6d4" /> {/* Cyan cursor */}
            </motion.h2>

            <motion.p
              className="mt-6 text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              I craft beautiful and highly functional web experiences, specializing in responsive UIs with React and Tailwind CSS.
            </motion.p>

            {/* ====== Buttons & Social Links ====== */}
            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.a
                href="#projects"
                className="group inline-flex items-center gap-3 px-7 py-3 text-base font-semibold text-slate-900 bg-cyan-400 rounded-lg shadow-lg shadow-cyan-500/20"
                whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(6, 182, 212, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
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
                    whileHover={{ scale: 1.2, y: -3, color: '#06b6d4' }} // Animate color to cyan on hover
                    transition={{ duration: 0.3 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ====== Profile Image with Floating Animation ====== */}
          <motion.div
            className="flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            {/* This div handles the floating animation using Framer Motion */}
            <motion.div
              className="relative group"
              animate={{ y: ["-3%", "3%"] }} // Creates the up-and-down "floating" motion
              transition={{
                repeat: Infinity,        // Loop the animation forever
                repeatType: "reverse",   // Go back and forth
                duration: 3,             // Duration of one full cycle
                ease: "easeInOut",       // Smooth start and end
              }}
            >
              {/* This is the glowing border effect */}
              <div
                className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full blur-xl opacity-60 
                           transition-all duration-500 group-hover:opacity-100 group-hover:blur-2xl"
              ></div>
              <img
                src={profilePic}
                alt="Sabin Khatri"
                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full object-cover shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;