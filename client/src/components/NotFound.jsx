import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound({ onHome }) {
  const handleHomeClick = () => {
    if (onHome) {
      onHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white">
      <div className="max-w-md w-full p-8 rounded-3xl card-glass border border-blue-500/30 dark:border-purple-500/30 text-center shadow-2xl">
        <span className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-display block mb-2">
          404
        </span>
        <h1 className="text-2xl font-bold font-display mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          The endpoint or page you are looking for does not exist or has been relocated.
        </p>
        <button
          onClick={handleHomeClick}
          className="btn-accent w-full justify-center !py-3 font-semibold"
        >
          <Home size={18} aria-hidden="true" />
          <span>Return to Portfolio</span>
        </button>
      </div>
    </div>
  );
}
