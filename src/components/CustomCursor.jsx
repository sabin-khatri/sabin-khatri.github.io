import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover (desktop)
    const checkHover = () => {
      setIsDesktop(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    };
    checkHover();
    window.addEventListener('resize', checkHover);
    return () => window.removeEventListener('resize', checkHover);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const mouseEnter = () => setIsVisible(true);
    const mouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseenter', mouseEnter);
    document.addEventListener('mouseleave', mouseLeave);

    const handleHoverStart = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [role="button"], .cursor-hover');
      if (target) setIsHovering(true);
    };
    const handleHoverEnd = () => setIsHovering(false);

    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    // Hide default cursor
    document.body.style.cursor = 'none';
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        if(getComputedStyle(el).cursor !== 'none' && getComputedStyle(el).cursor !== 'auto' && getComputedStyle(el).cursor !== 'text') {
             // Let css handle specific cursors, but generally hide the arrow
        }
    });

    // We can add a global style to hide it thoroughly, but ensuring links don't show the hand
    const style = document.createElement('style');
    style.innerHTML = `
      * { cursor: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseenter', mouseEnter);
      document.removeEventListener('mouseleave', mouseLeave);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, [isDesktop, isVisible]);

  if (!isDesktop || !isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[99999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[99998] flex items-center justify-center mix-blend-screen"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(var(--accent-rgb), 0.2)' : 'transparent',
          borderColor: isHovering ? 'transparent' : 'rgba(var(--accent-rgb), 0.5)'
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
