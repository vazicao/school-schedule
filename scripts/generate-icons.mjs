// Generates every icon the app needs from ONE source image.
//
//   npm run icons
//       Writes the real icons from scripts/icon-source.png.
//
//   npm run icons -- --sheet out.png <candidate> [<candidate> ...]
//       Writes NOTHING except a preview sheet (out.png) showing each candidate
//       the way phones will display it, one row per image. Use it to compare.
//
// To change the icon: replace scripts/icon-source.png (any square, opaque image
// with a flat background — png/webp/jpg) and re-run. The artwork is
// auto-detected and re-centered, so the source doesn't need to be centered.
// iOS/Android round/mask the icon themselves, so every output is full-bleed and
// square — never pre-rounded.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_SRC = path.join(root, "scripts/icon-source.png");
const hex = (v) => v.toString(16).padStart(2, "0");

// --- Read a source: find its flat background and the artwork's bounds, then
//     re-center the artwork on a square canvas ---
async function prepare(srcPath) {
  const meta = await sharp(srcPath).metadata();
  let pipeline = sharp(srcPath);
  if (meta.hasAlpha) {
    const { channels } = await sharp(srcPath).stats();
    if (channels[channels.length - 1].min < 255) {
      console.warn(`  ! ${path.basename(srcPath)} has transparent pixels; flattening onto white`);
    }
    pipeline = pipeline.flatten({ background: "#ffffff" });
  }
  const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  if (W !== H) console.warn(`  ! ${path.basename(srcPath)} is ${W}x${H}, not square`);
  const px = (x, y) => {
    const i = (y * W + x) * 3;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const bgArr = px(W - 3, H - 3); // flat background sampled from a corner
  const BG = { r: bgArr[0], g: bgArr[1], b: bgArr[2] };
  const differs = (c) =>
    Math.abs(c[0] - bgArr[0]) + Math.abs(c[1] - bgArr[1]) + Math.abs(c[2] - bgArr[2]) > 24;

  let minX = W, minY = H, maxX = 0, maxY = 0;
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (differs(px(x, y))) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const artW = maxX - minX;
  const artH = maxY - minY;

  const dx = Math.round(W / 2 - (minX + maxX) / 2);
  const dy = Math.round(H / 2 - (minY + maxY) / 2);
  const PAD = Math.max(Math.abs(dx), Math.abs(dy)) + 10;
  // (extend and extract are separate steps: sharp always runs extract first)
  const padded = await pipeline
    .clone()
    .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: BG })
    .png()
    .toBuffer();
  const centered = await sharp(padded)
    .extract({ left: PAD - dx, top: PAD - dy, width: W, height: H })
    .png()
    .toBuffer();

  // Farthest artwork pixel from the centre, as a fraction of the width, after
  // re-centering (Android's maskable safe zone is a circle of radius 0.40).
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  let far = 0;
  for (let y = 0; y < H; y += 3) {
    for (let x = 0; x < W; x += 3) {
      if (differs(px(x, y))) far = Math.max(far, Math.hypot(x - cx, y - cy) / W);
    }
  }

  return {
    name: path.basename(srcPath),
    centered, W, H, BG, artW, artH,
    bgHex: `#${hex(BG.r)}${hex(BG.g)}${hex(BG.b)}`,
    farthest: far,
    // "any" icons: zoomed in a little so the artwork fills the tile.
    zoomSide: Math.round(W * 0.87),
    // Favicon: tight crop, because small sizes need the artwork as large as possible.
    tightSide: Math.min(W, Math.round(Math.max(artW, artH) * 1.14)),
  };
}

const crop = (p, side) =>
  sharp(p.centered).extract({
    left: Math.round((p.W - side) / 2),
    top: Math.round((p.H - side) / 2),
    width: side,
    height: side,
  });
const png = (pipeline, size) =>
  pipeline.resize(size, size).png({ compressionLevel: 9 }).toBuffer();

// The set of renders every mode is built from
const render = {
  any: (p, size) => png(crop(p, p.zoomSide), size),
  // Maskable: the whole canvas shrunk to 90% and padded back out with the
  // background colour, so the artwork stays comfortably inside Android's safe
  // zone (a circle of radius 40%) however the launcher masks it.
  maskable: async (p, size) => {
    const inner = Math.round(size * 0.9);
    const margin = size - inner;
    return sharp(p.centered)
      .resize(inner, inner)
      .extend({
        top: Math.floor(margin / 2),
        bottom: Math.ceil(margin / 2),
        left: Math.floor(margin / 2),
        right: Math.ceil(margin / 2),
        background: p.BG,
      })
      .png({ compressionLevel: 9 })
      .toBuffer();
  },
  tight: (p, size) => png(crop(p, p.tightSide), size),
};

const argv = process.argv.slice(2);

