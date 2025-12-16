import { writePostFile } from "./writePostFile";

type ArgMap = Record<string, string | boolean>;

function parseArgs(argv: string[]): ArgMap {
  const args: ArgMap = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;

    const key = a.slice(2);
    const next = argv[i + 1];

    // flags: --draft
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i++;
    }
  }
  return args;
}

function requireString(args: ArgMap, key: string): string {
  const v = args[key];
  if (typeof v !== "string" || v.trim().length === 0) {
    throw new Error(`Missing or empty --${key}`);
  }
  return v.trim();
}

function optionalString(args: ArgMap, key: string): string | undefined {
  const v = args[key];
  if (typeof v !== "string") return undefined;
  const s = v.trim();
  return s.length > 0 ? s : undefined;
}

function parseDate(value: string): Date {
  // Attend YYYY-MM-DD
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) throw new Error(`Invalid --date: ${value}`);
  return d;
}

function parseTags(value: string): string[] {
  const tags = value
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
  if (tags.length === 0)
    throw new Error("At least one tag is required in --tags");
  return tags;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    console.log(
      [
        "Usage:",
        '  npm run post:new -- --title "..." --date YYYY-MM-DD --tags "a,b,c" [--draft] [--slug "..."] [--out "content/posts"]',
        "",
        "Example:",
        '  npm run post:new -- --title "Restauration de la cheminée" --date 2026-09-19 --tags "cheminée,XVIe siècle,restauration" --draft',
      ].join("\n")
    );
    return;
  }

  const title = requireString(args, "title");
  const date = args.date ? parseDate(String(args.date)) : new Date();
  const tags = args.tags ? parseTags(String(args.tags)) : [];
  const draft = Boolean(args.draft);
  const slug = optionalString(args, "slug");
  const out = optionalString(args, "out");

  const created = await writePostFile({
    title,
    date,
    tags,
    draft,
    slug,
    outputDir: out,
  });

  console.log(`✅ Post created: ${created}`);
}

main().catch((err) => {
  console.error("❌ Error:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
