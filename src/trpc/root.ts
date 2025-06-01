import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "@/auth/server";
import superjson from "superjson";
import { ZodError } from "zod/v4";
import { z } from "zod/v4";

const createContext = async ({ req }: { req: Request }) => {
  const session = await auth.api.getSession({ headers: req.headers });
  const user = session?.user;
  return { req, user, auth };
};
type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    console.error("TRPC GLOBAL ERROR HANDLER", error);

    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? z.treeifyError(error.cause) : null,
      },
    };
  },
});

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: ctx.req.headers as unknown as Headers,
  });
  if (!session?.session || !session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    // infers the `user` as non-nullable
    ctx: { req: ctx.req, user: session.user, auth: ctx.auth },
  });
});
