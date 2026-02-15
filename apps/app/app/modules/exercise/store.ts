import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Result = {
	questionId: number;
	selectedOptionId: number;
	answerId: number;
};

type Results = Record<string, Result>;

interface ExerciseStoreEmpty {
	exerciseId: null;
	results: Results;
	progress: {
		max: number;
	};
}

interface ExerciseStoreWithData {
	exerciseId: number;
	results: Results;
	progress: {
		max: number;
	};
}

interface T {
	exerciseId: number;
	questionsLen: number;
}

interface ExerciseStoreActions {
	setupStore: (payload: T) => void;
	setResults: (payload: Results) => void;
	updateResults: (payload: Result) => void;
	resetStore: VoidFunction;
}

type ExerciseStore = (ExerciseStoreEmpty | ExerciseStoreWithData) &
	ExerciseStoreActions;

const useExerciseStore = create<ExerciseStore>()(
	persist(
		immer((set) => ({
			exerciseId: null,
			progress: {
				max: 0,
			},

			setupStore: ({ exerciseId, questionsLen }) => {
				set((currState) => {
					currState.exerciseId = exerciseId;
					currState.progress.max = questionsLen;
				});
			},

			results: {},
			setResults: (newState) => {
				set((currState) => {
					currState.results = newState;
				});
			},
			updateResults: (result) => {
				set((state) => {
					state.results[result.questionId.toString()] = result;
				});
			},

			resetStore: () => {
				set((currState) => {
					currState.results = {};
					currState.exerciseId = null;
				});
			},
		})),
		{
			name: "exercise-result-store",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);

export { useExerciseStore };
