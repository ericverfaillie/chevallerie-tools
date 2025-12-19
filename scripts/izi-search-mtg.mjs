import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

//curl -X GET -H "X-IZI-API-KEY: 14010cf2-3151-475d-a7ae-234ba057424f" -H "Accept:application/izi-api-v1.8+json"
// 'https://api.izi.travel/mtg/objects/search?languages=en&type=museum,collection&publishers=69eb8c07-ce14-4839-ba3d-f4686ea3c9d2,50b5f15b-7328-4509-8250-d36a523292b3'

/*const uuid = process.argv[2];
if (!uuid) {
  throw new Error(
    "Usage: node scripts/izi-search-mtg.mjs [languages] ["
  );
}
*/

const languages = process.argv[2] ?? "fr,en";
const type = process.argv[3] ?? "museum,collection";
const publishers = process.argv[4];
const apiKey = process.env.IZI_API_KEY;

if (!apiKey) {
  throw new Error("Missing env var IZI_API_KEY");
}

// Version d’API côté Accept (exemple conforme doc)
const accept = "application/izi-api-v1.8+json";

const url = `https://api.izi.travel/mtg/objects/search
?type=${type}
?languages=${encodeURIComponent(languages)}
?publishers=${publishers}
`;

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

const outFile = path.join(outDir, `izi.mtg.search.${type}.${publishers}.json`);
await writeFile(outFile, JSON.stringify(json, null, 2), "utf8");

console.log("✅ Saved:", outFile);
