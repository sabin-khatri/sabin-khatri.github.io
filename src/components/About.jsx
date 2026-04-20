import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaCheckCircle } from 'react-icons/fa';
import OrbitingSkills from './ui/orbiting-skills';
import resume from '../assets/resume/resume.pdf';

function AnimatedCounter({ to }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = null;
    const duration = 1800;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to]);

  return <span className="font-bold text-amber-400">{count}{to >= 10 ? "+" : ""}</span>;
}

const About = () => {
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);

  const handleDownload = () => {
    if (status !== 'idle') return;

    setStatus('downloading');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 22 + 14;
        return next >= 100 ? 100 : Math.min(next, 98);
      });
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setStatus('completed');

      const link = document.createElement('a');
      link.href = resume;
      link.download = 'Sabin-Khatri-Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setStatus('idle');
        setProgress(0);
      }, 1600);
    }, 1600);
  };

  return (
    <section 
      id="about" 
      className="relative bg-[#050508] py-20 lg:py-28 overflow-hidden text-white"
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Orbiting Skills Side */}
          <motion.div 
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
          >
            <div className="w-full max-w-[380px] aspect-square">
              <OrbitingSkills />
            </div>
          </motion.div>

          {/* Content Side */}
          <div className="lg:col-span-7 space-y-10 text-center lg:text-left">
            <div>
              <motion.h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                About <span className="text-amber-400">Me</span>
              </motion.h2>
              <motion.p 
                className="mt-4 text-xl text-amber-400 font-light"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Frontend Developer
              </motion.p>
            </div>

            <motion.div 
              className="text-slate-300 text-[15px] sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Hi, I'm Sabin Khatri. I create clean, fast, and delightful digital experiences using modern web technologies like React, Tailwind, and Framer Motion.
            </motion.div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-16 pt-4">
              <div className="text-center">
                <div className="text-5xl font-bold text-amber-400">
                  <AnimatedCounter to={2} />+
                </div>
                <p className="text-xs text-slate-400 tracking-widest mt-2">YEARS EXPERIENCE</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-amber-400">
                  <AnimatedCounter to={12} />+
                </div>
                <p className="text-xs text-slate-400 tracking-widest mt-2">PROJECTS BUILT</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
              <motion.button
                onClick={handleDownload}
                disabled={status !== 'idle'}
                className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-semibold rounded-2xl shadow-xl min-w-[230px] overflow-hidden"
                whileHover={status === 'idle' ? { scale: 1.04 } : {}}
                whileTap={status === 'idle' ? { scale: 0.96 } : {}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 transition-all" style={{ width: `${progress}%` }} />
                
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'idle' && <><FaDownload className="text-xl" /> Download Resume</>}
                  {status === 'downloading' && `Downloading... ${Math.floor(progress)}%`}
                  {status === 'completed' && <><FaCheckCircle className="text-2xl" /> Downloaded Successfully</>}
                </span>
              </motion.button>

              <motion.a
                href="#contact"
                className="px-9 py-4 border border-amber-400/50 hover:border-amber-400 text-white rounded-2xl hover:bg-white/5 font-semibold transition-all"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Work Together
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;