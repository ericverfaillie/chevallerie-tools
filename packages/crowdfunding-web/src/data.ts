import type { FundingProject } from "./model.js";

const DEFAULT_TAX_FOOTNOTE = `En application de la réglementation en vigueur, les dons versés dans le cadre d’une opération de mécénat affecté à des travaux ouvrent droit à une réduction d’impôt :

• Particuliers : 66 % du montant du don vient en réduction de l’impôt sur le revenu, dans la limite de 20 % du revenu imposable.
• Entreprises : 60 % du montant du don vient en réduction de l’impôt (IR ou IS), dans la limite de 20 000 € ou de 5 pour mille du chiffre d’affaires annuel HT lorsque ce dernier montant est plus élevé. L’éventuel excédent est reportable pendant cinq ans.

Ces informations sont générales : elles peuvent varier selon la structure de collecte et votre situation.`;

export const project: FundingProject = {
  title: "Restauration du mur pignon",
  description:
    "Financer la restauration progressive du mur pignon (18 m) : consolidation et maçonnerie à la chaux, avec une documentation complète des étapes.",

  objectiveAmount: 45000,
  collectedAmount: 12850,
  currency: "EUR",
  hero: {
    imageAlt: "Mur pignon du Manoir de la Chevallerie – état initial",
    caption:
      "Mur pignon – vue générale avant travaux. Les désordres observés justifient une intervention progressive.",
    note: "Cette page présente l’état d’avancement du financement et des travaux associés, mis à jour régulièrement.",
    statusLabel: "Campagne en cours",
  },

  monument: {
    text: "Le Manoir de la Chevallerie est un ensemble bâti ancien dont le mur pignon constitue un élément structurant, tant sur le plan architectural que paysager.",
    facts: [
      "Édifice ancien à valeur patrimoniale reconnue.",
      "Mur pignon de grande hauteur exposé aux intempéries.",
      "Ensemble visible depuis les abords et participant à l’identité du site.",
    ],
    keyFacts: [
      "Localisation : Sarthe",
      "Période principale : XVe siècle",
      "Statut : monument privé à caractère patrimonial",
    ],
  },
  works: {
    text: "Le chantier porte sur la restauration progressive du mur pignon, présentant des désordres structurels et des dégradations d’enduits.",
    points: [
      "Reprises de maçonnerie localisées.",
      "Consolidation par coulinage à la chaux.",
      "Restitution d’enduits compatibles avec le bâti ancien.",
    ],
    method:
      "Les interventions sont menées de manière progressive, mètre par mètre, en privilégiant des matériaux et techniques traditionnels.",
    transparency:
      "Chaque étape fait l’objet d’un suivi documenté (photographies, notes de chantier), publié régulièrement.",
  },

  followup: {
    text: "Nous publions des mises à jour régulières : étapes franchies, points techniques, et photographies avant / pendant / après.",
    links: [
      {
        label: "Journal de chantier (blog)",
        href: "https://votre-blog.example/journal",
      },
      {
        label: "Présentation du manoir",
        href: "https://votre-site.example/manoir",
      },
    ],
  },

  contribute: {
    text: "Votre soutien permet d’engager des travaux précis, selon des méthodes traditionnelles. Chaque don, même modeste, contribue à une étape visible du chantier.",
    donateUrl: "https://votre-plateforme.example/don",
    footnote:
      "Selon la plateforme et le cadre de collecte, un reçu fiscal peut être disponible. Nous indiquons les modalités sur la page de don.",
  },

  footerText:
    "Page de suivi autonome — Manoir de la Chevallerie. Contact et informations complémentaires via le site officiel et le journal de chantier.",
  rewards: {
    intro:
      "Les contreparties sont proposées à titre de remerciement, selon le montant du don.",
    items: [
      {
        minAmount: 20,
        title: "Remerciements",
        description: "Votre nom dans la liste des contributeurs (sauf refus).",
      },
      {
        minAmount: 50,
        title: "Visite",
        description:
          "Invitation à une visite commentée à une date dédiée (places limitées).",
      },
      {
        minAmount: 150,
        title: "Mécène du chantier",
        description:
          "Mention sur un support de suivi du chantier (selon accord).",
      },
    ],
    footnote: DEFAULT_TAX_FOOTNOTE,
  },

  milestones: [
    {
      amount: 5000,
      title: "Palier 1 — Démarrage",
      description: "Installation, sécurisation, premières reprises.",
    },
    {
      amount: 12000,
      title: "Palier 2 — 1er mètre restauré",
      description: "Coulinage à la chaux et consolidation.",
    },
    {
      amount: 20000,
      title: "Palier 3 — Réouverture d’une baie",
      description: "Réouverture d’une fenêtre et reprises associées.",
    },
    {
      amount: 35000,
      title: "Palier 4 — Progression majeure",
      description: "Avancement sur plusieurs mètres de hauteur.",
    },
    {
      amount: 45000,
      title: "Palier 5 — Finitions patrimoniales",
      description:
        "Pierres de rive / éléments sculptés : restauration et finitions.",
    },
  ],
  supporters: {
    text: "Cette opération bénéficie du soutien d’acteurs engagés pour la préservation du patrimoine bâti.",
    //items: [{ name: "Fondation X", url: "https://…" }],
    items: [{ name: "Association organisatrice de la collecte" }],
  },
};
