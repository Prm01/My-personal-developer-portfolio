import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Trophy, Code2, Star, Sparkles } from 'lucide-react';
import { AWARDS } from '../data/premiumSections';

const ICONS = [Trophy, Code2, Star];
const COLORS = [
  { from: 'from-violet-500', to: 'to-fuchsia-500', glow: 'rgba(139,92,246,0.5)', light: 'bg-violet-50 dark:bg-violet-900/20', border: 'border-violet-200/60 dark:border-violet-500/20' },
  { from: 'from-fuchsia-500', to: 'to-rose-500', glow: 'rgba(217,70,239,0.5)', light: 'bg-fuchsia-50 dark:bg-fuchsia-900/20', border: 'border-fuchsia-200/60 dark:border-fuchsia-500/20' },
  { from: 'from-rose-500', to: 'to-orange-500', glow: 'rgba(244,63,94,0.5)', light: 'bg-rose-50 dark:bg-rose-900/20', border: 'border-rose-200/60 dark:border-rose-500/20' },
];

function Particle({ color }) {
  const angle = Math.random() * 360;
  const dist = 30 + Math.random() * 40;
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full"
      style={{ background: color, top: '50%', left: '50%' }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos((angle * Math.PI) / 180) * dist,
        y: Math.sin((angle * Math.PI) / 180) * dist,
        opacity: 0,
        scale: 0,
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    />
  );
}

function AwardCard({ award, index, inView }) {
  const Icon = ICONS[index % ICONS.length];
  const color = COLORS[index % COLORS.length];
  const [burst, setBurst] = useState(false);
  const [particles, setParticles] = useState([]);
  const cardRef = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) / r.width);
    my.set((e.clientY - r.top - r.height / 2) / r.height);
  };

  const triggerBurst = () => {
    setParticles(Array.from({ length: 10 }, (_, i) => i));
    setBurst(true);
    setTimeout(() => { setParticles([]); setBurst(false); }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        onMouseEnter={triggerBurst}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className="relative group cursor-default"
      >
        {/* Glow */}
        <motion.div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
          style={{ background: `radial-gradient(circle, ${color.glow} 0%, transparent 70%)` }}
        />

        <div className="relative rounded-2xl border border-slate-200/80 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-7 text-center overflow-hidden">
          {/* Animated mesh background */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className={`absolute inset-0 bg-gradient-to-br ${color.from}/5 ${color.to}/5`} />
          </div>

          {/* Icon with orbit ring */}
          <div className="relative w-16 h-16 mx-auto mb-5">
            {/* Orbit ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-violet-300/40 dark:border-violet-500/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 rounded-full border border-dashed border-fuchsia-300/20 dark:border-fuchsia-500/10"
            />

            {/* Particle burst */}
            {particles.map((p) => (
              <Particle key={p} color={color.glow} />
            ))}

            <motion.div
              whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
              className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${color.from} ${color.to} flex items-center justify-center text-white shadow-lg`}
              style={{ boxShadow: burst ? `0 0 30px ${color.glow}` : undefined }}
            >
              <Icon size={28} />
            </motion.div>
          </div>

          <h3 className="font-display font-bold text-slate-900 dark:text-white mb-2 text-lg leading-tight">
            {award.title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            {award.desc}
          </p>

          {/* Bottom shimmer bar */}
          <motion.div
            className={`mt-5 h-0.5 rounded-full bg-gradient-to-r ${color.from} ${color.to} mx-auto`}
            initial={{ width: 0 }}
            animate={inView ? { width: '60%' } : {}}
            transition={{ delay: index * 0.12 + 0.5, duration: 0.8 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Awards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="awards" ref={ref} className="section-pad relative overflow-hidden bg-white dark:bg-slate-900/30">
      {/* Floating dots bg */}
      <div className="grid-dots absolute inset-0 opacity-30 pointer-events-none" aria-hidden />

      {/* Ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl pointer-events-none"
      />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="section-label"
          >
            06 — Recognition
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">
            <span className="gradient-text">Awards</span>
            <span className="text-slate-900 dark:text-white"> & Achievements</span>
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-3 flex items-center gap-2 text-slate-500 dark:text-slate-400"
          >
            <Sparkles size={16} className="text-violet-400" />
            <span className="text-sm">Milestones that define the journey</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {AWARDS.map((award, i) => (
            <AwardCard key={award.id} award={award} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
