import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

import SectionShell from './ui/SectionShell';
import TiltCard from './ui/TiltCard';
import Badge from './ui/Badge';
import { PrimaryLink, SecondaryLink } from './ui/Buttons';

import { API_URL } from '../lib/api';
import {
  FALLBACK_PROJECTS_PREMIUM,
  FEATURED_PROJECT_IDS
} from '../data/premiumSections';

function Thumb({ src, title, heightClass = 'h-44' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={`${title} thumbnail`}
        className={`${heightClass} w-full object-cover`}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`${heightClass} w-full bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-rose-500/10 relative`}
    >
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-violet-500/35 to-transparent blur-2xl" />
      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-rose-500/25 to-transparent blur-2xl" />
    </div>
  );
}

function ProjectActions({ github, live }) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {live ? <PrimaryLink href={live}>Live</PrimaryLink> : null}
      {github ? (
        <SecondaryLink href={github} icon="github">
          GitHub
        </SecondaryLink>
      ) : null}
    </div>
  );
}

function ImpactChips({ impact }) {
  const list = Array.isArray(impact) ? impact.filter(Boolean).slice(0, 3) : [];
  if (!list.length) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {list.map((x) => (
        <span
          key={x}
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-gradient-to-r from-violet-500/15 via-fuchsia-500/10 to-rose-500/10 border border-white/10 text-slate-700 dark:text-slate-200"
        >
          {x}
        </span>
      ))}
    </div>
  );
}

function Highlights({ highlights }) {
  const list = Array.isArray(highlights)
    ? highlights.filter(Boolean).slice(0, 3)
    : [];
  if (!list.length) return null;
  return (
    <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
      {list.map((h, idx) => (
        <li key={idx} className="flex gap-3 leading-relaxed">
          <span
            className="mt-2 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 shrink-0"
            aria-hidden
          />
          <span>{h}</span>
        </li>
      ))}
    </ul>
  );
}

function FeaturedProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <TiltCard className="h-full">
        <div className="overflow-hidden rounded-2xl">
          <Thumb src={project.image} title={project.title} heightClass="h-36 md:h-40" />
        </div>
        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl md:text-2xl font-display font-semibold text-slate-900 dark:text-white">
              {project.title}
            </h3>
            <span className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-rose-500/20 border border-white/10 text-slate-700 dark:text-slate-200">
              Featured
            </span>
          </div>

          <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {project.description}
          </p>

          <Highlights highlights={project.highlights} />

          <div className="mt-4 flex flex-wrap gap-2">
            {(project.techStack || []).slice(0, 8).map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          <ImpactChips impact={project.impact} />

          <ProjectActions github={project.github} live={project.live} />
        </div>
      </TiltCard>
    </motion.div>
  );
}

function OtherProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <TiltCard className="h-full">
        <div className="overflow-hidden rounded-2xl">
          <Thumb src={project.image} title={project.title} heightClass="h-32" />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-display font-semibold text-slate-900 dark:text-white">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>
          <ImpactChips impact={project.impact} />
          <div className="mt-4 flex flex-wrap gap-2">
            {(project.techStack || []).slice(0, 6).map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <ProjectActions github={project.github} live={project.live} />
        </div>
      </TiltCard>
    </motion.div>
  );
}

function pickTopProjects(list) {
  const projects = Array.isArray(list) ? list : [];
  const curated = projects.filter(Boolean).slice(0, 6);
  return curated.length ? curated : FALLBACK_PROJECTS_PREMIUM;
}

function isFeatured(project) {
  if (project?.featured) return true;
  if (FEATURED_PROJECT_IDS?.length && project?._id) {
    return FEATURED_PROJECT_IDS.includes(project._id);
  }
  return false;
}

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS_PREMIUM);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setProjects(pickTopProjects(data)))
      .catch(() => setProjects(FALLBACK_PROJECTS_PREMIUM))
      .finally(() => setLoading(false));
  }, []);

  const techOptions = useMemo(() => {
    const set = new Set(['All']);
    projects.forEach((p) => (p.techStack || []).forEach((t) => set.add(t)));
    return Array.from(set);
  }, [projects]);

  const curated = useMemo(() => pickTopProjects(projects), [projects]);

  const filtered = useMemo(() => {
    if (filter === 'All') return curated;
    return curated.filter((p) => (p.techStack || []).some((t) => t === filter));
  }, [curated, filter]);

  const featured = filtered.filter(isFeatured).slice(0, 3);
  const others = filtered.filter((p) => !isFeatured(p)).slice(0, 6 - featured.length);

  return (
    <SectionShell
      id="projects"
      label="03 — Work"
      title="Projects that ship value"
      subtitle="A curated set of work I’m proud of — built with clean systems, thoughtful UX, and production-minded engineering."
      className="bg-white dark:bg-slate-900/30"
    >
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <Filter size={18} className="text-slate-500 dark:text-slate-400" />
        {techOptions.map((tech) => (
          <motion.button
            key={tech}
            onClick={() => setFilter(tech)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              filter === tech
                ? 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 text-white shadow-lg'
                : 'bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-violet-300/70 dark:hover:border-violet-500/30'
            }`}
          >
            {tech}
          </motion.button>
        ))}
      </div>

      {loading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-[420px] rounded-2xl bg-slate-200/60 dark:bg-slate-800/40 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((p, i) => (
              <FeaturedProjectCard
                key={p._id || p.title}
                project={p}
                index={i}
              />
            ))}
          </div>

          {others.length ? (
            <>
              <div className="mt-14 mb-6 flex items-end justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Other Projects
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                    Smaller builds, experiments, and focused implementations.
                  </p>
                </div>
                <div className="hidden sm:block text-xs text-slate-500 dark:text-slate-500">
                  Hover for depth • Scroll for motion
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {others.map((p, i) => (
                  <OtherProjectCard
                    key={p._id || p.title}
                    project={p}
                    index={i}
                  />
                ))}
              </div>
            </>
          ) : null}
        </>
      )}
    </SectionShell>
  );
}
