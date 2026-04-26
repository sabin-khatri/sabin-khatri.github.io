import React, { useState, useRef, useEffect, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useInView, useMotionValue, useSpring, useTransform, useAnimationFrame, useMotionTemplate } from 'framer-motion';
import { FaDownload, FaCheckCircle, FaRocket } from 'react-icons/fa';
import OrbitingSkills from './ui/orbiting-skills';
import resume from '../assets/resume/resume.pdf';

/* ── Animated Counter ────────────────────────────────────────────────────── */
function AnimatedCounter({ to, trigger }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const duration = 2000;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to, trigger]);
  return <span>{count}{to >= 10 ? '+' : ''}</span>;
}

/* ── Moving Border (same as Hero) ────────────────────────────────────────── */
const MovingBorder = ({ children, duration = 2000, rx, ry, ...rest }) => {
  const pathRef  = useRef(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const len = pathRef.current?.getTotalLength();
    if (len) progress.set((time * (len / duration)) % len);
  });

  const x = useTransform(progress, (v) => pathRef.current?.getPointAtLength(v).x);
  const y = useTransform(progress, (v) => pathRef.current?.getPointAtLength(v).y);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%" height="100%"
        {...rest}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div style={{ position: 'absolute', top: 0, left: 0, display: 'inline-block', transform }}>
        {children}
      </motion.div>
    </>
  );
};

const MovingBorderBtn = ({
  // eslint-disable-next-line no-unused-vars
  as: Tag = 'a',
  href,
  onClick,
  children,
  duration     = 2000,
  borderRadius = '9999px',
  borderClass  = '',
  innerClass   = '',
  hoverShadow  = '',
  disabled     = false,
  ...rest
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Tag
      href={href}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden p-[1.5px] inline-flex cursor-pointer"
      style={{
        borderRadius,
        boxShadow:  hovered ? hoverShadow : 'none',
        transform:  hovered ? 'translateY(-3px) scale(1.04)' : 'translateY(0) scale(1)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        opacity:    disabled ? 0.7 : 1,
      }}
      {...rest}
    >
      <div className="absolute inset-0" style={{ borderRadius }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div className={`h-14 w-14 opacity-90 ${borderClass}`} />
        </MovingBorder>
      </div>
      <div
        className={`relative z-10 flex items-center gap-2.5 px-8 py-4 text-base font-bold backdrop-blur-xl ${innerClass}`}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Tag>
  );
};

/* ── About ───────────────────────────────────────────────────────────────── */
const About = () => {
  const [status,   setStatus]   = useState('idle');
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.15 });

  /* mouse spotlight — throttled with useCallback */
  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    sectionRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    sectionRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  /* download handler */
  const handleDownload = () => {
    if (status !== 'idle') return;
    setStatus('downloading');
    setProgress(0);
    const iv = setInterval(() => {
      setProgress((p) => (p >= 98 ? 98 : p + Math.random() * 25));
    }, 200);
    setTimeout(() => {
      clearInterval(iv);
      setProgress(100);
      setStatus('completed');
      const a = document.createElement('a');
      a.href = resume;
      a.download = 'Sabin-Khatri-Resume.pdf';
      a.click();
      setTimeout(() => { setStatus('idle'); setProgress(0); }, 2000);
    }, 1500);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center bg-[#0a0a0a] py-20 lg:py-32 overflow-hidden text-white"
    >
      {/* dot-grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_0.8px,transparent_1px)] [background-size:60px_60px] opacity-[0.12] pointer-events-none" />

      {/* spotlight glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(700px circle at var(--mx,50%) var(--my,50%), rgba(245,158,11,0.10), transparent 80%)`,
        }}
      />

      {/* ambient blobs — static, no re-render cost */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-amber-500/6 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Orbiting Skills (desktop only) ── */}
          <motion.div
            className="hidden lg:flex lg:col-span-5 order-2 lg:order-1 justify-center relative"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-amber-500/8 blur-[100px] rounded-full scale-75 pointer-events-none" />
            <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
              <OrbitingSkills />
            </div>
          </motion.div>

          {/* ── RIGHT: Content ── */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8 text-center lg:text-left">

            {/* heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="text-amber-500 font-mono tracking-[0.3em] text-xs mb-4 block uppercase">
                Explore My World
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-6">
                About{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Me.
                </span>
              </h2>
              <div className="h-1.5 w-24 bg-amber-500 mx-auto lg:mx-0 rounded-full" />
            </motion.div>

            {/* bio */}
            <motion.p
              className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              I am <span className="text-white font-medium">Sabin Khatri</span>, a Frontend specialist.
              I transform complex logic into elegant, high-performance digital interfaces.
              My mission is to merge{' '}
              <span className="text-amber-400">technical precision</span> with{' '}
              <span className="text-amber-400">artistic design</span>.
            </motion.p>

            {/* stats */}
            <motion.div
              className="flex justify-center lg:justify-start gap-12 sm:gap-16 py-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {[
                { to: 2, label: 'Years Experience' },
                { to: 5, label: 'Projects Delivered' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-5xl font-black text-amber-500 tracking-tighter leading-none">
                    <AnimatedCounter to={s.to} trigger={isInView} />
                  </span>
                  <span className="text-[11px] text-slate-500 tracking-[0.2em] font-mono mt-2 uppercase">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* ── CTA Buttons ── */}
            <motion.div
              className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              {/* Download CV — MovingBorder style */}
              <MovingBorderBtn
                as="button"
                onClick={handleDownload}
                disabled={status !== 'idle'}
                duration={2500}
                borderClass="bg-[radial-gradient(#f59e0b_40%,transparent_60%)]"
                innerClass="bg-amber-400/15 border border-amber-400/35 text-white min-w-[200px] justify-center relative overflow-hidden"
                hoverShadow="0 8px 30px rgba(245,158,11,0.4)"
              >
                {/* progress bar inside button */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-amber-500/25 transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'idle'        && <><FaDownload /> Download CV</>}
                  {status === 'downloading' && `Processing ${Math.floor(progress)}%`}
                  {status === 'completed'   && <><FaCheckCircle /> File Ready</>}
                </span>
              </MovingBorderBtn>

              {/* Start a Project */}
              <MovingBorderBtn
                href="#contact"
                duration={3200}
                borderClass="bg-[radial-gradient(#fb923c_40%,transparent_60%)]"
                innerClass="bg-white/[0.03] border border-white/15 text-slate-300 hover:text-white"
                hoverShadow="0 8px 30px rgba(251,146,60,0.25)"
              >
                Start a Project
                <FaRocket className="text-amber-500" />
              </MovingBorderBtn>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;