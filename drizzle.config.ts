import { env } from "@/env";
import type { Config } from "drizzle-kit";

const config = {
  schema: "./src/db/**/*.sql.ts",
  dialect: "sqlite",
  out: "./src/db/migrations",
  dbCredentials: { url: env.DATABASE_URL },
} satisfies Config;

export default config;
