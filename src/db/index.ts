import { env } from "@/env";
import { type Client, createClient } from "@libsql/client/node";
import { drizzle } from "drizzle-orm/libsql";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

const client = globalForDb.client ?? createClient({ url: env.DATABASE_URL });
if (process.env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, {
  logger: process.env.NODE_ENV !== "production",
});
