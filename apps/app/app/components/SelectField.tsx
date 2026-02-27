import { spacing, type ThemedStyle } from "app/theme";
import { useAppTheme } from "app/utils/useAppTheme";
import { ArrowRight2 } from "iconsax-react-nativejs";
import { forwardRef, type Ref, useCallback, useImperativeHandle } from "react";
import { TouchableOpacity, View, type ViewStyle } from "react-native";
import { IconSax } from "@/context/IconContext";
import { createBottomSheet } from "./BottomSheet";
import { ListItem } from "./ListItem";
import { ListView } from "./ListView";
import { Text } from "./Text";
import { TextField, type TextFieldProps } from "./TextField";

export interface Option {
	label: string;
	value: string;
}

export interface SelectFieldProps
	extends Omit<TextFieldProps, "ref" | "onValueChange" | "onChange"> {
	name: string;
	value: string;
	renderValue: (value: string) => string;
	onSelect: (newValue: string) => void;
	multiple?: boolean;
	options: Option[];
	sheetTitle: string;
}

export interface SelectFieldRef {
	presentOptions: () => void;
	dismissOptions: () => void;
}

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
		sheetTitle,
		...TextFieldProps
	} = props;

	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	const disabled =
		TextFieldProps.editable === false || TextFieldProps.status === "disabled";

	const { Sheet: BottomSheet, useSheet: useBottomSheet } = createBottomSheet(
		`select-field-${props.name}`,
	);

	console.log(`select-field-${props.name}`);

	const bottomSheet = useBottomSheet();

	useImperativeHandle(ref, () => ({
		presentOptions,
		dismissOptions,
	}));

	const presentOptions = useCallback(() => {
		if (disabled) return;
		bottomSheet.present();
	}, [disabled, bottomSheet]);

	const dismissOptions = () => {
		bottomSheet.dismiss();
	};

	const updateValue = (optionValue: string) => {
		onSelect(optionValue);
		if (!multiple) dismissOptions();
	};

	const valueString = renderValue(value);

	return (
		<>
			<TouchableOpacity activeOpacity={1} onPress={presentOptions}>
				<View pointerEvents="none">
					<TextField
						{...TextFieldProps}
						value={valueString}
						RightAccessory={(props) => (
							<IconSax
								icon={ArrowRight2}
								color={colors.textDim}
								size={18}
								style={props.style}
							/>
						)}
					/>
				</View>
			</TouchableOpacity>

			<BottomSheet
				//detents={["auto", 0.69, 1]}
				//initialDetentIndex={1}
				//initialDetentAnimated
				contentContainerStyle={{
					padding: 0,
					paddingBlock: 0,
					paddingInline: 0,
					width: "100%",
					// alignItems: "center",
					// justifyContent: "center",
				}}
			>
				<Text
					size="lg"
					weight="medium"
					style={{
						textTransform: "capitalize",
						paddingInline: spacing.md,
					}}
				>
					{sheetTitle}
				</Text>
				<View
					style={{
						height: 400,
						borderTopWidth: 1,
						borderColor: colors.palette.neutral400,
					}}
				>
					<ListView
						data={options}
						nestedScrollEnabled
						keyExtractor={(o) => o.value}
						showsVerticalScrollIndicator={false}
						renderItem={({ item, index }) => {
							const isCorrect = value.includes(item.value);

							const handleItemPress = () => updateValue(item.value);

							return (
								<ListItem
									text={item.label}
									topSeparator={index !== 0}
									style={themed(
										isCorrect ? $listItemActive : $listItemInActive,
									)}
									textStyle={isCorrect ? { color: colors.success } : undefined}
									rightIcon={isCorrect ? "check" : undefined}
									rightIconColor={colors.success}
									onPress={handleItemPress}
								/>
							);
						}}
					/>
				</View>
			</BottomSheet>
		</>
	);
});

const $listItemActive: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
	paddingHorizontal: spacing.md,
	backgroundColor: colors.successBackground,
});

const $listItemInActive: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	paddingHorizontal: spacing.sm,
});
