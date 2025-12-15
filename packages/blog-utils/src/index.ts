import { formatEventTitle } from "./formatEventTitle";

const title = formatEventTitle(
  "Manoir   de la Chevallerie  ",
  "Restauration de la cheminée  ",
  new Date("2026-09-19"),
  "institutionnel"
);

console.log(title);
