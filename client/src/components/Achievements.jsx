import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Trophy, Users, CheckCircle2, Code2, ExternalLink, Terminal } from 'lucide-react';
import { ACHIEVEMENTS_DATA, CODING_PROFILES } from '../data/premiumSections';

const ACHIEVEMENT_ICONS = [Trophy, Award, Users];

export default function Achievements() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

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
          <span className="section-label">06 — Profiles &amp; Honors</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Coding Profiles &amp;{' '}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
            Algorithmic problem-solving across competitive programming platforms, national milestones, and collegiate leadership.
          </p>
        </motion.div>

        {/* Part 1: Coding Profiles (CodeChef, Codeforces, GeeksforGeeks) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <Terminal size={18} className="text-purple-400" />
              <span>Competitive Programming Profiles</span>
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
              500+ DSA Problems Solved
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CODING_PROFILES.map((profile, idx) => (
              <motion.a
                key={profile.id}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-5 rounded-2xl card-glass card-glass-hover border border-purple-500/20 dark:border-emerald-500/20 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform">
                        <Code2 size={18} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white font-display group-hover:text-purple-400 transition-colors">
                          {profile.platform}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          @{profile.handle}
                        </span>
                      </div>
                    </div>
                    <ExternalLink size={15} className="text-slate-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                    {profile.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
                  <span>View Public Profile</span>
                  <span>→</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Part 2: Honors & Achievements (JEE Main & Advanced, Scholarship, GDSC) */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2 mb-4">
            <Trophy size={18} className="text-emerald-400" />
            <span>Honors &amp; Recognized Milestones</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACHIEVEMENTS_DATA.map((item, index) => {
              const Icon = ACHIEVEMENT_ICONS[index] || Trophy;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="p-6 sm:p-7 rounded-2xl card-glass card-glass-hover border border-purple-500/20 dark:border-emerald-500/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-purple-500/10 dark:bg-purple-950/40 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                        <Icon size={22} aria-hidden="true" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display leading-snug">
                      {item.title}
                    </h4>
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
      </div>
    </section>
  );
}
