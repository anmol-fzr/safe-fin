import { Link, useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { BackHandler, StyleSheet, View, type ViewStyle } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import Animated, {
	FadeInDown,
	FadeInUp,
	FadeOutDown,
	FadeOutUp,
} from "react-native-reanimated";
import { z } from "zod";
import { Screen, Text } from "@/components";
import { createRoute } from "@/factory/route";
import { LoginForm } from "@/modules/auth/components";
import {
	$styles,
	makeSpringy,
	type ThemedStyle,
	type ThemedTextStyle,
} from "@/theme";
import { APP } from "@/utils/const";
import { envs } from "@/utils/envs";
import { useAppTheme } from "@/utils/useAppTheme";

const { useParams } = createRoute({
	paramSchema: z.object({ email: z.email().optional() }),
});

export default function LoginScreen() {
	const { email } = useParams();

	const { themed } = useAppTheme();

	const router = useRouter();

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				router.dismissTo("/");
				return true;
			};

			const subscription = BackHandler.addEventListener(
				"hardwareBackPress",
				onBackPress,
			);

			return () => subscription.remove();
		}, [router.dismissTo]),
	);

	const {
		theme: { spacing },
	} = useAppTheme();

	return (
		<Screen
			preset="fixed"
			safeAreaEdges={["top", "bottom"]}
			contentContainerStyle={themed($screen)}
		>
			<HeaderText />

			<KeyboardAvoidingView style={themed($formContainer)}>
				<LoginForm.Root email={email}>
					<View style={{ gap: spacing.xl + spacing.xxs }}>
						<LoginForm.Email />
						<LoginForm.Info />
					</View>

					<LoginForm.Actions>
						<LoginForm.Submit />
					</LoginForm.Actions>
				</LoginForm.Root>
			</KeyboardAvoidingView>

			<FooterText />
		</Screen>
	);
}

const $formContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	flex: 1,
	margin: spacing.lg,
	gap: spacing.md,
});

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	paddingHorizontal: spacing.lg,
	paddingTop: spacing.xl,
});

const $screen: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	...$styles.flex1,
	paddingBottom: spacing.sm,
});

const FooterText = () => {
	const { themed } = useAppTheme();

	const { TERMS, POLICY } = envs.META_URLS;

	return (
		<Text
			entering={makeSpringy(FadeInDown)}
			exiting={makeSpringy(FadeOutDown)}
			preset="default"
			size="xs"
			style={themed($footerText)}
		>
			By continuing, you agree to our{" "}
			<Link href={TERMS} style={styles.underline}>
				Terms of Service
			</Link>{" "}
			&{" "}
			<Link href={POLICY} style={styles.underline}>
				Privacy Policy
			</Link>
		</Text>
	);
};

const HeaderText = () => {
	const { themed } = useAppTheme();

	return (
		<Animated.View style={themed($topContainer)}>
			<Text
				entering={FadeInUp}
				exiting={FadeOutUp}
				preset="bold"
				size="xxl"
				style={styles.centeredText}
			>
				Welcome to{" "}
				<Text preset="bold" size="xxl" style={themed($tintedText)}>
					{APP.NAME}
				</Text>
			</Text>

			<Text style={styles.centeredText}>{APP.DESC}</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	underline: { textDecorationLine: "underline" },
	centeredText: {
		textAlign: "center",
	},
});

const $footerText: ThemedTextStyle = ({ spacing, colors }) => ({
	textAlign: "center",
	color: colors.textDim,
	paddingInline: spacing.md,
});

const $tintedText: ThemedTextStyle = ({ colors }) => ({
	textAlign: "center",
	color: colors.tint,
});
