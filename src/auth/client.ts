import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth as AuthType } from "./server";

export const auth = createAuthClient({
  plugins: [inferAdditionalFields<typeof AuthType>()],
});
