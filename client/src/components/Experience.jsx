import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const ROLES = [
  {
    role: 'Design Executive',
    org: 'Google Developer Student Clubs - RGIPT',
    period: '2023 – Present',
    desc: 'Team collaboration on technical events and design activities.'
  },
  {
    role: 'Contributor',
    org: 'GirlScript Summer of Code 2024',
    period: '2024',
    desc: 'Open-source contribution using Git and GitHub.'
  },
  {
    role: 'Executive Member',
    org: 'GeeksForGeeks RGIPT Student Chapter',
    period: '2023 – Present',
    desc: 'Organized coding events; helped students with DSA and Web Development.'
  },
  {
    role: 'Volunteer',
    org: 'Arpan - RGIPT Social Council',
    period: '2023 – Present',
    desc: 'Social initiatives and event management.'
  }
];

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="experience" ref={ref} className="section-pad bg-white dark:bg-slate-900/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        <span className="section-label">05 — Experience</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-14 font-display gradient-text">
          Positions of Responsibility
        </h2>
      </motion.div>
      <div className="max-w-3xl mx-auto space-y-4">
        {ROLES.map((role, i) => (
          <motion.div
            key={role.org}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.08 }}
            className="group flex gap-5 p-5 rounded-2xl card-glass border border-slate-200/80 dark:border-slate-700/60 card-hover"
          >
            <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
              <Briefcase size={22} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white">
                {role.role} <span className="text-violet-500">•</span> {role.org}
              </h3>
              <p className="text-violet-600 dark:text-violet-400 text-sm font-medium mt-1">{role.period}</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">{role.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
