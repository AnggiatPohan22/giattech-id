# Skill: Section Architecture — Giattech Website

## Section Pattern

Every section follows a consistent structure:

```astro
<section
  id="section-name"
  class="relative py-20 lg:py-[120px]"
  data-section="section-name"
>
  <div class="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">
    <SectionHeader
      eyebrow="EYEBROW TEXT"
      heading="Section Heading"
    />
    <!-- Section content -->
  </div>
</section>
```

Rules:
- `id` for anchor links / sidebar nav
- `data-section` for IntersectionObserver (sidebar active state)
- Max width 1280px, centered
- Horizontal padding scales with breakpoint
- `SectionHeader` component used in every section (except Hero, CTA, Footer)

## Section Inventory

| # | Section | id | Has SectionHeader | Special Pattern |
|---|---------|-----|-------------------|----------------|
| 1 | Navbar | — | No | Fixed, transparent→solid |
| 2 | Hero | `hero` | No | Full viewport, custom layout |
| 3 | About | `about` | Yes | Timeline with expandable cards |
| 4 | Services | `services` | Yes | Grid of ServiceCards |
| 5 | Projects | `projects` | Yes | Grid of ProjectCards |
| 6 | Pricing | `pricing` | Yes | 3-column PricingCards |
| 7 | Testimonials | `testimonials` | Yes | Carousel slider |
| 8 | FAQ | `faq` | Yes | Accordion |
| 9 | CTA | `cta` | No | Standalone CTA block |
| 10 | Footer | — | No | Multi-column footer |
| — | Sidebar Nav | — | No | Fixed right, dots |

## Layout Patterns from Reference

### Hero Layout
The reference uses a split layout:
- Left: large personal photo
- Right: text content (headline, sub, stats, CTAs)
- Bottom: scrolling logo marquee of client brands
- Background: subtle gradient or pattern
- The floating keyword tags add visual interest

### Timeline (About)
The reference's timeline is the most distinctive section:
- Vertical line with year markers
- Each entry looks like a social media post:
  - Small images (2 images per entry, rounded)
  - @username tag + "X years ago" label
  - Title + short description
  - "Read more" that expands to show full story with larger image
- Entries alternate or stack vertically
- Year labels: large, muted color

### Project Cards
Reference uses full-width cards with:
- Large thumbnail covering most of the card
- Numbered index (01, 02, 03) in top-left
- Tags as small badges
- Project name + one-line description at bottom
- Hover: subtle scale + darker overlay

### Pricing Cards
Three cards side by side:
- Each has: plan name, price, feature list, CTA button
- Middle card may be visually distinct (highlighted border or accent)
- Feature items: checkmark icon + text
- Clean, structured layout

### Testimonial Cards
Each testimonial:
- Bold heading that summarizes the testimonial (like "Trusted long-term collaborator.")
- Full quote text below
- Client info at bottom: photo (small circle), name, role, company link
- Cards slide horizontally or fade between

### FAQ Accordion
- Clean list of questions
- Click to expand → answer slides down
- Icon rotates (+ to x or chevron)
- Only one open at a time
- Question text: white, answer text: muted
