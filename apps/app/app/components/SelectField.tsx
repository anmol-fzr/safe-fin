import {
	BottomSheetBackdrop,
	BottomSheetFlatList,
	BottomSheetFooter,
	BottomSheetModal,
} from "@gorhom/bottom-sheet";
import type { ThemedStyle } from "app/theme";
import { useAppTheme } from "app/utils/useAppTheme";
import {
	forwardRef,
	type Ref,
	useCallback,
	useImperativeHandle,
	useRef,
} from "react";
import { TouchableOpacity, View, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { ListItem } from "./ListItem";
import { TextField, type TextFieldProps } from "./TextField";

export interface Option {
	label: string;
	value: string;
}

export type Options = Option[];

export interface SelectFieldProps
	extends Omit<TextFieldProps, "ref" | "onValueChange" | "onChange"> {
	value: string;
	renderValue: (value: string) => string;
	onSelect: (newValue: string) => void;
	multiple?: boolean;
	options: { label: string; value: string }[];
}
export interface SelectFieldRef {
	presentOptions: () => void;
	dismissOptions: () => void;
}

// function without<T>(array: T[], value: T) {
// 	return array.filter((v) => v !== value);
// }

export const SelectField = forwardRef(function SelectField(
	props: SelectFieldProps,
	ref: Ref<SelectFieldRef>,
) {
	const {
		value = "",
		onSelect,
		renderValue,
		options = [],
		multiple = false,
		...TextFieldProps
	} = props;

	const sheet = useRef<BottomSheetModal>(null);
	const { bottom } = useSafeAreaInsets();
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	const disabled =
		TextFieldProps.editable === false || TextFieldProps.status === "disabled";

	useImperativeHandle(ref, () => ({ presentOptions, dismissOptions }));

	const valueString = renderValue(value);

	const presentOptions = useCallback(() => {
		if (disabled) return;

		sheet.current?.present();
	}, [disabled]);

	function dismissOptions() {
		sheet.current?.dismiss();
	}

	function updateValue(optionValue: string) {
		onSelect(optionValue);
		dismissOptions();
		return;
		// if (value.includes(optionValue)) {
		// 	onSelect?.(multiple ? without(value, optionValue) : []);
		// } else {
		// 	onSelect?.(multiple ? [...value, optionValue] : [optionValue]);
		// 	if (!multiple) dismissOptions();
		// }
	}

	const {
		theme: { spacing },
	} = useAppTheme();

	return (
		<>
			<TouchableOpacity activeOpacity={1} onPress={presentOptions}>
				<View pointerEvents="none">
					<TextField
						{...TextFieldProps}
						value={valueString}
						RightAccessory={(props) => (
							<Icon icon="caretRight" containerStyle={props.style} />
						)}
					/>
				</View>
			</TouchableOpacity>

			<BottomSheetModal
				ref={sheet}
				snapPoints={["50%"]}
				stackBehavior="replace"
				enableDismissOnClose
				backdropComponent={(props) => (
					<BottomSheetBackdrop
						{...props}
						appearsOnIndex={0}
						disappearsOnIndex={-1}
					/>
				)}
				footerComponent={
					!multiple
						? undefined
						: (props) => (
								<BottomSheetFooter
									{...props}
									style={themed($bottomSheetFooter)}
									bottomInset={bottom}
								>
									<Button
										text="Dismiss"
										preset="reversed"
										onPress={dismissOptions}
									/>
								</BottomSheetFooter>
							)
				}
			>
				<BottomSheetFlatList
					style={{
						marginBottom: bottom + (multiple ? spacing.xl * 2 : 0),
					}}
					data={options}
					keyExtractor={(o) => o.value}
					renderItem={({ item, index }) => (
						<ListItem
							text={item.label}
							topSeparator={index !== 0}
							style={themed($listItem)}
							rightIcon={value.includes(item.value) ? "check" : undefined}
							rightIconColor={colors.success}
							onPress={() => updateValue(item.value)}
						/>
					)}
				/>
			</BottomSheetModal>
		</>
	);
});

const $bottomSheetFooter: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	paddingHorizontal: spacing.lg,
	paddingBottom: spacing.xs,
});

const $listItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	paddingHorizontal: spacing.lg,
});
