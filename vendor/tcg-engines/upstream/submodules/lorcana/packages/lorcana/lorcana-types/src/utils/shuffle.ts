export function shuffleArray<T>(array: T[], integer?: (bound: number) => number): T[] {
  if (!integer) throw new Error("Injected shuffle source required");
  const copy = [...array];

  for (let i = copy.length - 1; i >= 1; i--) {
    const j = integer(i + 1);
    if (!Number.isInteger(j) || j < 0 || j > i) throw new Error("Invalid random shuffle index");
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}
