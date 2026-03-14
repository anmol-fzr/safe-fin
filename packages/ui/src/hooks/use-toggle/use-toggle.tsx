import { useCallback, useState } from "react";

export const useToggle = (initVal = false) => {
	const [isOpen, setIsOpen] = useState(initVal);

	const onOpen = useCallback(() => setIsOpen(true), []);
	const onClose = useCallback(() => setIsOpen(false), []);
	const onToggle = useCallback(() => setIsOpen((curr) => !curr), []);

	return {
		isOpen,
		onOpen,
		onClose,
		onToggle,
		setIsOpen,
	} as const;
};
