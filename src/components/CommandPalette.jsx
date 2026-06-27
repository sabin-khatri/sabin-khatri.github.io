import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch, FaHome, FaUser, FaFolderOpen, FaEnvelope, FaCode,
  FaTerminal, FaMusic, FaCog, FaKeyboard, FaClock,
} from 'react-icons/fa';
import { playOpenSound, playCloseSound, playSuccessSound } from '../utils/audio';
import { scrollToSection } from '../utils/scroll';

const COMMANDS = [
  { id: 'home',     label: 'Home',           desc: 'Go to hero section',       icon: FaHome,       action: 'scroll' },
  { id: 'about',    label: 'About',          desc: 'About Sabin Khatri',       icon: FaUser,       action: 'scroll' },
  { id: 'services', label: 'Services',       desc: 'What I do & expertise',    icon: FaCode,       action: 'scroll' },
  { id: 'projects', label: 'Projects',       desc: 'View portfolio projects',  icon: FaFolderOpen, action: 'scroll' },
  { id: 'skills',   label: 'Skills',         desc: 'Tech stack & skills',      icon: FaCode,       action: 'scroll' },
  { id: 'contact',  label: 'Contact',        desc: 'Get in touch',             icon: FaEnvelope,   action: 'scroll' },
  { id: 'terminal', label: 'Terminal',       desc: 'Open terminal emulator',   icon: FaTerminal,   action: 'open' },
  { id: 'music',    label: 'Music Player',   desc: '6 stations · Live & generated', icon: FaMusic,      action: 'open' },
  { id: 'timeline', label: 'Timeline',       desc: 'Career & education journey',  icon: FaClock,      action: 'open' },
  { id: 'settings', label: 'Settings',       desc: 'Customize Sabin OS',       icon: FaCog,        action: 'open' },
  { id: 'shortcuts',label: 'Shortcuts',      desc: 'Keyboard shortcuts',       icon: FaKeyboard,   action: 'open' },
];

const CommandPalette = ({ isOpen, onClose, onOpen }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filteredCommands = COMMANDS.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.desc.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      playOpenSound();
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  const handleSelect = (cmd) => {
    playSuccessSound();
    if (cmd.action === 'scroll') {
      scrollToSection(cmd.id);
    } else {
      onOpen(cmd.id);
    }
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredCommands[selectedIndex]);
    } else if (e.key === 'Escape') {
      playCloseSound();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9990] flex items-start justify-center pt-[12vh] sm:pt-[15vh] px-4"
          onClick={() => { playCloseSound(); onClose(); }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-lg backdrop-blur-xl border border-os rounded-xl shadow-2xl overflow-hidden"
            style={{ background: 'color-mix(in srgb, var(--os-card) 95%, transparent)', borderColor: 'var(--os-border)' }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
              <FaSearch className="text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Search apps & commands..."
                className="flex-1 bg-transparent outline-none text-os-text placeholder-slate-500 font-mono text-sm"
              />
              <span className="text-[10px] text-slate-500 font-mono border border-slate-700 px-1.5 py-0.5 rounded hidden sm:inline">ESC</span>
            </div>

            <div className="max-h-[50vh] sm:max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => handleSelect(cmd)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono transition-colors text-left ${
                        selectedIndex === idx ? 'bg-accent/10 text-accent' : 'text-slate-300 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                        selectedIndex === idx ? 'bg-accent/15' : 'bg-slate-800/60'
                      }`}>
                        <Icon className="text-sm" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>{cmd.label}</div>
                        <div className="text-[10px] text-slate-500 truncate">{cmd.desc}</div>
                      </div>
                      {selectedIndex === idx && (
                        <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-500 hidden sm:inline">↵</kbd>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="px-3 py-6 text-center text-sm font-mono text-slate-500">
                  No results for &quot;{search}&quot;
                </div>
              )}
            </div>

            <div className="px-4 py-2 border-t border-slate-800 flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-500">
              <span><kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700">↑↓</kbd> navigate</span>
              <span><kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700">↵</kbd> open</span>
              <span><kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700">Esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
