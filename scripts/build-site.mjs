import { mkdir, rm, cp, stat } from "node:fs/promises";
import path from "node:path";

/**
 * Vérifie si un chemin existe
 */
async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

const pkgName = process.argv[2];
if (!pkgName)
  throw new Error("Usage: node scripts/build-site.mjs <package-name>");
/**
 * Vérifie si un chemin existe
 */

const root = process.cwd();
const pkgDir = path.join(root, "packages", pkgName);

const publicDir = path.join(pkgDir, "public");
const distDir = path.join(pkgDir, "dist");
const siteDir = path.join(pkgDir, "site");

console.log(`📦 Building package site: ${pkgName}`);

if (!(await exists(pkgDir))) throw new Error(`Package not found: ${pkgDir}`);
if (!(await exists(publicDir)))
  throw new Error(`Missing public/: ${publicDir}`);
if (!(await exists(distDir)))
  throw new Error(`Missing dist/. Run tsc first for ${pkgName}.`);

await rm(siteDir, { recursive: true, force: true });
await mkdir(siteDir, { recursive: true });

/* 4. Copie des fichiers */
console.log("📁 Copying public assets");
await cp(publicDir, siteDir, { recursive: true });
console.log("📁 Copying compiled TypeScript");
await cp(distDir, path.join(siteDir, "dist"), { recursive: true });

console.log(`✅ Assembled: ${siteDir}`);
