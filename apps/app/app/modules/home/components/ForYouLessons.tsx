import { clamp } from "@safe-fin/utils";
import { Link } from "expo-router";
import { Chart } from "iconsax-react-nativejs";
import { useMemo } from "react";
import { View } from "react-native";
import { BaseListItemSeparator, ListView, Text } from "@/components";
import { Section } from "@/components/Section";
import { IconSax } from "@/context/IconContext";
import { useDimensions } from "@/hooks/use-dimensions";
import { LessonCard } from "@/modules/lesson/components/LessonCard/LessonCard";
import { useGetForYouCourses } from "@/modules/lesson/hooks/api";
import { useAppTheme } from "@/utils/useAppTheme";

export const ForYouLessons = () => {
	const { courses } = useGetForYouCourses();
	const { width } = useDimensions("window");

	const courseCardMaxWidth = useMemo(
		() => clamp(300, Math.round(width * 0.85), 500),
		[width],
	);

	const { theme } = useAppTheme();

	return (
		<Section>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Section.Title>Recommended for you</Section.Title>

				<Link href="/tabs/learnings">
					<Link.Trigger>
						<Text>View all</Text>
					</Link.Trigger>
					<Link.Preview />
				</Link>
			</View>

			<ListView
				horizontal
				data={courses}
				recycleItems
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={BaseListItemSeparator}
				renderItem={({ item }) => (
					<LessonCard
						id={item.id}
						style={{
							maxWidth: courseCardMaxWidth,
						}}
					>
						<LessonCard.Image source="https://ilarge.lisimg.com/image/28254022/1118full-iman-vellani.jpg">
							<LessonCard.Bookmark isBookmarked={item.isSaved === 1} />
						</LessonCard.Image>

						<LessonCard.Body>
							<LessonCard.Title>{item.content.title}</LessonCard.Title>
							<LessonCard.Description>
								{item.content.shortDesc}
							</LessonCard.Description>

							<LessonCard.Metadata>
								<LessonCard.MetadataItem
									Icon={() => <IconSax icon={Chart} size={18} />}
								>
									<Text
										style={{
											textTransform: "capitalize",
											color: theme.colors.textDim,
										}}
									>
										{item.level}
									</Text>
								</LessonCard.MetadataItem>
								{/*
						<LessonCard.MetadataItem icon="bell">7h</LessonCard.MetadataItem>
            */}
								<LessonCard.Rating
									rating={item.avgRating}
									count={item.rateCount}
								/>
							</LessonCard.Metadata>
						</LessonCard.Body>
					</LessonCard>
				)}
			/>
		</Section>
	);
};
