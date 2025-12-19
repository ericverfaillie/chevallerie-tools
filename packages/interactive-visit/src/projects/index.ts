import type { VisitProject } from "../model.js";
import { pignonProject } from "./pignon.js";
import { chemineeProject } from "./cheminee.js";

export const projects: Record<string, VisitProject> = {
  pignon: pignonProject,
  cheminee: chemineeProject,
};

export const defaultProjectId = "pignon";
