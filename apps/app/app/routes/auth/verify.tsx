import { memo } from "react";
import { View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import Animated from "react-native-reanimated";
import { z } from "zod";
import { Screen, Text } from "@/components";
import { RoundBackIcon } from "@/components/navigation/RoundBackIcon";
import { createRoute } from "@/factory/route";
import { VerifyForm } from "@/modules/auth/components";
import { $styles, type ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

const { useParams } = createRoute({
	paramSchema: z.object({ email: z.email() }),
});

export default function VerifyScreen() {
	const { email } = useParams();

	const { themed } = useAppTheme();

	return (
		<Screen
			preset="fixed"
			safeAreaEdges={["top", "bottom"]}
			contentContainerStyle={$styles.flex1}
		>
			<RoundBackIcon
				href={{
					pathname: "/auth/login",
					params: {
						email,
					},
				}}
			/>

			<HeaderText email={email} />

			<KeyboardAvoidingView style={themed($formContainer)}>
				<VerifyForm.Root email={email}>
					<Animated.View style={{ flex: 1 }}>
						<VerifyForm.Otp />
						<VerifyForm.OtpInfo />

						<VerifyForm.Actions>
							<VerifyForm.Submit />
						</VerifyForm.Actions>
					</Animated.View>
				</VerifyForm.Root>
			</KeyboardAvoidingView>
		</Screen>
	);
}

const $formContainer: ThemedViewStyle = ({ spacing }) => ({
	flex: 1,
	margin: spacing.lg,
	marginBottom: 0,
	gap: spacing.md,
});

const $topContainer: ThemedViewStyle = ({ spacing }) => ({
	paddingHorizontal: spacing.lg,
	paddingTop: spacing.xl,
});

interface HeaderTextProps {
	email: string;
}

const HeaderText = memo((props: HeaderTextProps) => {
	const { email } = props;

	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	return (
		<View style={themed($topContainer)}>
			<Text preset="bold" size="xl">
				Enter a 6-digit code
			</Text>

			<Text preset="default" size="xs">
				We Sent a OTP to your email
				<Text style={{ color: colors.tint }} size="xs">
					{" "}
					{email}
				</Text>
			</Text>
		</View>
	);
});
