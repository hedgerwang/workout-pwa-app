import fs from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

/**
 * Resolve HTTPS certs for local development.
 *
 * @returns HTTPS options for Vite dev server.
 */
function getHttpsConfig(): { key: Buffer; cert: Buffer } {
  const certDir = path.resolve(__dirname, "server/certs");
  const httpsKeyPath = path.join(certDir, "localhost-key.pem");
  const httpsCertPath = path.join(certDir, "localhost.pem");

  const hasCerts = fs.existsSync(httpsKeyPath) && fs.existsSync(httpsCertPath);

  if (!hasCerts) {
    throw new Error(
      "Missing HTTPS certs. Create server/certs/localhost-key.pem and server/certs/localhost.pem before running the dev server.",
    );
  }

  return {
    key: fs.readFileSync(httpsKeyPath),
    cert: fs.readFileSync(httpsCertPath),
  };
}

/**
 * Vite config for the web app with HTTPS on localhost:8080 and CSS injected into JS.
 */
export default defineConfig(({ command }) => ({
  root: path.resolve(__dirname),
  plugins: [react(), cssInjectedByJsPlugin()],
  server:
    command === "serve"
      ? {
          host: "localhost",
          port: 8080,
          https: getHttpsConfig(),
        }
      : undefined,
  preview: {
    host: "localhost",
    port: 8080,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
}));

