import type { VisitProject } from "../model.js";

export const pignonProject: VisitProject = {
  projectTitle: "Visite interactive — Manoir de la Chevallerie",
  footerText:
    "Visite interactive autonome — Manoir de la Chevallerie. Mise à jour au fil des restaurations.",
  startViewId: "scene-cheminee",
  views: [
    {
      id: "scene-cheminee",
      title: "Vue d’ensemble",
      text: "Cliquez sur les points d’intérêt pour ouvrir un détail et sa notice.",
      image: "./assets/pignon/scene-pignon.jpg",
      imageAlt: "Vue d’ensemble (photo de travail)",
      caption: "Vue d’ensemble — points d’intérêt cliquables.",
      hotspots: [
        {
          x: 0.55,
          y: 0.55,
          label: "Détail : four à pain",
          targetId: "detail-four-a-pain",
        },
        {
          x: 0.3,
          y: 0.65,
          label: "Détail : fenêtre fermée",
          targetId: "detail-fenetre-fermee",
        },
      ],
    },
    {
      id: "detail-four-a-pain",
      title: "Détail : four à pain",
      text: "Notice courte : datation, éléments remarquables, et état de conservation (texte factuel).",
      image: "./assets/pignon/detail-four-a-pain.jpg",
      imageAlt: "Détail : four à pain",
      caption: "Four à pain — détail.",
      backId: "scene-pignon",
      hotspots: [
        {
          x: 0.53,
          y: 0.27,
          label: "Détail : four à pain avant travaux",
          targetId: "detail-four-avant-travaux",
        },
        {
          x: 0.68,
          y: 0.7,
          label: "Détail : four à pain après travaux",
          targetId: "detail-four-apres-travaux",
        },
      ],
    },
    {
      id: "detail-four-apres-travaux",
      title: "Détail : four à pain après travaux",
      text: "Notice courte : description de l’armoirie, emplacement, lecture, et observations (texte factuel).",
      image: "./assets/pignon/detail-blason.jpg",
      imageAlt: "Détail : four à pain après travaux",
      caption: "Détail : four à pain après travaux",
      backId: "detail-four-a-pain",
      hotspots: [],
    },
    {
      id: "detail-four-avant-travaux",
      title: "Détail : four à pain avant travaux",
      text: "Notice courte : description du jambage,  , emplacement, lecture, et observations (texte factuel).",
      image: "./assets/pignon/detail-jambage-droit.jpg",
      imageAlt: "Détail : four à pain avant travaux",
      caption: "Détail : four à pain avant travaux",
      backId: "detail-four-a-pain",
      hotspots: [],
    },

    {
      id: "detail-fenetre-fermee",
      title: "fenêtre fermée",
      text: "Notice courte : fonction, lecture architecturale, et points d’attention (texte factuel).",
      image: "./assets/pignon/fenetre-fermee.jpg",
      imageAlt: "Détail de l’oculus",
      caption: "fenêtre fermée",
      backId: "scene-pignon",
      hotspots: [],
    },
  ],
};
