import { useEffect, useRef } from "react";
import { InteractionManager, AppState } from "react-native";

type IdleTask = (signal: AbortSignal) => void | Promise<void>;

interface IdleTaskOptions {
	timeout?: number;
	enabled?: boolean;
}

export function useIdleTask(
	task: IdleTask,
	deps: unknown[] = [],
	options: IdleTaskOptions = {},
) {
	const { timeout = 5000, enabled = true } = options;
	const abortRef = useRef<AbortController | null>(null);

	useEffect(() => {
		if (!enabled) return;

		abortRef.current?.abort();
		const controller = new AbortController();
		abortRef.current = controller;

		let idleId: number | null = null;
		let interactionHandle: any;

		interactionHandle = InteractionManager.runAfterInteractions(() => {
			if (AppState.currentState !== "active") return;

			idleId = requestIdleCallback(
				() => {
					if (controller.signal.aborted) return;
					task(controller.signal);
				},
				{ timeout },
			);
		});

		return () => {
			controller.abort();
			if (idleId !== null) cancelIdleCallback(idleId);
			interactionHandle?.cancel?.();
		};
	}, deps);
}
