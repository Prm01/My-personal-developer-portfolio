import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, GitPullRequest, ExternalLink, Sparkles, GitFork, Users } from 'lucide-react';
import { OPEN_SOURCE_DATA } from '../data/premiumSections';
import { PROFILE } from '../lib/profile';

function formatNumber(n) {
  if (typeof n !== 'number') return '—';
  return Intl.NumberFormat('en', { notation: 'compact' }).format(n);
}

export default function OpenSource() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${PROFILE.githubUsername}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setProfile(data))
      .catch(() => setProfile(null));
  }, []);

  return (
    <section id="open-source" ref={ref} className="section-pad relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-label">05 — Community &amp; Open Source</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Open Source &amp;{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {OPEN_SOURCE_DATA.headline}
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
            Contributing to real-world software with clean commits, structured PR reviews, and proactive community collaboration.
          </p>
        </motion.div>

        {/* GSoC Banner Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="p-6 sm:p-7 rounded-2xl border border-purple-500/30 bg-purple-500/5 dark:bg-purple-950/20 backdrop-blur-xl mb-10 relative overflow-hidden"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles size={20} aria-hidden="true" />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-600/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 mb-1">
                {OPEN_SOURCE_DATA.gsocNote.badge}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                {OPEN_SOURCE_DATA.gsocNote.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {OPEN_SOURCE_DATA.gsocNote.text}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Highlighted Contributions: Neutralinojs & Learning Unlimited */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {OPEN_SOURCE_DATA.contributions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 sm:p-7 rounded-2xl card-glass card-glass-hover border border-blue-500/20 dark:border-purple-500/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-purple-400">
                      {item.type}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mt-0.5">
                      {item.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-purple-950/40 border border-blue-500/20 dark:border-purple-500/20 flex items-center justify-center text-blue-600 dark:text-purple-400 shrink-0">
                    <Github size={20} aria-hidden="true" />
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links: PRs link & Repository */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap gap-3">
                <a
                  href={item.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent !py-2 !px-3.5 text-xs font-semibold"
                  aria-label={`View Pull Requests for ${item.name}`}
                >
                  <GitPullRequest size={14} aria-hidden="true" />
                  <span>View PRs &amp; Commits</span>
                </a>
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !py-2 !px-3.5 text-xs font-semibold"
                  aria-label={`View Repository for ${item.name}`}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  <span>Repository</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Contribution Graph & Activity */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="p-6 sm:p-7 rounded-2xl card-glass border border-blue-500/20 dark:border-purple-500/20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                GitHub Contribution Rhythm
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Live commit rhythm and repositories on <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-purple-400 font-semibold underline">github.com/{PROFILE.githubUsername}</a>
              </p>
            </div>

            {/* Quick Stat Chips */}
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <GitFork size={13} className="text-blue-500" aria-hidden="true" />
                <span>{formatNumber(profile?.public_repos || 25)} Repos</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <Users size={13} className="text-purple-500" aria-hidden="true" />
                <span>{formatNumber(profile?.followers || 12)} Followers</span>
              </div>
            </div>
          </div>

          {/* Contribution Heatmap Card */}
          <div className="overflow-x-auto p-4 rounded-xl bg-slate-950 border border-slate-800">
            <img
              src={`https://ghchart.rshah.org/38bdf8/${PROFILE.githubUsername}`}
              alt={`${PROFILE.name}'s GitHub Contribution Chart`}
              className="w-full min-w-[650px] filter saturate-150 contrast-125"
              loading="lazy"
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
            <span>Data synced directly with GitHub public commits</span>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-500 dark:text-purple-400 font-semibold hover:underline"
            >
              <span>Explore all repositories</span>
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
