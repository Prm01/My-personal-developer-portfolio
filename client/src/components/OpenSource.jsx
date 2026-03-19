import { motion } from 'framer-motion';
import { Github, Star, GitFork, Activity, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import SectionShell from './ui/SectionShell';
import TiltCard from './ui/TiltCard';
import Badge from './ui/Badge';
import { SecondaryLink } from './ui/Buttons';
import { PROFILE } from '../lib/profile';
import { OSS_HIGHLIGHTS } from '../data/premiumSections';

function StatPill({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-slate-800/60 px-4 py-3">
      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-rose-500/10 flex items-center justify-center">
        <Icon size={18} className="text-violet-600 dark:text-violet-300" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-500">
          {label}
        </p>
        <p className="text-sm font-bold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function ContributionCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <TiltCard className="h-full p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-display font-semibold text-slate-900 dark:text-white">
              {item.repo}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {item.description}
            </p>
          </div>
          <div className="shrink-0 h-10 w-10 rounded-2xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-rose-500/10 flex items-center justify-center">
            <Github size={18} className="text-slate-700 dark:text-slate-200" />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(item.tech || []).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        {item.url ? (
          <div className="mt-5">
            <SecondaryLink href={item.url} icon="github">
              View repo
            </SecondaryLink>
          </div>
        ) : null}
      </TiltCard>
    </motion.div>
  );
}

function formatNum(n) {
  if (typeof n !== 'number') return '—';
  return Intl.NumberFormat('en', { notation: 'compact' }).format(n);
}

function GitHubMedia({ username }) {
  const u = encodeURIComponent(username || '');
  const [profile, setProfile] = useState(null);
  const [contribs, setContribs] = useState(null);

  useEffect(() => {
    if (!username) return;
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setProfile(d))
      .catch(() => setProfile(null));

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setContribs(d?.total?.lastYear ?? null))
      .catch(() => setContribs(null));
  }, [username]);

  const repoCount = useMemo(() => profile?.public_repos ?? null, [profile]);
  const followers = useMemo(() => profile?.followers ?? null, [profile]);
  const starsLabel = 'Live';

  const stats = `https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=transparent&hide_border=true&title_color=8b5cf6&text_color=cbd5e1&icon_color=c084fc&ring_color=f43f5e`;
  const streak = `https://streak-stats.demolab.com?user=${u}&theme=transparent&hide_border=true&ring=8b5cf6&fire=f43f5e&currStreakLabel=c084fc&sideLabels=cbd5e1&dates=94a3b8`;
  const heatmap = `https://ghchart.rshah.org/8b5cf6/${u}`;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TiltCard className="p-5 md:p-6">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          GitHub stats
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
          Live cards powered by public GitHub endpoints.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <StatPill icon={GitFork} label="Total repos" value={formatNum(repoCount)} />
          <StatPill icon={Users} label="Followers" value={formatNum(followers)} />
          <StatPill icon={Activity} label="Contributions (last year)" value={formatNum(contribs)} />
          <StatPill icon={Star} label="Stars" value={starsLabel} />
          <StatPill icon={Github} label="Profile" value={`@${username}`} />
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-black/10">
          <img
            src={stats}
            alt="GitHub stats card"
            className="w-full"
            loading="lazy"
          />
        </div>
      </TiltCard>

      <TiltCard className="p-5 md:p-6">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Contribution rhythm
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
          Consistency, iteration, and shipping frequency.
        </p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-black/10">
          <img
            src={streak}
            alt="GitHub streak card"
            className="w-full"
            loading="lazy"
          />
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-black/10 p-3">
          <img
            src={heatmap}
            alt="GitHub contributions heatmap"
            className="w-full"
            loading="lazy"
          />
        </div>
      </TiltCard>
    </div>
  );
}

function OpenSourceJourney() {
  return (
    <TiltCard className="p-7 md:p-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-500">
          Open Source Journey
        </p>
        <h3 className="mt-2 text-2xl md:text-3xl font-display font-semibold text-slate-900 dark:text-white">
          I contribute to learn in public — and to earn trust.
        </h3>
        <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          My best work happens where feedback loops are real: issues, PR reviews,
          and collaboration. Open source gives me a high-signal environment to
          sharpen engineering habits — clean commits, readable changes, and
          shipping improvements that help others.
        </p>
        <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          I’m especially interested in programs like <span className="text-slate-900 dark:text-white font-semibold">GSoC</span> because they
          reward consistency, communication, and long-horizon delivery — the same
          traits required for real product work.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge>PR Reviews</Badge>
          <Badge>Documentation</Badge>
          <Badge>DX Improvements</Badge>
          <Badge>Collaboration</Badge>
        </div>
      </div>
    </TiltCard>
  );
}

export default function OpenSource() {
  return (
    <SectionShell
      id="open-source"
      label="05 — Community"
      title="Open Source & Contributions"
      subtitle="Signals over noise: contributions that show consistency, collaboration, and a bias for shipping improvements."
      className="bg-white dark:bg-slate-900/30"
    >
      <GitHubMedia username={PROFILE.githubUsername} />

      <div className="mt-14">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Highlight contributions
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
              The repos where I’ve meaningfully contributed or collaborated.
            </p>
          </div>
          <a
            href={`https://github.com/${PROFILE.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-violet-600 dark:text-violet-300 hover:underline"
          >
            <Github size={14} />
            View GitHub
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {OSS_HIGHLIGHTS.map((r, i) => (
            <ContributionCard key={r.id} item={r} index={i} />
          ))}
        </div>
      </div>

      <div className="mt-14">
        <OpenSourceJourney />
      </div>
    </SectionShell>
  );
}

