import { useSafeContext } from "@safe-fin/ui/hooks";
import type { Icon as IconType } from "iconsax-react-nativejs";
import {
	createContext,
	type JSX,
	type PropsWithChildren,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Pressable, View } from "react-native";
import { Text } from "@/components";
import { spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Field, type FieldLabelProps } from "./Field";

export type CustomOption<T> = { label: string; value: string } & T;
export type ValueRenderer<T> = (option: CustomOption<T>) => string;
export type OptionRenderer<T> = (
	option: CustomOption<T> & { isSelected: boolean },
) => JSX.Element;

/* -------------------------------------------------------------------------- */
/*                                Root Wrapper                                */
/* -------------------------------------------------------------------------- */

export function SelectChips(props: PropsWithChildren) {
	const { children } = props;
	return <View style={{ gap: spacing.xs }}>{children}</View>;
}

/* -------------------------------------------------------------------------- */
/*                                   Label                                    */
/* -------------------------------------------------------------------------- */

export interface SelectChipsLabelProps extends FieldLabelProps {
	label: string;
}

SelectChips.Label = (props: SelectChipsLabelProps) => {
	return <Field.Label text={props.label} {...props} />;
};

/* -------------------------------------------------------------------------- */
/*                                  Context                                   */
/* -------------------------------------------------------------------------- */

const selectChipsContext = createContext<{
	disabled: boolean;
	multiple: boolean;
	selected: string | Set<string> | null;
	setSelected: (opt: string) => void;
} | null>(null);

const SelectChipsProvider = selectChipsContext.Provider;

const useSelectChipsContext = () => {
	return useSafeContext(selectChipsContext, "useSelectChipsContext");
};

/* -------------------------------------------------------------------------- */
/*                                   Root                                     */
/* -------------------------------------------------------------------------- */

export type SelectChipsRootProps =
	| ({
			onChange?: (value: string[]) => void;
			value?: string[];
			multiple: true;
			disabled?: boolean;
	  } & PropsWithChildren)
	| ({
			onChange?: (value: string) => void;
			value?: string;
			multiple?: false;
			disabled?: boolean;
	  } & PropsWithChildren);

SelectChips.Root = (props: SelectChipsRootProps) => {
	const { disabled = false, multiple = false } = props;

	const [selected, setSelectedState] = useState<string | Set<string> | null>(
		() => {
			if (props.value) {
				if (multiple && Array.isArray(props.value)) {
					return new Set(props.value);
				}
				if (!multiple && typeof props.value === "string") {
					return props.value;
				}
			}
			return multiple ? new Set<string>() : null;
		},
	);

	useEffect(() => {
		if (props.value === undefined) return;
		if (multiple && Array.isArray(props.value)) {
			setSelectedState(new Set(props.value));
		} else if (!multiple && typeof props.value === "string") {
			setSelectedState(props.value);
		}
	}, [props.value, multiple]);

	const handleValueChange = useCallback(
		(newValue: string) => {
			if (multiple) {
				setSelectedState((prev) => {
					const current =
						prev instanceof Set ? new Set(prev) : new Set<string>();
					if (current.has(newValue)) {
						current.delete(newValue);
					} else {
						current.add(newValue);
					}
					props.onChange?.(Array.from(current));
					return current;
				});
			} else {
				setSelectedState(newValue);
				props.onChange?.(newValue);
			}
		},
		[multiple, props.onChange],
	);

	return (
		<SelectChipsProvider
			value={{
				selected,
				setSelected: handleValueChange,
				disabled,
				multiple,
			}}
		>
			{props.children}
		</SelectChipsProvider>
	);
};

/* -------------------------------------------------------------------------- */
/*                                 Options                                    */
/* -------------------------------------------------------------------------- */

export interface SelectChipsOptionsProps<T> {
	valueRenderer?: ValueRenderer<T>;
	optionRenderer?: OptionRenderer<T>;
	options: CustomOption<T>[] | Readonly<CustomOption<T>[]>;
}

