/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { motion, animate, useScroll, useTransform } from 'framer-motion';
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
    className="bg-slate-800/80 hover:bg-slate-700 border border-cyan-500/20 text-cyan-300 text-sm font-medium px-5 py-2 rounded-full transition-all"
    whileHover={{ 
      scale: 1.08, 
      backgroundColor: "#1e293b",
      borderColor: "#67e8f9",
      color: "#ffffff"
    }}
    transition={{ duration: 0.2 }}
  >
    {skill}
  </motion.div>
);

const About = () => {
  const [downloadStatus, setDownloadStatus] = useState('idle');
  const [progress, setProgress] = useState(0);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const handleDownload = () => {
    if (downloadStatus !== 'idle') return;

    setDownloadStatus('downloading');
    setProgress(0);

    // Simulate download progress
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

      // Actual file download
      const link = document.createElement('a');
      link.href = resume;
      link.download = 'Sabin-Khatri-Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset after showing success
      setTimeout(() => {
        setDownloadStatus('idle');
        setProgress(0);
      }, 1800);
    }, 1800);
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/30 py-20 lg:py-32 overflow-hidden text-white"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', 
             backgroundSize: '3rem 3rem' 
           }} 
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          
          {/* Profile Image Side */}
          <motion.div 
            className="lg:col-span-2 flex justify-center lg:justify-start"
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-6 bg-gradient-to-br from-cyan-400/30 via-purple-500/30 to-transparent rounded-[2.5rem] blur-2xl opacity-70 group-hover:opacity-90 transition-all duration-700" />
              
              <div className="relative p-3 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl">
                <div className="bg-slate-900 p-2 rounded-2xl overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Sabin Khatri"
                    className="rounded-2xl w-full max-w-md aspect-square object-cover shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <div className="lg:col-span-3 space-y-10 text-center lg:text-left">
            <div>
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-white">
                About Me
              </h2>
              <p className="mt-3 text-xl text-cyan-400 font-medium">
                Frontend Developer &amp; UI Enthusiast
              </p>
            </div>

            <div className="space-y-6 text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <p>
                Hello! I'm a passionate Frontend Developer who loves turning ideas into 
                beautiful, intuitive, and high-performance web experiences.
              </p>
              <p>
                With a strong focus on React, Tailwind CSS, and smooth animations, 
                I create digital products that not only look great but also provide 
                exceptional user experiences.
              </p>
            </div>

            {/* Skills */}
            <div className="pt-4">
              <p className="text-slate-400 font-medium mb-4 text-sm tracking-widest uppercase">My Toolkit</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <SkillPill skill="JavaScript (ES6+)" />
                <SkillPill skill="React.js" />
                <SkillPill skill="Tailwind CSS" />
                <SkillPill skill="Framer Motion" />
                <SkillPill skill="Next.js" />
                <SkillPill skill="TypeScript" />
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-12 pt-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-cyan-400">
                  <AnimatedCounter to={2} />+
                </div>
                <p className="text-slate-400 mt-2 text-sm">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-cyan-400">
                  <AnimatedCounter to={8} />+
                </div>
                <p className="text-slate-400 mt-2 text-sm">Projects Completed</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 pt-8 justify-center lg:justify-start">
              <motion.button
                onClick={handleDownload}
                disabled={downloadStatus !== 'idle'}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl shadow-xl overflow-hidden min-w-[220px]"
                whileHover={downloadStatus === 'idle' ? { scale: 1.05, y: -3 } : {}}
                whileTap={downloadStatus === 'idle' ? { scale: 0.96 } : {}}
              >
                {/* Progress Overlay */}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;