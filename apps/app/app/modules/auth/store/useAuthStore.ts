import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthStoreEmpty {
	user: null;
	state: "login";
}
//isLogin
//resetAuthData
//user.id
//user.email
//setData
//setState

interface AuthStoreWithData {
	user: {
		name: string;
		id: string;
		email: string;
		isAnonymous: boolean;
	};
	state: "register" | "complete";
}

interface AuthStoreActions {
	isLogin: boolean;
	setData: (payload: Pick<AuthStoreWithData, "user">) => void;
	setState: (payload: "register" | "complete") => void;
	resetData: VoidFunction;
}

type AuthStore = (AuthStoreEmpty | AuthStoreWithData) & AuthStoreActions;

const useAuthStore = create<AuthStore>()(
	persist(
		immer((set, get) => ({
			user: null,
			state: "login",

			setState(newState) {
				set((currState) => {
					currState.state = newState;
				});
			},
			setData(payload) {
				set((currState) => {
					currState.state = "complete";
					currState.user = payload.user;
				});
			},
			get isLogin() {
				const state = get();
				return state.user !== null;
			},

			resetData() {
				set({
					user: null,
					state: "login",
				});
			},
		})),
		{ name: "auth-store", storage: createJSONStorage(() => AsyncStorage) },
	),
);

export { useAuthStore };
