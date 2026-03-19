import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SectionShell({
  id,
  label,
  eyebrow,
  title,
  subtitle,
  children,
  className = ''
}) {
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });

  return (
    <section
      id={id}
      ref={ref}
      className={`section-pad relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute inset-0 grid-dots" />
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-tr from-rose-500/25 via-blue-500/15 to-transparent blur-3xl" />
      </div>

      <motion.header
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {label ? <span className="section-label">{label}</span> : null}
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display gradient-text">
            {title}
          </h2>
          {eyebrow ? (
            <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {eyebrow}
            </p>
          ) : null}
          {subtitle ? (
            <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {subtitle}
            </p>
          ) : null}
        </div>
      </motion.header>

      <div className="relative mt-10">{children}</div>
    </section>
  );
}

