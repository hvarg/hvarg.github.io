/**
 * Serves the built site the way a static host would, which `next dev` cannot:
 * "/" runs the language redirect and the generated PDFs are in place. Use it to
 * check anything that only exists after a build.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { serveDir } from "./lib/static-server.mjs";

const outDir = join(fileURLToPath(new URL("..", import.meta.url)), "out");
const port = Number(process.env.PORT ?? 4000);

if (!existsSync(outDir)) {
  console.error("out/ not found — run `npm run build` first.");
  process.exit(1);
}

const server = await serveDir(outDir, port);
console.log(`  preview  http://localhost:${server.address().port}`);
