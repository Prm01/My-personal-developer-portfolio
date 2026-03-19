import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Award, BookOpen } from 'lucide-react';

const CERTS = [
  { name: 'Prompt Design in Vertex AI Skill Badge', org: 'Google', year: '2024', highlight: true },
  { name: 'Python Course for Beginners', org: 'Scaler', year: '2023' },
  { name: 'Introduction to MATLAB', org: 'Great Learning', year: '2023' }
];

const SUBJECTS = [
  'Data Structures & Algorithms', 'Object Oriented Programming', 'Database Management Systems',
  'Operating Systems', 'Computer Networks', 'Probability & Statistics'
];

export default function Certifications() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="certifications" ref={ref} className="section-pad">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        <span className="section-label">06 — Credentials</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-14 font-display gradient-text">
          Certifications & Knowledge
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <div>
          <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
              <Award size={20} />
            </div>
            Certifications
          </h3>
          <div className="space-y-4">
            {CERTS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className={`p-5 rounded-2xl border transition-all card-hover ${
                  cert.highlight
                    ? 'border-violet-300 dark:border-violet-700 bg-gradient-to-br from-violet-50 to-fuchsia-50/50 dark:from-violet-900/20 dark:to-fuchsia-900/10 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 card-glass'
                }`}
              >
                <p className="font-semibold text-slate-900 dark:text-white">{cert.name}</p>
                <p className="text-violet-600 dark:text-violet-400 text-sm font-medium mt-1">{cert.org} • {cert.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
              <BookOpen size={20} />
            </div>
            Relevant Subjects
          </h3>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((subj, i) => (
              <motion.span
                key={subj}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-sm font-medium border border-slate-200/60 dark:border-slate-700/60"
              >
                {subj}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
