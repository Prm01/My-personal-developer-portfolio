import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Code2, Layout, Database, Wrench, Layers } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'lang',
    label: 'Languages',
    icon: Code2,
    color: 'from-violet-500 to-fuchsia-500',
    glow: 'rgba(139,92,246,0.4)',
    items: [
      { name: 'Python', weight: 3 },
      { name: 'JavaScript', weight: 3 },
      { name: 'C++', weight: 2 },
      { name: 'SQL', weight: 2 },
    ]
  },
  {
    id: 'fw',
    label: 'Frameworks',
    icon: Layout,
    color: 'from-fuchsia-500 to-rose-500',
    glow: 'rgba(217,70,239,0.4)',
    items: [
      { name: 'React.js', weight: 3 },
      { name: 'Node.js', weight: 3 },
      { name: 'Express.js', weight: 2 },
      { name: 'Tailwind CSS', weight: 2 },
      { name: 'HTML5', weight: 2 },
      { name: 'CSS3', weight: 2 },
      { name: 'Bootstrap', weight: 1 },
    ]
  },
  {
    id: 'db',
    label: 'Databases',
    icon: Database,
    color: 'from-rose-500 to-orange-500',
    glow: 'rgba(244,63,94,0.4)',
    items: [
      { name: 'MongoDB', weight: 3 },
      { name: 'MySQL', weight: 2 },
      { name: 'PostgreSQL', weight: 2 },
    ]
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: Wrench,
    color: 'from-orange-500 to-amber-500',
    glow: 'rgba(249,115,22,0.4)',
    items: [
      { name: 'Git', weight: 3 },
      { name: 'GitHub', weight: 3 },
      { name: 'Docker', weight: 2 },
      { name: 'Playwright', weight: 2 },
      { name: 'Postman', weight: 2 },
      { name: 'VS Code', weight: 2 },
      { name: 'GitHub Actions', weight: 2 },
      { name: 'CI/CD', weight: 1 },
      { name: 'GitLab', weight: 1 },
      { name: 'Jira', weight: 1 },
    ]
  },
];

const SIZE_MAP = { 1: 'text-xs px-2.5 py-1', 2: 'text-sm px-3 py-1.5', 3: 'text-base px-4 py-2 font-semibold' };

function OrbitRing({ color, size, duration, items }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 rounded-full"
      style={{ width: size, height: size, top: '50%', left: '50%', marginTop: -size / 2, marginLeft: -size / 2 }}
    >
      {items.map((item, i) => {
        const angle = (i / items.length) * 360;
        const rad = (angle * Math.PI) / 180;
        const r = size / 2;
        return (
          <motion.div
            key={item}
            animate={{ rotate: -360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
            className="absolute text-[10px] font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px) translate(-50%, -50%)`
            }}
          >
            {item}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function TagBadge({ item, index, inView, color, glow }) {
  const [hovered, setHovered] = useState(false);
  const sizeClass = SIZE_MAP[item.weight] || SIZE_MAP[1];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6, y: 10 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.12, y: -3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`inline-flex items-center rounded-xl font-medium cursor-default transition-all duration-200 ${sizeClass} ${
        hovered
          ? `bg-gradient-to-r ${color} text-white shadow-lg`
          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60'
      }`}
      style={hovered ? { boxShadow: `0 4px 20px -4px ${glow}` } : {}}
    >
      {item.name}
    </motion.span>
  );
}

function CategoryPanel({ cat, inView }) {
  const Icon = cat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl border border-slate-200/80 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl overflow-hidden p-6 md:p-8"
    >
      {/* Top bar */}
      <motion.div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.color}`}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-md`}>
          <Icon size={20} />
        </div>
        <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg">{cat.label}</h3>
        <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 font-medium">
          {cat.items.length} skills
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {cat.items.map((item, i) => (
          <TagBadge key={item.name} item={item} index={i} inView={inView} color={cat.color} glow={cat.glow} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const [active, setActive] = useState('all');

  const displayed = active === 'all' ? CATEGORIES : CATEGORIES.filter(c => c.id === active);

  return (
    <section id="skills" ref={ref} className="section-pad relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-40 pointer-events-none" aria-hidden />

      {/* Ambient orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none"
      />

      <div className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="section-label"
          >
            02 — Skills
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">
            <span className="gradient-text">Technical</span>
            <span className="text-slate-900 dark:text-white"> Arsenal</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-3 text-slate-500 dark:text-slate-400 max-w-lg"
          >
            Tools and technologies I use to build production-grade software.
          </motion.p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {[{ id: 'all', label: 'All', icon: Layers }, ...CATEGORIES].map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 hover:border-violet-300/60 dark:hover:border-violet-500/30'
                }`}
              >
                {Icon && <Icon size={14} />} {tab.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Panels */}
        <AnimatePresence mode="wait">
          <div key={active} className={`grid gap-5 ${active === 'all' ? 'md:grid-cols-2' : 'max-w-2xl'}`}>
            {displayed.map((cat) => (
              <CategoryPanel key={cat.id} cat={cat} inView={inView} />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}
