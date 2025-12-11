import { Link } from "expo-router";
import { useEffect, useState } from "react";
import type { ImageStyle, ViewStyle } from "react-native";
import { Image, View } from "react-native";
import { $sizeStyles, Button, Screen, Text } from "@/components";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { setAuthData, useAuthStore } from "@/modules/auth/store";
import { authClient } from "@/modules/auth/utils";
import { $styles, spacing, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

const balanceImage = require("assets/images/start/balance.png");
const becomingRichImage = require("assets/images/start/becoming-rich.png");
const unknownCallerImage = require("assets/images/start/unknown-caller.png");

const contents = [
	{
		image: balanceImage,
		bg: "#cce7ff",
		text: "Gain Financial Clarity",
	},
	{
		image: becomingRichImage,
		bg: "#e6fef1",
		text: "Calculate and Invest",
	},
	{
		image: unknownCallerImage,
		bg: "#fff8e5",
		text: "Stay aware of Scams",
	},
];

export default function WelcomeScreen() {
	const { themed } = useAppTheme();
	const [state, setState] = useState(0);
	const { isLogin } = useAuth();

	useEffect(() => {
		setAuthData({
			user: {
				email: "anmol@email.in",
				id: "N1nFy15mRJ coisIQIifyeYyUHp6NkyJX",
				name: "Anmol",
				isAnonymous: false,
			},
		});

		const intervalId = setInterval(() => {
			setState((state) => (state + 1) % contents.length);
		}, 1500);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const curr = contents[state];

	return (
		<Screen
			preset="fixed"
			safeAreaEdges={["top"]}
			contentContainerStyle={$styles.flex1}
		>
			<View style={themed($topContainer)}>
				<Text preset="bold" style={{ textAlign: "center", ...$sizeStyles.xxl }}>
					SafeFin
				</Text>
				<Image source={curr.image} style={themed($welcomeLogo)} />

				<Text preset="bold" style={{ textAlign: "center", ...$sizeStyles.xl }}>
					{curr.text}
				</Text>
			</View>

			{isLogin ? (
				<Link href="/tabs" asChild>
					<Link.Trigger>
						<Button
							style={{
								margin: spacing.lg,
								borderRadius: spacing.xl,
								backgroundColor: curr.bg,
								borderWidth: 0,
							}}
						>
							<Text preset="subheading">Next</Text>
						</Button>
					</Link.Trigger>
					<Link.Preview />
				</Link>
			) : (
				<Link href="/auth" asChild>
					<Link.Trigger>
						<Button
							style={{
								margin: spacing.lg,
								borderRadius: spacing.xl,
								backgroundColor: curr.bg,
								borderWidth: 0,
							}}
						>
							<Text preset="subheading">Log In</Text>
						</Button>
					</Link.Trigger>
					<Link.Preview />
				</Link>
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
	paddingTop: spacing.xxxl,
});

const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
	width: "100%",
	objectFit: "contain",
	aspectRatio: 1,
	marginBottom: spacing.xxl,
});
