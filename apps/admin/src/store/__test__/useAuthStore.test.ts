import { useAuthStore } from "../useAuthStore";
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";

const dummyData = {
	// session: {
	// 	expiresAt: new Date("2025-09-23T08:57:50.000Z"),
	// 	token: "scLmpt7oE5OVtdF",
	// 	createdAt: new Date("2025-09-16T08:57:50.000Z"),
	// 	updatedAt: new Date("2025-09-16T08:57:50.000Z"),
	// 	ipAddress: "",
	// 	userAgent:
	// 		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
	// 	userId: "aWSbvyriQLvLiHkTid",
	// 	id: "Kucjn5U1oO3R3AZCqw",
	// },
	user: {
		name: "User",
		email: "user@email.in",
		emailVerified: false,
		image: null,
		createdAt: new Date("2025-09-16T08:57:50.000Z"),
		updatedAt: new Date("2025-09-16T08:57:50.000Z"),
		role: "user",
		banned: null,
		banReason: null,
		banExpires: null,
		phoneNumber: "1231231234",
		phoneNumberVerified: true,
		id: "aWSbvyriQLvLiHkTid",
	},
} as const;

describe("useSessionStore Works as Expected or not", () => {
	it("Allows to store session and user data", () => {
		const { result } = renderHook(() => useAuthStore((state) => state.setData));

		act(() => {
			const setData = result.current;
			setData(dummyData);
		});
	});

	it("Allows to retrieve user data", () => {
		const { result } = renderHook(() => useAuthStore((state) => state));

		expect(result.current.user).toBe(dummyData.user);
		expect(result.current.isLogin).toBe(true);
	});

	it("Allows to Reset the Store", () => {
		const { result } = renderHook(() => useAuthStore((state) => state));

		act(() => {
			const { resetData } = result.current;
			resetData();
		});

		expect(result.current.user).toBe(null);
		expect(result.current.isLogin).toBe(false);
	});
});