if (argv[0] === "--sheet") {
  // ---------------- preview sheet ----------------
  const [, outFile, ...candidates] = argv;
  if (!outFile || candidates.length === 0) {
    console.error("usage: --sheet <out.png> <image> [<image> ...]");
    process.exit(1);
  }
  const T = 220, gap = 26, labelW = 200, rowH = T + gap;
  const cols = labelW + 3 * (T + gap) + 300;
  const W = cols, H = gap + candidates.length * rowH;
  const shape = (kind, size) =>
    Buffer.from(
      kind === "circle"
        ? `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`
        : `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${size * 0.225}"/></svg>`,
    );
  const masked = async (buf, kind) =>
    sharp(buf).resize(T, T).composite([{ input: shape(kind, T), blend: "dest-in" }]).png().toBuffer();
  const label = (lines) =>
    Buffer.from(
      `<svg width="${labelW}" height="90" xmlns="http://www.w3.org/2000/svg">` +
        lines
          .map(
            (l, i) =>
              `<text x="0" y="${20 + i * 22}" font-family="Helvetica, Arial, sans-serif" font-size="${i ? 14 : 18}" font-weight="${i ? 400 : 700}" fill="${i ? "#666" : "#222"}">${l}</text>`,
          )
          .join("") +
        `</svg>`,
    );

  const layers = [];
  for (let r = 0; r < candidates.length; r++) {
    const p = await prepare(path.resolve(candidates[r]));
    const top = gap + r * rowH;
    console.log(
      `${p.name}: ${p.W}x${p.H}, bg ${p.bgHex}, artwork ${p.artW}x${p.artH}, farthest from centre ${(p.farthest * 100).toFixed(1)}% (x0.9 in the maskable icon = ${(p.farthest * 90).toFixed(1)}%; safe <= 40%)`,
    );
    layers.push({
      input: label([`${r + 1}. ${p.name.slice(0, 20)}`, `${p.W}x${p.H}`, `bg ${p.bgHex}`]),
      left: 10,
      top: top + 6,
    });
    const tiles = [
      [await render.any(p, 512), "round"], // Android/Chrome tile
      [await render.any(p, 180), "round"], // iOS home screen (iOS rounds it itself)
      [await render.maskable(p, 512), "circle"], // Android adaptive icon, worst case
    ];
    for (let i = 0; i < tiles.length; i++) {
      layers.push({
        input: await masked(tiles[i][0], tiles[i][1]),
        left: labelW + i * (T + gap),
        top,
      });
    }
    // favicon at its real sizes, and 4x/nearest zoomed so it can be inspected
    const x0 = labelW + 3 * (T + gap);
    const f16 = await render.tight(p, 16);
    const f32 = await render.tight(p, 32);
    layers.push({ input: f16, left: x0, top: top + 4 });
    layers.push({ input: f32, left: x0 + 40, top: top + 4 });
    layers.push({
      input: await sharp(f16).resize(128, 128, { kernel: "nearest" }).png().toBuffer(),
      left: x0,
      top: top + 50,
    });
    layers.push({
      input: await sharp(f32).resize(128, 128, { kernel: "nearest" }).png().toBuffer(),
      left: x0 + 140,
      top: top + 50,
    });
  }
  await sharp({ create: { width: W, height: H, channels: 3, background: { r: 245, g: 245, b: 247 } } })
    .composite(layers)
    .png()
    .toFile(path.resolve(outFile));
  console.log("wrote sheet:", outFile);
} else {
  // ---------------- real icons ----------------
  const write = (file, buffer) => {
    const full = path.join(root, file);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, buffer);
    console.log("  wrote", file, `(${(buffer.length / 1024).toFixed(1)} KB)`);
  };
  const src = argv[0] ? path.resolve(argv[0]) : DEFAULT_SRC;
  const p = await prepare(src);
  console.log(`source ${p.name} ${p.W}x${p.H}, background ${p.bgHex}, artwork ${p.artW}x${p.artH}`);
  console.log("icons:");
  write("public/icons/icon-192.png", await render.any(p, 192));
  write("public/icons/icon-512.png", await render.any(p, 512));
  write("public/icons/icon-maskable-512.png", await render.maskable(p, 512));
  write("app/apple-icon.png", await render.any(p, 180)); // iOS home screen
  write("app/icon.png", await render.tight(p, 192)); // <link rel="icon">

  // favicon.ico: PNG-compressed 16/32/48 (browsers that ask for /favicon.ico)
  const sizes = [16, 32, 48];
  const images = await Promise.all(sizes.map((s) => render.tight(p, s)));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(sizes.length, 4);
  let offset = 6 + 16 * sizes.length;
  const entries = images.map((img, i) => {
    const e = Buffer.alloc(16);
    e[0] = sizes[i]; // width
    e[1] = sizes[i]; // height
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(img.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += img.length;
    return e;
  });
  write("app/favicon.ico", Buffer.concat([header, ...entries, ...images]));

  console.log(`\nbackground_color for the manifest: ${p.bgHex}`);
  console.log(`(currently hardcoded in app/[school]/[class]/manifest.webmanifest/route.ts)`);
}
