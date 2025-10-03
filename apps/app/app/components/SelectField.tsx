import React, { forwardRef, type Ref, useImperativeHandle } from "react";
import { TouchableOpacity, View } from "react-native";
import { TextField, type TextFieldProps } from "./TextField";

export interface SelectFieldProps
	extends Omit<
		TextFieldProps,
		"ref" | "onValueChange" | "onChange" | "value"
	> {}
export type SelectFieldRef = {};

export const SelectField = forwardRef(function SelectField(
	props: SelectFieldProps,
	ref: Ref<SelectFieldRef>,
) {
	const { ...TextFieldProps } = props;

	const disabled =
		TextFieldProps.editable === false || TextFieldProps.status === "disabled";

	useImperativeHandle(ref, () => ({}));

	return (
		<>
			<TouchableOpacity activeOpacity={1}>
				<View pointerEvents="none">
					<TextField {...TextFieldProps} />
				</View>
			</TouchableOpacity>
		</>
	);
});
