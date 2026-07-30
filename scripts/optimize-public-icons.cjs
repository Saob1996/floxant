const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const root = process.cwd();
const appIcon = path.join(root, "app", "icon.png");
const publicIcon = path.join(root, "public", "icon.png");
const favicon = path.join(root, "public", "favicon.ico");
const temporaryIcon = path.join(root, "app", "icon.optimized.png");

function buildIco(png) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(48, 0);
  entry.writeUInt8(48, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  return Buffer.concat([header, entry, png]);
}

async function main() {
  const source = fs.readFileSync(appIcon);
  const icon192 = await sharp(source)
    .resize(192, 192, { fit: "cover" })
    .png({ compressionLevel: 9, palette: true, quality: 92 })
    .toBuffer();
  const icon48 = await sharp(source)
    .resize(48, 48, { fit: "cover" })
    .png({ compressionLevel: 9, palette: true, quality: 92 })
    .toBuffer();

  fs.writeFileSync(temporaryIcon, icon192);
  fs.renameSync(temporaryIcon, appIcon);
  fs.writeFileSync(publicIcon, icon192);
  fs.writeFileSync(favicon, buildIco(icon48));

  console.log(
    JSON.stringify({
      appIconBytes: icon192.length,
      publicIconBytes: icon192.length,
      faviconBytes: fs.statSync(favicon).size,
    }),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
