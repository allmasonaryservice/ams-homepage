/**
 * AMS Image Downloader + WebP Converter
 * Downloads masonry images from Pexels, converts to WebP at target file sizes.
 * Desktop: 50-80 KB  |  Mobile: 40-50 KB
 */

import sharp from 'sharp';
import { createWriteStream, existsSync, mkdirSync, statSync, unlinkSync } from 'fs';
import { get as httpGet } from 'http';
import { get as httpsGet } from 'https';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const OUT_DIR   = join(ROOT, 'public', 'images');

const PEXELS_KEY = 'crnlndQJ08dwt8OiZMxL1niF2WDbAq5vSWi78T0qrk6hr05GXC0DIZlc';

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// ── Image manifest ─────────────────────────────────────────────────────────
// name      : output filename stem (saved as name.webp + name-m.webp)
// query     : Pexels search query
// w/h       : desktop resize target (px)
// mw/mh     : mobile resize target (px)
// orient    : Pexels orientation filter
// targetKB  : [desktopMin, desktopMax, mobileMin, mobileMax]
const IMAGES = [
  // ── Services cards (landscape, 800×540) ──────────────────────────────────
  { name: 'svc-tuckpointing',  query: 'tuckpointing mortar brick wall repair',       w: 800, h: 540, mw: 400, mh: 270, orient: 'landscape', targetKB: [50,80,40,50] },
  { name: 'svc-brick-repair',  query: 'brick wall repair masonry close up',          w: 800, h: 540, mw: 400, mh: 270, orient: 'landscape', targetKB: [50,80,40,50] },
  { name: 'svc-chimney',       query: 'chimney brick repair masonry residential',    w: 800, h: 540, mw: 400, mh: 270, orient: 'landscape', targetKB: [50,80,40,50] },
  { name: 'svc-stone-install', query: 'stone brick wall installation masonry',       w: 800, h: 540, mw: 400, mh: 270, orient: 'landscape', targetKB: [50,80,40,50] },
  { name: 'svc-natural-stone', query: 'natural stone limestone wall exterior house', w: 800, h: 540, mw: 400, mh: 270, orient: 'landscape', targetKB: [50,80,40,50] },
  { name: 'svc-commercial',    query: 'commercial brick building construction wall', w: 800, h: 540, mw: 400, mh: 270, orient: 'landscape', targetKB: [50,80,40,50] },
  // ── Projects polaroid (portrait, 480×620) ────────────────────────────────
  { name: 'proj-brick-facade', query: 'brick facade restoration building exterior',  w: 480, h: 620, mw: 300, mh: 388, orient: 'portrait',   targetKB: [50,80,40,50] },
  { name: 'proj-chimney',      query: 'chimney rebuild brick masonry roof',          w: 480, h: 620, mw: 300, mh: 388, orient: 'portrait',   targetKB: [50,80,40,50] },
  { name: 'proj-tuckpointing', query: 'mortar joint repair tuckpointing close up',  w: 480, h: 620, mw: 300, mh: 388, orient: 'portrait',   targetKB: [50,80,40,50] },
  { name: 'proj-stone-wall',   query: 'stone retaining wall garden landscape',      w: 480, h: 620, mw: 300, mh: 388, orient: 'portrait',   targetKB: [50,80,40,50] },
  { name: 'proj-foundation',   query: 'concrete foundation masonry construction',   w: 480, h: 620, mw: 300, mh: 388, orient: 'portrait',   targetKB: [50,80,40,50] },
  // ── WhyUs clip-path (480×600) ────────────────────────────────────────────
  { name: 'why-brick',         query: 'red brick wall texture pattern close',        w: 480, h: 600, mw: 320, mh: 400, orient: 'portrait',   targetKB: [50,80,40,50] },
  { name: 'why-arch',          query: 'stone arch doorway masonry architecture',     w: 480, h: 600, mw: 320, mh: 400, orient: 'portrait',   targetKB: [50,80,40,50] },
  { name: 'why-chimney',       query: 'brick chimney residential roof exterior',     w: 480, h: 600, mw: 320, mh: 400, orient: 'portrait',   targetKB: [50,80,40,50] },
  { name: 'why-limestone',     query: 'limestone wall masonry exterior close up',   w: 480, h: 600, mw: 320, mh: 400, orient: 'portrait',   targetKB: [50,80,40,50] },
  { name: 'why-fireplace',     query: 'stone fireplace masonry interior hearth',    w: 480, h: 600, mw: 320, mh: 400, orient: 'portrait',   targetKB: [50,80,40,50] },
  // ── Contact CTA (portrait) ───────────────────────────────────────────────
  { name: 'contact-masonry',   query: 'mason worker bricklaying construction',      w: 700, h: 900, mw: 350, mh: 450, orient: 'portrait',   targetKB: [60,80,40,50] },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function fetchJson(url, headers) {
  return new Promise((resolve, reject) => {
    const req = httpsGet(url, { headers }, (res) => {
      let body = '';
      res.on('data', (c) => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch(e) { reject(new Error('JSON parse error: ' + body.slice(0,200))); }
      });
    });
    req.on('error', reject);
  });
}

