# SEO Audit — ibrahimayed.com

**Auditor:** SEO review against Google's 2025 ranking signals, Core Web Vitals, structured data guidelines, and local SEO best practices for Muscat, Oman.
**Audit date:** 2026-05-04
**Site type:** Single-page React/Vite SPA, freelance services landing page
**Primary market signals:** Muscat (OM), worldwide secondary

---

## Executive summary

The technical foundation is above average for a freelance landing page — you already have JSON-LD, OpenGraph, Twitter Card, sitemap, robots, canonical, and a focused single-purpose page. Three issues are holding you back, and a handful of moderate issues are leaving free traffic on the table. Fix the three Criticals first; everything else is incremental.

**Score (rough):** 6.5 / 10. Solid baseline, missing the multipliers.

---

## Critical issues (fix first — these block rankings or break previews)

### C1. The page is client-side rendered. Search bots and link unfurlers see an empty `<div id="root">`.

The served HTML body contains literally `<div id="root"></div>`. All content (services, pricing, FAQs, testimonials) is injected by JavaScript at runtime. Googlebot can render JS, but:

- Indexing is delayed (rendering tier is a separate, slower queue)
- Bing, DuckDuckGo, Yandex, Baidu have weaker JS rendering — you may not appear at all
- LinkedIn's link previewer doesn't run JS, only OG tags work
- AI crawlers (Perplexity, ChatGPT crawler, Claude crawler) read static HTML primarily

**Fix:** Add static prerendering at build time. For your single-page site, install `vite-plugin-prerender-spa` or migrate to a static-by-default framework like Astro. The cheapest path:

```bash
npm install -D vite-plugin-prerender
```

```ts
// vite.config.ts
import { prerender } from 'vite-plugin-prerender'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    prerender({
      routes: ['/'],
      renderer: '@prerenderer/renderer-puppeteer',
    }),
  ],
})
```

Bigger but better: rewrite the landing page in **Astro** with React islands for interactive bits (mobile menu, FAQ accordion, contact form). You'd keep all your shadcn components, ship 90% less JS, and serve pure HTML to crawlers. Recommended.

### C2. OpenGraph image is SVG — many platforms refuse to render it.

`og-image.svg` works on Twitter and recent Slack, but **WhatsApp, Facebook, LinkedIn, iMessage, and Discord don't reliably preview SVG OG images**. Most of your shareable traffic in Oman comes through WhatsApp.

**Fix:** Generate a 1200×630 PNG (`og-image.png`). Tool: `https://og-image.vercel.app` or build one with Figma. Update `index.html`:

```html
<meta property="og:image" content="https://ibrahimayed.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Ibrahim Ayed — Smart Digital Solutions for Growing Businesses" />
```

Keep the SVG as a secondary `og:image` if you want — most platforms use the first.

### C3. The site targets Muscat customers but doesn't say "Muscat" or "Oman" anywhere indexable.

Your `<title>`, `<h1>`, meta description, and visible body copy never mention Muscat or Oman. The only place is the JSON-LD `addressLocality` and a small "Based in Muscat" badge in the hero — neither is keyword-weight content. Result: you'll never rank for "web developer Muscat" or "web design Oman" — both being searched 100s of times/month.

**Fix:** Rewrite the title and meta to include geo intent without sounding spammy:

```html
<title>Web Developer in Muscat, Oman | Websites, E-commerce & Booking Systems — Ibrahim Ayed</title>

<meta
  name="description"
  content="Ibrahim Ayed — freelance web developer based in Muscat. Custom websites, web apps, e-commerce stores, and booking systems for businesses in Oman and worldwide."
/>
```

Update the H1 to keep the brand promise but include geo context further down — or better, add a single line in the Hero subtitle like *"Based in Muscat. Building for Omani businesses and clients worldwide."*

---

## Important improvements (medium impact, do within 2 weeks)

### I1. No Arabic version. You're invisible to Arabic-language local search.

Around 60% of Oman residents search in Arabic for local services. You're competing only in English search results.

**Fix:** Either (a) add an Arabic translation at `/ar/` with `hreflang` alternates, or (b) at minimum, sprinkle Arabic search terms into the page (h2 caption with the Arabic equivalent) and add Arabic keywords to JSON-LD. If you build a real `/ar/` page, add to `<head>`:

```html
<link rel="alternate" hreflang="en" href="https://ibrahimayed.com/" />
<link rel="alternate" hreflang="ar" href="https://ibrahimayed.com/ar/" />
<link rel="alternate" hreflang="x-default" href="https://ibrahimayed.com/" />
```

### I2. Schema.org type is `ProfessionalService` but `LocalBusiness` would unlock the local pack.

