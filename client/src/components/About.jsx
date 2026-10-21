import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Award, Rocket, CheckCircle2 } from 'lucide-react';
import { STATS } from '../data/premiumSections';

const STAT_ICONS = [Code2, Award, Rocket];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="about" ref={ref} className="section-pad relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">01 — About</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Driven by Mathematics,{' '}
            <span className="text-violet-600 dark:text-violet-400">
              Engineered for Scale
            </span>
          </h2>
        </motion.div>

        {/* 3-4 line concise bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl space-y-3"
        >
          <p>
            I am a third-year undergraduate in <strong className="text-slate-900 dark:text-white font-semibold">Mathematics &amp; Computing</strong> at <strong className="text-slate-900 dark:text-white font-semibold">Rajiv Gandhi Institute of Petroleum Technology (RGIPT, 2027)</strong>.
          </p>
          <p>
            I specialize in architecting full-stack web platforms, agentic AI systems, and automated data pipelines. My engineering focuses on algorithmic depth, low-latency execution, and production stability under real-world constraints.
          </p>
          <p>
            Targeting high-impact engineering internships and GSoC 2026, I build systems that deliver measurable business and operational value.
          </p>
        </motion.div>

        {/* Quick Stats Grid: 500+ DSA problems, JEE Advanced qualified, 3 major projects */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {STATS.map((stat, i) => {
            const Icon = STAT_ICONS[i] || CheckCircle2;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                className="p-6 rounded-2xl card-glass card-glass-hover relative group overflow-hidden"
              >
                {/* Subtle top border accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-violet-600 dark:bg-violet-500 opacity-80" />
                
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 dark:bg-violet-950/40 border border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                    {stat.value}
                  </span>
                </div>
                
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {stat.label}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {stat.sub}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
