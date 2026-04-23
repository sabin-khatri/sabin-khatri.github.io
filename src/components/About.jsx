import React, { useState, useRef, useMemo } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaDownload, FaCheckCircle } from 'react-icons/fa';
import OrbitingSkills from './ui/orbiting-skills';
import resume from '../assets/resume/resume.pdf';

// ─── Animated Counter Component ───────────────────────────────────────────
function AnimatedCounter({ to, trigger }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!trigger) return;
    let start = null;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to, trigger]);

  return <span className="text-[#f59e0b]">{count}{to >= 10 ? '+' : ''}</span>;
}

// ─── About Section ────────────────────────────────────────────────────────
const About = () => {
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Mouse Parallax for the Orbiting side
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const parallaxX = useTransform(smoothX, [0, 1920], [-15, 15]);
  const parallaxY = useTransform(smoothY, [0, 1080], [-15, 15]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleDownload = () => {
    if (status !== 'idle') return;
    setStatus('downloading');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 98 ? 98 : prev + Math.random() * 20 + 10));
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setStatus('completed');
      const link = document.createElement('a');
      link.href = resume;
      link.download = 'Sabin-Khatri-Resume.pdf';
      link.click();
      setTimeout(() => { setStatus('idle'); setProgress(0); }, 2000);
    }, 1600);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center bg-[#0a0a0a] py-24 lg:py-32 overflow-hidden text-white"
    >
      {/* Background: Hero matching constellation grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_0.8px,transparent_1px)] [background-size:60px_60px] opacity-[0.15]" />
      
      {/* Dynamic Golden Glow (Follows Mouse) */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.08), transparent 70%)`
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Orbiting Skills (Hero Image Style) */}
          <motion.div  
              className="lg:col-span-5 order-2 lg:order-1 flex justify-center"
            style={{ x: parallaxX, y: parallaxY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
               {/* Decorative Ring matching Hero Style */}
               <div/>
               <div  />
               
               <div>
                  <OrbitingSkills />
               </div>

               {/* Rotating Hexagon Border from Hero */}
               <div className="absolute -inset-4 border border-amber-400/30 rounded-[3rem] rotate-[30deg] pointer-events-none opacity-50" />
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-none mb-4">
                About <span className="text-[#f59e0b]">Me</span>
              </h2>
              <div className="h-1 w-20 bg-[#f59e0b] mx-auto lg:mx-0 rounded-full" />
              <p className="mt-6 text-2xl text-slate-300 font-light tracking-wide uppercase">
                Frontend Developer
              </p>
            </motion.div>

            <motion.p
              className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I am Sabin Khatri, a developer focused on crafting high-performance, 
              visually stunning digital interfaces. My approach blends technical 
              precision with creative design to build seamless user experiences.
            </motion.p>

            {/* Stats: Hero matching Typography */}
            <motion.div
              className="flex justify-center lg:justify-start gap-12 sm:gap-20 pt-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="space-y-1">
                <div className="text-5xl font-bold tracking-tighter">
                  <AnimatedCounter to={2} trigger={isInView} />
                </div>
                <p className="text-[10px] text-slate-500 tracking-[0.2em] font-mono">YEARS EXP</p>
              </div>
              <div className="space-y-1">
                <div className="text-5xl font-bold tracking-tighter">
                  <AnimatedCounter to={5} trigger={isInView} />
                </div>
                <p className="text-[10px] text-slate-500 tracking-[0.2em] font-mono">PROJECTS</p>
              </div>
            </motion.div>

            {/* Buttons: Hero Style matching */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 pt-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                onClick={handleDownload}
                disabled={status !== 'idle'}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 
                           bg-[#f59e0b] text-black font-bold rounded-xl overflow-hidden min-w-[260px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Progress Overlay */}
                <div
                  className="absolute inset-0 bg-amber-600/30 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  {status === 'idle' && <><FaDownload /> Download Resume</>}
                  {status === 'downloading' && `Loading ${Math.floor(progress)}%`}
                  {status === 'completed' && <><FaCheckCircle className="text-xl" /> Saved!</>}
                </span>
              </motion.button>

              <motion.a
                href="#contact"
                className="px-10 py-4 border border-amber-400/50 hover:border-[#f59e0b] 
                           text-white rounded-xl hover:bg-white/5 font-semibold transition-all text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
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