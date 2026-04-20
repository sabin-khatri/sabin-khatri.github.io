import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaDownload, FaCheckCircle } from 'react-icons/fa';
import OrbitingSkills from './ui/orbiting-skills';
import resume from '../assets/resume/resume.pdf';

// ─── Animated Counter ──────────────────────────────────────────────────────
function AnimatedCounter({ to, trigger }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!trigger) return;
    let start = null;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to, trigger]);

  return (
    <span className="font-bold text-amber-400">
      {count}{to >= 10 ? '+' : ''}
    </span>
  );
}

// ─── About Section ─────────────────────────────────────────────────────────
const About = () => {
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);

  // triggers when 20% of section enters viewport
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const handleDownload = () => {
    if (status !== 'idle') return;
    setStatus('downloading');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 22 + 14;
        return next >= 98 ? 98 : next;
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

  // ── animation variants ───────────────────────────────────────────────────
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: isInView
      ? { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay } }
      : { opacity: 0, y: 40 },
  });

  const fadeRight = (delay = 0) => ({
    initial: { opacity: 0, x: 40 },
    animate: isInView
      ? { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay } }
      : { opacity: 0, x: 40 },
  });

  const scaleIn = (delay = 0) => ({
    initial: { opacity: 0, scale: 0.88 },
    animate: isInView
      ? { opacity: 1, scale: 1, transition: { duration: 1.0, ease: [0.34, 1.56, 0.64, 1], delay } }
      : { opacity: 0, scale: 0.88 },
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#050508] py-20 lg:py-28 overflow-hidden text-white"
    >
      {/* subtle dot grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #4f4f7a 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ambient purple glow */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(120,40,200,0.10) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── Orbiting Skills ── */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            {...scaleIn(0)}
          >
            <div className="w-full max-w-[380px] aspect-square">
              <OrbitingSkills />
            </div>
          </motion.div>

          {/* ── Content ── */}
          <div className="lg:col-span-7 space-y-10 text-center lg:text-left">

            {/* Heading */}
            <div>
              <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight"
                {...fadeRight(0.15)}
              >
                About <span className="text-amber-400">Me</span>
              </motion.h2>
              <motion.p
                className="mt-4 text-xl text-amber-400 font-light"
                {...fadeRight(0.25)}
              >
                Frontend Developer
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              className="text-slate-300 text-[15px] sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0"
              {...fadeUp(0.35)}
            >
              Hi, I'm Sabin Khatri. I create clean, fast, and delightful digital
              experiences using modern web technologies like React, Tailwind, and
              Framer Motion.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex justify-center lg:justify-start gap-16 pt-4"
              {...fadeUp(0.45)}
            >
              <div className="text-center">
                <div className="text-5xl font-bold">
                  <AnimatedCounter to={2} trigger={isInView} />+
                </div>
                <p className="text-xs text-slate-400 tracking-widest mt-2">YEARS EXPERIENCE</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold">
                  <AnimatedCounter to={5} trigger={isInView} />+
                </div>
                <p className="text-xs text-slate-400 tracking-widest mt-2">PROJECTS BUILT</p>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start"
              {...fadeUp(0.55)}
            >
              <motion.button
                onClick={handleDownload}
                disabled={status !== 'idle'}
                className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-semibold rounded-2xl shadow-xl min-w-[230px] overflow-hidden disabled:cursor-not-allowed"
                whileHover={status === 'idle' ? { scale: 1.04 } : {}}
                whileTap={status === 'idle' ? { scale: 0.96 } : {}}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'idle' && (
                    <><FaDownload className="text-xl" /> Download Resume</>
                  )}
                  {status === 'downloading' && `Downloading... ${Math.floor(progress)}%`}
                  {status === 'completed' && (
                    <><FaCheckCircle className="text-2xl" /> Downloaded Successfully</>
                  )}
                </span>
              </motion.button>

              <motion.a
                href="#contact"
                className="px-9 py-4 border border-amber-400/50 hover:border-amber-400 text-white rounded-2xl hover:bg-white/5 font-semibold transition-all inline-flex items-center justify-center"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Work Together
              </motion.a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;