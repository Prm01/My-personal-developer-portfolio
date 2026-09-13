import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';
import { EDUCATION } from '../data/premiumSections';

const ORBS = [
  { w: 320, h: 320, top: '-10%', left: '-8%', from: 'from-violet-500/20', to: 'to-fuchsia-500/5', dur: 8 },
  { w: 240, h: 240, top: '60%', right: '-5%', from: 'from-rose-500/15', to: 'to-violet-500/5', dur: 10 },
];

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) / r.width);
    y.set((e.clientY - r.top - r.height / 2) / r.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function EduCard({ edu, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.18, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className="relative group cursor-default">
        {/* Glow on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-px rounded-2xl bg-gradient-to-r from-violet-500/40 via-fuchsia-500/30 to-rose-500/40 blur-sm pointer-events-none"
        />

        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative rounded-2xl border border-slate-200/80 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl overflow-hidden"
        >
          {/* Top accent bar */}
          <motion.div
            className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500"
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: index * 0.18 + 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="p-6 md:p-8">
            <div className="flex items-start gap-5">
              {/* Icon with animated ring */}
              <div className="relative shrink-0">
                <motion.div
                  animate={{ rotate: hovered ? 360 : 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-30 blur-sm"
                />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg">
                  <GraduationCap size={26} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-lg md:text-xl text-slate-900 dark:text-white leading-tight mb-1">
                  {edu.degree}
                </h3>
                <p className="text-violet-600 dark:text-violet-400 font-semibold text-sm md:text-base">
                  {edu.institute}
                </p>

                <div className="flex flex-wrap gap-4 mt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin size={12} className="text-violet-400" /> {edu.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar size={12} className="text-violet-400" /> {edu.period}
                  </span>
                </div>

                {/* Subject tags */}
                {edu.tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {edu.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.18 + 0.4 + i * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-500/20 cursor-default"
                      >
                        <BookOpen size={10} /> {tag}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Shimmer sweep on hover */}
          <motion.div
            animate={{ x: hovered ? '200%' : '-100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
          />
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="education" ref={ref} className="section-pad relative overflow-hidden">
      {/* Background orbs */}
      {ORBS.map((o, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
          className={`absolute rounded-full bg-gradient-to-br ${o.from} ${o.to} blur-3xl pointer-events-none`}
          style={{ width: o.w, height: o.h, top: o.top, left: o.left, right: o.right }}
        />
      ))}

      <div className="relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            04 — Education
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">
            <span className="gradient-text">Academic</span>
            <span className="text-slate-900 dark:text-white"> Journey</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-3 text-slate-500 dark:text-slate-400 max-w-lg"
          >
            Building a strong foundation in mathematics, computing, and engineering principles.
          </motion.p>
        </motion.div>

        {/* Cards with connector line */}
        <div className="max-w-2xl mx-auto relative">
          {/* Vertical connector */}
          <div className="absolute left-7 top-16 bottom-16 w-px hidden md:block">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-violet-500/60 via-fuchsia-500/40 to-transparent"
              initial={{ scaleY: 0, originY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="space-y-6">
            {EDUCATION.map((edu, i) => (
              <EduCard key={edu.id} edu={edu} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
