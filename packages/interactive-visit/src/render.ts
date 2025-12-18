import type { VisitProject, ViewNode, Hotspot } from "./model.js";

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

function clearHotspots(stage: HTMLElement): void {
  // supprime uniquement les hotspots (on laisse l’image)
  for (const el of Array.from(stage.querySelectorAll(".hotspot"))) {
    el.remove();
  }
}

function addHotspot(stage: HTMLElement, hs: Hotspot): void {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "hotspot";
  btn.textContent = "+";
  if (hs.x < 0 || hs.x > 1 || hs.y < 0 || hs.y > 1) {
    console.warn("Hotspot out of bounds:", hs);
  }
  const x = clamp01(hs.x);
  const y = clamp01(hs.y);
  btn.style.left = `${x * 100}%`;
  btn.style.top = `${y * 100}%`;

  btn.setAttribute("aria-label", hs.label);

  btn.addEventListener("click", () => {
    window.location.hash = `#${hs.targetId}`;
  });

  stage.appendChild(btn);
}

function clamp01(n: number): number {
  //même si vous mettez accidentellement 1.3, le point sera posé au bord (100%) au lieu de disparaître
  if (Number.isNaN(n)) return 0;
  return Math.min(1, Math.max(0, n));
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

  const stage = getEl<HTMLDivElement>("image-stage");
  clearHotspots(stage);

  for (const hs of view.hotspots) {
    addHotspot(stage, hs);
  }

  document.title = `${view.title} — Manoir de la Chevallerie`;
}
