<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project conventions

Everything below is ours; `next dev` only rewrites the marked block above.

## The site is deliberately de-indexed

Both locale pages and `public/index.html` carry
`<meta name="robots" content="noindex, nofollow">`, set via the `robots` key in
`generateMetadata` in `src/app/[lang]/layout.tsx`. This is **intentional** — it
is a personal CV meant to be shared by link, not found by searching the owner's
name. Do not remove it as an SEO "fix".

`public/robots.txt` deliberately does **not** carry `Disallow: /` for normal
crawlers. A blocked page is never fetched, so its `noindex` is never read and
the bare URL can still be listed; the meta tag only works if crawling is
allowed. The PDFs cannot carry a meta tag, so they are the one thing blocked by
pattern. AI and bulk scrapers get a blanket `Disallow: /` by user-agent.

If de-indexing is ever reversed, both halves have to change together.

## Personal data

No phone number in `src/data/*.json` — it was removed on purpose to keep it out
of a public, scrapable page and out of the generated PDFs. `private/` is
gitignored and holds local copies of the CV that do include it, for sending by
email. Never commit anything from `private/`, and never move it into `public/`
or `src/data/`.
