# syntax=docker/dockerfile:1
FROM node:22-slim AS base
ENV CI=true
RUN corepack enable
WORKDIR /app

# --- Build ---
FROM base AS build
# SITE_URL est lu pendant le build (astro.config.mjs + balise og:image)
ARG SITE_URL
ENV SITE_URL=$SITE_URL
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .pnpmrc ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# --- Dépendances de production ---
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .pnpmrc ./
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

# --- Exécution ---
FROM base AS runtime
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
USER node
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
