import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { createTRPCClient, httpBatchStreamLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import superjson from "superjson";
import { auth } from "./auth/client";
import { routeTree } from "./routeTree.gen";
import type { AppRouter } from "./trpc/handler";

/** Tanstack Query for better use of apis */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: createTRPCClient({
    links: [
      httpBatchStreamLink({
        transformer: superjson,
        url: "/trpc",
      }),
    ],
  }),
  queryClient,
});

export interface RouterContext {
  queryClient: typeof queryClient;
  trpc: typeof trpc;
  auth: typeof auth;
}

export function createRouter() {
  return createTanStackRouter({
    routeTree,
    context: { queryClient, trpc, auth },
    scrollRestoration: true,
    defaultPreload: "intent",
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
