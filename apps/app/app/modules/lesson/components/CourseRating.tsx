import { StarRating } from "@/components/star-rating";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text } from "@/components";
import { View, type ViewProps } from "react-native";
import { COURSES } from "../api";
import { ResourceId } from "@/types";
import { useAppTheme } from "@/utils/useAppTheme";

type CourseRatingProps = Omit<ViewProps, "children"> & {
	courseId: ResourceId;
	rating: number;
	rateCount: number;
};

export const CourseRating = (props: CourseRatingProps) => {
	const {
		courseId,
		rating: userRating = 0,
		rateCount,
		style: $stylOverride,
		...rest
	} = props;

	const { rating, handleRatingChange } = StarRating.useStarRating(userRating);
	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribe = navigation.addListener("beforeRemove", () => {
			if (rating) {
				COURSES.RATE(courseId, rating);
			}
		});

		return unsubscribe;
	}, [rating]);

	const {
		theme: { spacing },
	} = useAppTheme();

	return (
		<View
			style={[
				{ alignItems: "center", paddingBottom: spacing.md },
				$stylOverride,
			]}
			{...rest}
		>
			<Text style={{ textAlign: "center" }}>
				{rateCount > 0
					? "How's the Course going so far ?"
					: "Be the first to rate !"}
			</Text>
			<StarRating.Root>
				<StarRating.Stars rating={rating} onRatingChange={handleRatingChange} />
			</StarRating.Root>
		</View>
	);
};
