import { catalog } from "./projects/index.js";
function getEl(id) {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Element with id "${id}" not found`);
    return el;
}
function show(id) {
    getEl(id).style.display = "block";
}
function hide(id) {
    getEl(id).style.display = "none";
}
export function renderHome() {
    show("home");
    hide("viewer");
    const grid = getEl("home-grid");
    grid.innerHTML = "";
    for (const p of catalog) {
        const a = document.createElement("a");
        a.className = "card-link";
        a.href = `#${p.id}`;
        a.innerHTML = `
      <div class="card-media">
        <img src="${p.coverImage}" alt="${p.coverAlt}" loading="lazy" />
      </div>
      <div class="card-body">
        <h2 class="card-title">${p.title}</h2>
        <p class="card-subtitle">${p.subtitle}</p>
      </div>
    `;
        grid.appendChild(a);
    }
}
