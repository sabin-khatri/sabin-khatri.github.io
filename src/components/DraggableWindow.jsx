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

const DraggableWindow = ({ children, isOpen, zIndex, onFocus, type = 'terminal', stackIndex = 0 }) => {
  const dragControls = useDragControls();
  const [layout, setLayout] = useState({ x: 8, y: 56, width: 600, height: 400, constraints: { left: 0, right: 0, top: 0, bottom: 0 } });

  useEffect(() => {
    const updatePosition = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const size = WINDOW_SIZES[type] || WINDOW_SIZES.terminal;
      const w = Math.min(size.w, vw - 16);
      const h = Math.min(size.h + 44, vh - 112);
      const offset = Math.min(stackIndex, 4) * 24;
      const x = Math.max(8, Math.min(vw - w - 8, Math.round((vw - w) / 2) + offset));
      const y = Math.max(48, Math.min(vh - h - 52, Math.round((vh - h) / 2) + offset));
      setLayout({
        x,
        y,
        width: w,
        height: h,
        constraints: {
          left: -x + 8,
          right: Math.max(0, vw - w - x - 8),
          top: 48 - y,
          bottom: Math.max(0, vh - h - y - 52),
        },
      });
    };
    updatePosition();
    window.addEventListener('resize', updatePosition, { passive: true });
    return () => window.removeEventListener('resize', updatePosition);
  }, [type, stackIndex]);

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
      style={{ zIndex, position: 'fixed', top: 0, left: 0, width: layout.width, maxWidth: 'calc(100vw - 16px)', maxHeight: 'calc(100dvh - 104px)' }}
      onPointerDown={onFocus}
      className="shadow-2xl will-change-transform"
    >
      {React.cloneElement(children, { dragControls })}
    </motion.div>
  );
};

export default DraggableWindow;
