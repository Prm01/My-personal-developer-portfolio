import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Code2, Layout, Server, Database, Wrench, Sparkles } from 'lucide-react';

const SKILLS = [
  { category: 'Programming', icon: Code2, items: ['JavaScript', 'Python', 'C++', 'SQL'], level: 90 },
  { category: 'Frontend', icon: Layout, items: ['React.js', 'HTML5', 'CSS3', 'Tailwind', 'Bootstrap'], level: 88 },
  { category: 'Backend', icon: Server, items: ['Node.js', 'Express', 'REST APIs', 'JWT', 'FastAPI'], level: 85 },
  { category: 'Databases', icon: Database, items: ['MongoDB', 'MySQL', 'PostgreSQL'], level: 82 },
  { category: 'Tools', icon: Wrench, items: ['Git', 'Docker', 'Postman', 'VS Code', 'Agile'], level: 80 },
  { category: 'ML & AI', icon: Sparkles, items: ['Scikit-learn', 'Pandas', 'NumPy', 'Vertex AI'], level: 75 }
];

function SkillCard({ skill, index, inView }) {
  const { icon: Icon, level } = skill;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 100 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setTilt({ x: (y - 0.5) * 6, y: (x - 0.5) * -6 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
      className="p-6 rounded-2xl card-glass border hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.2)] transition-shadow"
    >
      <div className="flex items-start gap-5">
        <div className="relative flex-shrink-0">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-slate-200 dark:text-slate-700"
            />
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="url(#skillGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={inView ? { strokeDashoffset } : {}}
              transition={{ duration: 1.2, delay: index * 0.1 }}
            />
            <defs>
              <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
              <Icon size={26} />
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-3">{skill.category}</h3>
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.08 + i * 0.03 }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-sm"
              >
                {item}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${level}%` } : {}}
            transition={{ duration: 1, delay: index * 0.1 }}
            className="mt-3 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section id="skills" ref={ref} className="section-pad relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-50 pointer-events-none" aria-hidden />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="relative">
        <span className="section-label">02 — Skills</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-14 font-display gradient-text">
          Technical Skills
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {SKILLS.map((skill, i) => (
          <SkillCard key={skill.category} skill={skill} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
