import { motion } from 'framer-motion';
import { Award, Code2, Trophy } from 'lucide-react';

import SectionShell from './ui/SectionShell';
import TiltCard from './ui/TiltCard';
import Badge from './ui/Badge';
import { HACKATHONS } from '../data/premiumSections';

function getIcon(name) {
  if (name === 'award') return Award;
  if (name === 'code') return Code2;
  return Trophy;
}

function HackathonCard({ item, index }) {
  const Icon = getIcon(item.icon);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="hidden lg:block absolute -left-6 top-8 bottom-8 w-px bg-gradient-to-b from-violet-500/0 via-violet-500/40 to-rose-500/0" />
      <div className="hidden lg:block absolute -left-[34px] top-9 h-4 w-4 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 shadow-[0_0_0_6px_rgba(139,92,246,0.12)]" />

      <TiltCard className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-500">
              {item.dateLabel}
            </p>
            <h3 className="mt-2 text-xl md:text-2xl font-display font-semibold text-slate-900 dark:text-white">
              {item.name}
            </h3>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-2">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-violet-500/15 border border-white/10 text-slate-700 dark:text-slate-200">
              <Icon size={14} className="text-amber-500" />
              {item.result}
            </div>
            {item.badge ? (
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold bg-gradient-to-r from-violet-500/20 via-fuchsia-500/15 to-rose-500/15 border border-white/10 text-slate-700 dark:text-slate-200">
                {item.badge}
              </span>
            ) : null}
          </div>
        </div>

        <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {item.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge className="bg-white/40 dark:bg-white/5">
            Role: {item.role}
          </Badge>
          {(item.tech || []).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Hackathons() {
  return (
    <SectionShell
      id="hackathons"
      label="04 — Momentum"
      title="Hackathons & Achievements"
      subtitle="Pressure-tested builds where speed meets engineering judgment — fast prototypes, real constraints, and clear outcomes."
      className="bg-white dark:bg-slate-900/10"
    >
      <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden>
        <div className="grid-pattern absolute inset-0" />
      </div>

      <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-10">
        {HACKATHONS.map((h, i) => (
          <HackathonCard key={h.id} item={h} index={i} />
        ))}
      </div>
    </SectionShell>
  );
}

