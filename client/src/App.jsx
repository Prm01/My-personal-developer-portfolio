import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import OpenSource from './components/OpenSource';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SEO from './components/SEO';
import AIChat from './components/AIChat';
import NotFound from './components/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return true; // default dark theme as specified in requirements
    }
    return true;
  });

  const [isNotFound, setIsNotFound] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path !== '/' && path !== '' && !path.startsWith('/#') && path !== '/index.html';
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Handle route change / 404 navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setIsNotFound(path !== '/' && path !== '' && !path.startsWith('/#') && path !== '/index.html');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (isNotFound) {
    return (
      <HelmetProvider>
        <SEO title="404 - Page Not Found | Pramod Yadav" />
        <NotFound onHome={() => {
          window.history.pushState({}, '', '/');
          setIsNotFound(false);
        }} />
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <SEO />
      {/* Skip to main content link for keyboard WCAG accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main id="main-content" className="flex-1">
          {/* 1. Hero */}
          <Hero />

          {/* 2. About */}
          <About />

          {/* 3. Featured Projects */}
          <Projects />

          {/* 4. Experience */}
          <Experience />

          {/* 5. Skills */}
          <Skills />

          {/* 6. Open Source */}
          <OpenSource />

          {/* 7. Achievements */}
          <Achievements />

          {/* 8. Contact */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* AI Portfolio Assistant */}
        <AIChat />
      </div>
    </HelmetProvider>
  );
}

export default App;
