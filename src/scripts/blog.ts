/**
 * ─────────────────────────────────────────────────────────────
 *  Blog client behaviour
 * ─────────────────────────────────────────────────────────────
 *
 * Loaded only by BlogLayout. Everything is feature-detected and
 * bails out cleanly when the element isn't on the current page,
 * so the same bundle is safe on every blog route.
 *
 * No GSAP, no Alpine dependency here — Alpine handles the nav
 * dropdown declaratively; this file covers the rest.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Reading progress bar (article pages) ───────────────────── */
function initProgress() {
  const bar = document.querySelector<HTMLElement>('[data-reading-progress]');
  const article = document.querySelector<HTMLElement>('[data-article-body]');
  if (!bar || !article) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const start = article.offsetTop;
    const total = article.offsetHeight - window.innerHeight;
    if (total <= 0) {
      bar.style.transform = 'scaleX(1)';
      return;
    }
    const progress = (window.scrollY - start) / total;
    bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

/* ── Table-of-contents scroll spy ───────────────────────────── */
function initToc() {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('.bl-toc a[href^="#"]')
  );
  if (links.length === 0) return;

  const byId = new Map<string, HTMLAnchorElement>();
  const targets: HTMLElement[] = [];
  for (const link of links) {
    const id = decodeURIComponent(link.hash.slice(1));
    const el = document.getElementById(id);
    if (!el) continue;
    byId.set(id, link);
    targets.push(el);
  }
  if (targets.length === 0) return;

  const setActive = (id: string) => {
    for (const link of links) link.classList.remove('is-active');
    byId.get(id)?.classList.add('is-active');
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // Prefer the topmost heading currently inside the reading band.
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    },
    { rootMargin: '-88px 0px -70% 0px', threshold: 0 }
  );
  for (const el of targets) observer.observe(el);
}

/* ── Copy-link button ───────────────────────────────────────── */
function initCopyLink() {
  for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-copy-link]')) {
    btn.addEventListener('click', async () => {
      const url = btn.dataset.copyLink ?? window.location.href;
      const label = btn.querySelector<HTMLElement>('[data-copy-label]');
      if (!label) return;
      const original = label.textContent ?? '';
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // Clipboard API needs a secure context; fall back to selection.
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
      }
      label.textContent = btn.dataset.copiedLabel ?? 'Copied!';
      window.setTimeout(() => { label.textContent = original; }, 1800);
    });
  }
}

