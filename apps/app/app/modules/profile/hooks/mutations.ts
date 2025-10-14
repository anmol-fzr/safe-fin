import { mutationOptions, useMutation } from "@tanstack/react-query";
import { DEMO_GRAPHICS } from "../api";

const getUpdateDemoGraphicsOpts = () => {
	return mutationOptions({
		mutationKey: ["UPDATE", "DEMO-GRAPHICS"],
		mutationFn: DEMO_GRAPHICS.UPDATE,
	});
};

const useUpdateDemoGraphics = () => {
	const opts = getUpdateDemoGraphicsOpts();
	const { mutate, ...rest } = useMutation(opts);
	return {
		updateDemoGraphics: mutate,
		...rest,
	};
};
export { useUpdateDemoGraphics };
