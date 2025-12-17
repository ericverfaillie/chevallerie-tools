"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = require("node:assert");
const generateFrontMatter_1 = require("./generateFrontMatter");
/**
 * Test 1 — Génération nominale complète
 */
{
    const output = (0, generateFrontMatter_1.generateFrontMatter)({
        title: "Restauration de la cheminée",
        date: new Date("2026-09-19"),
        slug: "restauration-cheminee",
        tags: ["cheminée", "XVIe siècle", "restauration"],
        draft: true,
    });
    // Encadrement YAML
    node_assert_1.strict.ok(output.startsWith("---"), "front-matter must start with ---");
    node_assert_1.strict.ok(output.endsWith("---"), "front-matter must end with ---");
    // Champs obligatoires
    node_assert_1.strict.ok(output.includes('title: "Restauration de la cheminée"'));
    node_assert_1.strict.ok(output.includes("date: 2026-09-19"));
    node_assert_1.strict.ok(output.includes('slug: "restauration-cheminee"'));
    node_assert_1.strict.ok(output.includes("draft: true"));
    // Tags (un par ligne)
    node_assert_1.strict.ok(output.includes("tags:\n"));
    node_assert_1.strict.ok(output.includes('  - "cheminée"'));
    node_assert_1.strict.ok(output.includes('  - "XVIe siècle"'));
    node_assert_1.strict.ok(output.includes('  - "restauration"'));
}
/**
 * Test 2 — Trim et nettoyage des entrées
 */
{
    const output = (0, generateFrontMatter_1.generateFrontMatter)({
        title: "  Restauration de la cheminée  ",
        date: new Date("2026-09-19"),
        slug: "  restauration-cheminee  ",
        tags: ["  cheminée  ", " ", "XVIe siècle"],
        draft: false,
    });
    node_assert_1.strict.ok(output.includes('title: "Restauration de la cheminée"'));
    node_assert_1.strict.ok(output.includes('slug: "restauration-cheminee"'));
    node_assert_1.strict.ok(!output.includes('  - ""'), "empty tags must be removed");
}
/**
 * Test 3 — slug optionnel
 */
{
    const output = (0, generateFrontMatter_1.generateFrontMatter)({
        title: "Article sans slug",
        date: new Date("2026-09-19"),
        tags: ["test"],
        draft: false,
    });
    node_assert_1.strict.ok(!output.includes("slug:"), "slug must be optional");
}
/**
 * Test 4 — Validation : titre vide
 */
{
    node_assert_1.strict.throws(() => (0, generateFrontMatter_1.generateFrontMatter)({
        title: "   ",
        date: new Date("2026-09-19"),
        tags: ["test"],
        draft: false,
    }), /title is required/);
}
/**
 * Test 5 — Validation : date invalide
 */
{
    node_assert_1.strict.throws(() => (0, generateFrontMatter_1.generateFrontMatter)({
        title: "Test",
        date: new Date("invalid-date"),
        tags: ["test"],
        draft: false,
    }), /date is invalid/);
}
/**
 * Test 6 — Validation : aucun tag valide
 */
{
    node_assert_1.strict.throws(() => (0, generateFrontMatter_1.generateFrontMatter)({
        title: "Test",
        date: new Date("2026-09-19"),
        tags: ["   ", ""],
        draft: false,
    }), /at least one tag is required/);
}
console.log("✅ All generateFrontMatter tests passed");
