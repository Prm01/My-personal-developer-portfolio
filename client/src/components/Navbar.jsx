import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { getResumePdfHref } from '../lib/profile';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#awards', label: 'Awards' },
  { href: '#contact', label: 'Contact' }
];

function getActiveSection() {
  if (typeof window === 'undefined') return '';
  const scrollY = window.scrollY + 150;
  for (let i = navLinks.length - 1; i >= 0; i--) {
    const el = document.getElementById(navLinks[i].href.slice(1));
    if (el && el.offsetTop <= scrollY) return navLinks[i].href;
  }
  return '';
}

export default function Navbar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setActiveLink(getActiveSection());
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-slate-900/5'
          : 'bg-white/30 dark:bg-slate-950/30 backdrop-blur-xl border-b border-slate-200/20 dark:border-slate-800/20'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          className="flex items-center justify-between"
          animate={{ height: scrolled ? 56 : 72 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <a
            href="#"
            className="text-lg font-display font-bold tracking-tight text-slate-800 dark:text-white hover:opacity-90 transition-opacity"
          >
            Pramod
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="relative px-4 py-3 text-sm font-medium group">
                <span
                  className={`transition-colors ${
                    activeLink === link.href
                      ? 'text-violet-600 dark:text-violet-400'
                      : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                  }`}
                >
                  {link.label}
                </span>
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300 ${
                    activeLink === link.href ? 'w-8 opacity-100' : 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-60'
                  }`}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Resume download button */}
            <motion.a
              href={getResumePdfHref()}
              download
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 text-white shadow-md hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.6)] transition-shadow"
            >
              <Download size={15} /> Resume
            </motion.a>

            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 bg-white/50 dark:bg-white/5 backdrop-blur-sm hover:border-violet-400/50 dark:hover:border-violet-500/50 transition-colors"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun size={18} className="text-amber-500" />
              ) : (
                <Moon size={18} className="text-slate-600 dark:text-slate-400" />
              )}
            </motion.button>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-white/90 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`py-3 text-sm font-medium ${
                    activeLink === link.href
                      ? 'text-violet-600 dark:text-violet-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-violet-600'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={getResumePdfHref()}
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center gap-2 py-3 text-sm font-semibold text-violet-600 dark:text-violet-400"
              >
                <Download size={16} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
