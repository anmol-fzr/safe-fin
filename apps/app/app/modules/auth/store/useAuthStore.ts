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
		image: string;
		id: string;
		email: string;
		isAnonymous: boolean;
	};
	state: "register" | "complete";
}

interface AuthStoreActions {
	setData: (payload: Pick<AuthStoreWithData, "user">) => void;
	setUserImage: (payload: string) => void;
	setState: (payload: "register" | "complete") => void;
	resetData: VoidFunction;
}

type AuthStore = (AuthStoreEmpty | AuthStoreWithData) & AuthStoreActions;

const useAuthStore = create<AuthStore>()(
	persist(
		immer((set, get) => ({
			user: null,
			state: "login",

			// user: {
			// 	email: "anmol@email.in",
			// 	id: "N1nFy15mRJ coisIQIifyeYyUHp6NkyJX",
			// 	name: "Anmol",
			// 	isAnonymous: false,
			// },
			// state: "complete",

			setUserImage(newState) {
				set((currState) => {
					if (currState.user) {
						currState.user.image = newState;
					}
				});
			},

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

export const { setData: setAuthData } = useAuthStore.getState();

export { useAuthStore };
