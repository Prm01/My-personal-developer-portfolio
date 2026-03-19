import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MIN_DISPLAY_MS = 1800;

/**
 * Full-screen preloader. Fades out when progress completes and min time elapsed.
 */
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 10 + 5, 100));
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      const remaining = MIN_DISPLAY_MS - (Date.now() - start);
      setTimeout(() => {
        setComplete(true);
        setTimeout(() => onComplete?.(), 350);
      }, Math.max(0, remaining));
    }, MIN_DISPLAY_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              Pramod Yadav
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2 mb-8"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-violet-500"
                animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </motion.div>

          <div className="w-48 h-1 rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.15 }}
            />
          </div>
          <p className="text-slate-500 text-sm mt-4">{Math.min(Math.round(progress), 100)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
