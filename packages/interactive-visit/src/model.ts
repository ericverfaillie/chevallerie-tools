export interface ViewNode {
  id: string;
  title: string;
  text: string;

  image: string; // chemin relatif depuis public/
  imageAlt: string;
  caption: string;
}

export interface VisitProject {
  projectTitle: string;
  footerText: string;
  startViewId: string;
  views: ViewNode[];
}
