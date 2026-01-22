//import { createContext } from "react";

import { Calendar2 } from "iconsax-react-nativejs";
import type { ReactNode } from "react";
import {
	type StyleProp,
	type TextProps,
	type TextStyle,
	View,
	type ViewProps,
	type ViewStyle,
} from "react-native";
import { Text } from "@/components";
import { IconSax } from "@/context/IconContext";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { LessonCard } from "../LessonCard/LessonCard";

export function CourseDetails(props: ViewProps) {
	return <View {...props} />;
}

CourseDetails.Image = LessonCard.Image;
CourseDetails.Image = LessonCard.Image;
CourseDetails.Bookmark = LessonCard.Bookmark;
CourseDetails.Share = LessonCard.Share;
CourseDetails.Label = LessonCard.Label;
CourseDetails.Title = LessonCard.Title;
CourseDetails.Author = LessonCard.Author;
CourseDetails.Description = LessonCard.Description;
CourseDetails.Metadata = LessonCard.Metadata;
CourseDetails.MetadataItem = LessonCard.MetadataItem;
CourseDetails.MetadataPoints = LessonCard.MetadataPoints;
CourseDetails.Rating = LessonCard.Rating;
CourseDetails.Body = LessonCard.Body;

interface CourseDetailsUpdatedProps extends Omit<TextProps, "style"> {
	/**
	 * The updated date text
	 */
	children: ReactNode;
	/**
	 * Style override
	 */
	style?: StyleProp<TextStyle>;
}

CourseDetails.Updated = (props: CourseDetailsUpdatedProps) => {
	const { children, style: $styleOverride, ...textProps } = props;
	const { themed } = useAppTheme();

	return (
		<View style={$metadataItem}>
			<IconSax icon={Calendar2} size={18} />
			<Text
				{...textProps}
				style={[themed($metadataText), $styleOverride]}
				size="sm"
				weight="normal"
			>
				{children}
			</Text>
		</View>
	);
};

const $metadataItem: ViewStyle = {
	flexDirection: "row",
	alignItems: "center",
	gap: 4,
};

const $metadataText: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.textDim,
});
