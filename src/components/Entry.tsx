import type { ReactNode } from "react";

/**
 * Shared shape for experience, education and project blocks. From `sm` up the
 * period sits in its own grid column, so a long title wraps beside it instead
 * of pushing it onto a line of its own; on narrow screens it stacks below.
 */
export function Entry({
  title,
  titleUrl,
  period,
  subtitle,
  children,
}: {
  title: string;
  titleUrl?: string;
  period?: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <article className="break-avoid mt-6 first:mt-0 print:mt-4">
      <div className="sm:grid sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-4 print:grid print:grid-cols-[1fr_auto]">
        <h3 className="font-medium text-ink">
          {titleUrl ? (
            <a
              href={titleUrl}
              className="decoration-rule underline-offset-4 hover:text-accent hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        {period && (
          <span className="eyebrow block text-faint sm:text-right">{period}</span>
        )}
      </div>
      {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      {children}
    </article>
  );
}
