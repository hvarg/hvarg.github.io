/**
 * Prints the exported site to PDF so the "Download PDF" link always matches the
 * data that built the page. Run after `next build`: it serves ./out on a local
 * port, loads each locale in Chromium and writes the PDFs back into ./out.
 *
 * Page size, margins and the print-only tweaks live in src/app/globals.css
 * (`@page` / `@media print`) — this script just drives the browser.
 */
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { serveDir } from "./lib/static-server.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const outDir = join(root, "out");
const dataDir = join(root, "src", "data");
const locales = ["en", "es"];

async function main() {
  if (!existsSync(outDir)) {
    throw new Error("out/ not found — run `next build` first.");
  }

  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    throw new Error("playwright is not installed — run `npm install`.");
  }

  const server = await serveDir(outDir);
  const { port } = server.address();
  let browser;

  try {
    browser = await chromium.launch();
    for (const locale of locales) {
      const data = JSON.parse(
        await readFile(join(dataDir, `data.${locale}.json`), "utf8"),
      );
      const target = join(outDir, data.meta.pdf.replace(/^\//, ""));

      const page = await browser.newPage();
      await page.goto(`http://127.0.0.1:${port}/${locale}/`, {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => document.fonts.ready);
      await page.pdf({
        path: target,
        printBackground: true,
        preferCSSPageSize: true,
      });
      await page.close();

      console.log(`  pdf  ${data.meta.pdf}`);
    }
  } finally {
    // The listening server keeps the event loop alive, so it has to be closed
    // even when the browser never launched.
    await browser?.close();
    server.close();
  }
}

main().catch((error) => {
  // Locally the browser binary is often missing; that should not break `npm run
  // build`. In CI the PDFs are part of the deploy, so a failure must be fatal.
  if (process.env.CI) {
    console.error(error);
    process.exit(1);
  }
  console.warn(`\n  skipping PDF generation: ${error.message}\n`);
});
