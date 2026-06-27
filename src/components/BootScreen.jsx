import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { scrollToTop } from '../utils/scroll';

const BOOT_LINES = [
  { text: "BIOS v2.4.1 — Sabin Systems Inc.", delay: 0, type: "dim" },
  { text: "CPU: Creative-Core i9 @ 4.20GHz  RAM: 16GB  DISK: ∞", delay: 80, type: "dim" },
  { text: "", delay: 120, type: "dim" },
  { text: "[    0.000000] Linux version 6.1.0-sabin (gcc 12.3.0)", delay: 180, type: "dim" },
  { text: "[    0.012345] Command line: BOOT_IMAGE=/vmlinuz-sabin root=/dev/portfolio", delay: 260, type: "dim" },
  { text: "[    0.034567] ACPI: IRQ0 used by override.", delay: 320, type: "dim" },
  { text: "[    0.056789] Initializing cgroup subsys cpuset", delay: 380, type: "dim" },
  { text: "[    0.089012] PCI: Using configuration type 1 for base access", delay: 440, type: "dim" },
  { text: "[    0.112233] Loading creative modules...", delay: 520, type: "dim" },
  { text: "[    0.145678] React Framework v19 ................ [  OK  ]", delay: 650, type: "ok" },
  { text: "[    0.178901] Vite Build Engine v6.3 ........... [  OK  ]", delay: 800, type: "ok" },
  { text: "[    0.212345] TailwindCSS v4.1 ............... [  OK  ]", delay: 950, type: "ok" },
  { text: "[    0.245678] Framer Motion v12 .............. [  OK  ]", delay: 1100, type: "ok" },
  { text: "[    0.278901] Three.js Runtime ............... [  OK  ]", delay: 1250, type: "ok" },
  { text: "[    0.312345] Web Audio API .................. [  OK  ]", delay: 1400, type: "ok" },
  { text: "[    0.345678] Portfolio Interface ............ [  OK  ]", delay: 1550, type: "ok" },
  { text: "", delay: 1700, type: "dim" },
  { text: "  ███████╗ █████╗ ██████╗ ██╗███╗   ██╗", delay: 1800, type: "ascii" },
  { text: "  ██╔════╝██╔══██╗██╔══██╗██║████╗  ██║", delay: 1840, type: "ascii" },
  { text: "  ███████╗███████║██████╔╝██║██╔██╗ ██║", delay: 1880, type: "ascii" },
  { text: "  ╚════██║██╔══██║██╔══██╗██║██║╚██╗██║", delay: 1920, type: "ascii" },
  { text: "  ███████║██║  ██║██████╔╝██║██║ ╚████║", delay: 1960, type: "ascii" },
  { text: "  ╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝", delay: 2000, type: "ascii" },
  { text: "", delay: 2100, type: "dim" },
  { text: "  Welcome, Sabin Khatri  ·  Frontend Developer  ·  Nepal", delay: 2200, type: "cyan" },
  { text: "  building elegant digital experiences", delay: 2300, type: "dim" },
  { text: "", delay: 2400, type: "dim" },
  { text: "  Starting Sabin OS v1.0 ...", delay: 2500, type: "ready" },
];

const lineClass = (type) => {
  switch (type) {
    case "ok":    return "text-green-400";
    case "ascii": return "text-accent";
    case "cyan":  return "text-cyan-400 font-medium";
    case "ready": return "text-accent";
    default:      return "text-slate-500";
  }
};

const BootScreen = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollToTop();
    document.body.style.overflow = 'hidden';

    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(i + 1);
        setProgress(((i + 1) / BOOT_LINES.length) * 100);
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, line.delay)
    );

    const glitchTimer = setTimeout(() => setGlitch(true), 3200);
    const unglitchTimer = setTimeout(() => setGlitch(false), 3350);
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 500);
    }, 3600);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(glitchTimer);
      clearTimeout(unglitchTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className={`fixed inset-0 z-[9999] bg-black font-mono overflow-hidden flex flex-col ${glitch ? "brightness-150" : ""}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="crt-overlay" />

      <div ref={scrollRef} className="flex-1 overflow-hidden px-4 sm:px-6 pt-6 pb-2">
        <div className="max-w-3xl mx-auto space-y-0">
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={`text-[10px] sm:text-xs leading-5 whitespace-pre ${lineClass(line.type)} ${
                i === visibleLines - 1 ? "after:content-['▋'] after:animate-pulse after:ml-0.5" : ""
              }`}
            >
              {line.text || "\u00A0"}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-6 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-slate-600">Sabin OS v1.0</span>
          <span className="text-[10px] font-mono text-green-400">
            {visibleLines}/{BOOT_LINES.length} modules
          </span>
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            style={{ boxShadow: "0 0 8px rgba(var(--accent-rgb), 0.6)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BootScreen;
