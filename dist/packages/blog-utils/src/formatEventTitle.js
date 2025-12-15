"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatEventTitle = formatEventTitle;
function formatDateFr(date, style) {
    const day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth());
    //const monthInst = month;
    if (style === "institutionnel") {
        month = String(date.getMonth().toLocaleString("fr-FR") + 1);
    }
    else {
        month = String(date.getMonth() + 1).padStart(2, "0");
    }
    const year = String(date.getFullYear());
    //if (style == "standard") return `${day}/${monthS}/${year}`;
    //if (style == "institutionnel") return `${day}/${monthI}/${year}`;
    return `${day}/${month}/${year}`;
}
function formatEventTitle(place, topic, date, style) {
    const formattedDate = formatDateFr(date, style);
    if (!place)
        throw new Error("place is required");
    if (!topic)
        throw new Error("topic is required");
    return `${place.trim()} - ${topic.trim()} (${formattedDate})`;
}
