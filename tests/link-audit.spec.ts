import { test, expect, type Page } from '@playwright/test';

// ─── Known slugs ───────────────────────────────────────────────────────────
const SERVICE_SLUGS = [
  'tuckpointing-repointing',
  'brick-installation',
  'damaged-brick-replacement',
  'chimney-repair-rebuilding',
  'chimney-fireplace',
  'natural-stone-limestone',
  'brick-stone-veneers',
  'cmu-block-installation',
  'commercial-brick-stone',
  'commercial-masonry-veneers',
  'custom-home-masonry',
];

const CITY_SLUGS = [
  'winnetka', 'wilmette', 'kenilworth', 'glencoe', 'evanston',
  'highland-park', 'northbrook', 'hinsdale', 'oak-brook', 'elmhurst',
  'western-springs', 'la-grange', 'burr-ridge', 'naperville',
  'downers-grove', 'clarendon-hills', 'willowbrook', 'wheaton', 'chicago',
];

const ALL_PAGES = [
  '/',
  '/about',
  '/service-areas',
  '/contact',
  '/services',
  '/projects',
  '/faq',
  ...SERVICE_SLUGS.map(s => `/services/${s}`),
  ...CITY_SLUGS.map(c => `/locations/${c}`),
];

// ─── Helpers ───────────────────────────────────────────────────────────────
async function getInternalLinks(page: Page): Promise<string[]> {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]'))
      .map(a => (a as HTMLAnchorElement).getAttribute('href') || '')
      .filter(h =>
        h.startsWith('/') ||
        h.startsWith('http://localhost') ||
        h.startsWith('http://127.0.0.1')
      )
      .map(h => h.replace(/^https?:\/\/localhost:\d+/, '').replace(/^https?:\/\/127\.0\.0\.1:\d+/, ''))
  );
}

async function checkLink(page: Page, href: string, sourcePage: string): Promise<{ ok: boolean; status: number; url: string }> {
  const path = href.split('#')[0] || '/';
  const res = await page.request.get(`http://localhost:4321${path}`);
  return { ok: res.ok(), status: res.status(), url: href };
}

// ─── ISSUE LOG ──────────────────────────────────────────────────────────────
const ISSUES: string[] = [];

// ─── TESTS ──────────────────────────────────────────────────────────────────

