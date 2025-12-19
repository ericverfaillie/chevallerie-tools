import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const uuid = process.argv[2];
if (!uuid) {
  throw new Error(
    "Usage: node scripts/izi-fetch-mtgobject.mjs <mtgobject-uuid> [languages]"
  );
}

const languages = process.argv[3] ?? "fr,en";
const apiKey = process.env.IZI_API_KEY;

if (!apiKey) {
  throw new Error("Missing env var IZI_API_KEY");
}

// Version d’API côté Accept (exemple conforme doc)
const accept = "application/izi-api-v1.8+json";

const url = `https://api.izi.travel/mtgobjects/${uuid}?languages=${encodeURIComponent(
  languages
)}`;

const res = await fetch(url, {
  headers: {
    "X-IZI-API-KEY": apiKey,
    Accept: accept,
  },
});

if (!res.ok) {
  const text = await res.text().catch(() => "");
  throw new Error(`izi API error ${res.status} ${res.statusText}\n${text}`);
}

const json = await res.json();

// Écriture dans un dossier généré (dans le package)
const outDir = path.join(
  process.cwd(),
  "packages",
  "interactive-visit",
  "src",
  "generated"
);
await mkdir(outDir, { recursive: true });

const outFile = path.join(outDir, `izi.mtgobject.${uuid}.json`);
await writeFile(outFile, JSON.stringify(json, null, 2), "utf8");

console.log("✅ Saved:", outFile);
