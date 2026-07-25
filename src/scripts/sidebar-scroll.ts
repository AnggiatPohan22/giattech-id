/**
 * Sidebar scroll controller
 * - Tracks which <section data-theme> the sidebar sits over (for the
 *   active-nav highlight — still driven by a single probe point).
 * - Per box: each element inside the sidebar that carries the attribute
 *   [data-sb-observe] gets its own `data-sb-mode` updated based on
 *   whichever section is directly behind that box's vertical midpoint.
 *   So as the user scrolls and a light/dark boundary crosses the
 *   sidebar, the top and bottom boxes can be in different tones for the
 *   duration of the crossing — no single-mode "wait for the whole
 *   sidebar to swap" moment.
 * - Reduced-motion fallback: reveals the sidebar directly by inline style.
 *
 * Kept as its own script (not inside Sidebar.astro or x-init) because
 * Alpine's expression parser doesn't accept multi-statement bodies and
 * Astro's dedupe was skipping the inline script in some builds.
 */

interface SidebarScope {
  active: string;
  mode: 'light' | 'dark';
  copied: boolean;
}

interface AlpineGlobal {
  $data: (el: Element) => SidebarScope;
}

function boot(): void {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const alpine = (window as unknown as { Alpine?: AlpineGlobal }).Alpine;
  if (!alpine) {
    setTimeout(boot, 40);
    return;
  }

  const sections = Array.from(
    document.querySelectorAll<HTMLElement>('section[data-theme]')
  );
  if (!sections.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    const reveal = (): void => {
      if (window.scrollY > window.innerHeight * 0.6) {
        sidebar.style.opacity = '1';
        sidebar.style.visibility = 'visible';
        sidebar.style.transform = 'none';
      }
    };
    reveal();
    window.addEventListener('scroll', reveal, { passive: true });
  }

  // Return the section whose viewport-relative rect contains y, falling
  // back to the last section above y (handles gaps between sections and
  // scroll positions past the last section).
  const sectionAt = (y: number): HTMLElement | undefined => {
    let cur: HTMLElement | undefined = sections[0];
    for (const el of sections) {
      const r = el.getBoundingClientRect();
      if (r.top <= y) cur = el;
      if (r.top <= y && r.bottom >= y) return el;
    }
    return cur;
  };

  // Active-nav probe: the section that owns the "reading position" (top
  // 45% of the viewport). Same behaviour as before — this only drives
  // the pill highlight, not the tone.
  const boxes = Array.from(
    sidebar.querySelectorAll<HTMLElement>('[data-sb-observe]')
  );

  const pick = (): void => {
    const activeProbe = window.innerHeight * 0.45;
    const activeSec = sectionAt(activeProbe);
    if (activeSec) {
      const scope = alpine.$data(sidebar);
      if (scope.active !== activeSec.id) scope.active = activeSec.id;
      // Keep the wrapper-level mode in sync as a fallback for anything
      // that isn't individually observed (e.g. future consumers, or a
      // reduced-motion path that skips the per-box loop).
      const t = activeSec.getAttribute('data-theme') as 'light' | 'dark' | null;
      if (t && scope.mode !== t) scope.mode = t;
    }

    // Per-box tone: probe each observed element at its own midpoint
    // (viewport-relative — the sidebar is position:fixed, so boxes stay
    // put while sections scroll past behind them).
    for (const box of boxes) {
      const r = box.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      const behind = sectionAt(mid);
      if (!behind) continue;
      const tone = behind.getAttribute('data-theme') as 'light' | 'dark' | null;
      if (!tone) continue;
      if (box.getAttribute('data-sb-mode') !== tone) {
        box.setAttribute('data-sb-mode', tone);
      }
    }
  };

  // Throttle with a simple timestamp (rAF was causing "stuck at first
  // section" in browsers where the tab's rAF loop stalls on programmatic
  // scroll — plain time gating fires every ~50ms and always dispatches).
  let last = 0;
  const onScroll = (): void => {
    const now = performance.now();
    if (now - last < 50) return;
    last = now;
    pick();
  };

  pick();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}

(window as unknown as { __sidebarScrollLoaded?: boolean }).__sidebarScrollLoaded = true;

if (document.readyState === 'complete') {
  boot();
} else {
  window.addEventListener('load', boot, { once: true });
}

export {};
