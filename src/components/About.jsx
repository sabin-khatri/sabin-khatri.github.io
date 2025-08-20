/* eslint-disable no-unused-vars */
// src/components/About.jsx

// Step 1: useState import garnuhos ra FaCheckCircle icon pani
import React, { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaDownload, FaCheckCircle } from 'react-icons/fa'; // FaCheckCircle thapnuhos
import profileImage from '../assets/about.avif';
import resume from '../assets/resume/resume.pdf';

// AnimatedCounter component (yo change garnu pardaina)
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
  // Step 2: Button ko lagi state ra progress manage garnuhos
  const [downloadStatus, setDownloadStatus] = useState('idle'); // 'idle' | 'downloading' | 'completed'
  const [progress, setProgress] = useState(0);

  // Step 3: Download handle garne function banaunuhos
  const handleDownload = () => {
    if (downloadStatus !== 'idle') return;

    setDownloadStatus('downloading');

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

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
      }, 2000);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
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
          {/* ===== Image Section (No changes here) ===== */}
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

          {/* ===== Content Section (No changes until the button) ===== */}
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
                My toolkit includes <span className="text-white font-medium">JavaScript</span>, <span className="text-white font-medium">React</span>, and <span className="text-white font-medium">Tailwind CSS</span>.
              </p>
            </motion.div>

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

            {/* ===== CTA Buttons (This is where the changes are) ===== */}
            <motion.div
              className="mt-12 flex justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              {/* Step 4: Purano button lai yo naya button sanga replace garnuhos */}
              <motion.button
                onClick={handleDownload}
                disabled={downloadStatus !== 'idle'}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 font-semibold text-slate-900 bg-cyan-400 rounded-lg shadow-lg shadow-cyan-500/20 overflow-hidden"
                whileHover={downloadStatus === 'idle' ? { scale: 1.05, y: -4 } : {}}
                whileTap={downloadStatus === 'idle' ? { scale: 0.95 } : {}}
                transition={{ duration: 0.2 }}
              >
                {/* Border Animation Spans */}
                <span className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-500 group-hover:w-full group-hover:via-slate-900 transform -translate-x-full group-hover:translate-x-0" />
                <span className="absolute bottom-0 right-0 h-0.5 w-full bg-gradient-to-l from-transparent via-white to-transparent transition-all duration-500 group-hover:w-full group-hover:via-slate-900 transform translate-x-full group-hover:translate-x-0" />

                {/* Progress Bar */}
                <div
                  className="absolute top-0 left-0 h-full bg-cyan-500/50 transition-all duration-300 ease-linear"
                  style={{ width: `${progress}%` }}
                />
                
                {/* Dynamic Content */}
                <span className="relative z-10 flex items-center gap-2.5">
                  {downloadStatus === 'idle' && (<><FaDownload /> Download Resume</>)}
                  {downloadStatus === 'downloading' && `Downloading... ${progress}%`}
                  {downloadStatus === 'completed' && (<><FaCheckCircle /> Completed!</>)}
                </span>
              </motion.button>
              
              {/* Contact Me button (No changes here) */}
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