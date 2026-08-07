import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Screensaver = ({ onWake }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      document.body.style.overflow = '';
      clearInterval(timer);
    };
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  const wake = (e) => {
    e?.stopPropagation?.();
    onWake();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[99999] bg-os flex flex-col items-center justify-center cursor-default select-none"
      onMouseDown={wake}
      onClick={wake}
      onKeyDown={wake}
      onTouchStart={wake}
      role="button"
      tabIndex={0}
      aria-label="Screensaver — click or press any key to wake"
    >
      <div className="crt-overlay" />

      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <motion.h1
          animate={{
            opacity: [0.6, 1, 0.6],
            textShadow: [
              '0 0 20px rgba(var(--accent-rgb), 0.2)',
              '0 0 60px rgba(var(--accent-rgb), 0.6)',
              '0 0 20px rgba(var(--accent-rgb), 0.2)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-accent to-orange-500 tracking-tighter"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Sabin OS
        </motion.h1>

        <div className="flex flex-col items-center gap-1">
          <span className="text-4xl sm:text-5xl font-mono text-white tabular-nums tracking-wider">{timeString}</span>
          <span className="text-sm font-mono text-slate-500">{dateString}</span>
        </div>

        <motion.p
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-accent/70 font-mono text-xs sm:text-sm tracking-widest uppercase mt-4"
        >
          Click or press any key to wake
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Screensaver;
