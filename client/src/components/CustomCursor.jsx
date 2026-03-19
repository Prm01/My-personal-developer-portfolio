import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Custom animated cursor - smooth trailing effect, reactive to hovers.
 * Desktop only; hidden on touch devices.
 */
export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef();
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], input, textarea');
      setIsHovering(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  // Smooth trailing animation
  useEffect(() => {
    if (!isVisible) return;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const update = () => {
      posRef.current.x = lerp(posRef.current.x, mousePos.x, 0.15);
      posRef.current.y = lerp(posRef.current.y, mousePos.y, 0.15);
      setSmoothPos({ ...posRef.current });
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mousePos, isVisible]);

  useEffect(() => {
    if (isVisible) document.body.style.cursor = 'none';
    return () => { document.body.style.cursor = ''; };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring - trails behind */}
      <motion.div
        className="fixed z-[9998] pointer-events-none w-10 h-10 rounded-full border-2 border-violet-400/40 dark:border-violet-500/30"
        style={{
          left: smoothPos.x,
          top: smoothPos.y,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.4 : 0.8
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
      {/* Inner dot - follows more directly */}
      <motion.div
        className="fixed z-[9999] pointer-events-none w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.9 : 1
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </>
  );
}