Google's local 3-pack and Maps suggestions weight `LocalBusiness` (and its subtypes) heavily. Replace the JSON-LD with this:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ibrahimayed.com/#business",
  "name": "Ibrahim Ayed",
  "url": "https://ibrahimayed.com/",
  "image": "https://ibrahimayed.com/og-image.png",
  "logo": "https://ibrahimayed.com/favicon.svg",
  "email": "ibrahim@ibrahimayed.com",
  "telephone": "+96890667053",
  "priceRange": "OMR 200 - OMR 700+",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Muscat",
    "addressRegion": "Muscat Governorate",
    "addressCountry": "OM"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 23.5859,
    "longitude": 58.4059
  },
  "areaServed": [
    { "@type": "Country", "name": "Oman" },
    { "@type": "Place", "name": "Worldwide" }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Sunday","Monday","Tuesday","Wednesday","Thursday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://github.com/IbrahimAyed1",
    "https://www.linkedin.com/in/ibrahim-ayed/"
  ]
}
```

Replace `latitude`/`longitude` with your actual area's coordinates (don't pin your home). Add real social URLs.

### I3. FAQ section is static — wrap it in FAQPage schema for rich snippets.

Your four FAQs (`I do not have a domain or hosting…`, etc.) are exactly what Google's FAQ rich result is built for. Adding the schema makes them appear directly in search results, which can multiply your CTR by 2-3x.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "I do not have a domain or hosting. Can you help?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. I handle the technical setup including domain registration, hosting, and SSL certificate. You do not need to worry about any of that."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build a digital solution?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Starter solution typically takes 1-2 weeks. Business and Growth packages take 3-4 weeks depending on features."
      }
    },
    {
      "@type": "Question",
      "name": "Can I update the solution myself after it is built?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. I build with easy-to-manage systems and provide a short training session so you can update text, images, and products on your own."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer payment in installments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. For Business and Growth packages, you can pay 50% upfront and 50% upon completion."
      }
    }
  ]
}
</script>
```

### I4. Testimonials aren't marked up — wasted social proof signal.

Your two testimonials (Ahmed Al-Rashdi, Fatima Al-Balushi) are gold. Wrap them in `Review` schema attached to your `LocalBusiness`:

```json
"review": [
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Ahmed Al-Rashdi" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": "We didn't have a website and were losing customers..."
  }
],
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5.0",
  "reviewCount": "2"
}
```

Note: Google's policy now requires reviews to be verifiable on third-party platforms (Google Business Profile, Trustpilot) for them to show as rich results. Set up a Google Business Profile and migrate testimonials there.

### I5. Sitemap is incomplete.

Current `sitemap.xml` has one URL with no `<lastmod>`. Add it, plus optionally pre-rendered anchor sections if you split them into routes:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ibrahimayed.com/</loc>
    <lastmod>2026-05-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Update `<lastmod>` on every meaningful content change.

### I6. Favicon-only is incomplete for crawlers and devices.

Only `favicon.svg` exists. Add for full coverage:

- `favicon.ico` (multi-size 16/32/48 — for IE, RSS, old browsers)
- `apple-touch-icon.png` (180×180 — iOS home screen)
- `icon-192.png` and `icon-512.png` (PWA / Android)
- `site.webmanifest` (for PWA)

Generate the full set at `https://realfavicongenerator.net` — drag your SVG, download, drop in `public/`.

### I7. Google Search Console verification not visible.

Need to confirm whether you've verified the site in **Google Search Console** and **Bing Webmaster Tools**. Without these you're flying blind on impressions, queries, indexing issues, and Core Web Vitals.

**Fix:**
1. `https://search.google.com/search-console` → Add property → enter `ibrahimayed.com` → verify via DNS TXT record (Cloudflare → DNS → add the TXT they give you).
2. Submit `https://ibrahimayed.com/sitemap.xml`.
3. Same for `https://www.bing.com/webmasters`.
4. (Optional) Set up Cloudflare Web Analytics — privacy-friendly, no cookie banner needed, free.

---

## Performance — Core Web Vitals (a Google ranking signal)

Without measuring the deployed site I can't give exact numbers, but the codebase tells me:

- **LCP (Largest Contentful Paint):** Likely 2-3s. The hero text appears only after JS bundle parses and React hydrates. Prerendering (C1) drops this to ~0.5-1s.
- **JS bundle size:** Vite + React 19 + Framer Motion + Firebase + Firestore + Radix UI ≈ probably 300-400 KB gzipped. Hefty for a landing page.
- **Firebase is loaded eagerly** but only used for the contact form. Code-split it:

```ts
// In Home.tsx
const handleSubmit = async (event) => {
  // …
  const { db, missingFirebaseConfig } = await import('@/lib/firebase')
  const { addDoc, collection, serverTimestamp } = await import('firebase/firestore')
  // …
}
```

