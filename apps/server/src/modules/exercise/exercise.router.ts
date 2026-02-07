import { createTypedFactory } from "@/factory";
import {
	createExercise,
	getExerciseById,
	getExercises,
	updateExerciseById,
} from "./exercise.controller";
import { questionRouter } from "./question";
import { optionRouter } from "./option";

const { createApp } = createTypedFactory();

const exerciseRouter = createApp();

exerciseRouter
	.get("/", ...getExercises)
	.post("/", ...createExercise)
	.get("/:exerciseId", ...getExerciseById)
	.patch("/:exerciseId", ...updateExerciseById)
	.route("/question", questionRouter)
	.route("/option", optionRouter);

export { exerciseRouter };
