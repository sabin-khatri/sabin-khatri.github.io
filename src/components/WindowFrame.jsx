import React from 'react';
import { playCloseSound, playMinimizeSound } from '../utils/audio';

const WindowFrame = ({ title, onClose, onMinimize, dragControls, children, className = '' }) => (
  <div
    className={`flex flex-col border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl ${className}`}
    style={{ background: 'var(--os-terminal)' }}
  >
    <div
      className="flex items-center px-4 py-2.5 border-b border-slate-800 cursor-move relative shrink-0"
      style={{ background: 'var(--os-card)' }}
      onPointerDown={(e) => dragControls?.start(e)}
    >
      <div className="mx-auto text-xs font-mono text-slate-400 select-none tracking-wider">{title}</div>
      <div className="flex gap-3 absolute right-4">
        <button
          onClick={() => { playMinimizeSound(); onMinimize?.(); }}
          className="text-slate-500 hover:text-white transition-colors text-sm"
        >-</button>
        <button className="text-slate-500 hover:text-white transition-colors text-sm">□</button>
        <button
          onClick={() => { playCloseSound(); onClose?.(); }}
          className="text-slate-500 hover:text-white transition-colors text-sm"
        >✕</button>
      </div>
    </div>
    <div className="flex-1 overflow-hidden relative">{children}</div>
  </div>
);

export default WindowFrame;
