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
	setData: (payload: Pick<AuthStoreWithData, "user">) => void;
	setState: (payload: "register" | "complete") => void;
	resetData: VoidFunction;
}

const d = {
	data: {
		session: {
			createdAt: new Date("2025-12-11T13:25:12.914Z"),
			expiresAt: new Date("2025-12-18T13:25:12.913Z"),
			id: "m0EvUZduIYUvQ34B2v7FITFs1doBxu4R",
			impersonatedBy: null,
			ipAddress: "",
			token: "DjXM1MoqDuB5kirfDZ09QOKmsyxzN0ng",
			updatedAt: new Date("2025-12-11T13:25:12.914Z"),
			userAgent: "better-auth",
			userId: "N1nFy15mRJcoisIQIifyeYyUHp6NkyJX",
		},
		user: {
			banExpires: null,
			banReason: "Unknown Person",
			banned: false,
			createdAt: new Date("1970-01-21T08:17:46.148Z"),
			email: "anmol@email.in",
			emailVerified: false,
			id: "N1nFy15mRJ coisIQIifyeYyUHp6NkyJX",
			image: null,
			isAnonymous: null,
			isNew: false,
			name: "Anmol",
			phoneNumber: "8427822949",
			phoneNumberVerified: true,
			role: "admin",
			updatedAt: new Date("2025-12-11T13:25:12.846Z"),
		},
	},
	error: null,
};

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
