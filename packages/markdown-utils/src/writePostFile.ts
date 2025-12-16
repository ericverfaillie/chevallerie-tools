import { promises as fs } from "node:fs";
import * as path from "node:path";
import { generateFrontMatter, FrontMatterInput } from "./generateFrontMatter";
import { slugify } from "./slugify";

export interface WritePostInput {
  title: string;
  date: Date;
  tags: string[];
  draft: boolean;
  slug?: string;
  outputDir?: string; // défaut: content/posts
  body?: string; // défaut: template
}

function formatDateISO(date: Date): string {
  if (Number.isNaN(date.getTime())) throw new Error("date is invalid");
  return date.toISOString().slice(0, 10);
}

function defaultBodyTemplate(title: string): string {
  return [
    `# ${title}`,
    ``,
    `## Contexte`,
    `- Lieu : Manoir de la Chevallerie`,
    `- Période :`,
    `- Objectif :`,
    ``,
    `## Travaux réalisés`,
    `-`,
    ``,
    `## Détails techniques`,
    `- Matériaux :`,
    `- Méthodes :`,
    `- Points de vigilance :`,
    ``,
    `## Photos`,
    `- ![Alt text](chemin/vers/photo.jpg)`,
    ``,
    `## Suite`,
    `- Prochaines étapes :`,
    ``,
  ].join("\n");
}

/**
 * Écrit un fichier Markdown "post" et renvoie le chemin créé.
 * Refuse d'écraser un fichier existant.
 */
export async function writePostFile(input: WritePostInput): Promise<string> {
  const title = input.title.trim();
  if (title.length === 0) throw new Error("title is required");

  const dateIso = formatDateISO(input.date);
  const slug = input.slug?.trim() || slugify(title);
  const outputDir = input.outputDir?.trim() || path.join("content", "posts");

  const filename = `${dateIso}-${slug}.md`;
  const filePath = path.join(outputDir, filename);

  const fmInput: FrontMatterInput = {
    title,
    date: input.date,
    slug,
    tags: input.tags,
    draft: input.draft,
  };

  const frontMatter = generateFrontMatter(fmInput);
  const body = (input.body ?? defaultBodyTemplate(title)).trimEnd();

  const content = `${frontMatter}\n\n${body}\n`;

  // créer le dossier si besoin
  await fs.mkdir(outputDir, { recursive: true });

  // refuser l'écrasement
  try {
    await fs.access(filePath);
    throw new Error(`file already exists: ${filePath}`);
  } catch (err: any) {
    // access échoue => le fichier n'existe pas => ok
    if (err?.code !== "ENOENT") throw err;
  }

  await fs.writeFile(filePath, content, { encoding: "utf8" });
  return filePath;
}
