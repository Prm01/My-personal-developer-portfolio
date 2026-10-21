import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';

export default function FloatingContact3D() {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = el.querySelector('input[name="name"]');
        if (input) input.focus();
      }, 600);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative group p-3.5 rounded-2xl bg-slate-900/90 text-white border border-purple-500/40 shadow-xl shadow-purple-500/15 backdrop-blur-xl flex items-center gap-2.5 overflow-hidden"
        aria-label="Open contact form"
        title="Quick Contact"
      >
        {/* Glowing holographic background sweep (Purple to Emerald) */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-400 opacity-25 group-hover:opacity-75 blur-md transition-opacity duration-300" />

        <div className="relative z-10 w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-emerald-600 flex items-center justify-center text-white shadow-md">
          <Mail size={17} aria-hidden="true" />
        </div>

        <div className="relative z-10 text-left pr-1">
          <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
            Quick Connect
          </span>
          <span className="text-xs font-extrabold text-white flex items-center gap-1">
            <span>Get in Touch</span>
            <Sparkles size={11} className="text-emerald-400" />
          </span>
        </div>
      </motion.button>
    </div>
  );
}
