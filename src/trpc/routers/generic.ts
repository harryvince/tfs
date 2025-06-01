import { z } from "zod/v4";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../root";

export const generic = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return { message: "Hello World" };
  }),
  helloWithName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      return { greeting: `Hello ${input.name}` };
    }),
  helloProtected: protectedProcedure.query(({ ctx }) => ({
    message: `Hello ${ctx.user.name}`,
  })),
});
