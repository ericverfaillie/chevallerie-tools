"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = require("node:assert");
const formatEventTitle_1 = require("./formatEventTitle");
// 1) Standard: format attendu + trims
{
    const out = (0, formatEventTitle_1.formatEventTitle)(" Manoir de la Chevallerie ", " Restauration de la cheminée ", new Date("2026-09-19"));
    node_assert_1.strict.equal(out, "Manoir de la Chevallerie — Restauration de la cheminée (19/09/2026)");
}
// 2) Institutionnel: format attendu + mois long
{
    const out = (0, formatEventTitle_1.formatEventTitle)("Manoir de la Chevallerie  ", "Restauration de la cheminée  ", new Date("2026-09-19"), "institutionnel");
    node_assert_1.strict.equal(out, "Restauration de la cheminée — Manoir de la Chevallerie · 19 septembre 2026");
}
// 3) Validation: place vide après trim
{
    node_assert_1.strict.throws(() => (0, formatEventTitle_1.formatEventTitle)("   ", "Sujet", new Date("2026-09-19")), /place is required/);
}
// 4) Validation: topic vide après trim
{
    node_assert_1.strict.throws(() => (0, formatEventTitle_1.formatEventTitle)("Lieu", "   ", new Date("2026-09-19")), /topic is required/);
}
// 5) Validation: date invalide
{
    node_assert_1.strict.throws(() => (0, formatEventTitle_1.formatEventTitle)("Lieu", "Sujet", new Date("invalid-date")), /date is invalid/);
}
console.log("✅ All tests passed");
