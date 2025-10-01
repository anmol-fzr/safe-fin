import { createFactory } from "hono/factory";

const createTypedFactory = () => {
	return createFactory<HonoEnv>();
};

export { createTypedFactory };
