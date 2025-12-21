import { act, renderHook } from "@testing-library/react-native";
import { useToggle } from "./index";

describe("useToggle", () => {
	it("Should handle the toggle lifecycle (init -> true -> false -> toggle (true))", () => {
		const { result } = renderHook(() => useToggle());

		expect(result.current.isOpen).toBe(false);

		act(() => {
			result.current.onOpen();
		});
		expect(result.current.isOpen).toBe(true);

		act(() => {
			result.current.onClose();
		});
		expect(result.current.isOpen).toBe(false);

		act(() => {
			result.current.onToggle();
		});
		expect(result.current.isOpen).toBe(true);
	});

	it("Works with initial value given as true", () => {
		const { result } = renderHook(() => useToggle(true));

		expect(result.current.isOpen).toBe(true);
	});

	it("Works with initial value given as false", () => {
		const { result } = renderHook(() => useToggle(false));

		expect(result.current.isOpen).toBe(false);
	});

	it("Default initial value is false", () => {
		const { result } = renderHook(() => useToggle());

		expect(result.current.isOpen).toBe(false);
	});
});
