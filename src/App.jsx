import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BootScreen from './components/BootScreen';
import Taskbar from './components/Taskbar';
import DraggableWindow from './components/DraggableWindow';
import Terminal from './components/Terminal';
import CommandPalette from './components/CommandPalette';
import SettingsWindow from './components/SettingsWindow';
import Screensaver from './components/Screensaver';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import WindowFrame from './components/WindowFrame';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import LazySection from './components/LazySection';
import SectionErrorBoundary from './components/SectionErrorBoundary';
import { SettingsProvider, useSettings } from './lib/SettingsContext';
import { playOpenSound, ensureContext, setSoundEnabled, setSoundProfile } from './utils/audio';
import { scrollToTop, preloadAllSections } from './utils/scroll';

const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const MusicPlayer = lazy(() => import('./components/MusicPlayer'));
const ExperienceWindow = lazy(() => import('./components/ExperienceWindow'));
const Services = lazy(() => import('./components/Services'));

const IDLE_TIMEOUT_MS = 45000;

const Spinner = () => (
  <div className="flex items-center justify-center min-h-[40vh]">
    <div className="w-6 h-6 rounded-full animate-spin spinner-accent" />
  </div>
);

function AppContent() {
  const { crtScanlines, soundEnabled, soundProfile } = useSettings();
  const [hasBooted, setHasBooted] = useState(() => sessionStorage.getItem('hasBooted') === 'true');
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [topZIndex, setTopZIndex] = useState(10);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef(null);
  const isIdleRef = useRef(false);
  const lenisRef = useRef(null);

  const isAnyOverlayOpen = !hasBooted || isCommandPaletteOpen || isShortcutsOpen || windows.length > 0;

  const openWindowTypes = windows.map(w => w.type);

  useEffect(() => {
    setSoundEnabled(soundEnabled);
    setSoundProfile(soundProfile);
  }, [soundEnabled, soundProfile]);

  const startIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      isIdleRef.current = true;
      setIsIdle(true);
    }, IDLE_TIMEOUT_MS);
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (isIdleRef.current) return;
    startIdleTimer();
  }, [startIdleTimer]);

  const wakeFromScreensaver = useCallback(() => {
    isIdleRef.current = false;
    setIsIdle(false);
    startIdleTimer();
  }, [startIdleTimer]);

  const handleBootComplete = useCallback(() => {
    scrollToTop();
    sessionStorage.setItem('hasBooted', 'true');
    setHasBooted(true);
    requestAnimationFrame(scrollToTop);
  }, []);

  useEffect(() => {
    if (!hasBooted) return;
    const preload = () => preloadAllSections();
    const t = setTimeout(preload, 800);
    return () => clearTimeout(t);
  }, [hasBooted]);

  useEffect(() => {
    if (!hasBooted) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [hasBooted]);

  useEffect(() => {
    if (!hasBooted) {
      document.body.style.overflow = 'hidden';
      scrollToTop();
    } else {
      document.body.style.overflow = '';
      scrollToTop();
    }
    return () => { document.body.style.overflow = ''; };
  }, [hasBooted]);

  const openWindow = useCallback((type) => {
    if (type === 'shortcuts') { setIsShortcutsOpen(true); return; }

    const existing = windows.find(w => w.type === type);
    if (existing) {
      const newZ = topZIndex + 1;
      setTopZIndex(newZ);
      setActiveWindow(type);
      setWindows(prev => prev.map(w => w.type === type ? { ...w, zIndex: newZ } : w));
      return;
    }

    if (type !== 'shortcuts') {
      const displayNames = { terminal: 'Terminal', music: 'Music Player', settings: 'Settings', timeline: 'Experience' };
      const appName = displayNames[type] || type;
      toast.success(`Opening ${appName}...`, { id: `open-${type}` });
    }

    playOpenSound();
    const id = `${type}-${Date.now()}`;
    const newZIndex = topZIndex + 1;
    setTopZIndex(newZIndex);
    setActiveWindow(type);
    setWindows(prev => [...prev, { id, type, zIndex: newZIndex }]);
  }, [windows, topZIndex]);

  const closeWindow = useCallback((id) => {
    setWindows(prev => {
      const closing = prev.find(w => w.id === id);
      const next = prev.filter(w => w.id !== id);
      if (closing && activeWindow === closing.type) {
        setActiveWindow(next.length ? next[next.length - 1].type : null);
      }
      return next;
    });
  }, [activeWindow]);

  const focusWindow = useCallback((id, type) => {
    const newZIndex = topZIndex + 1;
    setTopZIndex(newZIndex);
    setActiveWindow(type);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZIndex } : w));
  }, [topZIndex]);

  useEffect(() => {
    const unlockAudio = () => {
      ensureContext();
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);
    document.addEventListener('keydown', unlockAudio);

    const onMusic = () => openWindow('music');
    const onTimeline = () => openWindow('timeline');
    window.addEventListener('open-music', onMusic);
    window.addEventListener('open-timeline', onTimeline);

    const handleKeyDown = (e) => {
      if (isIdleRef.current) { wakeFromScreensaver(); return; }
      if (e.ctrlKey && e.code === 'Space') { e.preventDefault(); setIsCommandPaletteOpen(p => !p); }
      if (e.ctrlKey && e.key === '?') { e.preventDefault(); setIsShortcutsOpen(p => !p); }
      if (e.key === 'Escape') { setIsCommandPaletteOpen(false); setIsShortcutsOpen(false); }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });

    const events = ['mousedown', 'keydown', 'touchstart', 'wheel'];
    const onActivity = () => resetIdleTimer();
    events.forEach(evt => window.addEventListener(evt, onActivity, { passive: true }));
    startIdleTimer();

    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('open-music', onMusic);
      window.removeEventListener('open-timeline', onTimeline);
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      events.forEach(evt => window.removeEventListener(evt, onActivity));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer, startIdleTimer, openWindow, wakeFromScreensaver]);

  const renderWindow = (win) => {
    const close = () => closeWindow(win.id);
    const focus = () => focusWindow(win.id, win.type);

    const frames = {
      terminal: (
        <Terminal isFloating onClose={close} onMinimize={close} title="guest@sabin-os:~" />
      ),
      music: (
        <WindowFrame title="Music Player — Sabin OS" onClose={close} onMinimize={close} className="w-[min(360px,92vw)]">
          <Suspense fallback={<Spinner />}><MusicPlayer /></Suspense>
        </WindowFrame>
      ),
      settings: (
        <WindowFrame title="Settings — Sabin OS" onClose={close} onMinimize={close} className="w-[min(400px,92vw)] h-[min(580px,78vh)]">
          <SettingsWindow />
        </WindowFrame>
      ),
      timeline: (
        <WindowFrame title="Timeline — Sabin OS" onClose={close} onMinimize={close} className="w-[min(400px,92vw)]">
          <Suspense fallback={<Spinner />}><ExperienceWindow /></Suspense>
        </WindowFrame>
      ),
    };

    if (!frames[win.type]) return null;

    return (
      <DraggableWindow key={win.id} isOpen type={win.type} zIndex={win.zIndex} onFocus={focus}>
        {frames[win.type]}
      </DraggableWindow>
    );
  };

  return (
    <>
      {!hasBooted && <BootScreen onComplete={handleBootComplete} />}

      <AnimatePresence>
        {isIdle && hasBooted && <Screensaver key="screensaver" onWake={wakeFromScreensaver} />}
      </AnimatePresence>

      {crtScanlines && hasBooted && <div className="crt-overlay" aria-hidden="true" />}
      {hasBooted && <ScrollProgress />}

      <div
        className={`min-h-screen transition-opacity duration-700 ${hasBooted ? 'opacity-100 has-taskbar' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'var(--os-bg)', color: 'var(--os-text)' }}
        aria-hidden={!hasBooted}
      >
        {hasBooted && <Navbar />}
        <main>
          <Hero />
          {hasBooted && (
            <>
              <LazySection sectionId="about" minHeight="80vh">
                <SectionErrorBoundary><About /></SectionErrorBoundary>
              </LazySection>
              <LazySection sectionId="services" minHeight="50vh">
                <SectionErrorBoundary><Services /></SectionErrorBoundary>
              </LazySection>
              <LazySection sectionId="projects" minHeight="60vh">
                <SectionErrorBoundary><Projects /></SectionErrorBoundary>
              </LazySection>
              <LazySection sectionId="skills" minHeight="100vh">
                <SectionErrorBoundary><Skills /></SectionErrorBoundary>
              </LazySection>
              <LazySection sectionId="contact" minHeight="60vh">
                <SectionErrorBoundary><Contact /></SectionErrorBoundary>
              </LazySection>
            </>
          )}
        </main>
        {hasBooted && (
          <Suspense fallback={null}><Footer /></Suspense>
        )}

        {hasBooted && (
          <>
            <Taskbar
              openWindows={openWindowTypes}
              activeWindow={activeWindow}
              onOpenApp={openWindow}
              onCommandPalette={() => setIsCommandPaletteOpen(true)}
            />
            <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} onOpen={openWindow} />
            <KeyboardShortcuts isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
            <AnimatePresence>{windows.map(renderWindow)}</AnimatePresence>
          </>
        )}
        <CustomCursor />
      </div>
    </>
  );
}

function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

export default App;
