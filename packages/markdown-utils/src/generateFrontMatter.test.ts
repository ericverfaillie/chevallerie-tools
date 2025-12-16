import { strict as assert } from "node:assert";
import { generateFrontMatter } from "./generateFrontMatter";

/**
 * Test 1 — Génération nominale complète
 */
{
  const output = generateFrontMatter({
    title: "Restauration de la cheminée",
    date: new Date("2026-09-19"),
    slug: "restauration-cheminee",
    tags: ["cheminée", "XVIe siècle", "restauration"],
    draft: true,
  });

  // Encadrement YAML
  assert.ok(output.startsWith("---"), "front-matter must start with ---");
  assert.ok(output.endsWith("---"), "front-matter must end with ---");

  // Champs obligatoires
  assert.ok(output.includes('title: "Restauration de la cheminée"'));
  assert.ok(output.includes("date: 2026-09-19"));
  assert.ok(output.includes('slug: "restauration-cheminee"'));
  assert.ok(output.includes("draft: true"));

  // Tags (un par ligne)
  assert.ok(output.includes("tags:\n"));
  assert.ok(output.includes('  - "cheminée"'));
  assert.ok(output.includes('  - "XVIe siècle"'));
  assert.ok(output.includes('  - "restauration"'));
}

/**
 * Test 2 — Trim et nettoyage des entrées
 */
{
  const output = generateFrontMatter({
    title: "  Restauration de la cheminée  ",
    date: new Date("2026-09-19"),
    slug: "  restauration-cheminee  ",
    tags: ["  cheminée  ", " ", "XVIe siècle"],
    draft: false,
  });

  assert.ok(output.includes('title: "Restauration de la cheminée"'));
  assert.ok(output.includes('slug: "restauration-cheminee"'));
  assert.ok(!output.includes('  - ""'), "empty tags must be removed");
}

/**
 * Test 3 — slug optionnel
 */
{
  const output = generateFrontMatter({
    title: "Article sans slug",
    date: new Date("2026-09-19"),
    tags: ["test"],
    draft: false,
  });

  assert.ok(!output.includes("slug:"), "slug must be optional");
}

/**
 * Test 4 — Validation : titre vide
 */
{
  assert.throws(
    () =>
      generateFrontMatter({
        title: "   ",
        date: new Date("2026-09-19"),
        tags: ["test"],
        draft: false,
      }),
    /title is required/
  );
}

/**
 * Test 5 — Validation : date invalide
 */
{
  assert.throws(
    () =>
      generateFrontMatter({
        title: "Test",
        date: new Date("invalid-date"),
        tags: ["test"],
        draft: false,
      }),
    /date is invalid/
  );
}

/**
 * Test 6 — Validation : aucun tag valide
 */
{
  assert.throws(
    () =>
      generateFrontMatter({
        title: "Test",
        date: new Date("2026-09-19"),
        tags: ["   ", ""],
        draft: false,
      }),
    /at least one tag is required/
  );
}

console.log("✅ All generateFrontMatter tests passed");
