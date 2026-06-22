/**
 * AMS Blog Image Downloader + WebP Converter
 * Uses Pexels API to find and download images for 30 blog posts.
 * Desktop: max 60 KB  |  Mobile: max 40 KB
 */

import sharp from 'sharp';
import { existsSync, mkdirSync, statSync } from 'fs';
import { get as httpsGet } from 'https';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const OUT_DIR   = join(ROOT, 'public', 'images', 'blog');
const PEXELS_KEY = 'crnlndQJ08dwt8OiZMxL1niF2WDbAq5vSWi78T0qrk6hr05GXC0DIZlc';

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// ── Image manifest ──────────────────────────────────────────────────────────
// name:     output filename stem → name.webp (desktop) + name-m.webp (mobile)
// query:    Pexels search query
// orient:   Pexels orientation
// targetKB: [desktopMin, desktopMax, mobileMin, mobileMax]
const IMAGES = [
  // ── Blog index hero ───────────────────────────────────────────────────────
  { name: 'blog-hero',                          query: 'masonry craftsman brick wall detail professional',           orient: 'landscape', targetKB: [40,60,22,38] },

  // ── Services posts ────────────────────────────────────────────────────────
  { name: 'custom-home-masonry-chicago',        query: 'luxury brick stone house exterior custom home',              orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'brick-installation-chicago',         query: 'brick wall installation masonry laying worker',              orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'natural-stone-limestone-masonry',    query: 'natural stone limestone wall exterior masonry',              orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'brick-stone-veneers-chicago',        query: 'stone veneer brick exterior home facade',                    orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'chimney-fireplace-masonry-chicago',  query: 'brick chimney fireplace masonry residential exterior',       orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'cmu-block-installation-commercial',  query: 'concrete block wall commercial construction masonry',        orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'commercial-brick-stone-chicago',     query: 'commercial brick building exterior stone office',            orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'full-masonry-veneers-exterior',      query: 'stone veneer complete home exterior beautiful renovation',   orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'tuckpointing-repointing-chicago',    query: 'mortar joint tuckpointing brick repair detail close',        orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'damaged-brick-replacement',          query: 'damaged old brick wall deteriorated masonry repair',         orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'chimney-repair-vs-rebuild',          query: 'chimney exterior brick repair residential home roof',        orient: 'landscape', targetKB: [40,60,22,38] },

  // ── Location posts ────────────────────────────────────────────────────────
  { name: 'masonry-winnetka-north-shore',       query: 'luxury stone brick home exterior elegant residential',       orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'masonry-evanston-historic-homes',    query: 'historic brick building exterior restoration old',           orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'masonry-hinsdale-west-suburbs',      query: 'elegant suburban brick house stone exterior upscale',        orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'masonry-highland-park',              query: 'large luxury home exterior stone brick masonry lakefront',   orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'masonry-naperville-new-builds',      query: 'new construction house brick exterior residential masonry',  orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'masonry-chicago-commercial',         query: 'urban commercial brick building city exterior architecture', orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'masonry-oak-brook-commercial',       query: 'commercial office building exterior stone brick suburban',   orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'masonry-wilmette-north-shore',       query: 'residential brick house exterior suburban classic masonry',  orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'masonry-northbrook-brick',           query: 'brick home exterior residential new construction',           orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'masonry-downers-grove',              query: 'suburban brick home exterior renovation masonry',            orient: 'landscape', targetKB: [40,60,22,38] },

  // ── Guide posts ───────────────────────────────────────────────────────────
  { name: 'chimney-warning-signs-repair',       query: 'chimney damage brick masonry exterior warning cracks',      orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'brick-vs-stone-illinois',            query: 'brick stone wall comparison texture masonry exterior',       orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'chicago-freeze-thaw-masonry',        query: 'brick wall winter frost crack freeze damage masonry',       orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'cost-of-delaying-brick-repairs',     query: 'deteriorated old brick wall damage exterior masonry',       orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'choosing-masonry-contractor-chicago',query: 'masonry contractor worker professional expert construction', orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'tuckpointing-cost-chicago-2025',     query: 'tuckpointing mortar brick work repair masonry detail',      orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'stone-veneer-transformation-hinsdale',query: 'stone veneer home exterior beautiful transformation',       orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'winter-masonry-chicago-myths',       query: 'winter construction cold brick masonry exterior work',       orient: 'landscape', targetKB: [40,60,22,38] },
  { name: 'why-ams-trusted-masonry-chicago',    query: 'expert masonry team professional craftsmen construction',    orient: 'landscape', targetKB: [40,60,22,38] },
];

