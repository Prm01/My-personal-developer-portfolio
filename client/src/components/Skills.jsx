import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layout, Server, Cloud, Cpu, Code2, CheckCircle2 } from 'lucide-react';
import { SKILL_GROUPS } from '../data/premiumSections';

const ICON_MAP = {
  Layout: Layout,
  Server: Server,
  Cloud: Cloud,
  Cpu: Cpu,
  Code2: Code2
};

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" ref={ref} className="section-pad relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-label">04 — Technical Arsenal</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Core Competencies &amp;{' '}
            <span className="text-violet-600 dark:text-violet-400">
              Stack
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
            A comprehensive overview of frameworks, cloud services, and machine learning toolchains utilized across production builds.
          </p>
        </motion.div>

        {/* 5 Grouped Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, index) => {
            const IconComponent = ICON_MAP[group.iconName] || Code2;
            const isFullWidthOnMd = index === 4; // Languages on bottom
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`p-6 rounded-2xl card-glass card-glass-hover border border-slate-200/90 dark:border-slate-800/80 flex flex-col justify-between ${
                  isFullWidthOnMd ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-violet-600/10 dark:bg-violet-950/40 border border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
                      <IconComponent size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                        {group.category}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {group.skills.length} core technologies
                      </span>
                    </div>
                  </div>

                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 hover:border-violet-500/50 hover:text-violet-600 dark:hover:text-violet-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 size={13} aria-hidden="true" /> Verified in projects
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
