import React, { Suspense, lazy, Component, useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const GitHubCalendar = lazy(() =>
  import('react-github-calendar').then((mod) => ({ default: mod.GitHubCalendar }))
);

const CALENDAR_THEME = {
  light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

class CalendarErrorBoundary extends Component {
  state = { error: false };

  static getDerivedStateFromError() {
    return { error: true };
  }

  render() {
    if (this.state.error) {
      return (
        <p className="text-center text-os-muted font-mono text-xs py-8">
          Could not load GitHub contributions.{' '}
          <a href="https://github.com/sabin-khatri" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            View on GitHub →
          </a>
        </p>
      );
    }
    return this.props.children;
  }
}

const CalendarFallback = () => (
  <div className="flex items-center justify-center h-[100px] sm:h-[120px]">
    <div className="w-6 h-6 rounded-full animate-spin spinner-accent" />
  </div>
);

const GithubGraph = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full min-w-0 max-w-full border border-os rounded-xl sm:rounded-2xl p-3 sm:p-5 overflow-hidden mt-6 sm:mt-8 shadow-2xl"
      style={{ background: 'color-mix(in srgb, var(--os-card) 80%, transparent)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-3 sm:mb-5 min-w-0">
        <h3 className="text-[10px] sm:text-sm font-mono text-os-text flex items-center gap-1.5 sm:gap-2 min-w-0">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#39d353] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          <a
            href="https://github.com/sabin-khatri"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors truncate"
          >
            sabin-khatri
          </a>
          <span className="text-os-muted truncate hidden sm:inline">/ contributions</span>
        </h3>
        <p className="text-[9px] sm:text-xs font-mono text-os-muted shrink-0">Live from GitHub</p>
      </div>

      <div className="w-full max-w-full overflow-x-auto custom-scrollbar pb-1 -mx-0.5 px-0.5">
        <div className="inline-block min-w-0 max-w-none">
          <CalendarErrorBoundary>
            <Suspense fallback={<CalendarFallback />}>
              <GitHubCalendar
                username="sabin-khatri"
                colorScheme="dark"
                theme={CALENDAR_THEME}
                fontSize={isMobile ? 8 : 11}
                blockSize={isMobile ? 7 : 10}
                blockMargin={isMobile ? 2 : 3}
                blockRadius={2}
                showWeekdayLabels={!isMobile}
                weekStart={1}
              />
            </Suspense>
          </CalendarErrorBoundary>
        </div>
      </div>
    </motion.div>
  );
};

export default GithubGraph;
