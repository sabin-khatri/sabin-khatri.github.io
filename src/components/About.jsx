import React, { useState, useRef, useCallback, useEffect, memo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useInView, useTime, useTransform, useMotionTemplate } from 'framer-motion';
import { FaDownload, FaCheckCircle, FaRocket } from 'react-icons/fa';
import OrbitingSkills from './ui/orbiting-skills';
import resume from '../assets/resume/resume.pdf';

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

const MovingBorder = ({ duration = 3000, rx = "30%", ry = "30%", children }) => {
  const pathRef = useRef(null);
  const time = useTime();
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength());
  }, []);

  const px = useTransform(time, (t) => {
    if (!length || !pathRef.current) return 0;
    return pathRef.current.getPointAtLength((t % duration) / duration * length).x;
  });

  const py = useTransform(time, (t) => {
    if (!length || !pathRef.current) return 0;
    return pathRef.current.getPointAtLength((t % duration) / duration * length).y;
  });

  const transform = useMotionTemplate`translateX(${px}px) translateY(${py}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute h-full w-full" width="100%" height="100%">
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div style={{ position: 'absolute', top: 0, left: 0, transform, willChange: 'transform' }}>
        {children}
      </motion.div>
    </>
  );
};

// eslint-disable-next-line no-unused-vars
const MovingBorderBtn = ({ as: Tag = 'button', href, onClick, children, duration = 2000, borderRadius = '16px', borderClass = '', innerClass = '', disabled = false, ...rest }) => {
  return (
    <Tag href={href} onClick={onClick} disabled={disabled} className="relative overflow-hidden p-[1px] inline-flex cursor-pointer transition-transform active:scale-95" style={{ borderRadius }} {...rest}>
      <div className="absolute inset-0" style={{ borderRadius }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div className={`h-20 w-20 opacity-100 blur-sm ${borderClass}`} />
        </MovingBorder>
      </div>
      <div className={`relative z-10 flex items-center gap-3 px-6 py-4 text-sm md:text-base font-bold backdrop-blur-3xl ${innerClass}`} style={{ borderRadius: `calc(${borderRadius} - 1px)` }}>
        {children}
      </div>
    </Tag>
  );
};

const About = () => {
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
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
    <section id="about" ref={sectionRef} onMouseMove={handleMouseMove} className="relative min-h-screen flex items-center bg-[#050505] py-20 overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_0.5px,transparent_0.5px)] [background-size:40px_40px] opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: `radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(245, 158, 11, 0.12), transparent 80%)` }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div className="hidden md:flex lg:col-span-5 justify-center relative order-2 lg:order-1" initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8 }}>
            <div className="absolute inset-0 bg-amber-500/5 blur-[120px] rounded-full" />
            <div className="relative w-full max-w-[400px] aspect-square">
              <OrbitingSkills />
            </div>
          </motion.div>

          <div className="lg:col-span-7 space-y-8 text-center lg:text-left order-1 lg:order-2">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              <span className="text-amber-500 font-mono tracking-[0.4em] text-xs font-bold uppercase block mb-2">Introduction</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">Me.</span>
              </h2>
              <div className="h-1 w-20 bg-amber-500 mx-auto lg:mx-0 rounded-full" />
            </motion.div>

            <motion.p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
              I am <span className="text-white font-semibold">Sabin Khatri</span>, a passionate Frontend developer crafting high-performance digital experiences. I specialize in turning complex ideas into <span className="text-amber-400">pixel-perfect</span> realities.
            </motion.p>

            <div className="flex justify-center lg:justify-start gap-10 md:gap-16">
              {[ { to: 2, label: 'Years Exp.' }, { to: 12, label: 'Projects' } ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + (i * 0.1) }} className="flex flex-col">
                  <span className="text-4xl md:text-5xl font-black text-white leading-none">
                    <AnimatedCounter to={s.to} trigger={isInView} />
                  </span>
                  <span className="text-[10px] text-amber-500/80 tracking-widest font-mono mt-2 uppercase font-bold">{s.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}>
              <MovingBorderBtn onClick={handleDownload} disabled={status !== 'idle'} duration={3000} borderClass="bg-amber-500" innerClass="bg-amber-500/10 border border-amber-500/20 text-white min-w-[190px] justify-center">
                <div className="absolute left-0 bottom-0 h-[2px] bg-amber-500 transition-all" style={{ width: `${progress}%` }} />
                {status === 'idle' && <><FaDownload /> Download CV</>}
                {status === 'downloading' && `Processing ${Math.floor(progress)}%`}
                {status === 'completed' && <><FaCheckCircle /> Done</>}
              </MovingBorderBtn>

              <MovingBorderBtn as="a" href="#contact" duration={4500} borderClass="bg-slate-400" innerClass="bg-white/5 border border-white/10 text-slate-300">
                Hire Me <FaRocket className="text-amber-500" />
              </MovingBorderBtn>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);