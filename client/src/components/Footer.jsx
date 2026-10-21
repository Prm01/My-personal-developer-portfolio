import { Github, Linkedin, Mail, Download, ArrowUp, Code2 } from 'lucide-react';
import { PROFILE, getResumePdfHref } from '../lib/profile';
import FooterEasterEgg from './FooterEasterEgg';

const QUICK_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#open-source', label: 'Open Source' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' }
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/70 dark:bg-[#090714] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-10 border-b border-slate-200/80 dark:border-slate-800/60">
          {/* Identity & Bio */}
          <div className="max-w-sm">
            <a href="#hero" className="inline-flex items-center gap-2 font-display font-extrabold text-xl text-slate-900 dark:text-white">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-r from-purple-600 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                PY
              </span>
              <span>Pramod <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">Yadav</span></span>
            </a>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Full Stack &amp; AI Developer · B.Tech Mathematics &amp; Computing at RGIPT (2027). Open Source Contributor (Learning Unlimited &amp; Neutralinojs). Building high-throughput systems and agentic AI.
            </p>
            <div className="mt-4">
              <a
                href={getResumePdfHref()}
                download="Pramod_Yadav_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent !py-2 !px-3.5 text-xs font-semibold"
                aria-label="Download Resume PDF from footer"
              >
                <Download size={14} aria-hidden="true" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Quick Section Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-purple-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Profiles & Back to Top */}
          <div className="flex flex-col sm:items-end gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Profiles
            </h4>
            <div className="flex items-center gap-2.5">
              {[
                { href: PROFILE.githubUrl, icon: Github, label: 'GitHub' },
                { href: PROFILE.linkedinUrl, icon: Linkedin, label: 'LinkedIn' },
                { href: PROFILE.codeforcesUrl, icon: Code2, label: 'Codeforces' },
                { href: `mailto:${PROFILE.email}`, icon: Mail, label: 'Email' }
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-purple-500/40 hover:text-purple-400 transition-colors"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-purple-400 dark:hover:text-emerald-400 transition-colors pt-2"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 3D Footer Easter Egg */}
        <FooterEasterEgg />

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Pramod Yadav. All rights reserved.</p>
          <p>
            RGIPT &apos;27 · Open Source Contributor
          </p>
        </div>
      </div>
    </footer>
  );
}
