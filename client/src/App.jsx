import { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';
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
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import ScrollBackground3D from './components/ScrollBackground3D';
import FloatingContact3D from './components/FloatingContact3D';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return true; // default dark theme
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

  // Lenis smooth scrolling initialization
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Route popstate listener for 404
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

      {/* Initial 3D Logo Loading Screen */}
      <LoadingScreen />

      {/* Skip to main content link for keyboard WCAG accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gradient-to-r focus:from-blue-600 focus:to-purple-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Reading scroll progress indicator */}
      <ScrollProgress />

      {/* Custom neon cursor */}
      <CustomCursor />

      {/* Ambient 3D background layer with scroll color shifts */}
      <ScrollBackground3D />

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative z-10">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main id="main-content" className="flex-1">
          {/* 1. Hero (3D Scene, Typing Text, CTA buttons) */}
          <Hero />

          {/* 2. About (3-4 lines + 4 animated 3D stat counters) */}
          <About />

          {/* 3. Featured Projects (3D tilt cards, floating popout screenshot, filter tabs) */}
          <Projects />

          {/* 4. Experience (Polluxa 3 impact bullets + RGIPT 3D timeline) */}
          <Experience />

          {/* 5. Skills (3D rotating skill sphere + categorized panels) */}
          <Skills />

          {/* 6. Open Source ("Contributed to two organizations, Learning Unlimited and Neutralinojs", PR links, GitHub graph) */}
          <OpenSource />

          {/* 7. Coding Profiles & Achievements (CodeChef, Codeforces, GeeksforGeeks, JEE, Scholarship, GDSC) */}
          <Achievements />

          {/* 8. Contact (Working form, email 23mc3037@rgipt.ac.in, social icons, closing line) */}
          <Contact />
        </main>

        {/* Footer with 3D Easter Egg, quick links, back to top */}
        <Footer />

        {/* Floating 3D Contact Launcher */}
        <FloatingContact3D />

        {/* AI Portfolio Assistant */}
        <AIChat />
      </div>
    </HelmetProvider>
  );
}

export default App;
