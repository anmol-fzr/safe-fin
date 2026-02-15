import type { ImageStyle, ViewStyle } from "react-native";
import { Image } from "react-native";
import Animated, {
	FadeIn,
	FadeInDown,
	SlideInRight,
	SlideOutLeft,
} from "react-native-reanimated";
import { $sizeStyles, Button, Screen, Text } from "@/components";
import { useLoopOverArray } from "@/hooks/use-loop-over-array";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { $styles, makeSpringy, type ThemedStyle } from "@/theme";
import { envs } from "@/utils/envs";
import { useAppTheme } from "@/utils/useAppTheme";
import {
	WelcomeLoginButton,
	WelcomeNextButton,
} from "../components/welcome-action-buttons";
import { WelcomeActionButton } from "../components/welcome-action-buttons/welcome-action-button";
import { Link } from "expo-router";

const balanceImage = require("assets/images/start/balance.png");
const becomingRichImage = require("assets/images/start/becoming-rich.png");
const unknownCallerImage = require("assets/images/start/unknown-caller.png");

const contents = [
	{ image: balanceImage, bg: "#cce7ff", text: "Gain Financial Clarity" },
	{ image: becomingRichImage, bg: "#e6fef1", text: "Calculate and Invest" },
	{ image: unknownCallerImage, bg: "#fff8e5", text: "Stay aware of Scams" },
] as const;

const enteringAnim = makeSpringy(SlideInRight);
const exitingAnim = makeSpringy(SlideOutLeft);

export function WelcomeScreen() {
	const { themed } = useAppTheme();
	const { isLogin } = useAuth();

	const [curr, currIndx] = useLoopOverArray(contents);

	return (
		<Screen
			preset="fixed"
			safeAreaEdges={["top", "bottom"]}
			contentContainerStyle={$styles.flex1}
		>
			<Animated.View style={themed($topContainer)}>
				<Text
					preset="bold"
					style={{ textAlign: "center", ...$sizeStyles.xxl }}
					entering={FadeIn}
				>
					SafeFin
				</Text>

				<Animated.View
					entering={enteringAnim}
					exiting={exitingAnim}
					key={`image-${currIndx}`}
				>
					<Image source={curr.image} style={themed($welcomeLogo)} width={200} />
				</Animated.View>

				<Animated.View
					entering={enteringAnim}
					exiting={exitingAnim}
					key={`title-${currIndx}`}
				>
					<Text
						preset="bold"
						style={{ textAlign: "center", ...$sizeStyles.xl }}
					>
						{curr.text}
					</Text>
				</Animated.View>
			</Animated.View>

			<Link
				asChild
				href={{
					pathname: "/course/exercise/[exerciseId]",
					params: { exerciseId: 1 },
				}}
			>
				<Button>Go to Exercise</Button>
			</Link>

			<Link
				asChild
				href={{
					pathname: "/course/exercise/[exerciseId]/result",
					params: { exerciseId: 1 },
				}}
			>
				<Button>Go to Exercise Result</Button>
			</Link>

			<Animated.View entering={FadeInDown}>
				{isLogin ? <WelcomeNextButton /> : <WelcomeLoginButton />}
			</Animated.View>
			{envs.isDev && (
				<WelcomeActionButton
					href="/extras/debug"
					labelTx="demoDebugScreen:title"
				/>
			)}
		</Screen>
	);
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	flexShrink: 1,
	flexGrow: 1,
	gap: spacing.lg,
	flexBasis: "57%",
	paddingHorizontal: spacing.lg,
	paddingTop: spacing.xl,
});

const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
	width: "100%",
	objectFit: "contain",
	aspectRatio: 1,
	marginBottom: spacing.xxl,
	marginInline: "auto",
});
