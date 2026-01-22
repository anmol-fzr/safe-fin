import type { PropsWithChildren } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";
import { Button, Text } from "@/components";
import { useToggle } from "@/hooks";
import { LoginForm } from "@/modules/auth/components";
import { useIsGuestUser } from "@/modules/auth/hooks/use-guest-login";
import { makeSpringy } from "@/theme";
import { getGuestMessage } from "@/utils/faker/guest";
import { useAppTheme } from "@/utils/useAppTheme";

export const GuestSafe = (props: PropsWithChildren) => {
	const isGuest = useIsGuestUser();
	const theme = useAppTheme();
	const { isOpen, onOpen, onClose } = useToggle();

	if (isGuest) {
		const message = getGuestMessage();

		const {
			theme: { spacing, roundness },
		} = theme;

		return (
			<View style={styles.guardRoot}>
				<View
					style={[
						styles.guardView,
						{
							gap: spacing.md,
							padding: spacing.md,
							borderRadius: roundness,
						},
					]}
				>
					<Text
						key={message}
						entering={makeSpringy(FadeIn)}
						exiting={makeSpringy(FadeOut)}
						size="lg"
						style={styles.guardMessage}
					>
						{message}
					</Text>
					<Animated.View entering={makeSpringy(FadeInDown)}>
						<Button onPress={onOpen}>Login</Button>
					</Animated.View>
					<Modal
						visible={isOpen}
						animationType="slide"
						onRequestClose={onClose}
						style={{
							height: 240,
						}}
					>
						<View style={{ gap: spacing.md, padding: spacing.xs }}>
							<Text preset="heading">Login</Text>
							<View>
								<LoginForm.Root>
									<LoginForm.PhoneNumber />
									<LoginForm.Otp />

									<LoginForm.Submit />
								</LoginForm.Root>
							</View>
							<Button onPress={onClose}>Close</Button>
						</View>
					</Modal>
				</View>
			</View>
		);
	}

	return props.children;
};

const styles = StyleSheet.create({
	guardRoot: {
		display: "flex",
		flex: 1,
		minHeight: 200,
	},
	guardView: {
		flex: 1,
		justifyContent: "center",
	},
	guardMessage: {
		textAlign: "center",
		zIndex: 11,
		color: "black",
	},
});
