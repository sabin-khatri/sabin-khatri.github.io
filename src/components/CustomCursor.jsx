import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the outer ring movement
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
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
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const mouseEnter = () => setIsVisible(true);
    
    const mouseLeave = (e) => {
      // Only hide if the mouse genuinely left the viewport boundaries
      if (
        e.clientX <= 0 ||
        e.clientY <= 0 ||
        e.clientX >= window.innerWidth - 2 ||
        e.clientY >= window.innerHeight - 2
      ) {
        setIsVisible(false);
      }
    };

    const handleScroll = () => {
      // Keep cursor visible on scroll and ensure it updates status
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', mouseMove, { passive: true });
    document.addEventListener('mouseenter', mouseEnter);
    document.addEventListener('mouseleave', mouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMouseOver = (e) => {
      if (!e.target) return;
      const target = e.target.closest?.('a, button, input, textarea, select, [role="button"], .cursor-hover, iframe');
      setIsHovering(!!target);
    };

    document.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor
    const style = document.createElement('style');
    style.innerHTML = `
      * { cursor: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseenter', mouseEnter);
      document.removeEventListener('mouseleave', mouseLeave);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [isDesktop, isVisible, mouseX, mouseY]);

  if (!isDesktop || !isVisible) return null;

  return (
    <>
      {/* Inner Dot - follows cursor immediately */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-accent rounded-full pointer-events-none z-[999999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.1 }}
      />
      {/* Outer Ring - trails cursor smoothly */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[999998] flex items-center justify-center mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          backgroundColor: isHovering ? 'rgba(var(--accent-rgb), 0.25)' : 'transparent',
          borderColor: isHovering ? 'transparent' : 'rgba(var(--accent-rgb), 0.6)'
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
