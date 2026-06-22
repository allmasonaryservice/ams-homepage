# AMS Homepage — Animation Documentation

## ১. Scroll Reveal Animation (Custom)

### নাম
**Scroll Reveal** — `[data-reveal]` system

### কীভাবে কাজ করে
- `IntersectionObserver` API দিয়ে বানানো — কোনো third-party library নেই
- Element viewport এ enter করলে `revealed` class add হয় → CSS transition চলে
- Element viewport থেকে বের হলে `revealed` class remove হয় → আবার hidden হয়
- একই session এ বারবার scroll করলে animation বারবার replay হয়

### Effect
| Property | Value |
|---|---|
| Initial state | `opacity: 0` + `translateY(42px)` (42px নিচ থেকে) |
| Final state | `opacity: 1` + `translateY(0)` |
| Duration | `0.85s` |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` (smooth ease-out) |
| Trigger | Element এর 12% viewport এ enter করলে |

### Stagger Delay
CSS variable `--rd` দিয়ে প্রতিটা element এর delay আলাদা আলাদা:
```html
<div data-reveal style="--rd:80ms">...</div>
```

### Global Code Location
`src/layouts/Layout.astro` — CSS + IntersectionObserver script

---

## ২. কোন Section এ কী Animate হয়

### ABOUT OUR COMPANY (`About.astro`)

| Element | Class | Delay |
|---|---|---|
| Photo / image side | `.about-left` | 0ms |
| "ABOUT OUR COMPANY" badge | `.about-eyebrow` | 0ms |
| "Built on experience" heading | `.about-heading` | 80ms |
| Description paragraph | `.about-desc` | 160ms |
| 3-item feature list | `.about-features` | 240ms |
| "Learn more about us" button | `.about-cta` | 320ms |

---

### EXPERT MASONRY SERVICES (`Services.astro`)

| Element | Class | Delay |
|---|---|---|
| "WHAT WE DO" eyebrow label | `.services-eyebrow` | 0ms |
| "Expert masonry services" heading | `.services-heading` | 80ms |
| Tuckpointing card | `.svc-card` (1st) | 0ms |
| Brick Repair card | `.svc-card` (2nd) | 80ms |
| Chimney card | `.svc-card` (3rd) | 160ms |
| Stone Installation card | `.svc-card` (4th) | 240ms |
| Natural Stone card | `.svc-card` (5th) | 320ms |
| Commercial Masonry card | `.svc-card` (6th) | 400ms |
| Bottom CTA bar (availability + "View all") | `.services-cta-bar` | 80ms |

> প্রতিটা card এর ভেতরের image, title (h3), description (p) সব কার্ডের সাথেই animate হয়।

---

### WHY CHOOSE US (`WhyUs.astro`)

> ডান দিকের image grid (`.whu-cell`) এবং stat overlay (`.whu-stat-card`) GSAP দিয়ে আলাদাভাবে animate হয় — ওগুলো এই system এর বাইরে।
> শুধু **বাম দিকের text column** এ Scroll Reveal লাগানো হয়েছে।

| Element | Delay |
|---|---|
| "Why Choose Us" eyebrow | 0ms |
| "Built on brick, stone, and trust" heading | 80ms |
| Description paragraph | 160ms |
| 3-item feature list | 240ms |
| Stats bar (500+, 19+, 4.8★) | 320ms |

---

### WHERE WE WORK (`ServiceAreas.astro`)

| Element | Class | Delay |
|---|---|---|
| Header (eyebrow + heading + desc) | `.sa-header` | 0ms |
| Leaflet map | `.sa-map-wrap` | 120ms |
| City list + CTA | `.sa-sidebar` | 220ms |

---

## ৩. যেসব Section এ এই Animation নেই

এই section গুলো নিজস্ব GSAP animation দিয়ে চলে:

| Section | Animation System |
|---|---|
| **HeroSequence** | Custom GSAP sequence (intro panel + hero reveal) |
| **Process** | GSAP ScrollTrigger — step stagger + active highlight scrub |
| **WhyUs** (image grid) | GSAP ScrollTrigger — scale + stagger reveal |
| **Testimonials** | 300vh scroll-driver parallax |
| **FAQ** | GSAP ScrollTrigger — heading, tabs, panels |
| **Contact / FREE INSPECTION** | GSAP ScrollTrigger — eyebrow, heading, bg, glass, form card |

এই section গুলোতে `data-reveal` যোগ করা হয়নি কারণ conflict হত।

যেসব section এ কোনো animation নেই:
- **Projects** — শুধু card hover effect
- **Footer** — শুধু link hover

---

## ৪. Phone / Mobile Support

হ্যাঁ, সব modern mobile browser এ কাজ করে:
- iOS Safari 12.2+
- Chrome for Android
- Samsung Internet

`IntersectionObserver` + CSS `transition` — GPU-accelerated, mobile-friendly।

---

## ৫. কীভাবে নতুন Element এ Add করবে

যেকোনো element এ Scroll Reveal যোগ করতে শুধু `data-reveal` attribute দাও:

```html
<!-- Basic (no delay) -->
<div data-reveal>...</div>

<!-- With delay -->
<div data-reveal style="--rd:150ms">...</div>
```

Delay বাড়াতে বা কমাতে `--rd` এর value পরিবর্তন করো।

Animation এর speed বা distance পরিবর্তন করতে `src/layouts/Layout.astro` এর এই CSS অংশ edit করো:

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(42px);   /* ← distance: বাড়ালে বেশি নিচ থেকে আসে */
  transition: opacity 0.85s ..., /* ← duration: বাড়ালে slow হয় */
              transform 0.85s ...;
}
```
