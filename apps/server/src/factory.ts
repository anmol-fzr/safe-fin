import type { Env } from "hono";
import { createFactory } from "hono/factory";

const createTypedFactory = <E extends Env = Env>() => {
	return createFactory<
		E & {
			Bindings: CloudflareBindings;
		}
	>();
};

export { createTypedFactory };
