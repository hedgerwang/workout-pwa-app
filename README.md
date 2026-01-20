# Workout PWA App

This project is a React + TypeScript PWA that can be installed on both mobile and desktop. The main web source lives under `web/`.

## Requirements Mapping

- React + shadcn UI: `web/src/components/ui/button.tsx`, `web/src/App.tsx`
- PWA install + offline: `web/public/manifest.webmanifest`, `web/public/sw.js`
- Local HTTPS on `https://localhost:8080`: Vite dev server + `web/server/index.ts`
- Hot reload: Vite dev server (`npm run dev`)
- Assets bundled into JS: CSS is injected by JS via `vite-plugin-css-injected-by-js`

## Local HTTPS Setup

Create local certificates in `web/server/certs/`:

### Option A: mkcert (recommended)

```bash
mkcert -install
mkcert -key-file web/server/certs/localhost-key.pem -cert-file web/server/certs/localhost.pem localhost
```

### Option B: OpenSSL

```bash
openssl req -x509 -newkey rsa:2048 -nodes \
  -keyout web/server/certs/localhost-key.pem \
  -out web/server/certs/localhost.pem \
  -days 365 \
  -subj "/CN=localhost"
```

## Development

```bash
cd web
npm install
npm run dev
```

App runs at `https://localhost:8080` with hot reload.

## Production Build

```bash
cd web
npm run build
```

Build output is in `web/dist`.

To serve the production build over HTTPS locally:

```bash
cd web
npm run serve:https
```

## Linting / Formatting

```bash
cd web
npm run lint
npm run format
npm run typecheck
```

## PWA Install

- Desktop: use Chrome/Edge “Install app” button in the address bar.
- Mobile: use the browser “Add to Home Screen” action.

## Deployment

### Cloudflare Pages

- Build command: `cd web && npm install && npm run build`
- Output directory: `web/dist`

### Netlify

- Build command: `cd web && npm install && npm run build`
- Publish directory: `web/dist`

### GitHub Pages

Use a `gh-pages` branch or GitHub Actions to publish `web/dist`.
For a simple deploy:

```bash
cd web
npm run build
git add -f dist
git commit -m "Deploy"
git subtree push --prefix web/dist origin gh-pages
```

## GitHub Version Control

Initialize a Git repository and push to your account:

```bash
git init
git remote add origin https://github.com/hedgerwang/<repo>.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

