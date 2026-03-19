import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';

/**
 * Background music toggle. Uses /audio/ambient.mp3 if present.
 * Add your own file to client/public/audio/ambient.mp3
 */
export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/audio/ambient.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    audio.addEventListener('canplaythrough', () => setIsLoaded(true));
    audio.addEventListener('error', () => setIsLoaded(false));

    return () => {
      audio.pause();
      audio.remove();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      onClick={toggle}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 left-8 z-50 w-14 h-14 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg hover:border-violet-400 dark:hover:border-violet-500 transition-colors"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      title={isLoaded ? (isPlaying ? 'Pause music' : 'Play music') : 'Add /public/audio/ambient.mp3 for background music'}
    >
      {isPlaying ? (
        <Volume2 size={24} className="text-violet-600 dark:text-violet-400" />
      ) : (
        <Music size={24} className="text-slate-500 dark:text-slate-400" />
      )}
    </motion.button>
  );
}
