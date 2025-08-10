import { renderHook } from "@testing-library/react-native";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
	it("Should have 0 as counter at init", async () => {
		const { result } = renderHook(() => useCounter({ max: 10 }));

		expect(result.current.counter).toBe(0);
	});
});
