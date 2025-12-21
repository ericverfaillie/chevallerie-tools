import type { VisitProject } from "../model.js";
import { pignonProject } from "./pignon.js";
import { chemineeProject } from "./cheminee.js";

export type ProjectId = string;

export const projects: Record<ProjectId, VisitProject> = {
  pignon: pignonProject,
  cheminee: chemineeProject,
};

export const catalog: Array<{
  id: ProjectId;
  title: string;
  subtitle: string;
  coverImage: string; // chemin public/
  coverAlt: string;
  caption?: string;
  status?: string;
}> = [
  {
    id: "pignon",
    title: "Pignon",
    subtitle: "Maçonneries, reprises et lecture d’ensemble.",
    coverImage: "./assets/pignon/scene-pignon.jpg",
    coverAlt: "Pignon — vue d’ensemble",
    caption: "Vue de référence — localisation des désordres et interventions.",
    status: "En cours",
  },
  {
    id: "cheminee",
    title: "Cheminée",
    subtitle: "Foyer, décor, blason et détails sculptés.",
    coverImage: "./assets/cheminee/scene-cheminee.jpg",
    coverAlt: "Cheminée — vue d’ensemble",
    caption: "Vue de référence — localisation des désordres et interventions.",
    status: "En cours",
  },
];

export const defaultProjectId: ProjectId = catalog[0]?.id ?? "pignon";
