import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const EVENTS = [
  { date: '2023 – Present', title: 'Design Executive', org: 'Google Developer Student Clubs - RGIPT', desc: 'Team collaboration on technical events and design activities.' },
  { date: '2024', title: 'Contributor', org: 'GirlScript Summer of Code', desc: 'Open-source contribution using Git and GitHub.' },
  { date: '2023 – Present', title: 'Executive Member', org: 'GeeksForGeeks RGIPT Student Chapter', desc: 'Organized coding events; helped students with DSA and Web Development.' },
  { date: '2023 – Present', title: 'Volunteer', org: 'Arpan - RGIPT Social Council', desc: 'Social initiatives and event management.' }
];

export default function Timeline() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section id="experience" ref={ref} className="section-pad bg-white dark:bg-slate-900/30 overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-30 pointer-events-none" aria-hidden />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="relative">
        <span className="section-label">05 — Journey</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-14 font-display gradient-text">
          Experience & Timeline
        </h2>
      </motion.div>

      <div className="relative max-w-2xl mx-auto pl-8 md:pl-12 border-l-2 border-violet-500/30 dark:border-violet-500/20">
        {EVENTS.map((event, i) => (
          <motion.div
            key={event.org}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.12 }}
            className="relative pb-12 last:pb-0"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: i * 0.12 + 0.1, type: 'spring' }}
              className="absolute -left-8 md:-left-12 top-1 w-4 h-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 border-4 border-white dark:border-slate-950 shadow-lg"
            />
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-white/5 backdrop-blur-sm hover:border-violet-400/50 dark:hover:border-violet-500/50 transition-colors">
              <p className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">{event.date}</p>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white">{event.title} • {event.org}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">{event.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
