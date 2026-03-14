import { LessonCard } from "../LessonCard/LessonCard";

interface ForYouLessonCardProps {
	id: number;
	title: string;
	shortDesc: string;
	coverUrl: string;
}

export const SavedCourseCard = (props: ForYouLessonCardProps) => {
	const {
		id,
		title,
		shortDesc,
		// isSaved = 0,
		// content,
		// level,
		// rating,
		// rateCount,
		coverUrl,
	} = props;

	return (
		<LessonCard id={id}>
			<LessonCard.Image source={coverUrl} />

			<LessonCard.Body>
				<LessonCard.Title>{title}</LessonCard.Title>
				<LessonCard.Description>{shortDesc}</LessonCard.Description>

				{/*
				<LessonCard.Metadata
					style={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<LessonCard.MetadataLevel level={level} />
					{rateCount >= 1 && rating >= 1 && (
						<LessonCard.Rating rating={rating.toFixed(1)} count={rateCount} />
					)}
				</LessonCard.Metadata>
        */}
			</LessonCard.Body>
		</LessonCard>
	);
};
