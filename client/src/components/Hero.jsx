import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, ExternalLink, Sparkles, FolderGit2 } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { PROFILE, getResumePdfHref } from '../lib/profile';

const Hero3D = lazy(() => import('./Hero3D'));

export default function Hero() {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${PROFILE.githubUsername}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setAvatarUrl(d?.avatar_url || null))
      .catch(() => setAvatarUrl(null));
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50 dark:bg-[#070b14]"
    >
      {/* 3D Interactive Scene Background */}
      <Suspense fallback={
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-purple-950/20 pointer-events-none" />
      }>
        <Hero3D />
      </Suspense>

      {/* Subtle ambient lighting layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/70 dark:via-[#070b14]/75 to-slate-50 dark:to-[#070b14] pointer-events-none" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-8 items-center">
          {/* Main Info Column */}
          <div className="text-center lg:text-left">
            {/* Status Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                <span>B.Tech Mathematics &amp; Computing @ RGIPT (2027)</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-md">
                <Sparkles size={13} className="text-purple-400" />
                <span>Contributed on GSoC</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Pramod Yadav
              </span>
            </motion.h1>

            {/* Typing animation: Full Stack & AI Developer, Backend Engineer, Open Source Contributor */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-200 min-h-[38px] flex items-center justify-center lg:justify-start"
            >
              <TypeAnimation
                sequence={[
                  'Full Stack & AI Developer',
                  1800,
                  'Backend Engineer',
                  1800,
                  'Open Source Contributor',
                  1800
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent font-bold"
              />
            </motion.div>

            {/* One-line value statement */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Engineering scalable distributed systems, agentic AI pipelines, and high-performance full-stack applications with measurable production impact.
            </motion.p>

            {/* Action Buttons: View Projects, Download Resume, Contact */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3.5 justify-center lg:justify-start items-center"
            >
              <a
                href="#projects"
                className="btn-accent"
                aria-label="View Featured Projects"
              >
                <FolderGit2 size={18} aria-hidden="true" />
                <span>View Projects</span>
              </a>

              <a
                href={getResumePdfHref()}
                download="Pramod_Yadav_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                aria-label="Download Pramod Yadav Resume PDF"
              >
                <Download size={18} aria-hidden="true" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="btn-secondary"
                aria-label="Scroll to Contact section"
              >
                <Mail size={18} aria-hidden="true" />
                <span>Contact</span>
              </a>
            </motion.div>
          </div>

          {/* Profile Card / Avatar Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex justify-center"
          >
            <div className="relative group">
              {/* Outer neon glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-xl group-hover:opacity-50 transition-all duration-300" />
              
              {/* Glass profile container */}
              <div className="relative p-5 sm:p-6 rounded-3xl card-glass border border-blue-500/30 dark:border-purple-500/30 flex flex-col items-center text-center max-w-[280px] sm:max-w-[320px] shadow-2xl">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-blue-400/40 dark:border-purple-400/40 bg-slate-900 shadow-inner mb-4">
                  <img
                    src={avatarUrl || `https://github.com/${PROFILE.githubUsername}.png`}
                    alt="Pramod Yadav profile portrait"
                    className="w-full h-full object-cover"
                    loading="eager"
                    width="192"
                    height="192"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://avatars.githubusercontent.com/u/148766723?v=4';
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Pramod Yadav
                  </h2>
                  <p className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Math &amp; Computing · RGIPT &apos;27
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                    Contributed on GSoC · Full Stack &amp; AI
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll down prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-purple-400 transition-colors"
            aria-label="Scroll to About section"
          >
            <span>DISCOVER</span>
            <ArrowDown size={16} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