/* ── Nav: solid-ish glass once the page scrolls ─────────────── */
function initNavScroll() {
  const nav = document.querySelector<HTMLElement>('[data-blog-nav]');
  if (!nav) return;
  const update = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── Grid: search + per-grid pagination, one controller ──
   Multiple `[data-paged-grid]` blocks can live on the same page (the
   blog index has one, the tools page can have several). Each grid
   picks its own pager by matching `data-paged-grid="name"` on the
   grid to `data-pager="name"` on the nav.

   Search still runs across the whole document (`[data-searchable]`
   items) — when active it bypasses pagination and shows every match;
   fixed-page cells like the newsletter bento hide during search.

   Transition: `data-transition="flip"` (default) or `"slide"`. The
   flip is a 3D Y-rotation, the slide is a horizontal translate. Both
   use the same two-phase out→swap→in choreography.               */

interface GridController {
  apply(searching: boolean): void;
}

function setupPagedGrid(grid: HTMLElement): GridController {
  const name = grid.dataset.pagedGrid || '';
  const totalPages = Number(grid.dataset.totalPages || '1');
  const transition = grid.dataset.transition === 'slide' ? 'slide' : 'flip';
  const slots = Array.from(grid.querySelectorAll<HTMLElement>('[data-page]'));

  // Pager pairing: named or unnamed. Unnamed grid takes the first
  // unnamed pager on the page.
  const pager = name
    ? document.querySelector<HTMLElement>(`[data-pager="${name}"]`)
    : document.querySelector<HTMLElement>('[data-pager]:not([data-pager]:not([data-pager=""]))') ??
      document.querySelector<HTMLElement>('[data-pager]');
  const pageBtns = pager
    ? Array.from(pager.querySelectorAll<HTMLButtonElement>('[data-goto-page]'))
    : [];
  const prevBtn = pager?.querySelector<HTMLButtonElement>('[data-page-prev]') ?? null;
  const nextBtn = pager?.querySelector<HTMLButtonElement>('[data-page-next]') ?? null;

  const outCls = transition === 'slide' ? 'is-sliding-out' : 'is-flipping-out';
  const inCls  = transition === 'slide' ? 'is-sliding-in'  : 'is-flipping-in';

  let page = 1;
  let animating = false;

  const paint = (searching: boolean) => {
    let idx = 0;
    for (const slot of slots) {
      const itemPage = Number(slot.dataset.page || '0');
      const isSearchable = slot.hasAttribute('data-searchable');

      if (searching) {
        // Search-only mode: [data-searchable] slots keep whatever the
        // search filter set on them; fixed cells (newsletter, page-only
        // widgets) hide because search can't match them.
        if (!isSearchable) slot.hidden = true;
      } else {
        slot.hidden = itemPage !== page;
      }
      if (!slot.hidden) slot.style.setProperty('--i', String(idx++));
    }
    if (pager) {
      pager.hidden = searching || totalPages <= 1;
      for (const btn of pageBtns) {
        const n = Number(btn.dataset.gotoPage);
        btn.classList.toggle('is-active', n === page);
        if (n === page) btn.setAttribute('aria-current', 'page');
        else btn.removeAttribute('aria-current');
      }
      prevBtn?.toggleAttribute('disabled', page <= 1);
      nextBtn?.toggleAttribute('disabled', page >= totalPages);
    }
  };

  const goTo = (n: number) => {
    if (animating) return;
    n = Math.max(1, Math.min(totalPages, n));
    if (n === page) return;
    animating = true;

    grid.classList.add(outCls);
    const outMs = 360 + 5 * 45;
    window.setTimeout(() => {
      page = n;
      paint(false);
      grid.classList.remove(outCls);
      grid.classList.add(inCls);
      window.setTimeout(() => {
        grid.classList.remove(inCls);
        animating = false;
      }, 500 + 6 * 60);
    }, outMs);

    // Scroll the grid back into view so the reader sees the new page.
    const rect = grid.getBoundingClientRect();
    if (rect.top < 0 || rect.top > 200) {
      window.scrollTo({
        top: window.scrollY + rect.top - 90,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    }
  };

  for (const btn of pageBtns) {
    btn.addEventListener('click', () => goTo(Number(btn.dataset.gotoPage)));
  }
  prevBtn?.addEventListener('click', () => goTo(page - 1));
  nextBtn?.addEventListener('click', () => goTo(page + 1));

  return { apply: paint };
}

function initGrid() {
  const input = document.querySelector<HTMLInputElement>('[data-post-search]');
  const grids = Array.from(document.querySelectorAll<HTMLElement>('[data-paged-grid]'));

  if (!input && grids.length === 0) return;

  const controllers = grids.map(setupPagedGrid);

  // ── Search across [data-searchable] items on the page ─────
  const scopeSel = input?.dataset.postSearch || '[data-searchable]';
  const searchItems = input
    ? Array.from(document.querySelectorAll<HTMLElement>(scopeSel))
    : [];
  const empty = document.querySelector<HTMLElement>('[data-search-empty]');
  const counter = document.querySelector<HTMLElement>('[data-search-count]');
  // Archive month headings hide when every row inside is filtered out.
  const searchGroups = Array.from(document.querySelectorAll<HTMLElement>('[data-search-group]'));

  if (input) {
    // The nav search box submits ?q= to the archive — prefill so the
    // reader's query applies on arrival.
    const q = new URLSearchParams(window.location.search).get('q');
    if (q && input.value === '') input.value = q;
  }

  const applyAll = () => {
    const query = (input?.value ?? '').trim().toLowerCase();
    const searching = query !== '';
    let shown = 0;
    for (const item of searchItems) {
      const haystack = (item.dataset.searchIndex ?? item.textContent ?? '').toLowerCase();
      const matches = !searching || haystack.includes(query);
      item.hidden = !matches;
      if (matches) shown++;
    }
    for (const group of searchGroups) {
      group.hidden = !group.querySelector<HTMLElement>(`${scopeSel}:not([hidden])`);
    }
    // Empty-state only fires when the reader was actively searching.
    if (empty) empty.hidden = !searching || shown !== 0;
    if (counter) counter.textContent = String(shown);
    for (const c of controllers) c.apply(searching);
  };

  let timer = 0;
  input?.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(applyAll, 120);
  });
  input?.addEventListener('search', applyAll);

  // Initial paint — search-driven when there's an input, else grids-only.
  if (input) applyAll();
  else for (const c of controllers) c.apply(false);
}

/* ── Newsletter → mailto handoff ────────────────────────────── */
function initNewsletter() {
  for (const form of document.querySelectorAll<HTMLFormElement>('[data-newsletter]')) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = new FormData(form).get('email');
      const mailto = form.dataset.mailto ?? '';
      if (!mailto) return;
      const subject = encodeURIComponent(form.dataset.subject ?? 'Subscribe');
      const body = encodeURIComponent(`${form.dataset.body ?? ''}\n\nEmail: ${String(email ?? '')}`);
      window.location.href = `${mailto}?subject=${subject}&body=${body}`;
    });
  }
}

/* ── Outbound links inside article prose ────────────────────
   Markdown links to other sites open in a new tab so the reader
   doesn't lose their place mid-article. target and rel are set
   together, so a link is never _blank without noopener.

   Done here rather than with a rehype plugin because Astro 7's
   default markdown processor would require installing
   @astrojs/markdown-remark, and AGENTS.md forbids adding
   dependencies without the owner's approval. These stay *followed*
   links on purpose — they're editorial references, and outbound
   links to relevant sources help rather than hurt. The curated
   Tools page marks its links nofollow in the HTML itself.        */
function markExternalProseLinks() {
  const origin = window.location.origin;
  for (const a of document.querySelectorAll<HTMLAnchorElement>('.bl-prose a[href]')) {
    const href = a.getAttribute('href') ?? '';
    if (!/^https?:\/\//i.test(href) || href.startsWith(origin)) continue;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }
}

/* ── Wide tables get a horizontal scroll wrapper ────────────── */
function wrapTables() {
  for (const table of document.querySelectorAll<HTMLTableElement>('.bl-prose table')) {
    if (table.parentElement?.classList.contains('bl-table-wrap')) continue;
    const wrap = document.createElement('div');
    wrap.className = 'bl-table-wrap';
    table.replaceWith(wrap);
    wrap.appendChild(table);
  }
}

function boot() {
  if (!reduceMotion) initProgress();
  initNavScroll();
  initToc();
  initCopyLink();
  initGrid();
  initNewsletter();
  markExternalProseLinks();
  wrapTables();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

export {};
