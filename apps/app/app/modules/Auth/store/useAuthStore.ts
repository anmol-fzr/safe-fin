import type { UserWithRole } from "better-auth/plugins/admin";
import type { UserWithPhoneNumber } from "better-auth/plugins/phone-number";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthStoreEmpty {
	isLogin: false;
	user: null;
	state: "login";
}

interface AuthStoreWithData {
	isLogin: true;
	user: UserWithRole & UserWithPhoneNumber;
	state: "register" | "complete";
}

interface AuthStoreActions {
	setData: (payload: Pick<AuthStoreWithData, "user">) => void;
	setState: (payload: "register" | "complete") => void;
	resetData: VoidFunction;
}

type AuthStore = (AuthStoreEmpty | AuthStoreWithData) & AuthStoreActions;

const useAuthStore = create<AuthStore>()(
	persist(
		immer((set) => ({
			isLogin: false,
			user: null,
			state: "login",

			setState(newState) {
				set((currState) => {
					currState.state = newState;
				});
			},
			setData(payload) {
				set((currState) => {
					currState.isLogin = true;
					currState.state = "complete";
					currState.user = payload.user;
				});
			},
			resetData() {
				set({
					isLogin: false,
					user: null,
				});
			},
		})),
		{ name: "auth-store" },
	),
);

export { useAuthStore };
