import { Github, Linkedin, Code2 } from 'lucide-react';

const LINKS = {
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  leetcode: 'https://leetcode.com'
};

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-slate-200 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
          © {new Date().getFullYear()} Pramod Yadav. Built with React, Node.js & passion.
        </p>
        <div className="flex gap-4">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400 dark:hover:border-violet-500 transition-all"
          >
            <Github size={20} />
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400 dark:hover:border-violet-500 transition-all"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={LINKS.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400 dark:hover:border-violet-500 transition-all"
          >
            <Code2 size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
