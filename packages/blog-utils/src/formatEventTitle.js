"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatEventTitle = formatEventTitle;
function formatDateFr(date, style = "standard") {
    const day = String(date.getDate()).padStart(2, "0");
    let monthI = String(date.toLocaleString("fr-FR", { month: "long" }));
    let monthS = String(date.getMonth() + 1).padStart(2, "0");
    monthI = monthI.toLocaleLowerCase();
    const year = String(date.getFullYear());
    if (style == "standard")
        return `${day}/${monthS}/${year}`;
    else
        return `${day} ${monthI} ${year}`;
}
function formatEventTitle(place, topic, date, style = "standard") {
    const formattedDate = formatDateFr(date, style);
    const p = place.trim();
    const t = topic.trim();
    console.log(p);
    console.log(place);
    if (p.length === 0)
        throw new Error("place is required");
    if (t.length === 0)
        throw new Error("topic is required");
    if (Number.isNaN(date.getTime()))
        throw new Error("date is invalid");
    if (style == "standard")
        return `${p} — ${t} (${formattedDate})`;
    else
        return `${t} — ${p} · ${formattedDate}`;
}
