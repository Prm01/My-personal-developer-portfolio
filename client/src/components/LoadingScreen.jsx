import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('portfolio_loaded');
    if (hasSeen) {
      setVisible(false);
      if (onLoaded) onLoaded();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem('portfolio_loaded', 'true');
            if (onLoaded) onLoaded();
          }, 350);
          return 100;
        }
        return prev + 12;
      });
    }, 75);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[10000] bg-[#090714] flex flex-col items-center justify-center p-4 selection:bg-transparent"
        >
          {/* Subtle neon ambient circles */}
          <div className="absolute w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute w-72 h-72 rounded-full bg-purple-500/10 blur-3xl translate-x-20 translate-y-20 pointer-events-none" />

          {/* 3D Spinning Geometric Wireframe Emblem */}
          <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
            {/* Outer rotating neon ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="absolute inset-0 rounded-3xl border-2 border-dashed border-emerald-400/40"
            />
            {/* Inner counter-rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="absolute inset-2 rounded-2xl border-2 border-purple-400/50"
            />
            {/* Central Monogram */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-purple-600 to-emerald-600 flex items-center justify-center text-white font-black text-xl tracking-tight shadow-xl shadow-purple-500/25">
              PY
            </div>
          </div>

          {/* Title & Status */}
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
              Pramod Yadav
            </h2>
            <p className="text-xs text-emerald-400 font-mono tracking-widest uppercase">
              Initializing 3D Workspace · {Math.min(100, progress)}%
            </p>
          </div>

          {/* Cyber Progress Bar */}
          <div className="w-56 h-1.5 bg-slate-900 rounded-full mt-6 overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-400 via-fuchsia-500 to-emerald-400"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
