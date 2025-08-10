import type { AppType } from "@safe-fin/server";
import { hc } from "hono/client";

export const apiClient = hc<AppType>("http://localhost:3000/");
