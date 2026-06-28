/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';

const WINDOW_SIZES = {
  terminal: { w: 600, h: 400 },
  music:    { w: 360, h: 520 },
  settings: { w: 400, h: 580 },
  timeline: { w: 400, h: 420 },
  shortcuts:{ w: 400, h: 320 },
};

const DraggableWindow = ({ children, isOpen, zIndex, onFocus, type = 'terminal' }) => {
  const dragControls = useDragControls();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const size = WINDOW_SIZES[type] || WINDOW_SIZES.terminal;
      const w = Math.min(size.w, vw * 0.92);
      const x = Math.max(8, (vw - w) / 2 - vw * 0.1);
      const y = Math.max(60, vh * 0.12);
      setPosition({ x, y });
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
      dragConstraints={{ left: -position.x + 8, right: window.innerWidth - 100, top: 40, bottom: window.innerHeight - 80 }}
      initial={{ opacity: 0, scale: 0.85, y: position.y + 30 }}
      animate={{ opacity: 1, scale: 1, x: position.x, y: position.y }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      style={{ zIndex, position: 'fixed', top: 0, left: 0 }}
      onPointerDown={onFocus}
      className="shadow-2xl will-change-transform"
    >
      {React.cloneElement(children, { dragControls })}
    </motion.div>
  );
};

export default DraggableWindow;
