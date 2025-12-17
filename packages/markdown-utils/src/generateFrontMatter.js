"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFrontMatter = generateFrontMatter;
function formatDateISO(date) {
    if (Number.isNaN(date.getTime()))
        throw new Error("date is invalid");
    return date.toISOString().slice(0, 10); // YYYY-MM-DD
}
function quoteYamlString(value) {
    // YAML safe minimal: échappe les guillemets
    const v = value.replace(/"/g, '\\"');
    return `"${v}"`;
}
function generateFrontMatter(input) {
    const title = input.title.trim();
    const slug = input.slug?.trim();
    const tags = input.tags.map((t) => t.trim()).filter((t) => t.length > 0);
    if (title.length === 0)
        throw new Error("title is required");
    if (!Array.isArray(input.tags))
        throw new Error("tags must be an array");
    if (tags.length === 0)
        throw new Error("at least one tag is required");
    const date = formatDateISO(input.date);
    const lines = [];
    lines.push("---");
    lines.push(`title: ${quoteYamlString(title)}`);
    lines.push(`date: ${date}`);
    if (slug && slug.length > 0) {
        lines.push(`slug: ${quoteYamlString(slug)}`);
    }
    lines.push("tags:");
    for (const tag of tags) {
        lines.push(`  - ${quoteYamlString(tag)}`);
    }
    lines.push(`draft: ${input.draft}`);
    lines.push("---");
    return lines.join("\n");
}
