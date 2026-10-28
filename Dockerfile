# Multi-stage build for Render / Docker / VPS / Kubernetes.
# Local development: npm install && npm run dev (Docker not required).

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit --no-fund

FROM deps AS build
WORKDIR /app
COPY . .
# node-server preset → Nitro writes .output/ (not .vercel/output/)
ENV NITRO_PRESET=node-server
ENV NODE_ENV=production
RUN npm run build \
  && test -d .output \
  && test -f .output/server/index.mjs \
  || (echo "ERROR: expected .output/server/index.mjs after build" && ls -la && ls -la .output 2>/dev/null; ls -la .vercel 2>/dev/null; exit 1)

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV NITRO_HOST=0.0.0.0
ENV PORT=8080
ENV NITRO_PORT=8080
COPY --from=build /app/.output ./.output
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:8080/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
EXPOSE 8080
USER node
CMD ["node", ".output/server/index.mjs"]
