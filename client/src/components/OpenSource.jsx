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
            <span className="bg-gradient-to-r from-purple-500 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
              Community Impact
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
            Open Source: contributed to two organizations, Learning Unlimited and Neutralinojs, with clean commits, structured PR reviews, and proactive community collaboration.
          </p>
        </motion.div>

        {/* Open Source Milestone Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="p-6 sm:p-7 rounded-2xl border border-purple-500/30 bg-purple-500/5 dark:bg-purple-950/20 backdrop-blur-xl mb-10 relative overflow-hidden shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles size={20} aria-hidden="true" />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-600/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 mb-1">
                {OPEN_SOURCE_DATA.highlightNote.badge}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                {OPEN_SOURCE_DATA.highlightNote.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {OPEN_SOURCE_DATA.highlightNote.text}
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
              className="p-6 sm:p-7 rounded-2xl card-glass card-glass-hover border border-purple-500/20 dark:border-emerald-500/20 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      {item.type}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mt-0.5">
                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-purple-600 dark:hover:text-purple-400 inline-flex items-center gap-1.5 transition-colors group/title"
                        aria-label={`Open ${item.name} repository on GitHub`}
                      >
                        <span>{item.name}</span>
                        <ExternalLink size={16} className="text-slate-400 dark:text-slate-500 group-hover/title:text-purple-600 dark:group-hover/title:text-purple-400 transition-colors" />
                      </a>
                    </h3>
                  </div>
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-950/40 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 hover:scale-105 transition-transform shrink-0"
                    aria-label={`GitHub repository for ${item.name}`}
                  >
                    <Github size={20} aria-hidden="true" />
                  </a>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2.5">
                  {item.pullRequests.map((pr) => {
                    const isMerged = pr.status.toLowerCase().includes('merged');
                    return (
                      <li
                        key={pr.number}
                        className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 flex items-start justify-between gap-3 text-xs sm:text-sm"
                      >
                        <div className="flex-1 leading-snug">
                          <a
                            href={pr.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors inline"
                          >
                            <span className="font-bold text-purple-600 dark:text-purple-400">PR #{pr.number}</span>
                            <span className="text-slate-400 dark:text-slate-500"> — </span>
                            <span className="group-hover:underline">{pr.title}</span>
                            {pr.note && <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal ml-1">({pr.note})</span>}
                            <ExternalLink size={12} className="inline-block ml-1 opacity-60" aria-hidden="true" />
                          </a>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                            isMerged
                              ? 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30'
                              : 'bg-amber-400/15 dark:bg-yellow-400/15 text-amber-800 dark:text-yellow-300 border-amber-400/40 dark:border-yellow-400/30'
                          }`}
                        >
                          {pr.status}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-3">
                <a
                  href={item.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent flex-1 !py-2 text-xs font-semibold"
                  aria-label={`View Pull Requests by Pramod for ${item.name}`}
                >
                  <GitPullRequest size={14} aria-hidden="true" />
                  <span>View PRs</span>
                </a>
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !py-2 text-xs font-semibold"
                  aria-label={`Open repository for ${item.name} on GitHub`}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  <span>Repository</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live GitHub Contribution Chart & Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 sm:p-7 rounded-2xl card-glass border border-purple-500/20 dark:border-emerald-500/20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Github size={20} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  GitHub Contribution Activity
                </h3>
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                >
                  <span>github.com/{PROFILE.githubUsername}</span>
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Quick API Stats */}
            {profile && (
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <GitFork size={13} className="text-emerald-500" aria-hidden="true" />
                  <span>{formatNumber(profile.public_repos)} Public Repos</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <Users size={13} className="text-purple-400" aria-hidden="true" />
                  <span>{formatNumber(profile.followers)} Followers</span>
                </div>
              </div>
            )}
          </div>

          {/* GitHub Activity Heatmap Image (Purple theme) */}
          <div className="overflow-x-auto rounded-xl p-3 bg-slate-900/60 border border-slate-800 flex justify-center">
            <img
              src={`https://ghchart.rshah.org/a855f7/${PROFILE.githubUsername}`}
              alt={`Pramod Yadav (${PROFILE.githubUsername}) GitHub Contribution Heatmap`}
              className="max-w-none sm:max-w-full h-auto"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
