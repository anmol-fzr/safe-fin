import type { ViewStyle } from "react-native";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { Screen, Text } from "@/components";
import { LoginForm } from "@/modules/auth/components";
import { $styles, type ThemedStyle } from "@/theme";
import { APP } from "@/utils/const";
import { useAppTheme } from "@/utils/useAppTheme";

export default function WelcomeScreen() {
	const { themed } = useAppTheme();

	return (
		<Screen
			preset="fixed"
			safeAreaEdges={["top"]}
			contentContainerStyle={$styles.flex1}
		>
			<Animated.View style={themed($topContainer)}>
				<Text
					preset="bold"
					size="xxl"
					style={{
						textAlign: "center",
					}}
				>
					Welcome to {APP.NAME}
				</Text>
				<Text
					preset="subheading"
					style={{
						textAlign: "center",
					}}
				>
					{APP.DESC}
				</Text>
				{/*
				<Image
					source={image}
					style={{
						width: "100%",
						objectFit: "contain",
						marginInline: "auto",
						aspectRatio: 1,
					}}
				/>
        */}
			</Animated.View>

			<View style={themed($formContainer)}>
				<LoginForm.Root>
					<View
						style={{
							flex: 1,
						}}
					>
						<LoginForm.PhoneNumber />
						<LoginForm.Otp />
					</View>

					<View style={themed($buttons)}>
						<LoginForm.Submit />
						<LoginForm.GuestLogin />
					</View>
				</LoginForm.Root>
			</View>
		</Screen>
	);
}

const $buttons: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	gap: spacing.md,
});

const $formContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	flex: 1,
	marginBottom: spacing.lg,
	gap: spacing.md,
	marginInline: spacing.lg,
});

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	paddingHorizontal: spacing.lg,
	paddingTop: spacing.xl,
});
