FROM oven/bun:latest as base
WORKDIR /app

COPY bun.lock package.json ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "./.output/server/index.mjs"]
