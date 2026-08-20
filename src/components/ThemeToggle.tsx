"use client";

import type { Ui } from "@/types/types";

type Labels = Ui["theme"];

type Theme = "system" | "light" | "dark";

const NEXT: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};

function current(): Theme {
  const value = document.documentElement.getAttribute("data-theme");
  return value === "light" || value === "dark" ? value : "system";
}

function Icon({ state, label }: { state: Theme; label: string }) {
  const paths = {
    // Half-filled circle: follow the OS.
    system: (
      <>
        <circle cx="8" cy="8" r="6.4" />
        <path d="M8 1.6a6.4 6.4 0 0 1 0 12.8z" fill="currentColor" stroke="none" />
      </>
    ),
    // Sun.
    light: (
      <>
        <circle cx="8" cy="8" r="3.25" />
        <path d="M8 .9v1.7M8 13.4v1.7M15.1 8h-1.7M2.6 8H.9M13 3l-1.2 1.2M4.2 11.8 3 13M13 13l-1.2-1.2M4.2 4.2 3 3" />
      </>
    ),
    // Moon.
    dark: <path d="M13.5 9.6A5.9 5.9 0 0 1 6.4 2.5a5.9 5.9 0 1 0 7.1 7.1" />,
  };

  return (
    <span data-theme-icon={state} className="items-center">
      <svg
        viewBox="0 0 16 16"
        aria-hidden
        className="size-4 fill-none stroke-current stroke-[1.3]"
        strokeLinecap="round"
      >
        {paths[state]}
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

/**
 * Cycles system → light → dark. The rendered icon is chosen by CSS from the
 * `data-theme` attribute (see globals.css), so the button is already correct on
 * first paint and there is no state to hydrate.
 */
export function ThemeToggle({ labels }: { labels: Labels }) {
  function cycle() {
    const next = NEXT[current()];

    if (next === "system") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    } else {
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    }
  }

  return (
    <button
      type="button"
      onClick={cycle}
      title={labels.label}
      className="rounded-full border border-rule p-1.5 transition-colors hover:border-accent hover:text-accent"
    >
      <Icon state="system" label={`${labels.label}: ${labels.system}`} />
      <Icon state="light" label={`${labels.label}: ${labels.light}`} />
      <Icon state="dark" label={`${labels.label}: ${labels.dark}`} />
    </button>
  );
}
