import { clamp } from "@safe-fin/utils";
import { useMemo } from "react";
import { useDimensions } from "@/hooks/use-dimensions";
import type { CourseItem } from "@/modules/lesson/api";
import { LessonCard } from "@/modules/lesson/components/LessonCard/LessonCard";

interface ForYouLessonCardProps {
	course: CourseItem;
}

export const ForYouLessonCard = (props: ForYouLessonCardProps) => {
	const { course } = props;
	const {
		id,
		isSaved = 0,
		content,
		level,
		rating,
		rateCount,
		coverUrl,
	} = course;

	const { maxWidth = 350 } = useForYouLessonCardStyles({ horizontal: true });

	return (
		<LessonCard
			id={id}
			style={{
				maxWidth,
				minWidth: 350,
			}}
		>
			<LessonCard.Image source={coverUrl}>
				<LessonCard.Bookmark isBookmarked={isSaved === 1} />
			</LessonCard.Image>

			<LessonCard.Body>
				<LessonCard.Title>{content.title}</LessonCard.Title>
				<LessonCard.Description>{content.shortDesc}</LessonCard.Description>

				<LessonCard.Metadata
					style={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<LessonCard.MetadataLevel level={level} />
					<LessonCard.Rating rating={rating} count={rateCount} />
				</LessonCard.Metadata>
			</LessonCard.Body>
		</LessonCard>
	);
};

interface ForYouLessonsCardLoading {
	horizontal?: boolean;
}

const useForYouLessonCardStyles = (props: ForYouLessonsCardLoading) => {
	const { width } = useDimensions("window");

	const courseCardMaxWidth = useMemo(
		() => clamp(300, Math.round(width * 0.85), 500),
		[width],
	);

	if (!props.horizontal) return undefined;

	return {
		maxWidth: courseCardMaxWidth,
		minWidth: courseCardMaxWidth,
	};
};

ForYouLessonCard.Loading = (props: ForYouLessonsCardLoading) => {
	const cardStyles = useForYouLessonCardStyles(props);

	return (
		<LessonCard.Loading style={cardStyles}>
			<LessonCard.Image />

			<LessonCard.Body>
				<LessonCard.Title.Loading />
				<LessonCard.Description.Loading />

				<LessonCard.Metadata
					style={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<LessonCard.MetadataItem.Loading />
					<LessonCard.MetadataItem.Loading />
				</LessonCard.Metadata>
			</LessonCard.Body>
		</LessonCard.Loading>
	);
};
