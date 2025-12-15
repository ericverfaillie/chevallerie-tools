function formatDateFr(date: Date, style?: String): string {
  const day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth());
  let monthI = String(date.toLocaleString("fr-FR", { month: "long" }));
  let monthS = String(date.getMonth() + 1).padStart(2, "0");

  const year = String(date.getFullYear());

  if (style == "standard") return `${day}/${monthS}/${year}`;
  else return `${day} ${monthI} ${year}`;
}

export function formatEventTitle(
  place: String,
  topic: String,
  date: Date,
  style?: "standard" | "institutionnel"
): string {
  const formattedDate = formatDateFr(date, style);
  if (!place) throw new Error("place is required");
  if (!topic) throw new Error("topic is required");

  return `${place.trim()} - ${topic.trim()} (${formattedDate})`;
}
