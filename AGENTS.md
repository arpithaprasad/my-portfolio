<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a single-service **Next.js 16** portfolio site (App Router, React 19, Tailwind CSS v4, Turbopack). There is no backend, database, or environment variables — it is fully static. Package manager is **npm** (`package-lock.json`).

- Dev server: `npm run dev` (Turbopack) serves on http://localhost:3000. The startup log message `✓ Ready` means it is up. Content lives in `app/data/portfolio.ts` and renders through the section components in `app/components/`.
- Standard commands are in `package.json`: `npm run lint` (ESLint), `npm run build` (production build), `npm run start` (serve built output). No test script is defined; there are no automated tests.
- `npm run lint` reports one pre-existing warning (`@next/next/no-page-custom-font` in `app/layout.tsx`) and 0 errors — that warning is expected, not a regression.
