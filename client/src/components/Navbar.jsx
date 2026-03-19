import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#hackathons', label: 'Hackathons' },
  { href: '#open-source', label: 'Open Source' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' }
];

function getActiveSection() {
  if (typeof window === 'undefined') return '';
  const sections = navLinks.map(l => l.href.slice(1));
  const scrollY = window.scrollY + 150;
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i]);
    if (el && el.offsetTop <= scrollY) return '#' + sections[i];
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
    window.addEventListener('scroll', onScroll);
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
      <nav className="max-w-5xl mx-auto px-5 sm:px-8">
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

          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="relative px-5 py-3 text-sm font-medium group">
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
              className="sm:hidden p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden overflow-hidden bg-white/80 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
