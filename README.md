# TFS - The Full Stack

The following is a template for a full stack web application using my favourite technologies.

## Setup

### Generate the database schema

```bash
bunx @better-auth/cli generate --config ./app/auth/server.ts --output ./app/db/auth.sql.ts --y && bunx biome format --write ./app/db/auth.sql.ts
```
