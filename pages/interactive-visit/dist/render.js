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
function clamp01(n) {
    //même si vous mettez accidentellement 1.3, le point sera posé au bord (100%) au lieu de disparaître
    if (Number.isNaN(n))
        return 0;
    return Math.min(1, Math.max(0, n));
}
export function render(project, viewId) {
    const view = findView(project, viewId);
    renderBackLink(view);
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
function renderBackLink(view) {
    const back = getEl("back-link");
    if (!view.backId) {
        back.style.display = "none";
        back.href = "#";
        return;
    }
    back.style.display = "inline-flex";
    back.href = `#${view.backId}`;
}
