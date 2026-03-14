import type { UserWithRole } from "better-auth/plugins/admin";
import type { UserWithPhoneNumber } from "better-auth/plugins/phone-number";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthStoreEmpty {
	isLogin: false;
	user: null;
}

interface AuthStoreWithData {
	isLogin: true;
	user: UserWithRole & UserWithPhoneNumber;
	//session: Auth;
}

interface AuthStoreActions {
	setData: (payload: Pick<AuthStoreWithData, "user">) => void;
	resetData: VoidFunction;
}

type AuthStore = (AuthStoreEmpty | AuthStoreWithData) & AuthStoreActions;

const useAuthStore = create<AuthStore>()(
	persist(
		immer((set) => ({
			isLogin: false,
			user: null,

			setData(payload) {
				set((currState) => {
					currState.isLogin = true;
					currState.user = payload.user;
					return currState;
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
