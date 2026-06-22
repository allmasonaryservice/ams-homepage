/**
 * Re-compress oversized WebP files to stay within target.
 * Reads existing WebP → re-encodes at lower quality using writeFileSync.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'images');

async function compress(name, suffix, maxKB) {
  const p = join(OUT, `${name}${suffix}.webp`);
  const input = readFileSync(p);
  const kb = statSync(p).size / 1024;
  if (kb <= maxKB) { console.log(`  OK  ${name}${suffix}.webp → ${kb.toFixed(1)} KB`); return; }

  // Binary search quality
  let lo = 10, hi = 78, q = 55;
  for (let i = 0; i < 12; i++) {
    const buf = await sharp(input).webp({ quality: q, effort: 5 }).toBuffer();
    const bKB = buf.length / 1024;
    if (bKB <= maxKB) {
      writeFileSync(p, buf);
      console.log(`  FIX ${name}${suffix}.webp → ${bKB.toFixed(1)} KB (q=${q})`);
      return;
    }
    hi = q;
    q = Math.round((lo + hi) / 2);
    if (hi - lo <= 1) break;
  }
  // Final at lo
  const buf = await sharp(input).webp({ quality: lo, effort: 5 }).toBuffer();
  writeFileSync(p, buf);
  console.log(`  FIX ${name}${suffix}.webp → ${(buf.length/1024).toFixed(1)} KB (q=${lo}) [best effort]`);
}

const DESKTOP_MAX = 80; // KB
const MOBILE_MAX  = 50; // KB

const ALL = [
  'svc-tuckpointing','svc-brick-repair','svc-chimney','svc-stone-install','svc-natural-stone','svc-commercial',
  'proj-brick-facade','proj-chimney','proj-tuckpointing','proj-stone-wall','proj-foundation',
  'why-brick','why-arch','why-chimney','why-limestone','why-fireplace',
  'contact-masonry',
];

console.log('Checking + fixing file sizes...\n');
for (const name of ALL) {
  await compress(name, '',   DESKTOP_MAX);
  await compress(name, '-m', MOBILE_MAX);
}
console.log('\nDone.');
