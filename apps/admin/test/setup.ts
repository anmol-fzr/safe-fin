import { afterEach } from "vitest";
import { cleanup, render, type RenderOptions } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ReactNode } from "react";
import { wrapper } from "./wrapper";

afterEach(() => {
	cleanup();
});

const customRender = (ui: ReactNode, options?: RenderOptions) => {
	return render(ui, {
		wrapper,
		...options,
	});
};

export { customRender };
//export * from "@testing-library/react";
