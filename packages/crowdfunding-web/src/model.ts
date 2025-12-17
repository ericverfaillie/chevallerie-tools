export interface FundingMilestone {
  amount: number;
  title: string;
  description: string;
}

export interface Reward {
  minAmount: number; // (A) "à partir de"
  title: string; // ex. "Remerciements"
  description: string; // texte court, factuel
}

export interface Supporter {
  name: string;
  url?: string; // optionnel
}

export interface FundingProject {
  title: string;
  description: string;

  objectiveAmount: number;
  collectedAmount: number;
  currency: "EUR";

  hero: {
    imageAlt: string;
    caption: string;
    note: string;
    statusLabel: string; // ex. "Campagne en cours"
  };

  monument: {
    text: string;
    facts: string[]; // puces
    keyFacts: string[]; // repères (liste courte)
  };

  works: {
    text: string;
    points: string[];
    method: string;
    transparency: string;
  };

  milestones: FundingMilestone[];

  rewards: {
    intro: string;
    items: Reward[];
    footnote?: string; // ici : texte fiscal par défaut
  };

  followup: {
    text: string;
    links: { label: string; href: string }[];
  };

  contribute: {
    text: string;
    donateUrl: string;
    footnote: string;
  };

  supporters: {
    text: string;
    items: Supporter[];
  };

  footerText: string;
}