SelectChips.Options = <T,>(props: SelectChipsOptionsProps<T>) => {
	const {
		options,
		valueRenderer = (option) => option.value,
		optionRenderer = SelectChips.OptionRenderer,
	} = props;
	const optionRendererRef = useRef(optionRenderer);
	const valueRendererRef = useRef(valueRenderer);

	useEffect(() => {
		optionRendererRef.current = optionRenderer;
	}, [optionRenderer]);

	useEffect(() => {
		valueRendererRef.current = valueRenderer;
	}, [valueRenderer]);

	const {
		theme: { spacing },
	} = useAppTheme();

	return (
		<View
			style={{
				flexDirection: "row",
				flex: 1,
				gap: spacing.sm,
				flexWrap: "wrap",
			}}
		>
			{options.map((option) => (
				<SelectChips.Option
					key={option.label}
					optionRenderer={optionRendererRef.current}
					valueRenderer={valueRendererRef.current}
					{...{ option }}
				/>
			))}
		</View>
	);
};

/* -------------------------------------------------------------------------- */
/*                                  Option                                    */
/* -------------------------------------------------------------------------- */

export interface SelectChipsOptionProps<T> {
	valueRenderer: ValueRenderer<T>;
	optionRenderer: OptionRenderer<T>;
	option: CustomOption<T>;
}

SelectChips.Option = <T,>(props: SelectChipsOptionProps<T>) => {
	const { option, optionRenderer, valueRenderer } = props;
	const {
		selected,
		setSelected,
		disabled = false,
		multiple,
	} = useSelectChipsContext();

	const value = valueRenderer(option);
	const isSelected =
		multiple && selected instanceof Set
			? selected.has(value)
			: selected === value;

	const handlePress = () => {
		if (disabled) return;
		setSelected(value);
	};

	return (
		<Pressable onPress={handlePress}>
			{optionRenderer({ isSelected, ...option })}
		</Pressable>
	);
};

/* -------------------------------------------------------------------------- */
/*                           Built-in Option Renderers                        */
/* -------------------------------------------------------------------------- */

type OptionRendererProps<T> = PropsWithChildren &
	CustomOption<T> & { isSelected: boolean };

SelectChips.OptionRenderer = <T,>(props: OptionRendererProps<T>) => {
	const { isSelected, label } = props;
	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<View
			style={{
				paddingVertical: 8,
				paddingHorizontal: 12,
				borderWidth: 1,
				borderColor: colors.palette.accent500,
				backgroundColor: isSelected ? colors.palette.accent500 : undefined,
				borderRadius: 24,
				flexDirection: "row",
				gap: 6,
				alignItems: "flex-end",
			}}
		>
			{props.children}
			<Text
				style={{
					color: isSelected ? colors.text : colors.textDim,
				}}
				weight={isSelected ? "medium" : "normal"}
			>
				{label}
			</Text>
		</View>
	);
};

type EmojiOptionRendererProps<T extends { emoji: string }> =
	OptionRendererProps<T>;

type IconOptionRendererProps<T extends { Icon: IconType }> =
	OptionRendererProps<T>;

type CompType = <T>(props: OptionRendererProps<T>) => JSX.Element;

export const createIconOptionRenderer = <T extends { Icon: IconType }>(
	Comp: CompType,
) => {
	return (props: IconOptionRendererProps<T>) => {
		const {
			Icon,
			// isSelected
		} = props;
		const {
			theme: { colors },
		} = useAppTheme();

		return (
			<Comp {...props}>
				<Icon color={colors.palette.neutral900} size={20} />
				{props.children}
			</Comp>
		);
	};
};

export const createEmojiOptionRenderer = <T extends { emoji: string }>(
	Comp: CompType,
) => {
	return (props: EmojiOptionRendererProps<T>) => {
		const { emoji = "" } = props;
		return (
			<Comp {...props}>
				{emoji && <Text>{emoji}</Text>}
				{props.children}
			</Comp>
		);
	};
};

SelectChips.IconOptionRenderer = createIconOptionRenderer(
	SelectChips.OptionRenderer,
);

SelectChips.EmojiOptionRenderer = createEmojiOptionRenderer(
	SelectChips.OptionRenderer,
);
