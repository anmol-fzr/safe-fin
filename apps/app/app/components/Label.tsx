import { Text, type TextProps } from "./Text";

export const Label = (props: TextProps) => {
	return <Text preset="formLabel" {...props} />;
};
