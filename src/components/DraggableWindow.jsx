/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';

const WINDOW_SIZES = {
  terminal: { w: 600, h: 400 },
  music:    { w: 360, h: 520 },
  settings: { w: 400, h: 580 },
  timeline: { w: 400, h: 420 },
  shortcuts:{ w: 400, h: 320 },
  arcade:   { w: 340, h: 470 },
  taskmanager: { w: 420, h: 480 },
};

const DraggableWindow = ({ children, isOpen, zIndex, onFocus, type = 'terminal' }) => {
  const dragControls = useDragControls();
  const [layout, setLayout] = useState({ x: 16, y: 72, constraints: { left: 8, right: 8, top: 40, bottom: 80 } });

  useEffect(() => {
    const updatePosition = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const size = WINDOW_SIZES[type] || WINDOW_SIZES.terminal;
      const w = Math.min(size.w, vw * 0.92);
      const h = Math.min(size.h, vh * 0.7);
      const x = Math.max(8, Math.round((vw - w) / 2));
      const y = Math.max(56, Math.round(vh * 0.1));
      setLayout({
        x,
        y,
        constraints: {
          left: -x + 8,
          right: Math.max(8, vw - w - 8),
          top: 48,
          bottom: Math.max(80, vh - h - 48),
        },
      });
    };
    updatePosition();
    window.addEventListener('resize', updatePosition, { passive: true });
    return () => window.removeEventListener('resize', updatePosition);
  }, [type]);

  if (!isOpen) return null;

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={layout.constraints}
      initial={{ opacity: 0, scale: 0.85, y: layout.y + 30 }}
      animate={{ opacity: 1, scale: 1, x: layout.x, y: layout.y }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      style={{ zIndex, position: 'fixed', top: 0, left: 0, maxWidth: '92vw' }}
      onPointerDown={onFocus}
      className="shadow-2xl will-change-transform"
    >
      {React.cloneElement(children, { dragControls })}
    </motion.div>
  );
};

export default DraggableWindow;
