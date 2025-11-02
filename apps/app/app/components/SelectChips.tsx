import {
	createContext,
	type JSX,
	type PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { Pressable, View } from "react-native";
import { Text } from "@/components";
import { spacing } from "@/theme";
import { MissingContextError } from "@/utils/error";
import { useAppTheme } from "@/utils/useAppTheme";
import { Field, type FieldLabelProps } from "./Field";

export type CustomOption<T> = { label: string } & T;
export type ValueRenderer<T> = (option: CustomOption<T>) => string;
export type OptionRenderer<T> = (
	option: CustomOption<T> & { isSelected: boolean },
) => JSX.Element;

export function SelectChips(props: PropsWithChildren) {
	const { children } = props;

	return <View style={{ gap: spacing.xs }}> {children}</View>;
}

export interface SelectChipsLabelProps extends FieldLabelProps {
	label: string;
}

SelectChips.Label = (props: SelectChipsLabelProps) => {
	return <Field.Label text={props.label} {...props} />;
};

const selectChipsContext = createContext<{
	disabled: boolean;

	selected: string | null;
	setSelected: (opt: string) => void;
} | null>(null);

const SelectChipsProvider = selectChipsContext.Provider;

const useSelectChipsContext = () => {
	const ctx = useContext(selectChipsContext);
	if (ctx === null || ctx === undefined) {
		throw new MissingContextError("SelectChips Components", "SelectChips.Root");
	}
	return ctx;
};

interface SelectChipsRootProps extends PropsWithChildren {
	onChange?: (value: string) => void;
	value?: string;
	disabled?: boolean;
}

SelectChips.Root = (props: SelectChipsRootProps) => {
	const { disabled = false } = props;
	const [selected, setSelected] = useState<string | null>(props.value || null);

	useEffect(() => {
		if (props.value !== selected) {
			setSelected(props.value || null);
		}
	}, [props.value]);

	const handleValueChange = useCallback(
		(newValue: string) => {
			if (props.onChange) {
				props.onChange(newValue);
			}
			setSelected(() => newValue);
		},
		[props.onChange],
	);

	return (
		<SelectChipsProvider
			value={{
				selected,
				setSelected: handleValueChange,
				disabled,
			}}
		>
			{props.children}
		</SelectChipsProvider>
	);
};

export interface SelectChipsOptionsProps<T> {
	valueRenderer: ValueRenderer<T>;
	optionRenderer: OptionRenderer<T>;
	options: CustomOption<T>[] | Readonly<CustomOption<T>[]>;
}

SelectChips.Options = <T,>(props: SelectChipsOptionsProps<T>) => {
	const { options, valueRenderer, optionRenderer } = props;

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
				//width: "auto",
			}}
		>
			{options.map((option) => (
				<SelectChips.Option
					key={option.label}
					{...{ valueRenderer, optionRenderer, option }}
				/>
			))}
		</View>
	);
};

export interface SelectChipsOptionProps<T> {
	valueRenderer: ValueRenderer<T>;
	optionRenderer: OptionRenderer<T>;
	option: CustomOption<T>;
}

SelectChips.Option = <T,>(props: SelectChipsOptionProps<T>) => {
	const { option, optionRenderer, valueRenderer } = props;

	const { selected, setSelected, disabled = false } = useSelectChipsContext();

	const isSelected = valueRenderer(option) === selected;

	const handlePress = () => {
		if (disabled) return;
		setSelected(valueRenderer(props.option));
	};

	return (
		<Pressable onPress={handlePress}>
			{optionRenderer({ isSelected, ...option })}
		</Pressable>
	);
};

type OptionRendererProps<T> = CustomOption<T> & { isSelected: boolean };

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
			<Text
				style={{
					color: isSelected ? "white" : "black",
				}}
			>
				{label}
			</Text>
		</View>
	);
};
