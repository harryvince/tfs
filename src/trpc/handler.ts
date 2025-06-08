import "@/lib/logger"; // Overwrites console.log so don't need to do anything special to log
import { auth } from "@/auth/server";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { defineEventHandler, toWebRequest } from "vinxi/server";
import { createTRPCRouter } from "./root";
import { generic } from "./routers/generic";

export const appRouter = createTRPCRouter({
  generic,
});

export type AppRouter = typeof appRouter;
export type AppRouterInput = inferRouterInputs<AppRouter>;
export type AppRouterOutput = inferRouterOutputs<AppRouter>;

export default defineEventHandler((event) => {
  const request = toWebRequest(event);
  if (!request) return new Response("No request", { status: 400 });

  return fetchRequestHandler({
    endpoint: "/trpc",
    req: request,
    router: appRouter,
    createContext() {
      return { req: request, user: undefined, auth };
    },
  });
});
