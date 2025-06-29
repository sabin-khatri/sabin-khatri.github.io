// src/components/About.jsx
import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; // Fixed import
import { FaDownload } from 'react-icons/fa';
import profileImage from '../assets/about.avif';

// AnimatedCounter component
function AnimatedCounter({ to, className }) {
  const ref = useRef(null);
  const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      animate(0, to, {
        duration: 2,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = value.toFixed(0);
          }
        },
      });
    }
  }, [inView, to]);

  return <span ref={(node) => {
    ref.current = node;
    inViewRef(node);
  }} className={className}>0</span>;
}

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
  };

  return (
    <section id="about" className="bg-slate-900 py-20 lg:py-28 text-white">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* ===== Image Section ===== */}
          <motion.div
            className="lg:w-2/5 flex justify-center order-first lg:order-last"
            variants={itemVariants}
          >
            <motion.div
              className="relative p-1.5 rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="bg-slate-900 p-2 rounded-xl">
                <img
                  src={profileImage}
                  alt="A portrait of the developer"
                  className="rounded-lg shadow-2xl shadow-black/30 w-full h-auto"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* ===== Content Section ===== */}
          <div className="lg:w-3/5 text-center lg:text-left">
            <motion.header variants={itemVariants}>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-100">About Me</h2>
              <p className="mt-4 text-lg text-cyan-400 font-semibold">
                Frontend Developer & UI Enthusiast
              </p>
            </motion.header>

            <motion.div
              className="mt-8 space-y-5 text-slate-300 text-lg leading-relaxed"
              variants={itemVariants}
            >
              <p>
                Hello! I'm a passionate Frontend Developer who thrives on building
                beautiful, responsive, and highly interactive user interfaces.
              </p>
              <p>
                My toolkit includes <span className="text-white font-medium">JavaScript</span>, <span className="text-white font-medium">React</span>, <span className="text-white font-medium">Next.js</span>, and <span className="text-white font-medium">Tailwind CSS</span>.
              </p>
            </motion.div>

            {/* ===== Stats Section ===== */}
            <motion.div
              className="mt-12 flex justify-center lg:justify-start gap-8 sm:gap-12"
              variants={itemVariants}
            >
              <div className="text-center">
                <h3 className="text-4xl font-bold text-cyan-400">
                  <AnimatedCounter to={2} />+
                </h3>
                <p className="text-slate-400 mt-1">Years Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-cyan-400">
                  <AnimatedCounter to={10} />+
                </h3>
                <p className="text-slate-400 mt-1">Projects Completed</p>
              </div>
            </motion.div>

            {/* ===== CTA Buttons ===== */}
            <motion.div
              className="mt-12 flex justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="src\assets\resume"
                download="Sabin-Khatri-Frontend-Developer-Resume.pdf"
                className="inline-flex items-center gap-2.5 px-6 py-3 font-semibold text-slate-900 bg-cyan-400 rounded-lg shadow-lg shadow-cyan-500/20"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FaDownload />
                Download Resume
              </motion.a>
              <motion.a
                href="#contact"
                className="inline-flex items-center px-8 py-3 font-semibold text-slate-200 border-2 border-slate-700 rounded-lg"
                whileHover={{ scale: 1.05, y: -4, backgroundColor: "#1e293b", borderColor: "#334155" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
