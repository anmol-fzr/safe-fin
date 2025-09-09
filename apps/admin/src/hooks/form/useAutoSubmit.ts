import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import {
	type UseFormWatch,
	type FieldValues,
	type UseFormTrigger,
	type Path,
} from "react-hook-form";

interface AutoSubmitProps<T extends FieldValues> {
	trigger: UseFormTrigger<T>;
	watch: UseFormWatch<T>;
	excludeFields?: Path<T>[];
	onSubmit: () => void;
	onValidationFailed?: () => void;
	debounceTime?: number;
}

/**
 * Automatically submit data when it's changed
 */
export const useAutoSubmit = <T extends FieldValues>({
	trigger,
	watch,
	onSubmit,
	debounceTime = 500,
	excludeFields,
	onValidationFailed,
}: AutoSubmitProps<T>) => {
	const [isSubmiting, setIsSubmiting] = useState(false);
	const debouncedSumbit = useCallback(
		debounce((submitFn: () => void) => {
			submitFn();
		}, debounceTime),
		[],
	);
	useEffect(() => {
		const subscription = watch((_data, info) => {
			if (info?.type !== "change") return;
			if (info.name && excludeFields?.includes(info.name)) return;
			setIsSubmiting(true);
			trigger()
				.then((valid) => {
					if (valid) debouncedSumbit(onSubmit);
					else onValidationFailed?.();
				})
				.finally(() => setIsSubmiting(false));
		});
		return () => subscription.unsubscribe();
	}, [watch, onSubmit]);
	return { isSubmiting };
};
