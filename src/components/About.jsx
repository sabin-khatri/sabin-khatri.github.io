"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import OrbitingSkills from './orbiting-skills';
import { FaDownload, FaCheckCircle } from 'react-icons/fa';
import resume from '../assets/resume/resume.pdf';

const AnimatedTitle = ({ text }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: i * 0.08 },
    }),
  };

  const child = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', damping: 14, stiffness: 110 } 
    },
  };

  return (
    <motion.h2
      className="text-3xl lg:text-5xl font-bold text-slate-100 tracking-wide"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
};

const TextReveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 35 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.75, ease: 'easeOut' }}
    className="text-slate-300 text-lg leading-relaxed"
  >
    {children}
  </motion.div>
);

const About = () => {
  const [downloadStatus, setDownloadStatus] = useState('idle');
  const [progress, setProgress] = useState(0);

  const handleDownload = () => {
    if (downloadStatus !== 'idle') return;

    setDownloadStatus('downloading');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 100;
        }
        return prev + 8;
      });
    }, 140);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setDownloadStatus('completed');

      const link = document.createElement('a');
      link.href = resume;
      link.setAttribute('download', 'Sabin-Khatri-Resume.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setDownloadStatus('idle');
        setProgress(0);
      }, 2200);
    }, 1800);
  };

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900 py-20 lg:py-28 text-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)',
          backgroundSize: '2.5rem 2.5rem',
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          
          {/* Left Side - Only Big Orbiting Skills (Image removed) */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
              <OrbitingSkills />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <div className="lg:col-span-3 text-center lg:text-left space-y-10">
            <div>
              <AnimatedTitle text="About Me" />
              <motion.p
                className="mt-4 text-xl text-cyan-400 font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Frontend Developer &amp; UI Enthusiast
              </motion.p>
            </div>

            <div className="space-y-6">
              <TextReveal>
                <p>
                  Hello! I'm a passionate Frontend Developer who thrives on turning complex problems 
                  into beautiful, intuitive, and highly interactive web experiences.
                </p>
              </TextReveal>

              <TextReveal>
                <p>
                  From concept to deployment, my focus is on crafting responsive, high-performance 
                  applications that users love to interact with. I love clean code, smooth animations, 
                  and delightful user interfaces.
                </p>
              </TextReveal>
            </div>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-4 pt-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={handleDownload}
                disabled={downloadStatus !== 'idle'}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl shadow-xl shadow-cyan-500/30 overflow-hidden"
                whileHover={downloadStatus === 'idle' ? { scale: 1.05, y: -3 } : {}}
                whileTap={downloadStatus === 'idle' ? { scale: 0.97 } : {}}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/60 to-purple-500/60 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />

                <span className="relative z-10 flex items-center gap-2.5">
                  {downloadStatus === 'idle' && (
                    <>
                      <FaDownload className="text-lg" /> Download Resume
                    </>
                  )}
                  {downloadStatus === 'downloading' && `Downloading... ${progress}%`}
                  {downloadStatus === 'completed' && (
                    <>
                      <FaCheckCircle className="text-lg" /> Download Completed!
                    </>
                  )}
                </span>
              </motion.button>

              <motion.a
                href="#contact"
                className="inline-flex items-center px-8 py-3.5 font-semibold text-slate-200 border-2 border-slate-600 hover:border-slate-400 rounded-xl transition-all"
                whileHover={{ scale: 1.05, y: -3, backgroundColor: 'rgba(30, 41, 59, 0.6)' }}
                whileTap={{ scale: 0.97 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;