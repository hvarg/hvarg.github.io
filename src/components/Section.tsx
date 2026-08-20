import type { ReactNode } from "react";

/**
 * A resume section: a mono label in the left gutter on wide screens, stacked
 * above the content on narrow ones and in print.
 *
 * Pass `items` and the section disappears when that list is empty, so clearing
 * an array in the JSON drops the heading and its rule along with the content.
 */
export function Section({
  title,
  items,
  children,
}: {
  title: string;
  items?: readonly unknown[];
  children: ReactNode;
}) {
  if (items && items.length === 0) return null;

  return (
    <section className="grid gap-x-10 gap-y-3 border-t border-rule py-8 sm:grid-cols-[8.5rem_1fr] print:py-4">
      <h2 className="eyebrow pt-1 text-faint">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
