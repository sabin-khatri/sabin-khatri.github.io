import React, { useEffect, useRef, useState, Suspense } from 'react';

const Fallback = ({ minHeight }) => (
  <div className="flex items-center justify-center" style={{ minHeight }}>
    <div className="w-6 h-6 rounded-full animate-spin spinner-accent" />
  </div>
);

const LazySection = ({ sectionId, children, minHeight = '50vh', rootMargin = '200px' }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onPreload = (e) => {
      if (sectionId && e.detail?.includes(sectionId)) setVisible(true);
    };
    window.addEventListener('preload-sections', onPreload);
    return () => window.removeEventListener('preload-sections', onPreload);
  }, [sectionId]);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? (
        <Suspense fallback={<Fallback minHeight={minHeight} />}>{children}</Suspense>
      ) : (
        <Fallback minHeight={minHeight} />
      )}
    </div>
  );
};

export default LazySection;
