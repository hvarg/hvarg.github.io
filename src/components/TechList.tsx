/** Inline, dot-separated list of technologies. Cheap to print, easy to scan. */
export function TechList({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <p className="mt-2 text-[0.8125rem] text-faint">{items.join(" · ")}</p>
  );
}
