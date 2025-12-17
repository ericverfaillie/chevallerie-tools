"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const writePostFile_1 = require("./writePostFile");
async function main() {
    const created = await (0, writePostFile_1.writePostFile)({
        title: "Restauration de la cheminée",
        date: new Date("2026-09-19"),
        tags: ["cheminée", "XVIe siècle", "restauration", "aile Est"],
        draft: true,
        // outputDir: "content/posts", // optionnel
    });
    console.log(`✅ Post created: ${created}`);
}
main().catch((err) => {
    console.error("❌ Error:", err instanceof Error ? err.message : err);
    process.exitCode = 1;
});
