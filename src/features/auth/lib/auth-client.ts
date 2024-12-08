import { AppURL } from "@/lib/utils";
import { createAuthClient } from "better-auth/react";
export const client = createAuthClient({
  baseURL: AppURL, // the base url of your auth server
});
