import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Scroll progress indicator - shows reading progress at top of viewport.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 sm:h-1 z-[100] origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 opacity-90"
      style={{ scaleX }}
    />
  );
}