That alone removes ~80 KB from the initial bundle.

- **Framer Motion** is ~50 KB gzipped. Most of your animations are simple fade-ups that CSS or `@formkit/auto-animate` (~3 KB) could handle. Replacing it would be a bigger refactor.
- Add `<link rel="preconnect" href="https://firestore.googleapis.com">` in `<head>` so Firestore connection starts in parallel with JS parsing.
- Set up Cloudflare's Speed → Optimization → enable **Auto Minify, Brotli, Early Hints, HTTP/3, 0-RTT**.

---

## Content & on-page

### Title tag
Current: `Smart Digital Solutions for Growing Businesses | Ibrahim Ayed` (55 chars — fine length, no geo, no keyword variety)
Recommended: `Web Developer in Muscat, Oman | Websites & Booking Systems — Ibrahim Ayed` (70 chars — slightly long, will get truncated to ~60 in SERP, that's OK because the front-loaded keywords still show)

### H1
Current: `Smart Digital Solutions for Growing Businesses` (good — clear value prop, no keyword stuffing)
Keep as is, but make sure `Web Developer Muscat` appears as H2 or in a prominent paragraph below.

### Heading hierarchy
Mostly correct: H1 in Hero, H2s in each section. The "4-Step Process" cards use `<h3>` inside — good. Only minor issue: PricingSection plan names use `<h3>` after an `<h2>` — correct.

### Internal linking
There's only one page so internal linking is N/A. **Recommendation:** start a `/blog/` with 1 post/month covering local-search-friendly topics (e.g., "How to choose between Shopify and a custom store for an Omani business", "What does a booking system cost in Oman?", "Web design pricing in Muscat — what's fair in 2026"). Each post should internal-link back to the home page services. This is the single biggest long-term SEO lever for a single-page site.

### Calls to action
"Get a Quote", "Start Your Project", "View Services" — clean, action-oriented. Good.

### Mobile UX
You use Tailwind's responsive classes throughout. The hero text scales correctly (`text-4xl sm:text-5xl lg:text-7xl`). Mobile menu works. Looks solid without testing.

---

## Off-page / authority signals (the long game)

These don't live in your code but matter more than anything technical for a freelance site:

1. **Google Business Profile** — Sign up, verify your Muscat location, add services, request reviews from past clients. This is ~30% of local SEO ranking weight.
2. **Backlinks from local Omani sites** — Get listed in Omani business directories (Yellowpages.om, OmanInfoline, etc.).
3. **GitHub contribution graph** — You're at `IbrahimAyed1` on GitHub. Make sure your README links back to `ibrahimayed.com`. Do-follow link from a high-authority domain.
4. **LinkedIn presence** — Add `ibrahimayed.com` to your LinkedIn intro, post case studies linking back.
5. **Schema-aware platforms** — Behance, Dribbble, ProductHunt — each one with `ibrahimayed.com` in the bio adds authority.

---

## Prioritized 30-day action plan

| Priority | Task | Effort | Impact |
|---|---|---|---|
| 1 | Fix C2 — generate PNG OG image | 30 min | High |
| 2 | Fix C3 — add geo keywords to title/meta/copy | 1 hr | High |
| 3 | Fix I3 — add FAQPage schema | 30 min | High |
| 4 | Fix I2 — upgrade to LocalBusiness schema | 30 min | High |
| 5 | Verify Google Search Console + submit sitemap (I7) | 30 min | High |
| 6 | Set up Google Business Profile (off-page) | 2 hr | Very High (long-term) |
| 7 | Generate full favicon set (I6) | 15 min | Medium |
| 8 | Code-split Firebase out of initial bundle | 1 hr | Medium |
| 9 | Update sitemap with `<lastmod>` (I5) | 5 min | Low |
| 10 | Plan C1 — prerendering or migration to Astro | Ongoing | Very High |
| 11 | Plan I1 — Arabic version | Ongoing | High (regional) |
| 12 | Start a blog with 1 post/month | Ongoing | Highest long-term |

Items 1-5 + 7-9 are doable in a weekend. Items 6, 10, 11, 12 are weeks-to-months work but compound over time.

---

## What's already good (don't change these)

- Canonical URL set correctly to apex
- `robots.txt` allows all and references sitemap
- HTTPS via Cloudflare with proper apex DNS
- Meta description present and reasonably sized
- Twitter Card markup with `summary_large_image`
- Theme color set
- Single H1, multiple H2s — clean heading hierarchy
- Mobile-responsive design with proper viewport meta
- Privacy-friendly (no third-party trackers visible in code, contact form goes directly to your Firestore)
- Site is single-purpose (one product, one page) — easier to rank than a sprawling site
