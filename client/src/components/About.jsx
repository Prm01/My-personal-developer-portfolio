import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Award, Rocket, GitPullRequest, CheckCircle2 } from 'lucide-react';
import { STATS } from '../data/premiumSections';

const STAT_ICONS = [Code2, Award, Rocket, GitPullRequest];

function AnimatedCounter({ value, inView }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, value, spring]);

  useEffect(() => {
    return display.on('change', (latest) => setVal(latest));
  }, [display]);

  return <span>{val}</span>;
}

function StatCard3D({ stat, index, inView }) {
  const Icon = STAT_ICONS[index] || CheckCircle2;
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      className="p-6 rounded-2xl card-glass card-glass-hover relative group overflow-hidden border border-blue-500/20 dark:border-purple-500/20 shadow-lg"
    >
      {/* Top border accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-80" />

      <div className="flex items-center gap-3.5 mb-3" style={{ transform: 'translateZ(20px)' }}>
        <div className="w-11 h-11 rounded-xl bg-blue-500/10 dark:bg-purple-950/40 border border-blue-500/20 dark:border-purple-500/20 flex items-center justify-center text-blue-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
          <Icon size={22} aria-hidden="true" />
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
          {stat.prefix}
          <AnimatedCounter value={stat.numericValue} inView={inView} />
          {stat.suffix}
        </div>
      </div>

      <div style={{ transform: 'translateZ(14px)' }}>
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          {stat.label}
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {stat.sub}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="about" ref={ref} className="section-pad relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">01 — About</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Driven by Mathematics,{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Engineered for Scale
            </span>
          </h2>
        </motion.div>

        {/* 3-4 line passionate bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl space-y-3"
        >
          <p>
            I am a third-year undergraduate in <strong className="text-slate-900 dark:text-white font-semibold">Mathematics &amp; Computing</strong> at <strong className="text-slate-900 dark:text-white font-semibold">Rajiv Gandhi Institute of Petroleum Technology (RGIPT, 2027)</strong>.
          </p>
          <p>
            I architect high-performance full-stack web platforms, agentic AI systems, and automated data workflows with mathematical precision. My engineering philosophy combines algorithmic rigor with clean systems design to ship reliable, production-ready software.
          </p>
          <p>
            Open Source: contributed to two organizations, Learning Unlimited and Neutralinojs. I thrive in collaborative developer communities and am dedicated to building technology that delivers measurable real-world impact.
          </p>
        </motion.div>

        {/* Animated 3D Quick Stats Grid: 500+ DSA problems, JEE Advanced qualified, 3 major projects, 2 open-source orgs */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <StatCard3D key={stat.id} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
