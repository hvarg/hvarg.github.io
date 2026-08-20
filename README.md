# hvarg.github.io

Personal resume site, published at <https://hvarg.github.io>. Two locales, one
source of truth, and a PDF that is printed from the very same page.

## Editing the resume

Everything on the page comes from two JSON files:

- [`src/data/data.en.json`](src/data/data.en.json)
- [`src/data/data.es.json`](src/data/data.es.json)

Both follow the `Resume` shape in [`src/types/types.ts`](src/types/types.ts), so
`npm run build` type-checks them and fails on a missing or misspelled field.
Beyond the resume content itself, each file carries:

- `meta` — page title, description and the path of its PDF.
- `ui` — section headings, the download label, and the word used for an ongoing
  role (`present`), so nothing user-facing is hardcoded in the components.

Dates are plain localized strings (`"Feb 2019"`, `"Ene 2018"`). Leave `end` out
of a job to mark it as current.

## Running it

```bash
npm install
npx playwright install chromium   # once, for PDF generation
npm run dev                       # http://localhost:3000/en/ — fast iteration
npm run build                     # static export into out/ + both PDFs
npm run preview                   # http://localhost:4000 — serves out/ as a host would
```

`next dev` serves routes and `public/`, but not the build output, so two things
404 there and only work under `npm run preview`:

- **`/`** — the language redirect ships as `public/index.html`, which dev serves
  at `/index.html` but not at `/`.
- **The PDFs** — they are written into `out/` after the export, so the download
  buttons have nothing to point at until you build.

Neither affects the deployed site; `preview` is the way to check them locally.

`npm run build` runs `next build` and then
[`scripts/generate-pdf.mjs`](scripts/generate-pdf.mjs), which serves `out/`,
loads each locale in headless Chromium and prints it to
`out/hernan-vargas-cv-{en,es}.pdf`. Locally the PDF step warns and moves on if
Chromium is missing; in CI (`$CI` set) it fails the build instead.

The PDF is just the page under `@media print`, so the print rules in
[`src/app/globals.css`](src/app/globals.css) are what shape it — page size and
margins live in the `@page` rule, and anything marked `data-print="hide"`
(language switcher, download buttons) is dropped.

## Language and theme

**Language** is never guessed on a locale page: `/en/` is English and `/es/` is
Spanish, full stop. Only the bare `/` has to decide, and
[`public/index.html`](public/index.html) does it in this order:

1. `localStorage.lang`, written whenever the in-page switcher is used — so an
   explicit choice sticks.
2. The first entry in `navigator.languages` that matches a locale we publish.
3. English.

**Theme** follows the OS by default and can be overridden with the header
button, which cycles system → light → dark and saves the override in
`localStorage.theme`. The palette is declared once with `light-dark()`; the
toggle only flips `color-scheme` on `<html>` via a `data-theme` attribute. An
inline script in the layout applies the saved value while the head is still
parsing, so a saved theme never flashes the other palette. Printing forces
light regardless of the current theme, so the PDF is always black on white.

## Search engines and privacy

The site is **deliberately kept out of search results**. Share the link
directly — a recruiter googling the name will not find it.

Two halves make that work, and they have to stay in agreement:

- Every page carries `<meta name="robots" content="noindex, nofollow">` — set
  through the `robots` key in `generateMetadata`
  ([`src/app/[lang]/layout.tsx`](src/app/[lang]/layout.tsx)) for the locale
  pages, and written directly into [`public/index.html`](public/index.html).
  **This tag is what removes the page from search results.**
- [`public/robots.txt`](public/robots.txt) lets ordinary crawlers *fetch* the
  HTML. That is intentional and easy to get wrong: `Disallow: /` would stop the
  crawler ever reading the `noindex`, and the bare URL could still be listed
  from an inbound link. The PDFs can't carry a meta tag, so they are blocked by
  pattern instead, and around twenty AI/bulk scrapers are blocked by user-agent.

None of this is enforcement — it is honoured only by crawlers that choose to.
To make the site findable again, remove the `robots` key *and* revisit
`robots.txt`; changing one alone gives a confused half-state.

**No phone number lives in `src/data/`.** It would be published on a scrapable
page and embedded in both PDFs. `private/` is gitignored and holds CV copies
that do include it, for sending by email — nothing from there should ever be
committed.

## Routing

`src/app/[lang]/` is the root layout, with `generateStaticParams` emitting `/en/`
and `/es/`. Static hosting has no redirects, so [`public/index.html`](public/index.html)
is a small page that sends `/` to the locale matching the browser's preferred
languages, defaulting to English.

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds on every
push to `main` and publishes `out/` to GitHub Pages.
