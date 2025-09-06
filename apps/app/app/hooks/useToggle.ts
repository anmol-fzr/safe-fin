import { useCallback, useMemo, useState } from "react";

export const useToggle = (initVal = false) => {
	const [isOpen, setIsOpen] = useState(initVal);

	const onOpen = useCallback(() => setIsOpen(true), []);
	const onClose = useCallback(() => setIsOpen(false), []);

	return useMemo(
		() => ({
			isOpen,
			onOpen,
			onClose,
		}),
		[isOpen, onOpen, onClose],
	);
};
