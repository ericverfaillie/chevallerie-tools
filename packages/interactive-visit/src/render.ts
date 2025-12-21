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

function addHotspot(stage: HTMLElement, hs: Hotspot, projectId: string): void {
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
    window.location.hash = `#${projectId}:${hs.targetId}`;
  });

  stage.appendChild(btn);
}

function clamp01(n: number): number {
  //même si vous mettez accidentellement 1.3, le point sera posé au bord (100%) au lieu de disparaître
  if (Number.isNaN(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

function renderBreadcrumbs(view: ViewNode): void {
  const bc = getEl<HTMLDivElement>("breadcrumbs");

  if (!view.backId) {
    bc.textContent = "Accueil de la visite";
    return;
  }

  // V1 minimal : "Accueil > Vue actuelle"
  bc.innerHTML = `<a href="#${view.backId}">Retour</a> &nbsp;›&nbsp; <span>${view.title}</span>`;
}

function renderPoiList(view: ViewNode, projectId: string): void {
  const ul = getEl<HTMLUListElement>("poi-list");
  ul.innerHTML = "";

  const hint = getEl<HTMLDivElement>("poi-hint");

  if (!view.hotspots || view.hotspots.length === 0) {
    hint.textContent = "Aucun point d’intérêt sur cette vue.";
    return;
  }

  hint.textContent = `${view.hotspots.length} point(s) cliquable(s)`;
  for (const hs of view.hotspots) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${projectId}:${hs.targetId}`;
    a.textContent = hs.label;
    li.appendChild(a);
    ul.appendChild(li);
  }
}

function applyTransition(): void {
  const stage = getEl<HTMLDivElement>("image-stage");
  stage.classList.remove("fade-in");
  // force reflow pour relancer l'animation
  void stage.offsetWidth;
  stage.classList.add("fade-in");
}

function preloadTargets(view: ViewNode, project: VisitProject): void {
  // précharge les images des vues cibles (simple, sans promesse)
  const targets = view.hotspots.map((h) => h.targetId);
  for (const id of targets) {
    const v = project.views.find((x) => x.id === id);
    if (!v) continue;
    const img = new Image();
    img.src = v.image;
  }
}

export function render(
  project: VisitProject,
  viewId: string,
  projectId: string
): void {
  const view = findView(project, viewId);

  renderBackLink(view, projectId);
  renderBreadcrumbs(view);

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
    addHotspot(stage, hs, projectId);
  }

  renderPoiList(view, projectId);
  applyTransition();
  preloadTargets(view, project);

  document.title = `${view.title} — Manoir de la Chevallerie`;
}

function renderBackLink(view: ViewNode, projectId: string): void {
  const back = getEl<HTMLAnchorElement>("back-link");

  if (!view.backId) {
    back.style.display = "none";
    back.href = "#";
    return;
  }

  back.style.display = "inline-flex";
  back.href = `#${projectId}:${view.backId}`;
}
