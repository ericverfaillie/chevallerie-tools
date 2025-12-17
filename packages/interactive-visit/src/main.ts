import { visitProject } from "./data.js";
import { render } from "./render.js";

function getViewIdFromHash(): string {
  const raw = window.location.hash.replace("#", "").trim();
  return raw.length > 0 ? raw : visitProject.startViewId;
}

function main(): void {
  const viewId = getViewIdFromHash();
  render(visitProject, viewId);

  window.addEventListener("hashchange", () => {
    render(visitProject, getViewIdFromHash());
  });
}

document.addEventListener("DOMContentLoaded", main);
