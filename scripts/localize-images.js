// Downloads every placeholder photo named in src/content/images.ts and saves a compressed WebP copy
// (longest side 2000px, quality 80) under public/images, so pages no longer pull 11 MB PNGs from the CDN.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const repo = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(repo, 'src/content/images.ts'), 'utf8');
const cdn = process.env.IMAGE_CDN || 'https://d8j0ntlcm91z4.cloudfront.net/user_2vgr4LDcTnBdquYG4fMZ396AWcW/';
const files = [...new Set([...src.matchAll(/u\("([^"]+)"\)/g)].map((m) => m[1]))];
const out = path.join(repo, 'public/images');
fs.mkdirSync(out, { recursive: true });
(async () => {
  let before = 0, after = 0;
  for (const f of files) {
    const dest = path.join(out, f.replace(/\.(png|jpe?g)$/i, '.webp'));
    if (fs.existsSync(dest)) { after += fs.statSync(dest).size; continue; }
    const res = await fetch(cdn + f);
    if (!res.ok) { console.log('FAIL', res.status, f); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    before += buf.length;
    await sharp(buf).resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
    after += fs.statSync(dest).size;
    process.stdout.write('.');
  }
  console.log(`\n${files.length} images, ${(before / 1e6).toFixed(1)} MB downloaded, ${(after / 1e6).toFixed(1)} MB as WebP`);
})();
