import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Download, Linkedin, Mail, ArrowDown, ExternalLink } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { PROFILE, getResumePdfHref } from '../lib/profile';

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
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient glow - single accent color */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-violet-600/10 dark:bg-violet-600/15 blur-[120px] rounded-full" />
        <div className="absolute inset-0 grid-pattern opacity-40 dark:opacity-30" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-8 items-center">
          {/* Main Info Column */}
          <div className="text-center lg:text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span>B.Tech Mathematics &amp; Computing @ RGIPT (2027)</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Hi, I&apos;m{' '}
              <span className="text-violet-600 dark:text-violet-400">
                Pramod Yadav
              </span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 min-h-[38px] flex items-center justify-center lg:justify-start"
            >
              <TypeAnimation
                sequence={[
                  'Full Stack & AI Developer',
                  2000,
                  'B.Tech Mathematics & Computing',
                  1800,
                  'Open Source & GSoC Aspirant',
                  1800,
                  'Full Stack & AI Developer',
                  2500
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-violet-600 dark:text-violet-400 font-bold"
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

            {/* Action Buttons: Resume, GitHub, LinkedIn, Contact */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3.5 justify-center lg:justify-start items-center"
            >
              {/* Resume download */}
              <a
                href={getResumePdfHref()}
                download="Pramod_Yadav_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
                aria-label="Download Pramod Yadav Resume PDF"
              >
                <Download size={18} aria-hidden="true" />
                <span>Resume (PDF)</span>
              </a>

              {/* GitHub */}
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                aria-label="Pramod Yadav GitHub Profile"
              >
                <Github size={18} aria-hidden="true" />
                <span>GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                aria-label="Pramod Yadav LinkedIn Profile"
              >
                <Linkedin size={18} aria-hidden="true" />
                <span>LinkedIn</span>
              </a>

              {/* Contact */}
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
              {/* Outer accent glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-violet-600/30 dark:bg-violet-500/25 blur-xl group-hover:bg-violet-600/40 transition-all duration-300" />
              
              {/* Glass profile container */}
              <div className="relative p-5 sm:p-6 rounded-3xl card-glass border border-slate-200/80 dark:border-slate-800 flex flex-col items-center text-center max-w-[280px] sm:max-w-[320px]">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-violet-500/30 bg-slate-900 shadow-inner mb-4">
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
                  <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                    Math &amp; Computing · RGIPT &apos;27
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                    Targeting Summer 2026 Internships &amp; GSoC 2026
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
            className="inline-flex flex-col items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
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
