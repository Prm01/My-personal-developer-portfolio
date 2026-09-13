import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LETTERS = ['P', 'R', 'A', 'M', 'O', 'D'];
const MIN_MS = 2000;

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const iv = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 12 + 4;
        return next >= 100 ? 100 : next;
      });
    }, 80);

    const to = setTimeout(() => {
      clearInterval(iv);
      setProgress(100);
      const wait = MIN_MS - (Date.now() - start);
      setTimeout(() => {
        setDone(true);
        setTimeout(() => onComplete?.(), 600);
      }, Math.max(0, wait));
    }, MIN_MS);

    return () => { clearInterval(iv); clearTimeout(to); };
  }, [onComplete]);

  const pct = Math.min(Math.round(progress), 100);
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
        >
          {/* Radial gradient bg */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12)_0%,transparent_70%)]" />

          {/* Floating orbs */}
          {[
            { w: 300, h: 300, top: '10%', left: '5%', dur: 7 },
            { w: 200, h: 200, bottom: '15%', right: '8%', dur: 9 },
          ].map((o, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0], opacity: [0.06, 0.12, 0.06] }}
              transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/10 blur-3xl pointer-events-none"
              style={{ width: o.w, height: o.h, top: o.top, left: o.left, bottom: o.bottom, right: o.right }}
            />
          ))}

          {/* Progress ring */}
          <div className="relative mb-8">
            <svg width="120" height="120" className="-rotate-90">
              <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth="4" />
              <motion.circle
                cx="60" cy="60" r={r}
                fill="none"
                stroke="url(#preloadGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circ}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 0.15 }}
              />
              <defs>
                <linearGradient id="preloadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                key={pct}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-lg font-display font-bold text-white"
              >
                {pct}
              </motion.span>
            </div>
          </div>

          {/* Staggered name letters */}
          <div className="flex gap-1 mb-3">
            {LETTERS.map((l, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-4xl font-display font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent"
              >
                {l}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-slate-500 text-xs tracking-[0.3em] uppercase"
          >
            Full-Stack · Automation · AI
          </motion.p>

          {/* Bottom progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.15 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
