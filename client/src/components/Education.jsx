import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const EDUCATION = [
  {
    degree: 'B.Tech - Mathematics and Computing',
    institute: 'Rajiv Gandhi Institute of Petroleum Technology (RGIPT)',
    location: 'Jais, Uttar Pradesh',
    period: '2023 – 2027'
  },
  {
    degree: 'Senior Secondary (Class XII) - PCM',
    institute: 'City Montessori Inter College',
    location: 'Lucknow, Uttar Pradesh',
    period: '2021 – 2023'
  }
];

export default function Education() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="education" ref={ref} className="section-pad">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        <span className="section-label">04 — Education</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-14 font-display gradient-text">
          Education
        </h2>
      </motion.div>
      <div className="max-w-2xl mx-auto space-y-6">
        {EDUCATION.map((edu, i) => (
          <motion.div
            key={edu.institute}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.15 }}
            className="group flex gap-6 p-6 rounded-2xl card-glass border border-slate-200/80 dark:border-slate-700/60 card-hover"
          >
            <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg">
              <GraduationCap size={26} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-1">
                {edu.degree}
              </h3>
              <p className="text-violet-600 dark:text-violet-400 font-medium">{edu.institute}</p>
              <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">{edu.location}</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 font-medium">{edu.period}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
