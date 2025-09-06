import type { AppType } from "./index";
import { hc } from "hono/client";

// assign the client to a variable to calculate the type when compiling
export const client = hc<AppType>("http://localhost:3000");
export type Client = typeof client;

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
	hc<typeof app>(...args);
