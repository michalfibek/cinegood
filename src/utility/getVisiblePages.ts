/* Paginator helper function */
export function getVisiblePages(pageCount: number, currentPage: number, delta = 1) {
  if (pageCount < 1 || currentPage < 1 || currentPage > pageCount) {
    throw new Error("Invalid pageCount or currentPage");
  }

  const range = [];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(pageCount - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    range.unshift("...");
  }
  range.unshift(1);

  if (currentPage + delta < pageCount - 1) {
    range.push("...");
  }
  if (pageCount > 1) {
    range.push(pageCount);
  }

  return range;
}
