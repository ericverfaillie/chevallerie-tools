import { mkdir, rm, cp, readdir, stat } from "node:fs/promises";
import path from "node:path";

async function isDir(p) {
  try {
    return (await stat(p)).isDirectory();
  } catch {
    return false;
  }
}

const root = process.cwd();
const packagesDir = path.join(root, "packages");
const pagesDir = path.join(root, "pages");

await rm(pagesDir, { recursive: true, force: true });
await mkdir(pagesDir, { recursive: true });

const pkgNames = await readdir(packagesDir);
for (const name of pkgNames) {
  const pkgDir = path.join(packagesDir, name);
  if (!(await isDir(pkgDir))) continue;

  const siteDir = path.join(pkgDir, "site");
  if (!(await isDir(siteDir))) continue;

  // On publie sous /<package-name>/
  const target = path.join(pagesDir, name);
  await cp(siteDir, target, { recursive: true });
  console.log(`✅ Published folder: /${name}/`);
}

// (Optionnel) une page d’accueil qui liste les sous-sites
const indexHtml = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Chevallerie — Pages</title></head>
<body style="font-family:system-ui;padding:24px;max-width:900px;margin:auto;">
<h1>Chevallerie — Pages</h1>
<ul>
${pkgNames.map((n) => `<li><a href="./${n}/">${n}</a></li>`).join("\n")}
</ul>
</body></html>`;
await (
  await import("node:fs/promises")
).writeFile(path.join(pagesDir, "index.html"), indexHtml, "utf8");
