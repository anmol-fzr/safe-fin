import { act, renderHook } from "@testing-library/react-native";
import { useCounter } from "./index";

describe("useCounter", () => {
	it("Should handle the counter lifecycle (init -> increment -> decrement)", () => {
		const { result } = renderHook(() => useCounter({ max: 10 }));

		expect(result.current.counter).toBe(0);

		act(() => {
			result.current.onNext();
		});
		expect(result.current.counter).toBe(1);

		act(() => {
			result.current.onPrev();
		});
		expect(result.current.counter).toBe(0);
	});
});
