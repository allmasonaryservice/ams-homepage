/**
 * Recompresses blog images that exceed size limits.
 * Desktop target: ≤60KB  |  Mobile target: ≤40KB
 * Strategy: binary-search quality on smaller dimensions until under budget.
 */

import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, '..', 'public', 'images', 'blog');

const DESKTOP_MAX = 60 * 1024; // 60 KB
const MOBILE_MAX  = 40 * 1024; // 40 KB

// Try progressively smaller widths to hit the budget
const DESKTOP_WIDTHS = [1260, 1024, 900, 780, 660, 540];
const MOBILE_WIDTHS  = [750,  640,  540, 420, 360, 300];

async function recompress(filePath, widths, maxBytes) {
  const kb = (statSync(filePath).size / 1024).toFixed(1);
  if (statSync(filePath).size <= maxBytes) {
    console.log(`  OK  ${basename(filePath)} (${kb}KB)`);
    return false;
  }
  console.log(`  FIX ${basename(filePath)} (${kb}KB → targeting ≤${Math.round(maxBytes/1024)}KB)`);

  const raw = await sharp(filePath).toBuffer();

  for (const w of widths) {
    const h = Math.round(w * (9/16)); // keep 16:9 aspect
    // Binary search quality at this width
    let lo = 15, hi = 80, q = 55, best = null;
    for (let i = 0; i < 12; i++) {
      const buf = await sharp(raw)
        .resize(w, h, { fit: 'cover', position: 'centre' })
        .webp({ quality: q, effort: 5 })
        .toBuffer();
      if (buf.length <= maxBytes) { best = buf; lo = q; q = Math.round((q + hi) / 2); }
      else { hi = q; q = Math.round((lo + q) / 2); }
      if (hi - lo <= 1) break;
    }
    if (best) {
      await sharp(best).toFile(filePath);
      const newKB = (statSync(filePath).size / 1024).toFixed(1);
      console.log(`    ✓ → ${newKB}KB at ${w}×${h}`);
      return true;
    }
  }
  // Last resort: lowest quality at smallest width
  const w = widths[widths.length - 1], h = Math.round(w * (9/16));
  const buf = await sharp(raw).resize(w, h, { fit: 'cover' }).webp({ quality: 20, effort: 6 }).toBuffer();
  await sharp(buf).toFile(filePath);
  const newKB = (statSync(filePath).size / 1024).toFixed(1);
  console.log(`    ↷ forced smallest → ${newKB}KB at ${w}×${h}`);
  return true;
}

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  Blog Image Size Fixup');
  console.log('═══════════════════════════════════════\n');

  const files = readdirSync(DIR).filter(f => f.endsWith('.webp'));
  const desktops = files.filter(f => !f.endsWith('-m.webp'));
  const mobiles  = files.filter(f => f.endsWith('-m.webp'));

  console.log('── Desktop files (max 60KB) ──');
  for (const f of desktops) await recompress(join(DIR, f), DESKTOP_WIDTHS, DESKTOP_MAX);

  console.log('\n── Mobile files (max 40KB) ──');
  for (const f of mobiles)  await recompress(join(DIR, f), MOBILE_WIDTHS, MOBILE_MAX);

  console.log('\n═══════════════════════════════════════');
  console.log('  Done');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
