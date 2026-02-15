import { Button, Separator, Text } from "@/components";
import { Section } from "@/components/Section";
import { IconSax } from "@/context/IconContext";
import { useGetExercise } from "../hooks/queries";
import { makeSpringy, ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { getEmptyArr } from "@safe-fin/ui/utils";
import { Link, useNavigation } from "expo-router";
import { ArrowRight } from "iconsax-react-nativejs";
import { useLayoutEffect } from "react";
import { View } from "react-native";
import Animated, { ZoomInEasyDown } from "react-native-reanimated";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

interface ExerciseScreenImplProps {
	exerciseId: number;
}

const questionMarkImg = require("assets/images/exercise/question-mark.png");

export function ExerciseDetailScreen(props: ExerciseScreenImplProps) {
	const { exerciseId } = props;

	const { exercise } = useGetExercise(exerciseId);
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: exercise.chapter.course.content.title,
		});
	}, []);

	const {
		themed,
		theme: { colors, spacing },
	} = useAppTheme();

	return (
		<Section style={themed($root)}>
			<Section.Body preset="filled" style={themed($body)}>
				<View style={{ gap: spacing.sm }}>
					<Text size="xl" weight="medium">
						{exercise.title}
					</Text>
					<Text>{exercise.desc}</Text>
				</View>

				<Animated.Image
					source={questionMarkImg}
					entering={makeSpringy(ZoomInEasyDown)}
					width={220}
					height={220}
					style={{
						width: 300,
						height: 300,
						marginTop: spacing.xxl,
						marginInline: "auto",
					}}
				/>

				<View style={{ gap: spacing.md }}>
					<View style={themed($metaDataRow)}>
						<Text>{exercise.questions.length} Questions</Text>
						<Separator orientation="vertical" />
						<Text>{exercise.points} XP</Text>
					</View>

					<Link
						href={{
							pathname: "/course/exercise/[exerciseId]",
							params: {
								exerciseId,
							},
						}}
						asChild
					>
						<Button
							preset="reversed"
							style={themed($startButton)}
							RightAccessory={() => (
								<IconSax icon={ArrowRight} color={colors.textInverse} />
							)}
						>
							Start Exercise
						</Button>
					</Link>
				</View>
			</Section.Body>
		</Section>
	);
}

ExerciseDetailScreen.Loading = () => {
	const {
		themed,
		theme: { spacing },
	} = useAppTheme();

	return (
		<Section style={themed($root)}>
			<Section.Body preset="filled" style={themed($body)}>
				<View style={{ gap: spacing.sm }}>
					<SkeletonPlaceholder>
						<SkeletonPlaceholder.Item
							width="80%"
							height={34}
							borderRadius={12}
							marginBottom={spacing.sm}
						/>

						{getEmptyArr(3).map((i) => (
							<SkeletonPlaceholder.Item
								key={i}
								width="100%"
								height={18}
								marginBottom={spacing.xxs}
								borderRadius={12}
							/>
						))}
					</SkeletonPlaceholder>
				</View>

				<Animated.Image
					source={questionMarkImg}
					entering={makeSpringy(ZoomInEasyDown)}
					width={220}
					height={220}
					style={{
						width: 300,
						height: 300,
						marginTop: spacing.xxl,
						marginInline: "auto",
					}}
				/>

				<View style={{ gap: spacing.md }}>
					<View style={themed($metaDataRow)}>
						<SkeletonPlaceholder.Item
							width="20%"
							height={18}
							borderRadius={12}
						/>
						<Separator orientation="vertical" />

						<SkeletonPlaceholder.Item
							width="20%"
							height={18}
							borderRadius={12}
						/>
					</View>

					<Button preset="reversed" style={themed($startButton)}></Button>
				</View>
			</Section.Body>
		</Section>
	);
};

const $metaDataRow: ThemedViewStyle = (theme) => ({
	flexDirection: "row",
	gap: theme.spacing.md,
	margin: "auto",
});

const $startButton: ThemedViewStyle = (theme) => ({
	gap: theme.spacing.sm,
});

const $root: ThemedViewStyle = (theme) => ({
	flex: 1,
	padding: theme.spacing.sm,
});

const $body: ThemedViewStyle = (theme) => ({
	flex: 1,
	gap: theme.spacing.md,
	justifyContent: "space-between",
});
