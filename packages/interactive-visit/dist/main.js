import { projects, defaultProjectId } from "./projects/index.js";
import { render } from "./render.js";
function parseHash() {
    const raw = window.location.hash.replace("#", "").trim();
    if (!raw)
        return { kind: "home" };
    const [projectIdRaw, viewIdRaw] = raw.split(":");
    const projectId = (projectIdRaw || "").trim();
    const viewId = (viewIdRaw || "").trim();
    const project = projects[projectId];
    if (!project)
        return { kind: "home" };
    return {
        kind: "viewer",
        projectId,
        viewId: viewId || project.startViewId,
    };
}
function renderHome() {
    // V1 simple: redirection vers projet par défaut
    window.location.hash = `#${defaultProjectId}`;
}
function run() {
    const route = parseHash();
    if (route.kind === "home") {
        renderHome();
        return;
    }
    const project = projects[route.projectId];
    render(project, route.viewId);
}
document.addEventListener("DOMContentLoaded", () => {
    run();
    window.addEventListener("hashchange", run);
});
