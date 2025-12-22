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
function addHotspot(stage, hs, projectId) {
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
function clamp01(n) {
    //même si vous mettez accidentellement 1.3, le point sera posé au bord (100%) au lieu de disparaître
    if (Number.isNaN(n))
        return 0;
    return Math.min(1, Math.max(0, n));
}
function renderBreadcrumbs(view) {
    const bc = getEl("breadcrumbs");
    if (!view.backId) {
        bc.textContent = "Accueil de la visite";
        return;
    }
    // V1 minimal : "Accueil > Vue actuelle"
    bc.innerHTML = `<a href="#${view.backId}">Retour</a> &nbsp;›&nbsp; <span>${view.title}</span>`;
}
function renderPoiList(view, projectId) {
    const ul = getEl("poi-list");
    ul.innerHTML = "";
    const hint = getEl("poi-hint");
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
function applyTransition() {
    const stage = getEl("image-stage");
    stage.classList.remove("fade-in");
    // force reflow pour relancer l'animation
    void stage.offsetWidth;
    stage.classList.add("fade-in");
}
function preloadTargets(view, project) {
    // précharge les images des vues cibles (simple, sans promesse)
    const targets = view.hotspots.map((h) => h.targetId);
    for (const id of targets) {
        const v = project.views.find((x) => x.id === id);
        if (!v)
            continue;
        const img = new Image();
        img.src = v.image;
    }
}
export function render(project, viewId, projectId) {
    const view = findView(project, viewId);
    renderBackLink(view, projectId);
    renderBreadcrumbs(view);
    renderAudio(view);
    //setText("view-title", view.title);
    //setText("view-text", view.text);
    //setHtmlText("notice-title", view.title);
    //setHtmlText("notice-text", view.text);
    renderNotice(view);
    const img = getEl("view-image");
    img.src = view.image;
    img.alt = view.imageAlt;
    setText("view-caption", view.caption);
    setText("footer-text", project.footerText);
    const stage = getEl("image-stage");
    clearHotspots(stage);
    for (const hs of view.hotspots) {
        addHotspot(stage, hs, projectId);
    }
    renderPoiList(view, projectId);
    applyTransition();
    preloadTargets(view, project);
    document.title = `${view.title} — Manoir de la Chevallerie`;
}
function renderBackLink(view, projectId) {
    const back = getEl("back-link");
    if (!view.backId) {
        back.style.display = "none";
        back.href = "#";
        return;
    }
    back.style.display = "inline-flex";
    back.href = `#${projectId}:${view.backId}`;
}
function setHtmlText(id, value) {
    getEl(id).textContent = value;
}
function renderAudio(view) {
    const block = getEl("audio-block");
    const title = getEl("audio-title");
    const player = getEl("audio-player");
    if (!view.audioSrc) {
        block.style.display = "none";
        player.removeAttribute("src");
        player.load();
        title.textContent = "";
        return;
    }
    block.style.display = "block";
    title.textContent = view.audioTitle ?? "Écouter";
    player.src = view.audioSrc;
}
function renderNoticeLinks(links) {
    const ul = document.createElement("ul");
    ul.className = "notice-links";
    for (const l of links) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = l.url;
        a.textContent = l.label;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        li.appendChild(a);
        ul.appendChild(li);
    }
    return ul;
}
function addNoticeSection(container, title, text) {
    const s = document.createElement("section");
    s.className = "notice-section";
    const h = document.createElement("h3");
    h.className = "notice-section__title";
    h.textContent = title;
    const p = document.createElement("p");
    p.className = "notice-section__text";
    p.textContent = text;
    s.appendChild(h);
    s.appendChild(p);
    container.appendChild(s);
}
function clear(el) {
    el.innerHTML = "";
}
function renderNotice(view) {
    const titleEl = getEl("notice-title");
    const leadEl = getEl("notice-lead");
    const sections = getEl("notice-sections");
    titleEl.textContent = view.title;
    leadEl.textContent = view.lead ?? "";
    clear(sections);
    const n = view.notice;
    if (!n)
        return;
    // Ordre figé et homogène
    if (n.datation)
        addNoticeSection(sections, "Datation", n.datation);
    if (n.etatInitial)
        addNoticeSection(sections, "État des lieux à l’achat", n.etatInitial);
    if (n.etatActuel)
        addNoticeSection(sections, "État actuel", n.etatActuel);
    if (n.travauxEffectues)
        addNoticeSection(sections, "Travaux effectués", n.travauxEffectues);
    if (n.travauxAVenir)
        addNoticeSection(sections, "Travaux à venir", n.travauxAVenir);
    if (n.intervention)
        addNoticeSection(sections, "Intervention", n.intervention);
    if (n.blogLinks && n.blogLinks.length > 0) {
        const s = document.createElement("section");
        s.className = "notice-section";
        const h = document.createElement("h3");
        h.className = "notice-section__title";
        h.textContent = "Pour aller plus loin";
        s.appendChild(h);
        s.appendChild(renderNoticeLinks(n.blogLinks));
        sections.appendChild(s);
    }
}
