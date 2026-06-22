// cd majestic-moon && node scripts/download-project-images.mjs
// Downloads Pexels images for all 56 new project pages, converts to WebP
// Desktop: 1200x800, target 55-75KB | Mobile: 768x512, target 40-50KB

import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

const KEY  = 'crnlndQJ08dwt8OiZMxL1niF2WDbAq5vSWi78T0qrk6hr05GXC0DIZlc';
const OUT  = join(process.cwd(), 'public', 'images');

// ── Service config: queries + project slugs ──────────────────────────────
const SERVICES = [
  {
    slug: 'brick-installation',
    projects: [
      'winnetka-brick-installation',
      'glencoe-brick-installation',
      // hinsdale-brick-installation already has images → skip
      'naperville-brick-installation',
      'burr-ridge-brick-installation',
      'chicago-brick-installation',
    ],
    hero:   'brick house facade exterior residential masonry architecture',
    after:  ['new brick wall clean installed residential exterior','brick facade renovation completed home','red brick installation finished exterior building'],
    before: ['old deteriorated brick wall crumbling exterior','damaged brick facade needs repair weathered','worn brick wall exterior failing masonry'],
  },
  {
    slug: 'brick-stone-veneers',
    projects: [
      'wilmette-brick-stone-veneers',
      'evanston-brick-stone-veneers',
      'oak-brook-brick-stone-veneers',
      'downers-grove-brick-stone-veneers',
      'clarendon-hills-brick-stone-veneers',
    ],
    hero:   'stone veneer house exterior facade residential architecture',
    after:  ['stone veneer wall exterior new installed finished','natural stone facade house completed renovation','stone cladding exterior building modern finished'],
    before: ['old siding worn damaged exterior before renovation','plain wall exterior before stone installation','dated building facade before cladding renovation'],
  },
  {
    slug: 'chimney-fireplace',
    projects: [
      'winnetka-chimney-fireplace',
      'evanston-chimney-fireplace',
      'oak-brook-chimney-fireplace',
      'naperville-chimney-fireplace',
      'clarendon-hills-chimney-fireplace',
    ],
    hero:   'brick chimney fireplace exterior residential masonry',
    after:  ['chimney masonry restored clean new exterior','brick chimney repaired completed renovation','fireplace chimney exterior finished restored masonry'],
    before: ['damaged chimney brick crumbling old exterior','worn chimney stack deteriorated needs repair','old chimney masonry failing brick'],
  },
  {
    slug: 'chimney-repair-rebuilding',
    projects: [
      'wilmette-chimney-repair-rebuilding',
      'highland-park-chimney-repair-rebuilding',
      'oak-brook-chimney-repair-rebuilding',
      'downers-grove-chimney-repair-rebuilding',
      'willowbrook-chimney-repair-rebuilding',
    ],
    hero:   'chimney repair rebuilding masonry construction brick',
    after:  ['new chimney rebuilt brick stack complete exterior','chimney reconstruction finished clean masonry','brick chimney restored rebuilt exterior'],
    before: ['collapsed damaged chimney before repair exterior','crumbling chimney structure needs rebuild','deteriorated chimney stack failing bricks'],
  },
  {
    slug: 'cmu-block-installation',
    projects: [
      'wilmette-cmu-block-installation',
      'highland-park-cmu-block-installation',
      'elmhurst-cmu-block-installation',
      'downers-grove-cmu-block-installation',
      'willowbrook-cmu-block-installation',
    ],
    hero:   'concrete block masonry wall construction residential',
    after:  ['concrete block wall installed finished clean','cmu masonry wall complete new construction','concrete masonry wall done smooth finished'],
    before: ['bare concrete foundation wall construction','unfinished concrete block wall needs work','old concrete masonry wall deteriorated'],
  },
  {
    slug: 'commercial-brick-stone',
    projects: [
      'kenilworth-commercial-brick-stone',
      'highland-park-commercial-brick-stone',
      'elmhurst-commercial-brick-stone',
      'la-grange-commercial-brick-stone',
      'willowbrook-commercial-brick-stone',
    ],
    hero:   'commercial building brick stone exterior facade architecture',
    after:  ['commercial brick building restored clean new exterior','storefront brick renovation complete professional','commercial masonry building finished clean exterior'],
    before: ['old commercial brick building worn facade','storefront exterior deteriorated before renovation','commercial building brick needs restoration repair'],
  },
  {
    slug: 'commercial-masonry-veneers',
    projects: [
      'kenilworth-commercial-masonry-veneers',
      'northbrook-commercial-masonry-veneers',
      'elmhurst-commercial-masonry-veneers',
      'la-grange-commercial-masonry-veneers',
      'wheaton-commercial-masonry-veneers',
    ],
    hero:   'commercial building stone veneer modern exterior architecture',
    after:  ['commercial stone veneer finished installed exterior','modern office building stone facade complete','commercial building veneer cladding new finished'],
    before: ['plain commercial building exterior before renovation','old office building facade needs update','commercial concrete wall before cladding'],
  },
  {
    slug: 'custom-home-masonry',
    projects: [
      'kenilworth-custom-home-masonry',
      'northbrook-custom-home-masonry',
      'western-springs-custom-home-masonry',
      'la-grange-custom-home-masonry',
      'wheaton-custom-home-masonry',
    ],
    hero:   'luxury custom home brick stone masonry exterior beautiful',
    after:  ['custom home stone exterior complete luxury beautiful','high end brick stone house exterior finished','luxury home masonry exterior complete architectural'],
    before: ['new home construction framing before exterior masonry','house under construction before stone brick','new build exterior before masonry finish'],
  },
  {
    slug: 'damaged-brick-replacement',
    projects: [
      'glencoe-damaged-brick-replacement',
      'northbrook-damaged-brick-replacement',
      'western-springs-damaged-brick-replacement',
      'burr-ridge-damaged-brick-replacement',
      'wheaton-damaged-brick-replacement',
    ],
    hero:   'brick repair restoration masonry house exterior residential',
    after:  ['brick repair complete clean wall restored matched','matched brick replacement finished clean wall','brick section restored clean matched exterior'],
    before: ['spalling brick wall damage deteriorated exterior','crumbling damaged brick repair needed','brick spalling frost damage exterior wall'],
  },
  {
    slug: 'natural-stone-limestone',
    projects: [
      'glencoe-natural-stone-limestone',
      'hinsdale-natural-stone-limestone',
      'western-springs-natural-stone-limestone',
      'burr-ridge-natural-stone-limestone',
      'chicago-natural-stone-limestone',
    ],
    hero:   'natural limestone stone exterior house facade masonry',
    after:  ['limestone facade installed complete exterior beautiful','natural stone wall finished home residential','limestone steps entry installed new exterior'],
    before: ['old limestone wall weathered stained exterior','deteriorated stone facade repair needed masonry','worn natural stone exterior masonry wall'],
  },
  {
    slug: 'tuckpointing-repointing',
    projects: [
      'winnetka-tuckpointing-repointing',
      'evanston-tuckpointing-repointing',
      'hinsdale-tuckpointing-repointing',
      'naperville-tuckpointing-repointing',
      'clarendon-hills-tuckpointing-repointing',
      'chicago-tuckpointing-repointing',
    ],
    hero:   'tuckpointing brick mortar repointing masonry residential',
    after:  ['tuckpointing complete clean mortar joints brick wall','repointed brick wall new mortar finished','fresh mortar joints brick wall tuckpointing done'],
    before: ['deteriorated mortar joints brick wall repair','crumbling mortar brick masonry failing exterior','eroded mortar joints tuckpointing repair needed'],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────
async function pexels(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=80&orientation=landscape`;
  const r = await fetch(url, { headers: { Authorization: KEY } });
  if (!r.ok) { console.warn(`  Pexels ${r.status} for: ${query}`); return []; }
  const d = await r.json();
  return d.photos || [];
}

async function dlBuf(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`DL ${r.status}: ${url}`);
  return Buffer.from(await r.arrayBuffer());
}

async function toWebP(buf, maxW, maxH, minKB, maxKB) {
  let q = 78, out;
  for (let i = 0; i < 14; i++) {
    out = await sharp(buf).resize(maxW, maxH, { fit: 'cover', position: 'center' }).webp({ quality: q }).toBuffer();
    const kb = out.length / 1024;
    if (kb >= minKB && kb <= maxKB) break;
    q = kb > maxKB ? Math.max(q - 7, 10) : Math.min(q + 7, 95);
  }
  return out;
}

function save(buf, name) {
  const p = join(OUT, name);
  if (existsSync(p)) { console.log(`  skip  ${name}`); return; }
  writeFileSync(p, buf);
  console.log(`  SAVE  ${name}  ${(buf.length / 1024).toFixed(1)}KB`);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Main ─────────────────────────────────────────────────────────────────
async function main() {
  let apiCalls = 0;
  let saved = 0;

  for (const svc of SERVICES) {
    console.log(`\n══ ${svc.slug} (${svc.projects.length} projects) ══`);

    // Fetch all search results for this service
    console.log(`  Searching hero...`);
    const heroPhotos  = await pexels(svc.hero); apiCalls++; await sleep(700);

    const afterPhotos = [];
    for (let i = 0; i < svc.after.length; i++) {
      console.log(`  Searching after[${i}]...`);
      afterPhotos.push(await pexels(svc.after[i])); apiCalls++; await sleep(700);
    }

    const beforePhotos = [];
    for (let i = 0; i < svc.before.length; i++) {
      console.log(`  Searching before[${i}]...`);
      beforePhotos.push(await pexels(svc.before[i])); apiCalls++; await sleep(700);
    }

    console.log(`  API calls so far: ${apiCalls}`);

    // Download + convert per project
    for (let pi = 0; pi < svc.projects.length; pi++) {
      const slug = svc.projects[pi];
      const idx  = pi * 12; // spread across 80 results
      console.log(`\n  ── ${slug}`);

      // Hero
      const hp = heroPhotos[Math.min(idx, heroPhotos.length - 1)];
      if (hp) {
        try {
          const raw = await dlBuf(hp.src.large2x || hp.src.large || hp.src.medium);
          await sleep(300);
          save(await toWebP(raw, 1200, 800, 55, 75), `proj-${slug}-hero.webp`);
          save(await toWebP(raw, 768,  512, 40, 50), `proj-${slug}-hero-m.webp`);
          saved += 2;
        } catch (e) { console.warn(`  hero err: ${e.message}`); }
      }

      // Gallery pairs (3)
      for (let g = 0; g < 3; g++) {
        const aArr = afterPhotos[g]  || [];
        const bArr = beforePhotos[g] || [];
        const aph  = aArr[Math.min(idx, aArr.length - 1)];
        const bph  = bArr[Math.min(idx, bArr.length - 1)];

        if (aph) {
          try {
            const raw = await dlBuf(aph.src.large2x || aph.src.large || aph.src.medium);
            await sleep(250);
            save(await toWebP(raw, 1200, 800, 55, 75), `proj-${slug}-gal${g + 1}-after.webp`);
            save(await toWebP(raw, 768,  512, 40, 50), `proj-${slug}-gal${g + 1}-after-m.webp`);
            saved += 2;
          } catch (e) { console.warn(`  after[${g}] err: ${e.message}`); }
        }

        if (bph) {
          try {
            const raw = await dlBuf(bph.src.large2x || bph.src.large || bph.src.medium);
            await sleep(250);
            save(await toWebP(raw, 1200, 800, 55, 75), `proj-${slug}-gal${g + 1}-before.webp`);
            save(await toWebP(raw, 768,  512, 40, 50), `proj-${slug}-gal${g + 1}-before-m.webp`);
            saved += 2;
          } catch (e) { console.warn(`  before[${g}] err: ${e.message}`); }
        }

        await sleep(200);
      }
    }
  }

  console.log(`\n✓ Done — ${saved} files saved, ${apiCalls} API calls used`);
}

main().catch(err => { console.error(err); process.exit(1); });
