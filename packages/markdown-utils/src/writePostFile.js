"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePostFile = writePostFile;
const node_fs_1 = require("node:fs");
const path = __importStar(require("node:path"));
const generateFrontMatter_1 = require("./generateFrontMatter");
const slugify_1 = require("./slugify");
function formatDateISO(date) {
    if (Number.isNaN(date.getTime()))
        throw new Error("date is invalid");
    return date.toISOString().slice(0, 10);
}
function defaultBodyTemplate(title) {
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
async function writePostFile(input) {
    const title = input.title.trim();
    if (title.length === 0)
        throw new Error("title is required");
    const dateIso = formatDateISO(input.date);
    const slug = input.slug?.trim() || (0, slugify_1.slugify)(title);
    const outputDir = input.outputDir?.trim() || path.join("content", "posts");
    const filename = `${dateIso}-${slug}.md`;
    const filePath = path.join(outputDir, filename);
    const fmInput = {
        title,
        date: input.date,
        slug,
        tags: input.tags,
        draft: input.draft,
    };
    const frontMatter = (0, generateFrontMatter_1.generateFrontMatter)(fmInput);
    const body = (input.body ?? defaultBodyTemplate(title)).trimEnd();
    const content = `${frontMatter}\n\n${body}\n`;
    // créer le dossier si besoin
    await node_fs_1.promises.mkdir(outputDir, { recursive: true });
    // refuser l'écrasement
    try {
        await node_fs_1.promises.access(filePath);
        throw new Error(`file already exists: ${filePath}`);
    }
    catch (err) {
        // access échoue => le fichier n'existe pas => ok
        if (err?.code !== "ENOENT")
            throw err;
    }
    await node_fs_1.promises.writeFile(filePath, content, { encoding: "utf8" });
    return filePath;
}
