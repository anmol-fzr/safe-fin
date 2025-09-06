import { useEffect, type RefObject } from "react";

type UseSearchKeyBinding = {
	searchRef: RefObject<HTMLInputElement | null>;
	binding?: string;
	enabled?: boolean;
};

const useSearchKeyBinding = ({
	searchRef,
	binding = "/",
	enabled = true,
}: UseSearchKeyBinding) => {
	useEffect(() => {
		const handler = (evnt: KeyboardEvent) => {
			if (!enabled) return;

			const target = evnt.target as HTMLInputElement;
			const isEditable =
				target.tagName === "INPUT" ||
				target.tagName === "TEXTAREA" ||
				target.isContentEditable;

			if (isEditable) return;

			if (evnt.isTrusted && evnt.key === binding) {
				evnt.preventDefault();
				searchRef.current?.focus();
				searchRef.current?.select();
			}
		};

		window.addEventListener("keydown", handler);
		return () => {
			window.removeEventListener("keydown", handler);
		};
	}, []);
};

export { useSearchKeyBinding };
