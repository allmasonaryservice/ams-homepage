import sharp from 'sharp';
import { get as httpsGet } from 'https';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'images');
const PEXELS_KEY = 'crnlndQJ08dwt8OiZMxL1niF2WDbAq5vSWi78T0qrk6hr05GXC0DIZlc';

function download(url) {
  return new Promise((res, rej) => {
    httpsGet(url, (r) => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location)
        return download(r.headers.location).then(res).catch(rej);
      const chunks = [];
      r.on('data', c => chunks.push(c));
      r.on('end', () => res(Buffer.concat(chunks)));
    }).on('error', rej);
  });
}

function fetchJson(url) {
  return new Promise((res, rej) => {
    httpsGet(url, { headers: { Authorization: PEXELS_KEY } }, (r) => {
      let b = '';
      r.on('data', c => b += c);
      r.on('end', () => res(JSON.parse(b)));
    }).on('error', rej);
  });
}

async function toWebP(buf, w, h, minKB, maxKB) {
  let lo = 20, hi = 88, q = 65;
  for (let i = 0; i < 12; i++) {
    const out = await sharp(buf)
      .resize(w, h, { fit: 'cover', position: 'centre' })
      .webp({ quality: q, effort: 4 })
      .toBuffer();
    const kb = out.length / 1024;
    if (kb <= maxKB && kb >= minKB) return out;
    if (kb > maxKB) { hi = q; q = Math.round((lo + q) / 2); }
    else { lo = q; q = Math.round((q + hi) / 2); }
    if (hi - lo <= 1) return out;
  }
  return await sharp(buf)
    .resize(w, h, { fit: 'cover', position: 'centre' })
    .webp({ quality: lo, effort: 4 })
    .toBuffer();
}

// Photo 37623625: worker repairing brick wall on scaffolding
const photo = await fetchJson('https://api.pexels.com/v1/photos/37623625');
const srcUrl = photo.src.original || photo.src.large2x || photo.src.large;
console.log('Photo:', photo.alt);

const raw = await download(srcUrl);
console.log('Raw:', (raw.length / 1024).toFixed(0), 'KB');

const desktop = await toWebP(raw, 700, 880, 50, 80);
const mobile  = await toWebP(raw, 400, 500, 40, 50);

writeFileSync(join(OUT, 'about-masonry.webp'),   desktop);
writeFileSync(join(OUT, 'about-masonry-m.webp'), mobile);

console.log('about-masonry.webp   ->', (desktop.length / 1024).toFixed(1), 'KB');
console.log('about-masonry-m.webp ->', (mobile.length / 1024).toFixed(1), 'KB');
