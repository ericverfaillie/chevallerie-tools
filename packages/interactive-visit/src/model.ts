export interface Hotspot {
  x: number; // 0..1 (relatif à la largeur de l’image)
  y: number; // 0..1 (relatif à la hauteur de l’image)
  label: string; // texte accessible
  targetId: string; // id de la vue cible
}

export interface ViewNode {
  id: string;
  title: string;
  text: string;

  image: string;
  imageAlt: string;
  caption: string;

  hotspots: Hotspot[];
  backId?: string; // optionnel (B3)

  // Préparation audio (à brancher plus tard sur izi)
  audioSrc?: string; // ex: "./assets/audio/cheminee.m4a" ou URL media.izi.travel
  audioTitle?: string; // titre court (optionnel)
}

export interface VisitProject {
  projectTitle: string;
  footerText: string;
  startViewId: string;
  views: ViewNode[];
}
