import type { Config } from "drizzle-kit";

const config = {
  schema: "./app/db/**/*.sql.ts",
  dialect: "turso",
  out: "./app/db/migrations",
} satisfies Config;

export default config;
