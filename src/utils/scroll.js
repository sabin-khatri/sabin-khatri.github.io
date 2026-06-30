const NAVBAR_OFFSET = 85;

export const SECTION_ORDER = ['home', 'about', 'services', 'projects', 'skills', 'contact'];

export function preloadSectionsUntil(targetId) {
  const idx = SECTION_ORDER.indexOf(targetId);
  if (idx === -1) return;
  window.dispatchEvent(
    new CustomEvent('preload-sections', { detail: SECTION_ORDER.slice(0, idx + 1) })
  );
}

export function preloadAllSections() {
  window.dispatchEvent(
    new CustomEvent('preload-sections', { detail: SECTION_ORDER })
  );
}

export function scrollToSection(id) {
  preloadSectionsUntil(id);

  const attempt = (tries = 0) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      return;
    }
    if (tries < 40) requestAnimationFrame(() => attempt(tries + 1));
  };

  attempt();
}

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
