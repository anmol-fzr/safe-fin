import { Pressable, View } from "react-native";
import { Text } from "@/components";
import { createBottomSheet } from "@/components/BottomSheet";
import { IconSax } from "@/context/IconContext";
import { Flag } from "iconsax-react-nativejs";
import { PressableScale } from "pressto";
import { useEffect } from "react";
import { useAppTheme } from "@/utils/useAppTheme";
import * as Haptics from "expo-haptics";
import { Exercise } from "./Exercise";

const { useSheet, Sheet } = createBottomSheet("option-result-sheet");

export const useExerciseQuestionResultSheet = useSheet;

interface ExerciseQuestionResultSheetProps {
	handleNextQuestion: VoidFunction;
	isCorrect: boolean;
	reason: string;
}

export function ExerciseQuestionResultSheet(
	props: ExerciseQuestionResultSheetProps,
) {
	const { isCorrect, handleNextQuestion, reason } = props;

	const { dismiss } = useExerciseQuestionResultSheet();

	const {
		theme: { colors },
	} = useAppTheme();

	useEffect(() => {
		if (isCorrect) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
			return;
		}
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
	}, [isCorrect]);

	return (
		<Sheet
			style={{
				backgroundColor: isCorrect
					? colors.successBackground
					: colors.errorBackground,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				{isCorrect ? (
					<Text
						weight="semiBold"
						size="xl"
						style={{
							color: colors.success,
						}}
					>
						Excellent
					</Text>
				) : (
					<Text
						weight="semiBold"
						size="xl"
						style={{
							color: colors.error,
						}}
					>
						Incorrect
					</Text>
				)}
				<PressableScale style={{ padding: 2 }}>
					<IconSax icon={Flag} color={colors.tint} />
				</PressableScale>
			</View>

			<Exercise.Reason>{reason}</Exercise.Reason>

			<Pressable
				onPress={() => {
					//handleOptnPress(-1);
					dismiss();
					handleNextQuestion();
				}}
			>
				<Text
					weight="semiBold"
					size="lg"
					style={{
						textAlign: "center",
					}}
				>
					Continue
				</Text>
			</Pressable>
		</Sheet>
	);
}
