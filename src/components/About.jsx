import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaDownload, FaCheckCircle, FaRocket } from 'react-icons/fa';
import OrbitingSkills from './ui/orbiting-skills';
import resume from '../assets/resume/resume.pdf';

// ─── Animated Counter Component ───────────────────────────────────────────
function AnimatedCounter({ to, trigger }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
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

  return <span>{count}{to >= 10 ? '+' : ''}</span>;
}

const About = () => {
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Subtle movement for the content and orbiting skills
  const parallaxX = useTransform(smoothX, [0, 2000], [-20, 20]);
  const parallaxY = useTransform(smoothY, [0, 1000], [-20, 20]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
    
    // Update CSS variables for the spotlight glow effect
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      sectionRef.current.style.setProperty('--mouse-x', `${clientX - rect.left}px`);
      sectionRef.current.style.setProperty('--mouse-y', `${clientY - rect.top}px`);
    }
  };

  const handleDownload = () => {
    if (status !== 'idle') return;
    setStatus('downloading');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 98 ? 98 : prev + Math.random() * 25));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setStatus('completed');
      const link = document.createElement('a');
      link.href = resume;
      link.download = 'Sabin-Khatri-Resume.pdf';
      link.click();
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
      {/* 1. Background Grid with low opacity */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_0.8px,transparent_1px)] [background-size:50px_50px] opacity-[0.1]" />
      
      {/* 2. Interactive Spotlight Glow */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40 transition-opacity duration-500"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.12), transparent 80%)`
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Orbiting Skills (Clean Floating Version) */}
          <motion.div  
            className="lg:col-span-5 order-2 lg:order-1 flex justify-center relative"
            style={{ x: parallaxX, y: parallaxY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Soft background glow behind skills instead of hard lines */}
            <div className="absolute inset-0 bg-amber-500/10 blur-[100px] rounded-full scale-75" />
            
            <div className="relative w-full max-w-[300px] sm:max-w-[400px] aspect-square flex items-center justify-center">
               <OrbitingSkills />
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-amber-500 font-mono tracking-[0.3em] text-sm mb-4 block">EXPLORE MY WORLD</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-6 top-0">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Me.</span>
              </h2> 
              <div className="h-1.5 w-24 bg-amber-500 mx-auto lg:mx-0 rounded-full mb-8" />
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              I am <span className="text-white font-medium">Sabin Khatri</span>, a Full-Stack Frontend specialist. 
              I transform complex logic into elegant, high-performance digital interfaces. 
              My mission is to merge <span className="text-amber-500">technical precision</span> with <span className="text-amber-500">artistic design</span>.
            </motion.p>

            {/* Stats Display */}
            <motion.div
              className="flex justify-center lg:justify-start gap-10 sm:gap-16 py-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex flex-col">
                <span className="text-5xl font-bold text-amber-500 tracking-tighter">
                  <AnimatedCounter to={2} trigger={isInView}/>
                </span>
                <span className="text-[11px] text-slate-500 tracking-[0.2em] font-mono mt-2 uppercase">Years Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl font-bold text-amber-500 tracking-tighter">
                  <AnimatedCounter to={5} trigger={isInView} />
                </span>
                <span className="text-[11px] text-slate-500 tracking-[0.2em] font-mono mt-2 uppercase">Projects Delivered</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <button
                onClick={handleDownload}
                disabled={status !== 'idle'}
                className="group relative overflow-hidden px-8 py-4 bg-amber-500 text-black font-bold rounded-full transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center min-w-[220px]"
              >
                {/* Progress Bar Background */}
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-amber-600 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
                
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'idle' && <><FaDownload className="group-hover:bounce" /> Download CV</>}
                  {status === 'downloading' && `Processing ${Math.floor(progress)}%`}
                  {status === 'completed' && <><FaCheckCircle className="text-lg" /> File Ready</>}
                </span>
              </button>

              <a
                href="#contact"
                className="group px-8 py-4 border border-amber-500/30 text-white font-semibold rounded-full hover:bg-amber-500/10 hover:border-amber-500 transition-all flex items-center gap-2"
              >
                Start a Project <FaRocket className="text-amber-500 group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;