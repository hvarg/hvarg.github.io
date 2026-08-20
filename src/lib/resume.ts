import en from "@/data/data.en.json";
import es from "@/data/data.es.json";
import type { Locale, Resume } from "@/types/types";

export const locales = ["en", "es"] as const satisfies readonly Locale[];

export const defaultLocale: Locale = "en";

const resumes: Record<Locale, Resume> = {
  en: en as Resume,
  es: es as Resume,
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getResume(locale: Locale): Resume {
  return resumes[locale];
}

/** The locale the language switcher points at. With two locales, the other one. */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}
