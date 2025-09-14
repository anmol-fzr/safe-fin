import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { customRender as render } from "../../../../../test/setup";
import { LoginForm } from "../LoginForm";

describe("LoginForm Component", () => {
	test("Test if Login Form renders", async () => {
		render(<LoginForm />);

		expect(screen.getByText("Login to your account")).toBeInTheDocument();
		//expect(true).toBeTruthy();
	});
});
