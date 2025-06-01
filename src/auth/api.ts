import { defineEventHandler, toWebRequest } from "vinxi/server";
import { auth } from "./server";

export default defineEventHandler(async (event) => {
  const request = toWebRequest(event);
  if (!request) return new Response("No request", { status: 400 });
  return auth.handler(request);
});
