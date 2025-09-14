import { create } from "zustand";
import { produce } from "immer";

export type DateTimeStyle = "short" | "medium" | "full" | "long";

interface SettingsStore {
	shortcuts: {
		enabled: boolean;
		toggle: () => void;
	};
	dateTime: {
		dateStyle: DateTimeStyle;
		setDateStyle: (value: DateTimeStyle) => void;

		timeStyle: DateTimeStyle;
		setTimeStyle: (value: DateTimeStyle) => void;
	};
}

const useSettingsStore = create<SettingsStore>()((set) => ({
	shortcuts: {
		enabled: true,

		toggle: () => {
			set((state) => {
				const newState = produce(state, (draft) => {
					draft.shortcuts.enabled = !draft.shortcuts.enabled;
				});

				return newState;
			});
		},
	},

	dateTime: {
		dateStyle: "medium",
		setDateStyle: (newStyle) => {
			console.log("Updated Date Style: ", newStyle);
			set((prevState) => {
				const newState = produce(prevState, (draft) => {
					draft.dateTime.dateStyle = newStyle;
				});

				console.log("Updated State: ", newState);
				return newState;
			});
		},

		timeStyle: "medium",
		setTimeStyle: (newStyle) => {
			set((prevState) => {
				const newState = produce(prevState, (draft) => {
					draft.dateTime.timeStyle = newStyle;
				});

				return newState;
			});
		},
	},
}));

export { useSettingsStore };
