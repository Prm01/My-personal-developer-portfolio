import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, Zap, TrendingUp } from 'lucide-react';
import { EXPERIENCE } from '../data/premiumSections';

function TimelineCard({ entry, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative pb-12 last:pb-0 pl-12 md:pl-16"
    >
      {/* Animated dot with pulse rings */}
      <div className="absolute left-0 top-2 z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.1, type: 'spring', stiffness: 250, damping: 18 }}
          className="relative"
        >
          {/* Pulse rings */}
          {[1, 2].map((r) => (
            <motion.div
              key={r}
              animate={{ scale: [1, 1.8 + r * 0.4], opacity: [0.4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: r * 0.4, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-violet-500/40"
            />
          ))}
          <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border-4 border-white dark:border-slate-950 shadow-[0_0_16px_rgba(139,92,246,0.6)]" />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="relative rounded-2xl border border-slate-200/80 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl overflow-hidden"
      >
        {/* Left accent bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 via-fuchsia-500 to-rose-500"
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
        />

        <div className="p-5 md:p-6 pl-6 md:pl-7">
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-md shrink-0"
              >
                <Briefcase size={18} />
              </motion.div>
              <div>
                <h3 className="font-display font-bold text-slate-900 dark:text-white leading-tight">
                  {entry.role}
                </h3>
                <p className="text-violet-600 dark:text-violet-400 text-sm font-semibold">{entry.org}</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-500/20 shrink-0">
              {entry.period}
            </span>
          </div>

          {/* Highlight badge */}
          {entry.highlight && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-3"
            >
              <TrendingUp size={11} /> {entry.highlight}
            </motion.div>
          )}

          {/* Description — truncated with expand */}
          <p className={`text-slate-600 dark:text-slate-400 text-sm leading-relaxed ${!expanded ? 'line-clamp-2' : ''}`}>
            {entry.desc}
          </p>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 flex items-center gap-1 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
          >
            {expanded ? 'Show less' : 'Read more'}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={13} />
            </motion.span>
          </button>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.35 + i * 0.04 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300 transition-colors cursor-default"
              >
                <Zap size={9} className="text-violet-400" /> {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Timeline() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const lineRef = useRef(null);
  const headInView = useInView(headRef, { once: true, amount: 0.5 });
  const lineInView = useInView(lineRef, { once: true, amount: 0.05 });

  // Scroll-driven line progress
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.8', 'end 0.2'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" ref={sectionRef} className="section-pad relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-slate-900/30" />
      <div className="grid-pattern absolute inset-0 opacity-20 pointer-events-none" aria-hidden />

      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-violet-500/10 blur-3xl pointer-events-none"
      />

      <div className="relative">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={headInView ? { opacity: 1, x: 0 } : {}}
            className="section-label"
          >
            05 — Experience
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">
            <span className="gradient-text">Work</span>
            <span className="text-slate-900 dark:text-white"> Experience</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-3 text-slate-500 dark:text-slate-400 max-w-lg"
          >
            Real-world impact through automation, design, and engineering.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div ref={lineRef} className="relative max-w-2xl mx-auto">
          {/* Scroll-driven line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-violet-500 via-fuchsia-500 to-rose-500 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {EXPERIENCE.map((entry, i) => (
            <TimelineCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
