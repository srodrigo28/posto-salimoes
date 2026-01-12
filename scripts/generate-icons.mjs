import sharp from 'sharp';
import fs from 'fs/promises';
import { existsSync } from 'fs';

const in192 = 'assets/icon-192.svg';
const in512 = 'assets/icon-512.svg';
const out192 = 'assets/icon-192.png';
const out512 = 'assets/icon-512.png';

async function ensureInputs() {
  if (!existsSync(in192) || !existsSync(in512)) {
    console.error('SVG source icons not found in assets/. Ensure icon-192.svg and icon-512.svg exist.');
    process.exit(1);
  }
}

async function generate() {
  await ensureInputs();
  await sharp(in192).png().resize(192, 192).toFile(out192);
  await sharp(in512).png().resize(512, 512).toFile(out512);
  console.log('Generated:', out192, out512);
}

generate().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
