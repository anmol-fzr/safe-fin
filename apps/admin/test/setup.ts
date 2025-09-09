import { afterEach } from "vitest";
import { cleanup, render, type RenderOptions } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ReactNode } from "react";
import { TestWrapper } from "./wrapper";

afterEach(() => {
	cleanup();
});

const customRender = (ui: ReactNode, options: RenderOptions) => {
	return render(ui, {
		wrapper: TestWrapper,
		...options,
	});
};

export { customRender };
export * from "@testing-library/react";
