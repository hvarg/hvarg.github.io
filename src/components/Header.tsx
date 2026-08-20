import { LanguageLink } from "@/components/LanguageLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Locale, Personal, Ui } from "@/types/types";

/** github.com/hvarg reads better than the full URL, in the page and in print. */
function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function ContactLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="decoration-rule underline-offset-4 hover:text-accent hover:underline"
    >
      {children}
    </a>
  );
}

export function Header({
  personal,
  ui,
  pdf,
  otherLanguage,
}: {
  personal: Personal;
  ui: Ui;
  pdf: string;
  otherLanguage: Locale;
}) {
  return (
    <header className="pb-8 print:pb-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl print:text-2xl">
          {personal.name}
        </h1>
        <p className="eyebrow text-faint">{personal.location}</p>
      </div>
      <p className="mt-1 text-lg text-muted print:text-base">{personal.title}</p>
      {personal.subtitle && (
        <p className="text-sm text-faint">{personal.subtitle}</p>
      )}

      <nav className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted print:mt-3">
        <ContactLink href={`mailto:${personal.email}`}>
          {personal.email}
        </ContactLink>
        {personal.phone && (
          <ContactLink href={`tel:${personal.phone.replace(/\s/g, "")}`}>
            {personal.phone}
          </ContactLink>
        )}
        {personal.github && (
          <ContactLink href={personal.github}>
            {displayUrl(personal.github)}
          </ContactLink>
        )}
        {personal.linkedin && (
          <ContactLink href={personal.linkedin}>
            {displayUrl(personal.linkedin)}
          </ContactLink>
        )}

        <span className="ml-auto flex items-center gap-3" data-print="hide">
          <a
            href={pdf}
            download
            className="rounded-full border border-rule px-3 py-1 text-[0.8125rem] transition-colors hover:border-accent hover:text-accent"
          >
            {ui.downloadPdf}
          </a>
          <LanguageLink locale={otherLanguage}>{ui.otherLanguage}</LanguageLink>
          <ThemeToggle labels={ui.theme} />
        </span>
      </nav>
    </header>
  );
}
