import React, { useState, useRef, useCallback, useEffect, memo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion';
import { FaDownload, FaCheckCircle, FaRocket } from 'react-icons/fa';
import OrbitingSkills from './ui/orbiting-skills';
import GithubGraph from './ui/GithubGraph';
import resume from '../assets/resume/resume.pdf';

const SKILL_CHIPS = ['React', 'Vite', 'Tailwind', 'Three.js', 'Node.js', 'TypeScript'];

const AnimatedCounter = ({ to, trigger }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let startTime;
    const duration = 2000;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to, trigger]);
  return <span>{count}{to >= 10 ? '+' : ''}</span>;
};

const MovingBorderBtn = ({
  as: Tag = 'button',
  href,
  onClick,
  children,
  borderRadius = '16px',
  innerClass = '',
  disabled = false,
  style,
  className = '',
  ...rest
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Tag
      href={href}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius,
        transform: hovered ? 'translateY(-3px) scale(1.04)' : 'none',
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        ...style,
      }}
      className={`relative inline-flex cursor-pointer items-center justify-center p-[2px] overflow-hidden w-full sm:w-auto ${disabled ? 'opacity-70 cursor-not-allowed' : ''} ${className} ${rest.className || ''}`}
      {...rest}
    >
      <div
        className={`absolute inset-0 z-0 opacity-0 transition-opacity duration-300 ${hovered ? 'opacity-100' : ''}`}
        style={{ background: 'linear-gradient(to right, rgba(var(--accent-rgb), 0.35), rgba(var(--accent-rgb), 0.2))' }}
      />
      <div
        className={`relative z-10 flex items-center justify-center gap-2 w-full h-full text-sm font-semibold backdrop-blur-xl transition-all duration-300 px-5 py-3 ${innerClass}`}
        style={{ borderRadius: `calc(${borderRadius} - 2px)` }}
      >
        {children}
      </div>
    </Tag>
  );
};

const About = () => {
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current || window.innerWidth < 768) return;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    sectionRef.current.style.setProperty('--mx', `${e.clientX - left}px`);
    sectionRef.current.style.setProperty('--my', `${e.clientY - top}px`);
  }, []);

  const handleDownload = () => {
    if (status !== 'idle') return;
    setStatus('downloading');
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 25;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setStatus('completed');
        const a = document.createElement('a');
        a.href = resume;
        a.download = 'Sabin-Khatri-Resume.pdf';
        a.click();
        setTimeout(() => { setStatus('idle'); setProgress(0); }, 2000);
      }
      setProgress(p);
    }, 150);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full md:min-h-screen flex items-center bg-section py-14 sm:py-16 md:py-20 overflow-x-hidden text-os-text"
    >
      <div className="absolute inset-0 dot-grid-sm opacity-[0.05] pointer-events-none" />
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden md:block"
        style={{ background: `radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(var(--accent-rgb), 0.12), transparent 80%)` }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Orbiting Skills — tablet+ only */}
          <motion.div
            className="hidden md:flex lg:col-span-5 justify-center relative order-2 lg:order-1 min-w-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 blur-[120px] rounded-full" style={{ background: 'rgba(var(--accent-rgb), 0.05)' }} />
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] aspect-square">
              <OrbitingSkills />
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 md:space-y-8 text-center lg:text-left order-1 lg:order-2 min-w-0 w-full">

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent font-mono tracking-[0.25em] sm:tracking-[0.4em] text-[10px] sm:text-xs font-bold uppercase block mb-2">
                Introduction
              </span>
              <h2 className="text-[1.75rem] leading-tight sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-3 sm:mb-4 md:mb-6 break-words">
                About{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-500 to-accent">
                  Me.
                </span>
              </h2>
              <div className="h-1 w-14 sm:w-20 bg-accent mx-auto lg:mx-0 rounded-full" />
            </motion.div>

            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-full sm:max-w-xl lg:max-w-2xl mx-auto lg:mx-0 font-light px-1 sm:px-0"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              I am <span className="text-os-text font-semibold">Sabin Khatri</span>, a passionate Frontend
              developer crafting high-performance digital experiences. I specialize in turning complex ideas into{' '}
              <span className="text-accent">pixel-perfect</span> realities.
            </motion.p>

            {/* Mobile skill chips (replaces orbiting animation) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center lg:hidden gap-2 px-1"
            >
              {SKILL_CHIPS.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-accent border"
                  style={{ background: 'rgba(var(--accent-rgb), 0.08)', borderColor: 'rgba(var(--accent-rgb), 0.2)' }}
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            <div className="flex justify-center lg:justify-start gap-6 sm:gap-10 md:gap-16">
              {[
                { to: 2, label: 'Years Exp.' },
                { to: 12, label: 'Projects' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex flex-col items-center lg:items-start"
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-none">
                    <AnimatedCounter to={s.to} trigger={isInView} />
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-accent/80 tracking-widest font-mono mt-1.5 sm:mt-2 uppercase font-bold">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1 sm:pt-2 justify-center lg:justify-start w-full max-w-md sm:max-w-none mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <MovingBorderBtn
                onClick={handleDownload}
                disabled={status !== 'idle'}
                innerClass="border border-accent/20 text-white justify-center"
                style={{ background: 'rgba(var(--accent-rgb), 0.1)' }}
              >
                <div className="absolute left-0 bottom-0 h-[2px] bg-accent transition-all" style={{ width: `${progress}%` }} />
                {status === 'idle' && <><FaDownload /> Download CV</>}
                {status === 'downloading' && `Processing ${Math.floor(progress)}%`}
                {status === 'completed' && <><FaCheckCircle /> Done</>}
              </MovingBorderBtn>

              <MovingBorderBtn
                as="a"
                href="#contact"
                innerClass="bg-white/5 border border-white/10 text-slate-300 justify-center"
              >
                Hire Me <FaRocket className="text-accent" />
              </MovingBorderBtn>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="w-full min-w-0 max-w-full overflow-hidden"
            >
              <GithubGraph />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
