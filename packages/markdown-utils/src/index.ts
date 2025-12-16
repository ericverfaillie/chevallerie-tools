import { generateFrontMatter } from "./generateFrontMatter";

const front = generateFrontMatter({
  title: "Restauration de la cheminée",
  date: new Date("2026-09-19"),
  slug: "découvrez le manoir",
  tags: ["cheminée", "XVIe siècle", "restauration"],
  draft: true,
});

console.log(front);