function downloadToBuffer(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? httpsGet : httpGet;
    mod(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadToBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function searchPexels(query, orientation, page = 1) {
  const q = encodeURIComponent(query);
  const url = `https://api.pexels.com/v1/search?query=${q}&per_page=5&page=${page}&orientation=${orientation}`;
  const data = await fetchJson(url, { Authorization: PEXELS_KEY });
  return data.photos || [];
}

/**
 * Compress to WebP, adjusting quality until file is within [minKB, maxKB].
 * Returns the final Buffer.
 */
async function toWebP(inputBuf, w, h, minKB, maxKB) {
  const targetMin = minKB * 1024;
  const targetMax = maxKB * 1024;

  let lo = 20, hi = 90, q = 68;
  let best = null;

  for (let iter = 0; iter < 10; iter++) {
    const buf = await sharp(inputBuf)
      .resize(w, h, { fit: 'cover', position: 'centre' })
      .webp({ quality: q, effort: 4 })
      .toBuffer();

    if (buf.length <= targetMax && buf.length >= targetMin) {
      return buf; // hit the window
    }
    if (buf.length > targetMax) {
      hi = q;
      q = Math.round((lo + q) / 2);
    } else {
      // under min — bump up quality or just accept it (can't exceed w/h limits)
      best = buf; // save best-so-far (smallest acceptable)
      lo = q;
      q = Math.round((q + hi) / 2);
    }
    if (hi - lo <= 1) break;
  }

  // If we couldn't hit the window, return the buffer closest to max
  if (!best) {
    best = await sharp(inputBuf)
      .resize(w, h, { fit: 'cover', position: 'centre' })
      .webp({ quality: Math.min(hi, 90), effort: 4 })
      .toBuffer();
  }
  return best;
}

// ── Main ───────────────────────────────────────────────────────────────────

async function processImage(cfg) {
  console.log(`\n[${cfg.name}] Searching Pexels: "${cfg.query}"`);

  let photos = await searchPexels(cfg.query, cfg.orient);
  if (!photos.length) {
    // fallback: broader search
    const fallback = cfg.query.split(' ').slice(0, 2).join(' ');
    console.log(`  ↳ No results, trying "${fallback}"`);
    photos = await searchPexels(fallback, cfg.orient);
  }
  if (!photos.length) {
    console.error(`  ✗ No photos found for "${cfg.query}"`);
    return null;
  }

  // Pick first photo; use 'large' src (1280px wide typically)
  const photo = photos[0];
  const srcUrl = photo.src.large2x || photo.src.large || photo.src.original;
  console.log(`  ↳ Photo ID ${photo.id} — downloading...`);

  const rawBuf = await downloadToBuffer(srcUrl);
  console.log(`  ↳ Raw: ${(rawBuf.length/1024).toFixed(0)} KB`);

  // Desktop WebP
  const [dMin, dMax, mMin, mMax] = cfg.targetKB;
  const desktopBuf = await toWebP(rawBuf, cfg.w, cfg.h, dMin, dMax);
  const mobileBuf  = await toWebP(rawBuf, cfg.mw, cfg.mh, mMin, mMax);

  const desktopPath = join(OUT_DIR, `${cfg.name}.webp`);
  const mobilePath  = join(OUT_DIR, `${cfg.name}-m.webp`);

  await sharp(desktopBuf).toFile(desktopPath);
  await sharp(mobileBuf).toFile(mobilePath);

  const dKB = (statSync(desktopPath).size / 1024).toFixed(1);
  const mKB = (statSync(mobilePath).size / 1024).toFixed(1);
  console.log(`  ✓ ${cfg.name}.webp → ${dKB} KB  |  ${cfg.name}-m.webp → ${mKB} KB`);

  return { name: cfg.name, photoId: photo.id, photographer: photo.photographer, dKB, mKB };
}

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  AMS Image Downloader + WebP Converter');
  console.log('═══════════════════════════════════════');
  console.log(`Output: ${OUT_DIR}\n`);

  const results = [];
  for (const cfg of IMAGES) {
    try {
      const r = await processImage(cfg);
      if (r) results.push(r);
      // Small delay to respect Pexels rate limits
      await new Promise(r => setTimeout(r, 400));
    } catch (err) {
      console.error(`  ✗ ERROR [${cfg.name}]: ${err.message}`);
    }
  }

  console.log('\n═══════════════════════════════════════');
  console.log(`  Done! ${results.length}/${IMAGES.length} images saved`);
  console.log('═══════════════════════════════════════');
  results.forEach(r => {
    console.log(`  ${r.name}: ${r.dKB}KB / ${r.mKB}KB (mobile) — © ${r.photographer}`);
  });
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
