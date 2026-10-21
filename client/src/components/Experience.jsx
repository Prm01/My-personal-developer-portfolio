import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, TrendingUp, Zap, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { TIMELINE_DATA } from '../data/premiumSections';

function TimelineCard3D({ item, index, inView }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isWork = item.type === 'Experience';
  const Icon = isWork ? Briefcase : GraduationCap;

  return (
    <div className="relative pl-10 sm:pl-16">
      {/* Glowing Node on Timeline Path */}
      <div className="absolute -left-3 sm:-left-3 top-8 flex items-center justify-center">
        {/* Outer pulsating glow ring */}
        <div className={`w-8 h-8 rounded-full ${isWork ? 'bg-purple-500/20 border-purple-400' : 'bg-emerald-500/20 border-emerald-400'} border-2 flex items-center justify-center animate-pulse`}>
          <div className={`w-3.5 h-3.5 rounded-full ${isWork ? 'bg-purple-500 shadow-purple-500/50' : 'bg-emerald-500 shadow-emerald-500/50'} shadow-lg`} />
        </div>
      </div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.15 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="p-6 sm:p-8 rounded-2xl card-glass card-glass-hover border border-purple-500/20 dark:border-emerald-500/20 relative shadow-xl overflow-hidden group"
      >
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-800/60" style={{ transform: 'translateZ(18px)' }}>
          <div className="flex items-start sm:items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl ${isWork ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'} border flex items-center justify-center shrink-0`}>
              <Icon size={22} aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isWork ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'}`}>
                  {item.type}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin size={11} />
                  {item.location}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mt-1">
                {item.role}{' '}
                <span className={isWork ? 'text-purple-600 dark:text-purple-400' : 'text-emerald-600 dark:text-emerald-400'}>
                  @ {item.org}
                </span>
              </h3>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                {item.summary}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/20 dark:border-purple-500/30 shrink-0">
            <Calendar size={13} aria-hidden="true" />
            <span>{item.period}</span>
          </div>
        </div>

        {/* Impact Bullets */}
        <div className="mt-5" style={{ transform: 'translateZ(14px)' }}>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
            <Sparkles size={12} className={isWork ? 'text-purple-400' : 'text-emerald-400'} />
            <span>Key Metrics &amp; Engineering Contributions:</span>
          </p>
          <ul className="space-y-3">
            {item.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <TrendingUp
                  size={16}
                  className={`${isWork ? 'text-purple-400' : 'text-emerald-400'} shrink-0 mt-1`}
                  aria-hidden="true"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap gap-2" style={{ transform: 'translateZ(16px)' }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
            >
              <Zap size={11} className={isWork ? 'text-purple-400' : 'text-emerald-400'} aria-hidden="true" />
              <span>{tag}</span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="experience" ref={ref} className="section-pad relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:text-left"
        >
          <span className="section-label">03 — Experience &amp; Education</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Interactive{' '}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Operational impact through automation workflows, API architecture, and rigorous mathematical computing at RGIPT.
          </p>
        </motion.div>

        {/* 3D Timeline Track Container (Purple to Emerald) */}
        <div className="relative space-y-10">
          {/* Glowing Vertical Laser Line */}
          <div className="absolute top-4 bottom-4 left-1 sm:left-1 w-0.5 bg-gradient-to-b from-purple-500 via-fuchsia-500 to-emerald-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]" />

          {TIMELINE_DATA.map((item, i) => (
            <TimelineCard3D key={item.id} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