test.describe('AMS Full Site Link Audit', () => {

  // 1. Every page returns 200
  test('all pages load with 200', async ({ page }) => {
    for (const path of ALL_PAGES) {
      const res = await page.goto(`http://localhost:4321${path}`, { waitUntil: 'domcontentloaded' });
      const status = res?.status() ?? 0;
      if (status !== 200) {
        ISSUES.push(`PAGE 404: ${path} returned ${status}`);
      }
      expect(status, `${path} should return 200`).toBe(200);
    }
  });

  // 2. Homepage — all sections and links
  test('homepage: service cards link to correct slugs', async ({ page }) => {
    await page.goto('/');
    const links = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.svc-card[href]'))
        .map(a => (a as HTMLAnchorElement).href)
    );
    const badSlug = ['/services/tuckpointing', '/services/brick-repair', '/services/chimney',
      '/services/installation', '/services/natural-stone', '/services/commercial'];
    for (const l of links) {
      const path = new URL(l).pathname;
      const isBad = badSlug.some(b => path === b);
      if (isBad) ISSUES.push(`HOME svc-card wrong slug: ${path}`);
      expect(isBad, `Service card slug "${path}" should use full slug`).toBe(false);
      expect(SERVICE_SLUGS.some(s => path === `/services/${s}`),
        `Service card "${path}" should match a known service slug`).toBe(true);
    }
  });

  test('homepage: CTA buttons go to /contact#form', async ({ page }) => {
    await page.goto('/');
    const ctaLinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a'))
        .filter(a => {
          const text = a.textContent?.toLowerCase() || '';
          const href = a.getAttribute('href') || '';
          return (text.includes('estimate') || text.includes('inspection') || text.includes('quote'))
            && href.includes('/contact');
        })
        .map(a => ({ text: a.textContent?.trim(), href: a.getAttribute('href') }))
    );
    for (const cta of ctaLinks) {
      if (!cta.href?.includes('#form')) {
        ISSUES.push(`HOME CTA missing #form: "${cta.text}" → ${cta.href}`);
      }
      expect(cta.href, `CTA "${cta.text}" should link to /contact#form`).toContain('#form');
    }
  });

  // 3. Navbar (on all non-homepage pages) — check service + contact links
  test('navbar: all service dropdown links correct', async ({ page }) => {
    await page.goto('/about'); // page using Navbar.astro
    const dropdownLinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.dropdown-link[href], .mobile-sublink[href]'))
        .map(a => (a as HTMLAnchorElement).getAttribute('href') || '')
    );
    for (const href of dropdownLinks) {
      if (href.startsWith('/services/')) {
        const slug = href.replace('/services/', '');
        if (!SERVICE_SLUGS.includes(slug)) {
          ISSUES.push(`NAVBAR dropdown wrong service slug: ${href}`);
        }
        expect(SERVICE_SLUGS.includes(slug), `Navbar dropdown link "${href}" slug invalid`).toBe(true);
      }
    }
  });

  // 4. Footer — service links and CTA
  test('footer: service links correct on all pages', async ({ page }) => {
    for (const path of ['/', '/about', '/service-areas', '/contact']) {
      await page.goto(path);
      const ftLinks = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.ft-link[href]'))
          .map(a => ({ href: (a as HTMLAnchorElement).getAttribute('href') || '', text: a.textContent?.trim() }))
          .filter(l => l.href.startsWith('/services/'))
      );
      for (const l of ftLinks) {
        const slug = l.href.replace('/services/', '');
        if (!SERVICE_SLUGS.includes(slug)) {
          ISSUES.push(`FOOTER on ${path} wrong service slug: ${l.href} ("${l.text}")`);
        }
        expect(SERVICE_SLUGS.includes(slug), `Footer link "${l.href}" on ${path}`).toBe(true);
      }

      // Footer CTA
      const ftCta = await page.evaluate(() =>
        (document.querySelector('.ft-cta') as HTMLAnchorElement)?.getAttribute('href')
      );
      if (ftCta && !ftCta.includes('#form')) {
        ISSUES.push(`FOOTER CTA on ${path} missing #form: ${ftCta}`);
      }
      expect(ftCta, `Footer CTA on ${path} should link to /contact#form`).toContain('#form');
    }
  });

  // 5. Service Areas page — city pills + region grid
  test('service-areas: city pills link to /locations/[slug]', async ({ page }) => {
    await page.goto('/service-areas');
    const cityLinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.sap-city-pill[href], .sa-city-pill[href]'))
        .map(a => (a as HTMLAnchorElement).getAttribute('href') || '')
    );
    expect(cityLinks.length, 'Should have 19 city pills').toBe(19);
    for (const href of cityLinks) {
      const slug = href.replace('/locations/', '');
      if (!CITY_SLUGS.includes(slug)) {
        ISSUES.push(`SERVICE-AREAS city pill wrong slug: ${href}`);
      }
      expect(CITY_SLUGS.includes(slug), `City pill "${href}" slug invalid`).toBe(true);
    }

    // CTA buttons
    const ctaLinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a'))
        .filter(a => {
          const text = a.textContent?.toLowerCase() || '';
          return text.includes('estimate') || text.includes('inspection') || text.includes('quote');
        })
        .map(a => ({ text: a.textContent?.trim(), href: a.getAttribute('href') }))
        .filter(l => l.href?.includes('/contact'))
    );
    for (const cta of ctaLinks) {
      if (!cta.href?.includes('#form')) {
        ISSUES.push(`SERVICE-AREAS CTA missing #form: "${cta.text}" → ${cta.href}`);
      }
      expect(cta.href, `CTA "${cta.text}" on /service-areas`).toContain('#form');
    }
  });

  // 6. About page — service links + CTA
  test('about page: absvc service links correct', async ({ page }) => {
    await page.goto('/about');
    const svcLinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.absvc-cell[href]'))
        .map(a => (a as HTMLAnchorElement).getAttribute('href') || '')
    );
    for (const href of svcLinks) {
      if (href.startsWith('/services/')) {
        const slug = href.replace('/services/', '');
        if (!SERVICE_SLUGS.includes(slug)) {
          ISSUES.push(`ABOUT absvc wrong slug: ${href}`);
        }
        expect(SERVICE_SLUGS.includes(slug), `About absvc link "${href}"`).toBe(true);
      }
    }
  });

  // 7. All 11 service pages — internal CTA + related links
  test('service pages: CTAs go to /contact#form', async ({ page }) => {
    for (const slug of SERVICE_SLUGS) {
      await page.goto(`/services/${slug}`);
      const ctaLinks = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a'))
          .filter(a => {
            const text = a.textContent?.toLowerCase() || '';
            const href = a.getAttribute('href') || '';
            return (text.includes('estimate') || text.includes('inspection') || text.includes('quote'))
              && href.includes('/contact');
          })
          .map(a => ({ text: a.textContent?.trim(), href: a.getAttribute('href') }))
      );
      for (const cta of ctaLinks) {
        if (!cta.href?.includes('#form')) {
          ISSUES.push(`SERVICE /services/${slug} CTA missing #form: "${cta.text}" → ${cta.href}`);
        }
        expect(cta.href, `CTA on /services/${slug}`).toContain('#form');
      }

      // "Also Consider" cards
      const relatedLinks = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.sp-rsvc-card[href]'))
          .map(a => (a as HTMLAnchorElement).getAttribute('href') || '')
      );
      for (const href of relatedLinks) {
        if (href.startsWith('/services/')) {
          const s = href.replace('/services/', '');
          if (!SERVICE_SLUGS.includes(s)) {
            ISSUES.push(`SERVICE /services/${slug} related card wrong slug: ${href}`);
          }
          expect(SERVICE_SLUGS.includes(s), `Related card "${href}" on /services/${slug}`).toBe(true);
        }
      }
    }
  });

  // 8. All 19 city pages — CTA + service links
  test('city pages: CTAs go to /contact#form', async ({ page }) => {
    for (const slug of CITY_SLUGS) {
      await page.goto(`/locations/${slug}`);
      const ctaLinks = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a'))
          .filter(a => {
            const text = a.textContent?.toLowerCase() || '';
            const href = a.getAttribute('href') || '';
            return (text.includes('estimate') || text.includes('inspection') || text.includes('quote'))
              && href.includes('/contact');
          })
          .map(a => ({ text: a.textContent?.trim(), href: a.getAttribute('href') }))
      );
      for (const cta of ctaLinks) {
        if (!cta.href?.includes('#form')) {
          ISSUES.push(`CITY /locations/${slug} CTA missing #form: "${cta.text}" → ${cta.href}`);
        }
        expect(cta.href, `CTA on /locations/${slug}`).toContain('#form');
      }
    }
  });

  // 9. Contact page — form section exists with id="form"
  test('contact page: #form anchor exists and is reachable', async ({ page }) => {
    await page.goto('/contact#form');
    const formEl = page.locator('#form');
    await expect(formEl).toBeVisible();
    const box = await formEl.boundingBox();
    expect(box, 'Form section should have visible dimensions').not.toBeNull();
  });

  // 10. Broken link scan — all internal href on every major page
  test('no 404 internal links on key pages', async ({ page }) => {
    const pagesToScan = [
      '/', '/about', '/service-areas', '/contact',
      '/services/tuckpointing-repointing',
      '/locations/winnetka', '/locations/chicago',
    ];
    const broken: string[] = [];
    for (const path of pagesToScan) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const hrefs = await getInternalLinks(page);
      const unique = [...new Set(hrefs)];
      for (const href of unique) {
        const pathOnly = href.split('#')[0];
        if (!pathOnly || pathOnly === path) continue;
        const res = await page.request.get(`http://localhost:4321${pathOnly}`);
        if (!res.ok()) {
          broken.push(`${path} → ${href} (${res.status()})`);
          ISSUES.push(`404: ${path} has broken link → ${href}`);
        }
      }
    }
    if (broken.length > 0) {
      console.error('\n❌ BROKEN LINKS:\n' + broken.map(b => '  ' + b).join('\n'));
    }
    expect(broken, `Broken links found:\n${broken.join('\n')}`).toHaveLength(0);
  });

  // Final: print all issues
  test.afterAll(async () => {
    if (ISSUES.length === 0) {
      console.log('\n✅ All link checks passed — no issues found.\n');
    } else {
      console.error('\n❌ ISSUES FOUND:\n' + ISSUES.map(i => '  • ' + i).join('\n') + '\n');
    }
  });

});
