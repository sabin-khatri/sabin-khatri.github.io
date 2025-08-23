// src/components/About.jsx
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, animate, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaDownload, FaCheckCircle } from 'react-icons/fa';
import profileImage from '../assets/about.avif';
import resume from '../assets/resume/resume.pdf';

function AnimatedCounter({ to }) {
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
  }}>0</span>;
}

const AnimatedTitle = ({ text }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: i * 0.05 },
    }),
  };
  const child = {
    hidden: { opacity: 0, y: 20, transition: { type: 'spring', damping: 12, stiffness: 100 } },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } },
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
        <motion.span variants={child} key={index}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
};

const TextReveal = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 bottom-0 right-0 bg-cyan-400 z-10"
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%', transition: { duration: 0.8, ease: 'easeInOut' } },
        }}
        style={{ originX: 0 }}
      />
    </div>
  );
};

const SkillPill = ({ skill }) => (
  <motion.div
    className="bg-slate-800 text-cyan-300 text-sm font-medium px-4 py-1.5 rounded-full"
    variants={{
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    }}
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

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  return (
    <section id="about" ref={sectionRef} className="relative bg-slate-900 py-20 lg:py-28 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '2rem 2rem' }} />
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid lg:grid-cols-5 items-center gap-12 lg:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div
            className="lg:col-span-2 flex justify-center"
            style={{ y: imageY }}
          >
            <motion.div
              className="relative p-1.5 rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
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

          <div className="lg:col-span-3 text-center lg:text-left">
            <header>
              <AnimatedTitle text="About Me" />
              <motion.p
                className="mt-4 text-lg text-cyan-400 font-semibold"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.8 } } }}
              >
                Frontend Developer & UI Enthusiast
              </motion.p>
            </header>

            <motion.div
              className="mt-8 space-y-5 text-slate-300 text-lg leading-relaxed"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
            >
              <TextReveal>
                <p>Hello! I'm a passionate Frontend Developer who thrives on turning complex problems into beautiful, intuitive, and highly interactive web experiences.</p>
              </TextReveal>
              <TextReveal>
                <p>From concept to deployment, my focus is on crafting responsive, high-performance applications that users love to interact with.</p>
              </TextReveal>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-3"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <span className="text-slate-400 font-medium mr-2">My Toolkit:</span>
              <SkillPill skill="JavaScript (ES6+)" />
              <SkillPill skill="React" />
              <SkillPill skill="Tailwind CSS" />
              <SkillPill skill="Framer Motion" />
            </motion.div>

            <motion.div
              className="mt-12 flex justify-center lg:justify-start gap-8 sm:gap-12"
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              <div className="text-center">
                <h3 className="text-4xl font-bold text-cyan-400"><AnimatedCounter to={2} />+</h3>
                <p className="text-slate-400 mt-1">Years Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-cyan-400"><AnimatedCounter to={10} />+</h3>
                <p className="text-slate-400 mt-1">Projects Completed</p>
              </div>
            </motion.div>

            <motion.div
              className="mt-12 flex justify-center lg:justify-start gap-4"
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              <motion.button
                onClick={handleDownload}
                disabled={downloadStatus !== 'idle'}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 font-semibold text-slate-900 bg-cyan-400 rounded-lg shadow-lg shadow-cyan-500/20 overflow-hidden"
                whileHover={downloadStatus === 'idle' ? { scale: 1.05, y: -4 } : {}}
                whileTap={downloadStatus === 'idle' ? { scale: 0.95 } : {}}
                transition={{ duration: 0.2 }}
              >
                <span className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-500 group-hover:w-full group-hover:via-slate-900 transform -translate-x-full group-hover:translate-x-0" />
                <span className="absolute bottom-0 right-0 h-0.5 w-full bg-gradient-to-l from-transparent via-white to-transparent transition-all duration-500 group-hover:w-full group-hover:via-slate-900 transform translate-x-full group-hover:translate-x-0" />
                <div
                  className="absolute top-0 left-0 h-full bg-cyan-500/50 transition-all duration-300 ease-linear"
                  style={{ width: `${progress}%` }}
                />
                <span className="relative z-10 flex items-center gap-2.5">
                  {downloadStatus === 'idle' && (<><FaDownload /> Download Resume</>)}
                  {downloadStatus === 'downloading' && `Downloading... ${progress}%`}
                  {downloadStatus === 'completed' && (<><FaCheckCircle /> Completed!</>)}
                </span>
              </motion.button>
              
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