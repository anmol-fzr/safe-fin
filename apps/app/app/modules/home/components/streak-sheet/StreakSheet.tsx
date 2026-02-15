import { StyleSheet, View } from "react-native";
import { Text } from "@/components";
import { FadeInDown, ZoomInEasyDown } from "react-native-reanimated";
import { makeSpringy } from "@/theme";
import { StreakData, StreakStatus } from "../../api";
import { RollingCounter } from "@/components/shared/organisms/rolling-counter";
import LottieView from "lottie-react-native";
import { createBottomSheet } from "@/components/BottomSheet";

const fireLottieJson = require("assets/lottie/streak/fire.json");

interface StreakSheetProps {
	streak?: StreakData;
}

const SHEET_VIEWS: Record<
	StreakStatus,
	{
		title: string;
		lottie: any;
		desc: string;
	}
> = {
	new: {
		title: "Your streak has begun 🎉",
		desc: "Great start! You’ve completed your first day and officially started a streak.",
		lottie: fireLottieJson,
	},
	continued: {
		title: "Streak going strong 🔥",
		desc: "Nice work! You’ve maintained your streak by staying consistent.",
		lottie: fireLottieJson,
	},
	reset: {
		title: "Fresh start, new momentum",
		desc: "Your streak has reset, but that’s okay. Progress isn’t about perfection.",
		lottie: fireLottieJson,
	},
	same: {
		title: "Your streak has begun 🎉",
		desc: "Great start! You’ve completed your first day and officially started a streak.",
		lottie: fireLottieJson,
	},
};

export const { useSheet: useStreakSheet, Sheet: BottomSheet } =
	createBottomSheet("streak-sheet");

export const StreakSheet = (props: StreakSheetProps) => {
	const { streak } = props;

	if (!streak) {
		return <></>;
	}

	const { status, current } = streak;
	const { title, desc, lottie } = SHEET_VIEWS[status];

	return (
		<BottomSheet>
			<Text
				size="xl"
				weight="medium"
				style={styles.textAlignCenter}
				entering={makeSpringy(ZoomInEasyDown)}
			>
				{title}
			</Text>

			<LottieView source={lottie} autoPlay loop style={styles.lottie} />

			<View style={{ margin: "auto" }}>
				<RollingCounter
					value={current}
					height={64}
					width={36}
					springConfig={{
						stiffness: 110,
						damping: 14,
						mass: 0.5,
					}}
					fontSize={52}
				/>
			</View>

			<Text
				size="md"
				weight="medium"
				entering={FadeInDown}
				style={styles.textAlignCenter}
			>
				day streak
			</Text>

			<Text entering={FadeInDown} style={styles.textAlignCenter}>
				{desc}
			</Text>
		</BottomSheet>
	);
};

const styles = StyleSheet.create({
	lottie: {
		width: 200,
		height: 200,
		alignSelf: "center",
	},
	textAlignCenter: {
		textAlign: "center",
	},
});
