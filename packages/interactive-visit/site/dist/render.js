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
export function render(project, viewId) {
    const view = findView(project, viewId);
    setText("view-title", view.title);
    setText("view-text", view.text);
    const img = getEl("view-image");
    img.src = view.image;
    img.alt = view.imageAlt;
    setText("view-caption", view.caption);
    setText("footer-text", project.footerText);
    document.title = `${view.title} — Manoir de la Chevallerie`;
}
