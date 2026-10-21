import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Filter, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../data/premiumSections';

const FILTER_TABS = ['All', 'Full Stack', 'AI', 'Backend'];

function TiltCard3D({ children, className = '' }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      className={`relative group rounded-2xl transition-shadow duration-300 ${className}`}
    >
      {/* Specular spotlight glow on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
        style={{
          background: `radial-gradient(420px circle at ${glowX} ${glowY}, rgba(56, 189, 248, 0.28), rgba(168, 85, 247, 0.18), transparent 70%)`
        }}
      />
      {children}
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="h-full"
    >
      <TiltCard3D className="h-full rounded-2xl card-glass border border-blue-500/20 dark:border-purple-500/20 group-hover:border-blue-400/50 dark:group-hover:border-purple-400/50 overflow-hidden flex flex-col shadow-xl">
        {/* Screenshot / Preview with floating 3D popout */}
        <div
          className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80"
          style={{ transform: 'translateZ(30px)' }}
        >
          <img
            src={project.image}
            alt={`${project.title} preview screenshot`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width="800"
            height="450"
          />
          <div className="absolute top-3 right-3 flex gap-1.5" style={{ transform: 'translateZ(38px)' }}>
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/85 backdrop-blur-md text-blue-300 border border-blue-500/30"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Card Content with depth layers */}
        <div className="p-6 flex flex-col flex-1" style={{ transform: 'translateZ(18px)' }}>
          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>

          {/* One-line Problem */}
          <div
            className="mt-3 p-3 rounded-xl bg-slate-100/90 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
            style={{ transform: 'translateZ(22px)' }}
          >
            <span className="font-semibold text-blue-600 dark:text-blue-400 block mb-0.5">
              Problem:
            </span>
            {project.problem}
          </div>

          {/* 3 Bullet Outcomes */}
          <div className="mt-4 flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Engineering Outcomes:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {project.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <CheckCircle2
                    size={15}
                    className="text-blue-500 dark:text-purple-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Chips */}
          <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="flex flex-wrap gap-1.5" style={{ transform: 'translateZ(24px)' }}>
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
          <div className="mt-6 pt-2 flex flex-wrap gap-2.5" style={{ transform: 'translateZ(28px)' }}>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent flex-1 !py-2.5 text-xs font-semibold"
                aria-label={`Open live application for ${project.title}`}
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
                className="btn-secondary !py-2.5 text-xs font-semibold"
                aria-label={`View source code for ${project.title} on GitHub`}
              >
                <Github size={14} aria-hidden="true" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </TiltCard3D>
    </motion.article>
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState('All');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const filteredProjects = useMemo(() => {
    if (activeTab === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(activeTab));
  }, [activeTab]);

  return (
    <section id="projects" ref={ref} className="section-pad relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="section-label">02 — Featured Work</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
              Featured{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
              Architecting mission-critical AI pipelines, distributed warning systems, and accessible full-stack applications.
            </p>
          </div>

          {/* Filter Tabs (All / Full Stack / AI / Backend) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-slate-900/80 border border-slate-300/60 dark:border-slate-800/80 backdrop-blur-md self-start md:self-auto">
            <Filter size={15} className="ml-2 mr-1 text-slate-400 hidden sm:inline" aria-hidden="true" />
            {FILTER_TABS.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
