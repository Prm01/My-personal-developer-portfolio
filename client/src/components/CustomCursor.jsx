import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Custom animated neon cursor with glow trailing particles.
 * Automatically disabled on touch screens and when prefers-reduced-motion is active.
 */
export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [smoothPos, setSmoothPos] = useState({ x: -100, y: -100 });
  const [trails, setTrails] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const trailCounter = useRef(0);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Spawn subtle particle every few events
      trailCounter.current += 1;
      if (trailCounter.current % 4 === 0) {
        const id = Date.now() + Math.random();
        setTrails((prev) => [
          ...prev.slice(-6),
          { id, x: e.clientX, y: e.clientY }
        ]);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], input, textarea, select');
      setIsHovering(Boolean(interactive));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  // Smooth lerp trailing animation
  useEffect(() => {
    if (!isVisible) return;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const update = () => {
      posRef.current.x = lerp(posRef.current.x, mousePos.x, 0.22);
      posRef.current.y = lerp(posRef.current.y, mousePos.y, 0.22);
      setSmoothPos({ ...posRef.current });
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mousePos, isVisible]);

  // Prune trail particles
  useEffect(() => {
    if (trails.length === 0) return;
    const timer = setTimeout(() => {
      setTrails((prev) => prev.slice(1));
    }, 280);
    return () => clearTimeout(timer);
  }, [trails]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trailing Particle Dots */}
      {trails.map((t, idx) => (
        <span
          key={t.id}
          className="fixed z-[9996] pointer-events-none rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-40 blur-[0.5px] transition-opacity duration-300"
          style={{
            left: t.x,
            top: t.y,
            width: 3 + (idx % 3),
            height: 3 + (idx % 3),
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Outer Glow Ring */}
      <motion.div
        className="fixed z-[9997] pointer-events-none rounded-full border border-blue-400/60 dark:border-purple-400/60 shadow-[0_0_15px_rgba(56,189,248,0.35)]"
        style={{
          left: smoothPos.x,
          top: smoothPos.y,
          transform: 'translate(-50%, -50%)',
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />

      {/* Inner Neon Core */}
      <div
        className="fixed z-[9998] pointer-events-none rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.9)]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          width: isHovering ? 8 : 5,
          height: isHovering ? 8 : 5
        }}
      />
    </>
  );
}
