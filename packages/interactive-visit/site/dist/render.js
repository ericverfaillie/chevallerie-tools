function getEl(id) {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Element with id "${id}" not found`);
    return el;
}
function setText(id, value) {
    getEl(id).textContent = value;
}
function findView(project, id) {
    const v = project.views.find((x) => x.id === id);
    if (!v)
        throw new Error(`View not found: ${id}`);
    return v;
}
function clearHotspots(stage) {
    // supprime uniquement les hotspots (on laisse l’image)
    for (const el of Array.from(stage.querySelectorAll(".hotspot"))) {
        el.remove();
    }
}
function addHotspot(stage, hs) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "hotspot";
    btn.textContent = "+";
    btn.style.left = `${hs.x * 100}%`;
    btn.style.top = `${hs.y * 100}%`;
    btn.setAttribute("aria-label", hs.label);
    btn.addEventListener("click", () => {
        window.location.hash = `#${hs.targetId}`;
    });
    stage.appendChild(btn);
}
export function render(project, viewId) {
    const view = findView(project, viewId);
    setText("view-title", view.title);
    setText("view-text", view.text);
    const img = getEl("view-image");
    img.src = view.image;
    img.alt = view.imageAlt;
    setText("view-caption", view.caption);
    setText("footer-text", project.footerText);
    const stage = getEl("image-stage");
    clearHotspots(stage);
    for (const hs of view.hotspots) {
        addHotspot(stage, hs);
    }
    document.title = `${view.title} — Manoir de la Chevallerie`;
}
