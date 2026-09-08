export function parsePageRanges(
  input: string,
  totalPages: number
): number[] {
  if (!input.trim()) {
    throw new Error("Please enter pages to extract.");
  }

  const pages = new Set<number>();

  const parts = input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  for (const part of parts) {
    if (part.includes("-")) {
      const [startRaw, endRaw] = part.split("-");

      const start = Number(startRaw);
      const end = Number(endRaw);

      if (
        !Number.isInteger(start) ||
        !Number.isInteger(end) ||
        start < 1 ||
        end < 1 ||
        start > end
      ) {
        throw new Error(`Invalid page range: ${part}`);
      }

      for (let page = start; page <= end; page++) {
        if (page > totalPages) {
          throw new Error(
            `Page ${page} does not exist. PDF has ${totalPages} pages.`
          );
        }

        pages.add(page - 1);
      }
    } else {
      const page = Number(part);

      if (!Number.isInteger(page) || page < 1) {
        throw new Error(`Invalid page number: ${part}`);
      }

      if (page > totalPages) {
        throw new Error(
          `Page ${page} does not exist. PDF has ${totalPages} pages.`
        );
      }

      pages.add(page - 1);
    }
  }

  return Array.from(pages);
}