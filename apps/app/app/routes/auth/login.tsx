import { BackHandler, StyleSheet, type ViewStyle } from "react-native";
import Animated, {
	FadeInDown,
	FadeInUp,
	FadeOutDown,
	FadeOutUp,
} from "react-native-reanimated";
import { Screen, Text } from "@/components";
import { LoginForm } from "@/modules/auth/components";
import {
	$styles,
	makeSpringy,
	ThemedTextStyle,
	type ThemedStyle,
} from "@/theme";
import { APP } from "@/utils/const";
import { useAppTheme } from "@/utils/useAppTheme";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { envs } from "@/utils/envs";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { z } from "zod";
import { useTypedLocalSearchParams } from "@/hooks/navigation/useTypedLocalSearchParams";
import { useCallback } from "react";

const useLoginScreenParams = () => {
	const params = useTypedLocalSearchParams(
		z.object({ email: z.string().email().optional() }),
	);
	return params;
};

export default function LoginScreen() {
	const { email } = useLoginScreenParams();

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
		}, []),
	);

	return (
		<Screen
			preset="fixed"
			safeAreaEdges={["top", "bottom"]}
			contentContainerStyle={themed($screen)}
		>
			<HeaderText />

			<KeyboardAvoidingView style={themed($formContainer)}>
				<LoginForm.Root email={email}>
					<LoginForm.Email />
					<LoginForm.Info />

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
	marginTop: 0,
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