const DESKTOP_W = 1260, DESKTOP_H = 720;
const MOBILE_W  = 750,  MOBILE_H  = 420;

// ── Helpers ─────────────────────────────────────────────────────────────────

function fetchJson(url, headers) {
  return new Promise((resolve, reject) => {
    httpsGet(url, { headers }, (res) => {
      let body = '';
      res.on('data', (c) => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error('JSON parse: ' + body.slice(0, 200))); }
      });
    }).on('error', reject);
  });
}

function downloadToBuffer(url) {
  return new Promise((resolve, reject) => {
    httpsGet(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadToBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function searchPexels(query, orientation) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&page=1&orientation=${orientation}`;
  const data = await fetchJson(url, { Authorization: PEXELS_KEY });
  return data.photos || [];
}

async function toWebP(inputBuf, w, h, minKB, maxKB) {
  const minB = minKB * 1024, maxB = maxKB * 1024;
  let lo = 20, hi = 88, q = 65, best = null;

  for (let iter = 0; iter < 10; iter++) {
    const buf = await sharp(inputBuf)
      .resize(w, h, { fit: 'cover', position: 'centre' })
      .webp({ quality: q, effort: 4 })
      .toBuffer();

    if (buf.length <= maxB && buf.length >= minB) return buf;
    if (buf.length > maxB) { hi = q; q = Math.round((lo + q) / 2); }
    else { best = buf; lo = q; q = Math.round((q + hi) / 2); }
    if (hi - lo <= 1) break;
  }
  if (!best) {
    best = await sharp(inputBuf)
      .resize(w, h, { fit: 'cover', position: 'centre' })
      .webp({ quality: Math.min(hi, 85), effort: 4 })
      .toBuffer();
  }
  return best;
}

// ── Main ────────────────────────────────────────────────────────────────────

async function processImage(cfg) {
  const desktopPath = join(OUT_DIR, `${cfg.name}.webp`);
  const mobilePath  = join(OUT_DIR, `${cfg.name}-m.webp`);

  if (existsSync(desktopPath) && existsSync(mobilePath)) {
    const dKB = (statSync(desktopPath).size / 1024).toFixed(1);
    const mKB = (statSync(mobilePath).size  / 1024).toFixed(1);
    console.log(`  ↷ SKIP ${cfg.name} (${dKB}KB / ${mKB}KB already exist)`);
    return null;
  }

  console.log(`\n[${cfg.name}]`);
  let photos = await searchPexels(cfg.query, cfg.orient);
  if (!photos.length) {
    const q2 = cfg.query.split(' ').slice(0, 3).join(' ');
    console.log(`  ↳ 0 results — retry "${q2}"`);
    photos = await searchPexels(q2, cfg.orient);
  }
  if (!photos.length) { console.error(`  ✗ No photos`); return null; }

  const photo  = photos[0];
  const srcUrl = photo.src.large2x || photo.src.large || photo.src.original;
  console.log(`  ↳ Photo ${photo.id} (${photo.photographer}) — downloading…`);

  const rawBuf = await downloadToBuffer(srcUrl);
  const [dMin, dMax, mMin, mMax] = cfg.targetKB;

  const dBuf = await toWebP(rawBuf, DESKTOP_W, DESKTOP_H, dMin, dMax);
  const mBuf = await toWebP(rawBuf, MOBILE_W,  MOBILE_H,  mMin, mMax);

  await sharp(dBuf).toFile(desktopPath);
  await sharp(mBuf).toFile(mobilePath);

  const dKB = (statSync(desktopPath).size / 1024).toFixed(1);
  const mKB = (statSync(mobilePath).size  / 1024).toFixed(1);
  console.log(`  ✓ ${cfg.name}.webp → ${dKB}KB  |  -m.webp → ${mKB}KB`);
  return { name: cfg.name, photoId: photo.id, dKB, mKB };
}

async function main() {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║  AMS Blog Image Downloader + WebP        ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log(`Output: ${OUT_DIR}\n`);

  const results = [];
  for (const cfg of IMAGES) {
    try {
      const r = await processImage(cfg);
      if (r) results.push(r);
      await new Promise(r => setTimeout(r, 350)); // respect rate limits
    } catch (err) {
      console.error(`  ✗ ERROR [${cfg.name}]: ${err.message}`);
    }
  }

  console.log('\n══════════════════════════════════════════');
  console.log(`  Done! ${results.length} new images saved (${IMAGES.length} total)`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
