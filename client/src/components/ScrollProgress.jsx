import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Scroll progress indicator - shows reading progress at top of viewport with neon gradient.
 * Uses electric purple to emerald gradient.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
      style={{ scaleX }}
    />
  );
}
