import { renderHook } from "@testing-library/react-native";

import { useLoopOverArray } from "./index";

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

test("should loop over array content with delay", async () => {
	const contents = ["A", "B", "C"];

	const { result } = renderHook(() => useLoopOverArray(contents, 1000));

	expect(result.current[0]).toEqual("A");

	await sleep(1100);
	expect(result.current[0]).toEqual("B");

	await sleep(1100);
	expect(result.current[0]).toEqual("C");
});
