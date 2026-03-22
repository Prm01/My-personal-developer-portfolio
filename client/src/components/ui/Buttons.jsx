import { ExternalLink, Github } from 'lucide-react';

export function PrimaryLink({ href, children, className = '', download }) {
  const isDownload = Boolean(download);
  return (
    <a
      href={href}
      target={isDownload ? undefined : '_blank'}
      rel={isDownload ? undefined : 'noopener noreferrer'}
      download={download}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 text-white shadow-lg hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.55)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {children}
      {!isDownload ? <ExternalLink size={16} /> : null}
    </a>
  );
}

export function SecondaryLink({ href, children, icon = 'github', className = '' }) {
  const Icon = icon === 'github' ? Github : ExternalLink;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200/70 dark:border-slate-800/70 bg-white/50 dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:border-violet-400/60 dark:hover:border-violet-500/35 hover:shadow-[0_0_40px_-16px_rgba(139,92,246,0.55)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${className}`}
    >
      <Icon size={16} />
      {children}
    </a>
  );
}

