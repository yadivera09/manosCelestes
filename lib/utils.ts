export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // split an accented letter into the base letter and the accent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .trim()
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // remove all non-word characters
    .replace(/\-\-+/g, "-"); // replace multiple hyphens with a single one
}
