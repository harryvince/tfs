import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as AuthSchema from "../db/auth.sql";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite", schema: AuthSchema }),
  emailAndPassword: { enabled: true },
  defaultCookieAttributes: { secure: process.env.NODE_ENV === "production" },
});
