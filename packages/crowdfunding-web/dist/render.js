/* ============
   Helpers DOM
   ============ */
function getEl(id) {
    const el = document.getElementById(id);
    if (!el) {
        throw new Error(`Element with id "${id}" not found`);
    }
    return el;
}
function setText(id, value) {
    getEl(id).textContent = value;
}
function clear(el) {
    el.innerHTML = "";
}
/* ==================
   Format & calculs
   ================== */
function formatCurrency(amount, currency) {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency,
    }).format(amount);
}
function computePercent(collected, objective) {
    if (objective <= 0)
        return 0;
    return Math.min(100, (collected / objective) * 100);
}
/* =========================
   Sections — HERO / META
   ========================= */
function renderHero(p) {
    setText("title", p.title);
    setText("objective", p.description);
    setText("status-badge", p.hero.statusLabel);
    setText("hero-note", p.hero.note);
    const img = getEl("hero-image");
    img.alt = p.hero.imageAlt;
    setText("hero-caption", p.hero.caption);
    document.title = `Collecte — ${p.title}`;
}
/* =========================
   Section — LE MONUMENT
   ========================= */
function renderMonument(p) {
    setText("monument-text", p.monument.text);
    const facts = getEl("monument-facts");
    clear(facts);
    for (const f of p.monument.facts) {
        const li = document.createElement("li");
        li.textContent = f;
        facts.appendChild(li);
    }
    const keys = getEl("monument-keyfacts");
    clear(keys);
    for (const k of p.monument.keyFacts) {
        const li = document.createElement("li");
        li.textContent = k;
        keys.appendChild(li);
    }
}
/* =========================
   Section — LES TRAVAUX
   ========================= */
function renderWorks(p) {
    setText("works-text", p.works.text);
    const points = getEl("works-points");
    clear(points);
    for (const pt of p.works.points) {
        const li = document.createElement("li");
        li.textContent = pt;
        points.appendChild(li);
    }
    setText("works-method", p.works.method);
    setText("works-transparency", p.works.transparency);
}
/* =========================
   Section — CHIFFRES
   ========================= */
function renderFigures(p) {
    setText("kpi-collected", formatCurrency(p.collectedAmount, p.currency));
    setText("kpi-objective", formatCurrency(p.objectiveAmount, p.currency));
    const percent = computePercent(p.collectedAmount, p.objectiveAmount);
    setText("percent", `${Math.floor(percent)} %`);
    const bar = getEl("progress-bar");
    bar.style.width = `${percent}%`;
    const remaining = Math.max(0, p.objectiveAmount - p.collectedAmount);
    if (remaining === 0) {
        setText("remaining", "Objectif atteint.");
    }
    else {
        setText("remaining", `Reste à financer : ${formatCurrency(remaining, p.currency)}`);
    }
}
/* =========================
   Section — PALIERS
   ========================= */
function renderMilestones(p) {
    const ul = getEl("milestones");
    clear(ul);
    const milestones = [...p.milestones].sort((a, b) => a.amount - b.amount);
    const next = milestones.find((m) => p.collectedAmount < m.amount) ?? null;
    for (const m of milestones) {
        let status = "todo";
        if (p.collectedAmount >= m.amount)
            status = "done";
        else if (next && m.amount === next.amount)
            status = "next";
        const li = document.createElement("li");
        li.className = `milestone milestone--${status}`;
        const badgeText = status === "done"
            ? "Atteint"
            : status === "next"
                ? "En cours"
                : "À venir";
        const badgeClass = status === "done"
            ? "badge--done"
            : status === "next"
                ? "badge--next"
                : "badge--todo";
        li.innerHTML = `
      <div class="milestone__top">
        <div class="milestone__title">
          ${m.title}
          <span class="badge-inline ${badgeClass}">${badgeText}</span>
        </div>
        <div class="milestone__amount">
          ${formatCurrency(m.amount, p.currency)}
        </div>
      </div>
      <div class="milestone__desc">${m.description}</div>
    `;
        ul.appendChild(li);
    }
    if (next) {
        const remaining = next.amount - p.collectedAmount;
        setText("next-goal", `Plus que ${formatCurrency(remaining, p.currency)} pour atteindre le prochain palier : ${next.title}.`);
    }
    else {
        setText("next-goal", "Tous les paliers sont atteints. Merci pour votre soutien.");
    }
}
/* =========================
   Section — CONTREPARTIES
   ========================= */
function renderRewards(p) {
    setText("rewards-text", p.rewards.intro);
    const ul = getEl("rewards-list");
    clear(ul);
    const items = [...p.rewards.items].sort((a, b) => a.minAmount - b.minAmount);
    for (const r of items) {
        const li = document.createElement("li");
        li.textContent =
            `À partir de ${formatCurrency(r.minAmount, p.currency)} — ` +
                `${r.title} : ${r.description}`;
        ul.appendChild(li);
    }
    setText("rewards-footnote", p.rewards.footnote ?? "");
}
/* =========================
   Section — SUIVI
   ========================= */
function renderFollowup(p) {
    setText("followup-text", p.followup.text);
    const ul = getEl("followup-links");
    clear(ul);
    for (const l of p.followup.links) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = l.href;
        a.textContent = l.label;
        a.target = "_blank";
        a.rel = "noopener";
        li.appendChild(a);
        ul.appendChild(li);
    }
}
/* =========================
   Section — CONTRIBUER
   ========================= */
function renderContribute(p) {
    setText("contribute-text", p.contribute.text);
    const cta = getEl("cta-main");
    cta.href = p.contribute.donateUrl;
    setText("cta-footnote", p.contribute.footnote);
}
/* =========================
   Section — SOUTIENS
   ========================= */
function renderSupporters(p) {
    setText("supporters-text", p.supporters.text);
    const ul = getEl("supporters-list");
    clear(ul);
    for (const s of p.supporters.items) {
        const li = document.createElement("li");
        if (s.url) {
            const a = document.createElement("a");
            a.href = s.url;
            a.textContent = s.name;
            a.target = "_blank";
            a.rel = "noopener";
            li.appendChild(a);
        }
        else {
            li.textContent = s.name;
        }
        ul.appendChild(li);
    }
}
/* =========================
   Footer
   ========================= */
function renderFooter(p) {
    setText("footer-text", p.footerText);
}
/* =========================
   Entrée principale
   ========================= */
export function renderProject(p) {
    renderHero(p);
    renderMonument(p);
    renderWorks(p);
    renderFigures(p);
    renderMilestones(p);
    renderRewards(p);
    renderFollowup(p);
    renderContribute(p);
    renderSupporters(p);
    renderFooter(p);
}
