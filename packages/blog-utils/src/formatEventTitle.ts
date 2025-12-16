function formatDateFr(
  date: Date,
  style: "standard" | "institutionnel" = "standard"
): string {
  const day = String(date.getDate()).padStart(2, "0");
  let monthI = String(date.toLocaleString("fr-FR", { month: "long" }));
  let monthS = String(date.getMonth() + 1).padStart(2, "0");
  monthI = monthI.toLocaleLowerCase();
  const year = String(date.getFullYear());

  if (style == "standard") return `${day}/${monthS}/${year}`;
  else return `${day} ${monthI} ${year}`;
}

export function formatEventTitle(
  place: string,
  topic: string,
  date: Date,
  style: "standard" | "institutionnel" = "standard"
): string {
  const formattedDate = formatDateFr(date, style);
  const p: string = place.trim();
  const t: string = topic.trim();
  console.log(p);
  console.log(place);
  if (p.length === 0) throw new Error("place is required");
  if (t.length === 0) throw new Error("topic is required");
  if (Number.isNaN(date.getTime())) throw new Error("date is invalid");

  if (style == "standard") return `${p} — ${t} (${formattedDate})`;
  else return `${t} — ${p} · ${formattedDate}`;
}
