import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE } from '../lib/profile';

const SOCIALS = [
  { href: PROFILE.githubUrl, icon: Github, label: 'GitHub' },
  { href: PROFILE.linkedinUrl, icon: Linkedin, label: 'LinkedIn' },
  { href: `mailto:${PROFILE.email}`, icon: Mail, label: 'Email' }
];

const QUICK_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' }
];

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-slate-200 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="text-lg font-display font-bold gradient-text">Pramod Yadav</span>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-xs">
              Full-Stack Developer & Automation/AI Engineer. Building things that matter.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {QUICK_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-3">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={label}
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400 dark:hover:border-violet-500 transition-all"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © {new Date().getFullYear()} Pramod Yadav. All rights reserved.
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-xs">
            Built with React + Framer Motion · Last updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </footer>
  );
}
