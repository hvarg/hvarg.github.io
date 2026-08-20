"use client";

import type { Locale } from "@/types/types";

/**
 * Switches locale and remembers the choice, so the language picker in
 * public/index.html sends the next visit to "/" straight here.
 */
export function LanguageLink({
  locale,
  children,
}: {
  locale: Locale;
  children: string;
}) {
  return (
    <a
      href={`/${locale}/`}
      onClick={() => {
        try {
          localStorage.setItem("lang", locale);
        } catch {
          // Private mode or blocked storage: navigating still works.
        }
      }}
      className="rounded-full border border-rule px-3 py-1 text-[0.8125rem] transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  );
}
