const fs = require("fs");
const path = require("path");

const SRC = path.resolve("src/assets");
const DEST = path.resolve("public/images");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

if (fs.existsSync(SRC)) {
  copyDir(SRC, DEST);
  console.log(`Copied assets: ${SRC} -> ${DEST}`);
} else {
  console.warn(`No assets folder found at ${SRC}`);
}