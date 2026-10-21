import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Filter, CheckCircle2, AlertCircle } from 'lucide-react';
import { PROJECTS } from '../data/premiumSections';

const FILTER_TABS = ['All', 'Full Stack', 'AI', 'Backend'];

function ProjectCard({ project, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="rounded-2xl card-glass card-glass-hover overflow-hidden flex flex-col h-full border border-slate-200/90 dark:border-slate-800/80"
    >
      {/* Screenshot / Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-slate-200 dark:border-slate-800/80">
        <img
          src={project.image}
          alt={`${project.title} preview screenshot`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          width="800"
          height="450"
        />
        <div className="absolute top-3 right-3 flex gap-1.5">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/80 backdrop-blur-md text-violet-300 border border-violet-500/30"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
          {project.title}
        </h3>

        {/* One-line Problem */}
        <div className="mt-3 p-3 rounded-xl bg-slate-100/80 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <span className="font-semibold text-violet-600 dark:text-violet-400 block mb-0.5">
            Problem:
          </span>
          {project.problem}
        </div>

        {/* 3 Bullet Outcomes */}
        <div className="mt-4 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Impact &amp; Engineering Outcomes:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {project.outcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <CheckCircle2
                  size={15}
                  className="text-violet-600 dark:text-violet-400 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Chips */}
        <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Live and GitHub Action Buttons */}
        <div className="mt-6 pt-2 flex flex-wrap gap-2.5">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent flex-1 !py-2.5 text-xs font-semibold"
              aria-label={`View Live Deployment of ${project.title}`}
            >
              <ExternalLink size={14} aria-hidden="true" />
              <span>Live Demo</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex-1 !py-2.5 text-xs font-semibold"
              aria-label={`View GitHub Repository for ${project.title}`}
            >
              <Github size={14} aria-hidden="true" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeTab === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(activeTab));
  }, [activeTab]);

  return (
    <section id="projects" ref={ref} className="section-pad relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <span className="section-label">02 — Featured Projects</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
              Production Systems &amp;{' '}
              <span className="text-violet-600 dark:text-violet-400">
                AI Architectures
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
              High-concurrency full-stack platforms and agentic pipelines built with measurable latency reductions, rigorous testing, and resilient deployments.
            </p>
          </div>

          {/* Filter Tabs: All / Full Stack / AI / Backend */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl card-glass border border-slate-200 dark:border-slate-800 self-start md:self-end">
            <Filter size={15} className="ml-2 text-slate-400 hidden sm:block" aria-hidden="true" />
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  aria-pressed={isActive}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
