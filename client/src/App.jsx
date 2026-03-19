import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import Floating3D from './components/Floating3D';
import MusicToggle from './components/MusicToggle';
import Preloader from './components/Preloader';
import SEO from './components/SEO';
import Footer from './components/Footer';
import AIChat from './components/AIChat';

// Lazy load sections for code splitting & faster initial load
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Hackathons = lazy(() => import('./components/Hackathons'));
const OpenSource = lazy(() => import('./components/OpenSource'));
const Resume = lazy(() => import('./components/Resume'));
const Education = lazy(() => import('./components/Education'));
const Timeline = lazy(() => import('./components/Timeline'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));

const SectionFallback = () => (
  <div className="section-pad">
    <div className="h-64 animate-pulse rounded-2xl bg-slate-200/50 dark:bg-slate-800/50" />
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <HelmetProvider>
      <SEO />
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <AnimatePresence>
        {preloaderDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen"
          >
            <ScrollProgress />
            <CustomCursor />
            <Floating3D />
            <MusicToggle />
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main>
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Hackathons />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <OpenSource />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Resume />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Education />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Timeline />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Certifications />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </main>
        <Footer />
        <AIChat />
          </motion.div>
        )}
      </AnimatePresence>
    </HelmetProvider>
  );
}

export default App;
