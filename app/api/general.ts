import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const handlerKey = (key: string) => [`general/${key}`];

const greet = createServerFn({
  method: "GET",
})
  .validator((input) => z.object({ message: z.string() }).parse(input))
  .handler(({ data }) => {
    return { message: data.message };
  });

const general = {
  greet: {
    handler: greet,
    key: handlerKey("greet"),
  },
};

export default general;
