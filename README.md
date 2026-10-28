# Code Community Museum

Community gallery for South African painters — community voices, historic collections, podcasts, and a 3D virtual hall.

## Features

- Explore / collections / work detail
- **Community Voices** — paintings and documentary works from places such as Mamelodi, Soweto, and the Eastern Cape
- **Podcasts** — embedded community story videos
- **3D virtual gallery** (`/virtual`) — WebGL hall with framed works (Three.js)
- Artist desk / submit / status (local prototype)

## Local development

Docker is **not** required.

```bash
npm install
npm run dev
```

Open http://localhost:8080

## Docker (Render / VPS / Kubernetes)

```bash
docker compose up --build
```

The image uses a multi-stage build with `NITRO_PRESET=node-server`. Health checks are included for orchestrators. The app listens on port **8080**.

### Manual Docker

```bash
docker build -t code-community-museum .
docker run --rm -p 8080:8080 code-community-museum
```

## Deploy on Render (Docker)

1. Push this folder to a GitHub/GitLab repo (or upload the zip and connect the repo).
2. In [Render](https://render.com): **New → Web Service**.
3. Connect the repo. Render will detect `render.yaml` and the `Dockerfile`.
4. Confirm:
   - **Runtime:** Docker
   - **Dockerfile path:** `./Dockerfile`
   - **Health check path:** `/`
   - **Port:** `8080` (set via `PORT` / `NITRO_PORT` in `render.yaml`)
5. Deploy. First build can take several minutes (npm install + production build).

You can also create the service manually without Blueprint: choose **Docker**, point at this repo root, and set the env vars from `render.yaml`.

## Other hosts

- **Vercel** — connect the repo; `npm run build` (Nitro defaults to the Vercel preset when `NITRO_PRESET` is unset).
- **Any Node host** — build with `NITRO_PRESET=node-server npm run build`, then run:

```bash
node .output/server/index.mjs
```

## Performance notes

- Images use `loading="lazy"` + `decoding="async"`.
- Three.js is dynamically imported (client-only) so SSR stays light.
- Sticky header uses `backdrop-blur` with a gold accent.

## Controls (3D gallery)

Drag to look · scroll / pinch to zoom · click a frame for its label
