import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaGlobe, FaTerminal, FaCog, FaCloud, FaSearch, FaMusic, FaLightbulb } from 'react-icons/fa';
import { playClickSound } from '../utils/audio';

const APPS = [
  { id: 'terminal',    icon: FaTerminal,   label: 'Terminal' },
  { id: 'music',       icon: FaMusic,      label: 'Music' },
  { id: 'settings',    icon: FaCog,        label: 'Settings' },
];

const Taskbar = ({ openWindows, activeWindow, onOpenApp, onCommandPalette }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const compactTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
      className="taskbar-shell fixed z-[500] flex h-11 items-center justify-between px-1.5 sm:px-3 text-slate-400 text-xs font-mono select-none border border-slate-800/90 sm:border-x-0 sm:border-b-0"
      style={{ background: 'var(--os-taskbar)', backdropFilter: 'blur(16px)' }}
    >
      {/* Left */}
      <div className="flex items-center gap-0.5 h-full min-w-0">
        <button
          type="button"
          aria-label="Open terminal"
          title="Sabin OS"
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
                type="button"
                aria-label={`Open ${app.label}`}
                onClick={() => handleClick(app.id)}
                title={app.label}
                className={`relative flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-md px-2 sm:px-3 transition-all shrink-0 ${
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

        <div className="hidden lg:flex items-center gap-1 text-slate-300">
          <FaCloud className="text-cyan-400 text-xs" />
          <span className="text-[11px]">22°C</span>
        </div>

        <button
          type="button"
          aria-label="Open command palette"
          className="flex h-9 w-9 items-center justify-center rounded transition-colors hover:bg-slate-800/50 hover:text-white"
          onClick={() => { playClickSound(); onCommandPalette(); }}
          title="Command Palette (Ctrl+Space)"
        >
          <FaSearch className="text-xs sm:text-sm" />
        </button>

        <div className="flex flex-col items-end justify-center leading-none tracking-wider">
          <span className="text-white text-[10px] sm:text-[11px] tabular-nums sm:hidden">{compactTime}</span>
          <span className="hidden text-white text-[10px] sm:text-[11px] tabular-nums sm:inline">{timeString}</span>
          <span className="text-[8px] sm:text-[9px] mt-0.5 text-slate-500 hidden sm:block">{dateString}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Taskbar;
