import { useAppTheme } from "@/utils/useAppTheme";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { View } from "react-native";
import { Button, Text } from "@/components";
import Animated, { FadeInDown, ZoomInEasyDown } from "react-native-reanimated";
import { makeSpringy } from "@/theme";
import { StreakData, StreakStatus } from "../../api";
import { RollingCounter } from "@/components/shared/organisms/rolling-counter";

const trophy = require("assets/images/course/trophy.png");

interface StreakSheetProps {
	streak: StreakData;
}

const SHEET_VIEWS: Record<
	StreakStatus,
	{
		title: string;
		image: any;
		desc: string;
		buttonText: string;
	}
> = {
	new: {
		title: "Your streak has begun 🎉",
		desc: "Great start! You’ve completed your first day and officially started a streak.",
		image: trophy,
		buttonText: "Continue",
	},
	continued: {
		title: "Streak going strong 🔥",
		desc: "Nice work! You’ve maintained your streak by staying consistent.",
		image: trophy,
		buttonText: "Keep It Going",
	},
	reset: {
		title: "Fresh start, new momentum",
		desc: "Your streak has reset, but that’s okay. Progress isn’t about perfection.",
		image: trophy,
		buttonText: "Start Again",
	},
	same: {
		title: "Your streak has begun 🎉",
		desc: "Great start! You’ve completed your first day and officially started a streak.",
		image: trophy,
		buttonText: "Continue",
	},
};

interface StreakSheetRef {
	present: VoidFunction;
	dismiss: VoidFunction;
}
export const useStreakSheetRef = () => {
	return useRef<StreakSheetRef | null>(null);
};

export const StreakSheet = forwardRef<StreakSheetRef, StreakSheetProps>(
	(props, ref) => {
		const { streak } = props;
		const { status, current } = streak;

		const sheet = useRef<TrueSheet>(null);

		const dismiss = async () => {
			await sheet.current?.dismiss();
		};

		useImperativeHandle(ref, () => {
			return {
				present: () => {
					sheet.current?.present();
				},
				dismiss: () => {
					sheet.current?.dismiss();
				},
			};
		}, [sheet]);

		const {
			theme: { colors, spacing },
		} = useAppTheme();

		const { title, desc, image, buttonText } = SHEET_VIEWS[status];

		return (
			<TrueSheet
				ref={sheet}
				detents={["auto"]}
				grabberOptions={{ color: "#000000" }}
			>
				<View
					style={{
						padding: spacing.md,
						paddingTop: spacing.xl,
						gap: spacing.md,
					}}
				>
					<Text
						size="xl"
						weight="medium"
						style={{ textAlign: "center" }}
						entering={makeSpringy(ZoomInEasyDown)}
					>
						{title}
					</Text>

					<Animated.Image
						source={image}
						entering={makeSpringy(ZoomInEasyDown).delay(50)}
						width={100}
						style={{
							margin: "auto",
						}}
					/>

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
						style={{ textAlign: "center" }}
					>
						day streak
					</Text>

					<Text entering={FadeInDown} style={{ textAlign: "center" }}>
						{desc}
					</Text>

					<Button
						onPress={dismiss}
						preset="reversed"
						style={{ backgroundColor: colors.tint, marginTop: 24 }}
					>
						{buttonText}
					</Button>
				</View>
			</TrueSheet>
		);
	},
);
