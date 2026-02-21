# MessMan Web UI

MessMan is a web UI concept for a decentralized chat application.

## Live demo

https://<your-github-username>.github.io/messman-quasar/

After enabling GitHub Pages in repository settings, this URL will host the latest deployed demo from `main`.

## Current status

This project is currently a **UI sample/prototype only**.

- No backend integration yet
- No real chat logic implemented yet
- No production-ready decentralized network functionality yet

The purpose of this repository right now is to showcase layout, screens, and user interaction ideas.

## Install dependencies

```bash
pnpm install
# or
yarn
# or
npm install
```

## Start development server

```bash
quasar dev
```

## Lint files

```bash
pnpm lint
# or
yarn lint
# or
npm run lint
```

## Format files

```bash
pnpm format
# or
yarn format
# or
npm run format
```

## Build for production

```bash
quasar build
```

## Quasar configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## GitHub Pages deployment

The workflow `.github/workflows/deploy-pages.yml` builds and deploys this UI to GitHub Pages automatically on every push to `main`.
