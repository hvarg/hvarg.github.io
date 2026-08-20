/**
 * Minimal static file server for the exported site, shared by the PDF step and
 * `npm run preview`. It mirrors how a static host resolves URLs — extensionless
 * paths get /index.html appended — so "/" and "/en/" behave the way they will
 * on GitHub Pages rather than the way `next dev` handles them.
 */
import { createReadStream, existsSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

/** Resolves to a listening server; pass port 0 for any free port. */
export function serveDir(dir, port = 0) {
  const server = createServer((req, res) => {
    let file = join(dir, normalize(decodeURIComponent(req.url.split("?")[0])));

    // normalize() collapses "..", so this rejects anything outside dir.
    if (!file.startsWith(dir)) {
      res.writeHead(403).end("forbidden");
      return;
    }

    if (!extname(file)) file = join(file, "index.html");
    if (!existsSync(file)) {
      res.writeHead(404).end("not found");
      return;
    }

    res.writeHead(200, {
      "content-type": MIME[extname(file)] ?? "application/octet-stream",
    });
    createReadStream(file).pipe(res);
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}
