import { mkdir, rm, cp } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const pkg = path.join(root, "packages", "crowdfunding-web");

const publicDir = path.join(pkg, "public");
const distDir = path.join(pkg, "dist");

// Dossier final à publier
const siteDir = path.join(pkg, "site");

await rm(siteDir, { recursive: true, force: true });
await mkdir(siteDir, { recursive: true });

// Copie du "public" (index.html, styles.css, assets/...)
await cp(publicDir, siteDir, { recursive: true });

// Copie du dist TS -> JS dans site/dist
await cp(distDir, path.join(siteDir, "dist"), { recursive: true });

console.log("✅ Site assembled at:", siteDir);
