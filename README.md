# 🧱 TFS - The Full Stack

This app is built using a modern full-stack TypeScript framework combining
reactive front-end architecture with a powerful, typesafe backend. Here's how
the pieces fit together:

## 🧩 Runtime & Framework

- [Bun](https://bun.sh/) — A fast, modern JavaScript (Typescript) runtime that's
  built for modern times.
- [Vinxi](https://vinxi.vercel.app/) — A modern bundler/runtime that stitches
  together the frontend and backend, allowing one to build their own framework.

## ⚙️ Backend

- [tRPC](https://trpc.io/) — Provides typesafe API routes with shared types
  between client and server, removing the need for OpenAPI or GraphQL.
- [SuperJSON](https://github.com/flightcontrolhq/superjson) — Handles
  serialization of complex data types between client and server in tRPC.
- [Drizzle ORM](https://orm.drizzle.team/) with
  [@libsql/client](https://turso.tech/libsql) — A type-safe SQL ORM used to
  interface with LibSQL/SQLite-compatible database.
- [better-auth](https://www.better-auth.com/) — An opinionated, modern auth
  system built to integrate cleanly with React apps.

## 🌐 Frontend

- [React](https://react.dev/) — No explanation needed, the framework powering
  the modern web.
- [TanStack Router](https://tanstack.com/router/latest) — The best router for
  React apps.
- [TanStack Form](https://tanstack.com/form/latest) — Type-safe form handling.
- [TanStack Query](https://tanstack.com/query/latest) — Client-side data
  management with automatic caching and invalidation. Every react app should be
  using this dependency. If your not using this your probably doing something
  wrong or like creating work for yourself.

## 🎨 UI & Styling

- [Tailwind](https://tailwindcss.com/) — Utility-first CSS framework for styling.
  Again if your writing css or scss by hand, why?
- [shadcn/ui](https://ui.shadcn.com/) — Reusable, accessible components built
  with Radix and styled using Tailwind.

## 💼 Tooling & Dev Experience

- [Drizzle Kit](https://orm.drizzle.team/docs/kit-overview) — Schema generation
  and migration tooling for Drizzle ORM.
- [Biome](https://biomejs.dev/) — All-in-one formatter, linter, and code fixer.
- [TypeScript](https://www.typescriptlang.org/) — Full type safety across the
  stack. If you're still wrting raw JavaScript, you're doing something wrong.
- [zod](https://zod.dev/) — Runtime type validation the easiest
  way possible.

### Misc

#### Generate the database schema

```bash
bunx @better-auth/cli generate --config ./app/auth/server.ts --output ./app/db/auth.sql.ts --y && bunx biome format --write ./app/db/auth.sql.ts
```
