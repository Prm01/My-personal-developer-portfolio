import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const HIGHLIGHTS = [
  { label: 'Full Stack', value: 'MERN & Python' },
  { label: 'AI/ML', value: 'Vertex AI Certified' },
  { label: 'Community', value: 'GDSC • GfG • GirlScript' }
];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" ref={ref} className="section-pad bg-white dark:bg-slate-900/30 relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-30 pointer-events-none" aria-hidden />
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">01 — About</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 font-display gradient-text">
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start">
          {/* Profile avatar with hover effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="relative flex-shrink-0 mx-auto md:mx-0"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-rose-500 opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl md:text-7xl font-display font-bold text-white/90">PY</span>
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-violet-500/80 to-rose-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  Pramod Yadav
                </span>
              </motion.div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              I'm a <strong className="text-slate-900 dark:text-slate-200">B.Tech student in Mathematics & Computing</strong> at{' '}
              <strong className="text-slate-900 dark:text-slate-200">Rajiv Gandhi Institute of Petroleum Technology (RGIPT)</strong>, Jais, UP.
              Passionate about <strong className="text-violet-600 dark:text-violet-400">Full Stack Development</strong>,{' '}
              <strong className="text-violet-600 dark:text-violet-400">Machine Learning</strong>, and{' '}
              <strong className="text-violet-600 dark:text-violet-400">AI</strong>.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              With hands-on experience in <strong>MERN stack</strong>, <strong>REST APIs</strong>, and <strong>ML models</strong>,
              I build scalable applications. Design Executive at GDSC RGIPT, contributor at GirlScript SoC, Executive at GeeksForGeeks RGIPT.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4"
            >
              {HIGHLIGHTS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-white/5 backdrop-blur-sm hover:border-violet-400/50 dark:hover:border-violet-500/50 transition-colors"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                    {item.label}
                  </p>
                  <p className="text-slate-900 dark:text-white font-medium mt-1">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
