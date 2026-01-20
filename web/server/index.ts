import fs from "node:fs";
import type { ServerResponse } from "node:http";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, "../dist");
const CERT_DIR = path.resolve(__dirname, "certs");
const KEY_PATH = path.join(CERT_DIR, "localhost-key.pem");
const CERT_PATH = path.join(CERT_DIR, "localhost.pem");

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
};

/**
 * Resolve the requested URL to a safe file path within the dist directory.
 *
 * @param urlPath - The URL path from the request.
 * @returns A file system path rooted in the dist directory.
 */
function resolvePath(urlPath: string): string {
  const safePath = urlPath.split("?")[0].split("#")[0];
  const normalized = path.normalize(safePath).replace(/^(\.\.(\/|\\|$))+/, "");
  return path.join(DIST_DIR, normalized);
}

/**
 * Read a file from disk and write it to the response with the correct content type.
 *
 * @param filePath - Absolute file path to read.
 * @param response - HTTP response to write to.
 */
function sendFile(filePath: string, response: ServerResponse): void {
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] ?? "application/octet-stream";
  response.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(response);
}

/**
 * Start an HTTPS static server to serve the production build.
 */
function startServer(): void {
  if (!fs.existsSync(KEY_PATH) || !fs.existsSync(CERT_PATH)) {
    throw new Error(
      "Missing HTTPS certs. Create server/certs/localhost-key.pem and server/certs/localhost.pem before running serve:https.",
    );
  }

  const server = https.createServer(
    {
      key: fs.readFileSync(KEY_PATH),
      cert: fs.readFileSync(CERT_PATH),
    },
    (request, response) => {
      const requestPath = request.url ?? "/";
      let filePath = resolvePath(requestPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      if (!fs.existsSync(filePath)) {
        filePath = path.join(DIST_DIR, "index.html");
      }

      sendFile(filePath, response);
    },
  );

  server.listen(8080, "localhost", () => {
    console.log("HTTPS server running at https://localhost:8080");
  });
}

startServer();

