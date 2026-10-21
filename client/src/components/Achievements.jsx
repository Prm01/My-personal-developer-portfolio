import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Trophy, Users, CheckCircle2 } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../data/premiumSections';

const ACHIEVEMENT_ICONS = [Trophy, Award, Users];

export default function Achievements() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="achievements" ref={ref} className="section-pad relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-label">06 — Recognition</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Honors &amp;{' '}
            <span className="text-violet-600 dark:text-violet-400">
              Achievements
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
            National competitive milestones, collegiate academic scholarships, and technical leadership roles.
          </p>
        </motion.div>

        {/* 3 Main Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACHIEVEMENTS_DATA.map((item, index) => {
            const Icon = ACHIEVEMENT_ICONS[index] || Trophy;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 sm:p-7 rounded-2xl card-glass card-glass-hover border border-slate-200/90 dark:border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-violet-600/10 dark:bg-violet-950/40 border border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 size={13} aria-hidden="true" /> Verified Academic Milestone
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
