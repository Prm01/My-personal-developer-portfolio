export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-slate-800/60 text-slate-700 dark:text-slate-200 ${className}`}
    >
      {children}
    </span>
  );
}

