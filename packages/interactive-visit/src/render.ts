import type { VisitProject, ViewNode } from "./model.js";

function getEl<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element with id "${id}" not found`);
  return el as T;
}

function setText(id: string, value: string): void {
  getEl(id).textContent = value;
}

function findView(project: VisitProject, id: string): ViewNode {
  const v = project.views.find((x) => x.id === id);
  if (!v) throw new Error(`View not found: ${id}`);
  return v;
}

export function render(project: VisitProject, viewId: string): void {
  const view = findView(project, viewId);

  setText("view-title", view.title);
  setText("view-text", view.text);

  const img = getEl<HTMLImageElement>("view-image");
  img.src = view.image;
  img.alt = view.imageAlt;

  setText("view-caption", view.caption);
  setText("footer-text", project.footerText);

  document.title = `${view.title} — Manoir de la Chevallerie`;
}
