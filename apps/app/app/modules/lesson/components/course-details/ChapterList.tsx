import { View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { ListView } from "@/components";
import { makeSpringy, type ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import type { Chapter } from "../../api-types/course_one";
import { ChapterBar } from "./ChapterBar";

interface ChapterListProps {
	chapters: Chapter[];
}

export const ChapterList = (props: ChapterListProps) => {
	const { chapters } = props;

	const { themed } = useAppTheme();

	return (
		<View style={{ flex: 1 }}>
			<ListView
				data={chapters}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={themed($separator)}
				renderItem={({ item, index }) => (
					<Animated.View entering={makeSpringy(FadeInUp).delay(50 * index)}>
						<ChapterBar chapter={item} index={index} />
					</Animated.View>
				)}
			/>
		</View>
	);
};

const $separator: ThemedViewStyle = (theme) => ({
	gap: theme.spacing.xl,
});
