import type { VisitProject } from "./model.js";

export const visitProject: VisitProject = {
  projectTitle: "Visite interactive — Manoir de la Chevallerie",
  footerText:
    "Visite interactive autonome — Manoir de la Chevallerie. Mise à jour au fil des restaurations.",
  startViewId: "scene-1",
  views: [
    {
      id: "scene-1",
      title: "Vue d’ensemble",
      text: "Cette vue présente la scène dans sa globalité. À l’étape suivante, des points d’intérêt permettront d’explorer des détails (zoom + explications).",
      image: "./assets/scene-1.jpg",
      imageAlt: "Vue d’ensemble du manoir (photo de travail)",
      caption:
        "Vue d’ensemble — photographie de référence pour la visite interactive.",
    },
  ],
};
