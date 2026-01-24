import { ListView } from "@/components";
import { Chapter } from "../../api-types/course_one";
import { ChapterBar } from "./ChapterBar";
import { ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

interface ChapterListProps {
	chapters: Chapter[];
}

export const ChapterList = (props: ChapterListProps) => {
	const { chapters } = props;

	const { themed } = useAppTheme();

	return (
		<ListView
			data={chapters}
			keyExtractor={(item) => item.id.toString()}
			contentContainerStyle={themed($separator)}
			renderItem={({ item, index }) => (
				<ChapterBar chapter={item} index={index} />
			)}
		/>
	);
};

const $separator: ThemedViewStyle = (theme) => ({
	gap: theme.spacing.xl,
});
