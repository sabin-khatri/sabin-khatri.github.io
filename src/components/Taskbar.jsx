import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaGlobe, FaTerminal, FaCog, FaCloud, FaSearch, FaMusic } from 'react-icons/fa';
import { playClickSound } from '../utils/audio';

const APPS = [
  { id: 'terminal', icon: FaTerminal, label: 'Terminal' },
  { id: 'music',    icon: FaMusic,    label: 'Music' },
  { id: 'settings', icon: FaCog,      label: 'Settings' },
];

const Taskbar = ({ openWindows, activeWindow, onOpenApp, onCommandPalette }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateString = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  const handleClick = (id) => {
    playClickSound();
    onOpenApp(id);
  };

  return (
    <motion.div
      initial={{ y: 48 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 z-[500] h-10 sm:h-11 flex items-center justify-between px-2 sm:px-3 text-slate-400 text-xs font-mono select-none border-t border-slate-800/80"
      style={{ background: 'var(--os-taskbar)', backdropFilter: 'blur(16px)' }}
    >
      {/* Left */}
      <div className="flex items-center gap-0.5 h-full min-w-0">
        <button
          className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 h-full hover:bg-slate-800/50 hover:text-white transition-colors rounded-md shrink-0"
          onClick={() => handleClick('terminal')}
        >
          <FaGlobe className="text-accent text-sm" />
          <span className="font-semibold text-accent hidden xs:inline sm:inline text-[11px] sm:text-xs">Sabin OS</span>
        </button>

        <div className="w-px h-4 bg-slate-800 shrink-0 hidden sm:block" />

        <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none flex-1 min-w-0">
          {APPS.map((app) => {
            const Icon = app.icon;
            const isOpen = openWindows.includes(app.id);
            const isActive = activeWindow === app.id;
            return (
              <button
                key={app.id}
                onClick={() => handleClick(app.id)}
                title={app.label}
                className={`relative flex items-center gap-1.5 px-2 sm:px-3 h-8 rounded-md transition-all shrink-0 ${
                  isActive
                    ? 'bg-slate-800/80 text-accent'
                    : isOpen
                    ? 'text-slate-200 hover:bg-slate-800/50'
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
                }`}
              >
                <Icon className="text-xs sm:text-sm" />
                <span className="hidden lg:inline">{app.label}</span>
                {isOpen && (
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3 h-full pr-1 sm:pr-2 shrink-0">
        <div className="hidden md:flex items-center gap-1.5 px-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="w-2 h-2 rounded-full bg-slate-600" />
          <div className="w-2 h-2 rounded-full bg-slate-600" />
        </div>

        <div className="hidden sm:flex items-center gap-1 text-slate-300">
          <FaCloud className="text-cyan-400 text-xs" />
          <span className="text-[11px]">22°C</span>
        </div>

        <button
          className="p-1.5 hover:bg-slate-800/50 hover:text-white rounded transition-colors"
          onClick={() => { playClickSound(); onCommandPalette(); }}
          title="Command Palette (Ctrl+Space)"
        >
          <FaSearch className="text-xs sm:text-sm" />
        </button>

        <div className="flex flex-col items-end justify-center leading-none tracking-wider">
          <span className="text-white text-[10px] sm:text-[11px] tabular-nums">{timeString}</span>
          <span className="text-[8px] sm:text-[9px] mt-0.5 text-slate-500 hidden sm:block">{dateString}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Taskbar;
