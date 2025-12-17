import { project } from "./data.js";
import { renderProject } from "./render.js";
document.addEventListener("DOMContentLoaded", () => {
    renderProject(project);
});
