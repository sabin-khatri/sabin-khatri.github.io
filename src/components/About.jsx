'use client';   // ← Add this at the top if using Next.js App Router

/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaDownload, FaCheckCircle } from 'react-icons/fa';
import profileImage from '../assets/about.avif';
import resume from '../assets/resume/resume.pdf';

function AnimatedCounter({ to }) {
  const ref = useRef(null);
  const [inViewRef, inView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.4 
  });

  useEffect(() => {
    if (inView && ref.current) {
      animate(0, to, {
        duration: 2.2,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.floor(value) + (to >= 10 ? "+" : "");
          }
        },
      });
    }
  }, [inView, to]);

  return <span ref={ref} className="font-bold">0</span>;
}

const SkillPill = ({ skill }) => (
  <motion.div
    className="bg-slate-800/80 hover:bg-slate-700 border border-cyan-500/20 text-cyan-300 text-sm font-medium px-5 py-2.5 rounded-full transition-all"
    whileHover={{ 
      scale: 1.08, 
      backgroundColor: "#1e293b",
      borderColor: "#67e8f9",
      color: "#ffffff"
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
  >
    {skill}
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
        const next = prev + Math.random() * 18 + 8;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(next, 99);
      });
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setDownloadStatus('completed');

      const link = document.createElement('a');
      link.href = resume;
      link.download = 'Sabin-Khatri-Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setDownloadStatus('idle');
        setProgress(0);
      }, 1800);
    }, 1800);
  };

  return (
    <section 
      id="about" 
      className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/30 py-16 lg:py-32 overflow-hidden text-white"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', 
             backgroundSize: '3rem 3rem' 
           }} 
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-20 items-center">
          
          {/* Profile Image - Hidden on Mobile */}
          <motion.div 
            className="hidden lg:col-span-2 lg:flex justify-center lg:justify-start"
            initial={{ opacity: 0, scale: 0.85, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <div className="relative group">
              <motion.div 
                className="absolute -inset-8 bg-gradient-to-br from-cyan-400/30 via-purple-500/30 to-transparent rounded-[3rem] blur-2xl"
                initial={{ opacity: 0.6 }}
                whileInView={{ opacity: 0.9 }}
                transition={{ duration: 1.2 }}
              />
              
              <div className="relative p-3 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl">
                <div className="bg-slate-900 p-2 rounded-2xl overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Sabin Khatri"
                    className="rounded-2xl w-full max-w-md aspect-square object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side - Better Mobile Experience */}
          <div className="lg:col-span-3 space-y-10 lg:space-y-12 text-center lg:text-left">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
            >
              <motion.h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white"
                variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              >
                About Me
              </motion.h2>
              <motion.p 
                className="mt-3 text-xl text-cyan-400 font-medium"
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              >
                Frontend Developer &amp; UI Enthusiast
              </motion.p>
            </motion.div>

            <motion.div 
              className="space-y-6 text-[17px] sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto lg:mx-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
              }}
            >
              <motion.p variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                Hello! I'm a passionate Frontend Developer who loves turning ideas into 
                beautiful, intuitive, and high-performance web experiences.
              </motion.p>
              <motion.p variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                With a strong focus on React, Tailwind CSS, and smooth animations, 
                I create digital products that not only look great but also provide 
                exceptional user experiences.
              </motion.p>
            </motion.div>

            {/* Skills */}
            <motion.div 
              className="pt-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            >
              <motion.p 
                className="text-slate-400 font-medium mb-6 text-sm tracking-widest uppercase"
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              >
                My Toolkit
              </motion.p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {["JavaScript (ES6+)", "React.js", "Tailwind CSS", "Framer Motion", "Next.js", "TypeScript"].map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 20 },
                      visible: { opacity: 1, scale: 1, y: 0 }
                    }}
                  >
                    <SkillPill skill={skill} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex justify-center lg:justify-start gap-12 pt-6 lg:pt-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
              }}
            >
              <motion.div 
                className="text-center"
                variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              >
                <div className="text-5xl font-bold text-cyan-400">
                  <AnimatedCounter to={2} />+
                </div>
                <p className="text-slate-400 mt-2 text-sm">Years Experience</p>
              </motion.div>

              <motion.div 
                className="text-center"
                variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              >
                <div className="text-5xl font-bold text-cyan-400">
                  <AnimatedCounter to={8} />+
                </div>
                <p className="text-slate-400 mt-2 text-sm">Projects Completed</p>
              </motion.div>
            </motion.div>

            {/* Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 pt-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={handleDownload}
                disabled={downloadStatus !== 'idle'}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl shadow-xl overflow-hidden min-w-[220px]"
                whileHover={downloadStatus === 'idle' ? { scale: 1.05, y: -3 } : {}}
                whileTap={downloadStatus === 'idle' ? { scale: 0.96 } : {}}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />

                <span className="relative z-10 flex items-center gap-3">
                  {downloadStatus === 'idle' && (
                    <>
                      <FaDownload className="text-lg" />
                      Download Resume
                    </>
                  )}
                  {downloadStatus === 'downloading' && (
                    <>Downloading... {Math.floor(progress)}%</>
                  )}
                  {downloadStatus === 'completed' && (
                    <>
                      <FaCheckCircle className="text-xl" />
                      Resume Downloaded!
                    </>
                  )}
                </span>
              </motion.button>

              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 font-semibold border-2 border-slate-600 hover:border-cyan-400 text-white rounded-2xl transition-all hover:bg-slate-800/50"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.96 }}
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