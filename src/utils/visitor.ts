export function trackVisitor() {
  if (typeof window === "undefined") return 0;

  const key = "portfolio-visitor";
  let count = Number(localStorage.getItem(key)) || 0;

  count += 1;
  localStorage.setItem(key, count.toString());

  return count;
}
