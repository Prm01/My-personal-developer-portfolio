import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, TrendingUp, Zap, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/premiumSections';

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
          className="mb-10 text-center sm:text-left"
        >
          <span className="section-label">03 — Experience</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Engineering{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Measurable operational improvements through automation workflows, custom developer tooling, and robust API integrations.
          </p>
        </motion.div>

        {/* Experience Timeline Card */}
        <div className="space-y-6">
          {EXPERIENCE_DATA.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl card-glass card-glass-hover border border-blue-500/20 dark:border-purple-500/20 relative"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-purple-950/40 border border-blue-500/20 dark:border-purple-500/20 flex items-center justify-center text-blue-600 dark:text-purple-400 shrink-0">
                    <Briefcase size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                      {exp.role}{' '}
                      <span className="text-blue-600 dark:text-purple-400 font-medium">
                        @ {exp.org}
                      </span>
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                      {exp.summary}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 dark:bg-purple-500/15 text-blue-700 dark:text-purple-300 border border-blue-500/20 dark:border-purple-500/30">
                  <Calendar size={13} aria-hidden="true" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* 3 Impact Bullets */}
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Key Metrics &amp; Engineering Contributions:
                </p>
                <ul className="space-y-3">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <TrendingUp
                        size={16}
                        className="text-blue-500 dark:text-purple-400 shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                  >
                    <Zap size={11} className="text-blue-500 dark:text-purple-400" aria-hidden="true" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
