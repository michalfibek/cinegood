/* Paginator helper function */
export function getVisiblePages(pageCount: number, currentPage: number) {
  const delta = 1;
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
