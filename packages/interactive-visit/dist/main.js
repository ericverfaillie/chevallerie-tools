import { projects, defaultProjectId } from "./projects/index.js";
import { renderHome } from "./home.js";
import { render } from "./render.js";
import { saveLastRoute, loadLastRoute } from "./resume.js";
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
function run() {
    const route = parseHash();
    if (route.kind === "home") {
        renderHome();
        const resume = document.getElementById("resume-link");
        const last = loadLastRoute();
        if (resume && last && last.trim().length > 0) {
            resume.style.display = "inline-flex";
            resume.href = `#${last.replace(/^#/, "")}`;
        }
        else if (resume) {
            resume.style.display = "none";
            resume.href = "#";
        }
        return;
    }
    // Viewer
    const home = document.getElementById("home");
    const viewer = document.getElementById("viewer");
    if (home)
        home.style.display = "none";
    if (viewer)
        viewer.style.display = "block";
    // Sauvegarde de la route complète (project + view)
    saveLastRoute(`${route.projectId}:${route.viewId}`);
    const project = projects[route.projectId];
    render(project, route.viewId, route.projectId);
}
document.addEventListener("DOMContentLoaded", () => {
    // Confort : si l'utilisateur arrive sur # et veut "continuer",
    // on laisse Home; s'il veut un démarrage direct, il clique.
    // (On garde defaultProjectId pour plus tard si vous voulez un bouton "Ouvrir le dernier chantier")
    void defaultProjectId;
    run();
    window.addEventListener("hashchange", run);
});
