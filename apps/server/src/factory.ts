import { createFactory } from "hono/factory";
import type { HonoEnv } from "./types";

const createTypedFactory = () => {
	return createFactory<HonoEnv>();
};

export { createTypedFactory };
