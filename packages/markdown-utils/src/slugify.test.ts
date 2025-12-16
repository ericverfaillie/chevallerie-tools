import { strict as assert } from "node:assert";
import { slugify } from "./slugify";

assert.equal(
  slugify("Restauration de la cheminée"),
  "restauration-de-la-cheminee"
);
assert.equal(
  slugify("  Aile Est — Chambre du XVIᵉ  "),
  "aile-est-chambre-du-xvi"
);

console.log("✅ slugify tests passed");
