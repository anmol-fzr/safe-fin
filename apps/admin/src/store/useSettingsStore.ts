import { create } from "zustand";
import { produce } from "immer";

interface SettingsStore {
	shortcuts: {
		enabled: boolean;
		toggle: () => void;
	};
}

const useSettingsStore = create<SettingsStore>()((set) => ({
	shortcuts: {
		enabled: true,

		toggle: () => {
			set((state) => {
				const nextState = produce(state, (draft) => {
					draft.shortcuts.enabled = !draft.shortcuts.enabled;
				});

				return nextState;
			});
		},
	},
}));

export { useSettingsStore };
