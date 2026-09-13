import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Github, Download, ArrowRight, ArrowDown, Linkedin, Mail } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Scene3D from './Scene3D';
import { PROFILE, getResumePdfHref } from '../lib/profile';

const nameLetters = PROFILE.name.split('');

function MagneticButton({ children, className, href, download, target, rel, onClick }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const moveX = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const moveY = useTransform(y, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  return (
    <motion.a
      href={href}
      download={download}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: moveX, y: moveY }}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${PROFILE.githubUsername}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setAvatarUrl(d?.avatar_url || null))
      .catch(() => setAvatarUrl(null));
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center section-pad pt-28 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true, antialias: true }}>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50/85 dark:via-slate-950/90 to-stone-50 dark:to-slate-950" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/40 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-xl mb-10 shadow-lg shadow-slate-900/5"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            B.Tech Mathematics & Computing @ RGIPT
          </span>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 font-display flex flex-wrap justify-center lg:justify-start gap-0.5 md:gap-1">
              <span className="text-slate-800 dark:text-white">Hi, I&apos;m&nbsp;</span>
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.035, duration: 0.4 }}
                  className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent"
                  style={letter === ' ' ? { width: '0.25em', display: 'inline-block' } : {}}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg sm:text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-400"
            >
              <TypeAnimation
                sequence={[
                  'Full-Stack Developer',
                  1200,
                  'Automation & AI Engineer',
                  1200,
                  'MERN Stack Developer',
                  1200,
                  'Open Source Enthusiast',
                  1200
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-6 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Building automation tools, LLM-integrated apps, and full-stack products — from idea to production.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05 }}
              className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start"
            >
              <MagneticButton
                href="#projects"
                className="relative px-7 py-4 rounded-2xl font-semibold overflow-hidden group inline-flex items-center justify-center gap-2"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 transition-opacity group-hover:opacity-100 opacity-95" />
                <span className="absolute inset-0 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                <span className="relative text-white inline-flex items-center gap-2">
                  View Projects <ArrowRight size={18} />
                </span>
              </MagneticButton>

              <MagneticButton
                href={getResumePdfHref()}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-2xl font-semibold border border-slate-200/70 dark:border-slate-700/60 bg-white/60 dark:bg-white/5 backdrop-blur-xl text-slate-700 dark:text-slate-200 hover:border-violet-400/70 dark:hover:border-violet-500/40 hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.45)] transition-all inline-flex items-center justify-center gap-2"
              >
                <Download size={18} /> Download Resume
              </MagneticButton>

              <MagneticButton
                href="#contact"
                className="px-7 py-4 rounded-2xl font-semibold border border-slate-200/70 dark:border-slate-700/60 bg-white/60 dark:bg-white/5 backdrop-blur-xl text-slate-700 dark:text-slate-200 hover:border-violet-400/70 dark:hover:border-violet-500/40 hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.45)] transition-all inline-flex items-center justify-center gap-2"
              >
                <Mail size={18} /> Contact Me
              </MagneticButton>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {[
                { href: PROFILE.githubUrl, icon: Github, label: 'GitHub' },
                { href: PROFILE.linkedinUrl, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${PROFILE.email}`, icon: Mail, label: 'Email' }
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 bg-white/60 dark:bg-white/5 backdrop-blur-xl text-slate-700 dark:text-slate-200 hover:border-violet-400/70 dark:hover:border-violet-500/40 hover:shadow-[0_0_28px_-10px_rgba(139,92,246,0.45)] transition-all"
                >
                  <Icon size={18} className="text-violet-600 dark:text-violet-300" />
                  <span className="text-sm font-semibold">{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-rose-500 opacity-30 blur-2xl animate-glow" />
              <div className="relative p-[3px] rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 shadow-glow">
                <div className="rounded-full bg-slate-950/60 backdrop-blur-xl p-1">
                  <img
                    src={avatarUrl || `https://github.com/${PROFILE.githubUsername}.png`}
                    alt={`${PROFILE.name} profile`}
                    className="h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="inline-flex flex-col items-center mt-20 text-slate-400 hover:text-violet-500 transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] mb-2">Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
