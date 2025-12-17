"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = require("node:assert");
const slugify_1 = require("./slugify");
node_assert_1.strict.equal((0, slugify_1.slugify)("Restauration de la cheminée"), "restauration-de-la-cheminee");
node_assert_1.strict.equal((0, slugify_1.slugify)("  Aile Est — Chambre du XVIᵉ  "), "aile-est-chambre-du-xvi");
console.log("✅ slugify tests passed");
