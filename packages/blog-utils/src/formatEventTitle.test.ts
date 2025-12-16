import { strict as assert } from "node:assert";
import { formatEventTitle } from "./formatEventTitle";

// 1) Standard: format attendu + trims
{
  const out = formatEventTitle(
    " Manoir de la Chevallerie ",
    " Restauration de la cheminée ",
    new Date("2026-09-19")
  );
  assert.equal(
    out,
    "Manoir de la Chevallerie — Restauration de la cheminée (19/09/2026)"
  );
}

// 2) Institutionnel: format attendu + mois long
{
  const out = formatEventTitle(
    "Manoir de la Chevallerie  ",
    "Restauration de la cheminée  ",
    new Date("2026-09-19"),
    "institutionnel"
  );
  assert.equal(
    out,
    "Restauration de la cheminée — Manoir de la Chevallerie · 19 septembre 2026"
  );
}

// 3) Validation: place vide après trim
{
  assert.throws(
    () => formatEventTitle("   ", "Sujet", new Date("2026-09-19")),
    /place is required/
  );
}

// 4) Validation: topic vide après trim
{
  assert.throws(
    () => formatEventTitle("Lieu", "   ", new Date("2026-09-19")),
    /topic is required/
  );
}

// 5) Validation: date invalide
{
  assert.throws(
    () => formatEventTitle("Lieu", "Sujet", new Date("invalid-date")),
    /date is invalid/
  );
}

console.log("✅ All tests passed");
