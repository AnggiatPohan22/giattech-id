/**
 * Sidebar scroll controller
 * - Tracks which <section data-theme> the sidebar sits over
 * - Writes activeSection + colour mode into the Alpine data scope
 * - Reduced-motion fallback: reveals the sidebar directly by inline style
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

  const pick = (): void => {
    const probe = window.innerHeight * 0.45;
    let cur: HTMLElement | undefined = sections[0];
    for (const el of sections) {
      if (el.getBoundingClientRect().top <= probe) cur = el;
    }
    if (!cur) return;
    const scope = alpine.$data(sidebar);
    if (scope.active !== cur.id) scope.active = cur.id;
    const t = cur.getAttribute('data-theme') as 'light' | 'dark' | null;
    if (t && scope.mode !== t) scope.mode = t;
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
