import { createContext } from "react";
import { Exercise } from "../api";
import { useSafeContext } from "@safe-fin/ui/hooks";

const exerciseContext = createContext<Exercise | null>(null);

const useExerciseContext = () => {
	return useSafeContext(exerciseContext, "useExerciseContext");
};

const ExerciseProvider = exerciseContext.Provider;

export { ExerciseProvider, useExerciseContext };
