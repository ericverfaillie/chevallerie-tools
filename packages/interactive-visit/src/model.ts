export interface Hotspot {
  x: number; // 0..1 (relatif à la largeur de l’image)
  y: number; // 0..1 (relatif à la hauteur de l’image)
  label: string; // texte accessible
  targetId: string; // id de la vue cible
}

export interface ViewNode {
  id: string;
  title: string;
  // Texte court d’introduction (optionnel si vous préférez ne garder que notice)
  lead?: string;

  image: string;
  imageAlt: string;
  caption: string;

  hotspots: Hotspot[];
  backId?: string; // optionnel (B3)

  notice?: Notice;
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

export interface NoticeLink {
  label: string;
  url: string;
}

export interface Notice {
  /*
      Datation  
      Datation estimée : …

      État des lieux à l’achat  
      À l’acquisition, …

      État actuel  
      À ce jour, …

      Travaux effectués  
      Des travaux ont consisté à …

      Travaux à venir  
      Des interventions complémentaires sont à l’étude / Aucune intervention n’est programmée à ce stade.

      Intervention  
      Les interventions privilégient …

      Pour aller plus loin  
      → Article détaillé : …
  */
  datation?: string;
  etatInitial?: string; // état des lieux à l'achat
  etatActuel?: string;
  travauxEffectues?: string;
  travauxAVenir?: string;
  intervention?: string;
  blogLinks?: NoticeLink[]; // 0..n liens
}
