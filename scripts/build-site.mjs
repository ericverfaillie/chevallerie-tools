import { mkdir, rm, cp, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const pkg = path.join(root, "packages", "crowdfunding-web");

const publicDir = path.join(pkg, "public");
const distDir = path.join(pkg, "dist");
const siteDir = path.join(pkg, "site");

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

console.log("📦 Building crowdfunding site…");

/* 1. Nettoyage du dossier site (si présent) */
if (await exists(siteDir)) {
  console.log("🧹 Cleaning existing site directory");
  await rm(siteDir, { recursive: true, force: true });
}

/* 2. Création du dossier site */
await mkdir(siteDir, { recursive: true });

/* 3. Vérifications de sécurité */
if (!(await exists(publicDir))) {
  throw new Error(`Public directory not found: ${publicDir}`);
}
if (!(await exists(distDir))) {
  throw new Error(`Dist directory not found. Did you run TypeScript build?`);
}

/* 4. Copie des fichiers */
console.log("📁 Copying public assets");
await cp(publicDir, siteDir, { recursive: true });

console.log("📁 Copying compiled TypeScript");
await cp(distDir, path.join(siteDir, "dist"), { recursive: true });

console.log("✅ Site assembled successfully at:", siteDir);
