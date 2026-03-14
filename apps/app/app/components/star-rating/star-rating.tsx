import { useAppTheme } from "@/utils/useAppTheme";
import { PropsWithChildren, useState } from "react";
import { View } from "react-native";
import { PressableScale } from "pressto";
import { getEmptyArr } from "@safe-fin/ui/utils";
import { IconSax } from "@/context/IconContext";
import { Star1 } from "iconsax-react-nativejs";
import Animated, { FadeIn } from "react-native-reanimated";

type RootProps = PropsWithChildren;

const Root = (props: RootProps) => {
	const { children } = props;

	const {
		theme: { spacing },
	} = useAppTheme();

	return (
		<View
			style={{
				flexDirection: "row",
				gap: spacing.xxs,
			}}
		>
			{children}
		</View>
	);
};

interface StarsProps {
	count?: number;
	rating: number;
	onRatingChange: (newRating: number) => void;
}

const useStarRating = (init = 0) => {
	const [rating, setRating] = useState(init);

	return { rating, handleRatingChange: setRating };
};

const Stars = (props: StarsProps) => {
	const { count = 5, rating = 0, onRatingChange } = props;

	return (
		<>
			{getEmptyArr(count).map((_, i) => (
				<Animated.View key={`rating-star-${i}`} entering={FadeIn.delay(50 * i)}>
					<Star isActive={rating > i} onPress={() => onRatingChange(i + 1)} />
				</Animated.View>
			))}
		</>
	);
};

interface StarProps {
	isActive: boolean;
	onPress: VoidFunction;
}

const Star = (props: StarProps) => {
	const { isActive, onPress } = props;
	const {
		theme: { spacing, colors },
	} = useAppTheme();

	return (
		<PressableScale
			style={{
				borderRadius: spacing.xs,
				padding: spacing.xxs,
			}}
			onPress={onPress}
		>
			<IconSax
				icon={Star1}
				color={isActive ? colors.palette.warning : undefined}
				variant={isActive ? "Bold" : undefined}
			/>
		</PressableScale>
	);
};

export const StarRating = {
	Root,
	Star,
	Stars,
	useStarRating,
};
