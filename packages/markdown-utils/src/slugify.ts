export function slugify(input: string): string {
  const s = input
    .trim()
    .toLowerCase()
    // normalisation unicode (retire les accents)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // remplace tout ce qui n'est pas alphanum par des tirets
    .replace(/[^a-z0-9]+/g, "-")
    // retire les tirets en bord
    .replace(/^-+|-+$/g, "")
    // compacte
    .replace(/-+/g, "-");

  if (s.length === 0) throw new Error("slugify produced an empty slug");
  return s;
}
