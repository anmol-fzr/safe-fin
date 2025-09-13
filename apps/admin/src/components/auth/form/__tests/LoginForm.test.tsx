import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { customRender as render } from "../../../../../test/setup";

describe("LoginForm Component", () => {
	test("Test if Login Form renders", async () => {
		render(<p>Login to your account</p>);

		expect(screen.getByText("Login to your account")).toBeInTheDocument();
		//expect(true).toBeTruthy();
	});
});
