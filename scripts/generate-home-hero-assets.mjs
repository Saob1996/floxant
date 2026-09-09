import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

// Build-time assets only. The original approved image is retained unchanged.
const source = 'public/assets/floxant-hero-neu-gedacht.webp';
const target = 'public/assets/home-hero';
await mkdir(target, { recursive: true });
const meta = await sharp(source).metadata();
if (meta.width !== 1672 || meta.height !== 941) throw new Error('Review the crop when the original hero changes.');
const cropWidth = 800;
// Preserve the existing object-position: 68% center for narrow viewports.
const crop = { left: Math.round((meta.width - cropWidth) * 0.68), top: 0, width: cropWidth, height: meta.height };
for (const [kind, widths] of [['mobile', [480, 800]], ['wide', [960, 1280, 1672]]]) {
  for (const width of widths) {
    for (const format of ['avif', 'webp']) {
      if (kind === 'wide' && width === 1672 && format === 'webp') continue;
      let pipeline = sharp(source);
      if (kind === 'mobile') pipeline = pipeline.extract(crop);
      pipeline = pipeline.resize({ width, withoutEnlargement: true });
      const file = path.join(target, `${kind}-${width}.${format}`);
      await (format === 'avif' ? pipeline.avif({ quality: 48, effort: 5 }) : pipeline.webp({ quality: 78, effort: 5 })).toFile(file);
      console.log(`${file}: ${(await stat(file)).size} bytes`);
    }
  }
}
