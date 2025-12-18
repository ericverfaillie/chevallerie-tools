export const visitProject = {
    projectTitle: "Visite interactive — Manoir de la Chevallerie",
    footerText: "Visite interactive autonome — Manoir de la Chevallerie. Mise à jour au fil des restaurations.",
    startViewId: "scene-1",
    views: [
        {
            id: "scene-1",
            title: "Vue d’ensemble",
            text: "Cliquez sur les points d’intérêt pour ouvrir un détail et sa notice.",
            image: "./assets/scene-1.jpg",
            imageAlt: "Vue d’ensemble (photo de travail)",
            caption: "Vue d’ensemble — points d’intérêt cliquables.",
            hotspots: [
                {
                    x: 0.35,
                    y: 0.55,
                    label: "Détail : cheminée",
                    targetId: "detail-cheminee",
                },
                {
                    x: 0.72,
                    y: 0.42,
                    label: "Détail : oculus",
                    targetId: "detail-oculus",
                },
            ],
        },
        {
            id: "detail-cheminee",
            title: "Détail — Cheminée",
            text: "Notice courte : datation, éléments remarquables, et état de conservation (texte factuel).",
            image: "./assets/detail-cheminee.jpg",
            imageAlt: "Détail de la cheminée",
            caption: "Cheminée — détail.",
            hotspots: [],
        },
        {
            id: "detail-oculus",
            title: "Détail — Oculus",
            text: "Notice courte : fonction, lecture architecturale, et points d’attention (texte factuel).",
            image: "./assets/detail-oculus.jpg",
            imageAlt: "Détail de l’oculus",
            caption: "Oculus — détail.",
            hotspots: [],
        },
    ],
};
