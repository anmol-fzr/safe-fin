import { useEffect, useRef } from "react";
import { useIdleTask } from "./useIdleTask";
import { InteractionManager } from "react-native";

export function useIdleFetch<T>(
	task: (signal: AbortSignal) => Promise<T>,
	onResult: (data: T) => void,
) {
	const dataRef = useRef<T | null>(null);

	useIdleTask(async (signal) => {
		dataRef.current = await task(signal);
	});

	useEffect(() => {
		if (!dataRef.current) return;

		const h = InteractionManager.runAfterInteractions(() => {
			onResult(dataRef.current!);
			dataRef.current = null;
		});

		return () => h.cancel();
	});
}
