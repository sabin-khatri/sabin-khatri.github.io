/* eslint-disable no-unused-vars */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { playCloseSound } from '../utils/audio';

const SHORTCUTS = [
  { keys: ['Ctrl', 'Space'], desc: 'Toggle command palette' },
  { keys: ['Ctrl', '?'],     desc: 'Show keyboard shortcuts' },
  { keys: ['Esc'],           desc: 'Close dialogs / palette' },
  { keys: ['↑', '↓'],        desc: 'Navigate command palette' },
  { keys: ['Enter'],         desc: 'Select command' },
];

const KeyboardShortcuts = ({ isOpen, onClose }) => {
  const handleClose = () => {
    playCloseSound();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9995] flex items-center justify-center px-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-md bg-[#111115] border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <span className="text-sm font-mono text-white">Keyboard Shortcuts</span>
              <button onClick={handleClose} className="text-slate-500 hover:text-white transition-colors">
                <FaTimes />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {SHORTCUTS.map((s, i) => (
                <div key={i} className="flex items-center justify-between gap-4 py-2">
                  <span className="text-sm text-slate-400 font-mono">{s.desc}</span>
                  <div className="flex gap-1 shrink-0">
                    {s.keys.map((k, j) => (
                      <kbd key={j} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-slate-800 text-[10px] font-mono text-slate-600">
              Sabin OS v1.0
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;
