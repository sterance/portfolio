# Portfolio

Personal portfolio site based on the [simpleC0de/portfolio-01](https://github.com/simpleC0de/portfolio-01) template.

## Tech stack

- React 19 + TypeScript
- Vite 6
- Emotion (`@emotion/react`, `@emotion/styled`)
- Framer Motion
- react-icons

## Local development

Requires Node.js 18+ (CI uses Node 20).

```bash
npm ci
npm run dev
```

Other scripts:

```bash
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build locally
npm run lint
```

## Deploy

Pushes to `main` (or a manual workflow run) trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. `npm ci` and `npm run build`
2. Upload `dist/` to Cloudflare Pages project `portfolio`

Required GitHub secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

`vite.config.ts` uses `base: '/'` for root hosting on Cloudflare Pages.

## License

MIT — see [LICENSE](LICENSE).
