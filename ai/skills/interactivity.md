# Skill: Interactivity — Alpine.js Patterns

## Setup

Alpine.js is initialized in `src/scripts/alpine-init.ts` and loaded
in Layout.astro via script tag.

## Component Patterns

### 1. Navbar Scroll + Mobile Menu

```html
<nav
  x-data="{
    scrolled: false,
    mobileOpen: false
  }"
  x-init="
    window.addEventListener('scroll', () => {
      scrolled = window.scrollY > 50
    })
  "
  :class="scrolled ? 'bg-[#0C0C0C]/95 backdrop-blur-md border-b border-[#1F1F1F]' : 'bg-transparent'"
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
>
  <!-- Desktop nav items -->
  <!-- Mobile hamburger: @click="mobileOpen = !mobileOpen" -->
  <!-- Mobile overlay: x-show="mobileOpen" x-transition -->
</nav>
```

### 2. FAQ Accordion

```html
<div x-data="{ active: null }">
  {faqs.map((faq, i) => (
    <div class="border-b border-[#1F1F1F]">
      <button
        @click={`active = active === ${i} ? null : ${i}`}
        class="w-full flex justify-between items-center py-6 text-left"
      >
        <span class="text-lg font-medium">{faq.question}</span>
        <span
          :class={`active === ${i} ? 'rotate-45' : ''`}
          class="transition-transform duration-300 text-[--color-accent]"
        >+</span>
      </button>
      <div
        x-show={`active === ${i}`}
        x-collapse
        class="pb-6 text-[--color-text-muted]"
      >
        {faq.answer}
      </div>
    </div>
  ))}
</div>
```

### 3. Testimonial Carousel

```html
<div
  x-data="{
    current: 0,
    total: testimonials.length,
    autoplay: null,
    next() { this.current = (this.current + 1) % this.total },
    prev() { this.current = (this.current - 1 + this.total) % this.total },
    startAutoplay() {
      this.autoplay = setInterval(() => this.next(), 5000)
    },
    stopAutoplay() {
      clearInterval(this.autoplay)
    }
  }"
  x-init="startAutoplay()"
  @mouseenter="stopAutoplay()"
  @mouseleave="startAutoplay()"
>
  <!-- Show testimonial[current] with transition -->
  <!-- Dot indicators: click to set current -->
</div>
```

### 4. Sidebar Section Navigation

```html
<nav
  x-data="{
    activeSection: 'hero',
    sections: ['hero','about','services','projects','pricing','testimonials','faq']
  }"
  x-init="
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) activeSection = e.target.id
      })
    }, { threshold: 0.3 });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  "
  class="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
>
  <!-- Dot per section, active = sage green -->
</nav>
```

### 5. Timeline "Read More" Toggle

```html
<div x-data="{ expanded: false }">
  <p class="line-clamp-2">{shortDescription}</p>
  <button @click="expanded = !expanded" class="text-[--color-accent] mt-2">
    <span x-text="expanded ? 'Show less' : 'Read more'"></span>
  </button>
  <div x-show="expanded" x-collapse>
    {fullContent}
  </div>
</div>
```

## Rules
- Keep Alpine logic minimal — UI state only
- No API calls or heavy computation in Alpine
- Use `x-cloak` on elements that flash before Alpine loads
- Add `[x-cloak] { display: none !important; }` in global.css
