# Spiritualized Language Tutor — frontend

The web app of the Spiritualized Language Tutor: learn English by talking with an AI tutor, with corrections and explanations in Serbian, Learning Spaces and progress tracking.

Built with Next.js 16 (App Router), React 19, Tailwind 4 and TanStack Query. Read [AGENTS.md](./AGENTS.md) before changing code: this Next.js version differs from older ones.

The backend is [`CikaDraza/backend-spiritualized-ai-bot`](https://github.com/CikaDraza/backend-spiritualized-ai-bot) (FastAPI). The browser never calls it directly. The server-side routes under `app/api/*` call it and relay its httpOnly session cookies, so the cookies belong to this site.

## Run locally — safely

1. Start the backend with its `./dev.sh`. It runs on <http://localhost:8000>, with external services off.
2. Then, in this repository:

```bash
npm install          # once
cp .env.example .env.local   # once; BACKEND_URL=http://localhost:8000
npm run dev          # http://localhost:3016
```

In `npm run dev` the frontend talks only to `BACKEND_URL`. When `BACKEND_URL` is missing it uses <http://127.0.0.1:8000>, and **never** `NEXT_PUBLIC_API_URL`, the production backend's address on Vercel. So a local run cannot reach production unnoticed.

`/api/health` reports which backend it reached (`source: local` or `railway`).

## What a user can do

| Page | For |
|---|---|
| `/` | landing |
| `/register`, `/login`, `/verify` | account, sign-in and email verification (the backend sends the link; locally it is in the backend log) |
| `/app` | the learner's Learning Spaces: create (scenario, level, tutor), open and delete; needs a verified email |
| `/app/spaces/[id]/conversation` | the conversation with the tutor: corrections, translations, hints, session summary |
| `/admin` | administration; signed-in admins only (role checked on the server). The management sections are not wired yet |

`/app` and `/admin` need a session; `proxy.ts` sends visitors without one to `/login`.

## Production

Vercel builds `main` as production. Every other pushed branch gets a *preview* deployment, which does not change production.
