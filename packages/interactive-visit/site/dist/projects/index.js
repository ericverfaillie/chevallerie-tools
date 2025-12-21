import { pignonProject } from "./pignon.js";
import { chemineeProject } from "./cheminee.js";
export const projects = {
    pignon: pignonProject,
    cheminee: chemineeProject,
};
export const catalog = [
    {
        id: "pignon",
        title: "Pignon",
        subtitle: "Maçonneries, reprises et lecture d’ensemble.",
        coverImage: "./assets/pignon/scene-pignon.jpg",
        coverAlt: "Pignon — vue d’ensemble",
    },
    {
        id: "cheminee",
        title: "Cheminée",
        subtitle: "Foyer, décor, blason et détails sculptés.",
        coverImage: "./assets/cheminee/scene-cheminee.jpg",
        coverAlt: "Cheminée — vue d’ensemble",
    },
];
export const defaultProjectId = catalog[0]?.id ?? "pignon";
