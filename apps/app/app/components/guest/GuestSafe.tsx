import type { PropsWithChildren } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, Text } from "@/components";
import { useToggle } from "@/hooks";
import { LoginForm } from "@/modules/auth/components";
import { useIsGuestUser } from "@/modules/auth/hooks/use-guest-login";
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
					<Text size="lg" style={styles.guardMessage}>
						{message}
					</Text>
					<Button onPress={onOpen}>Login</Button>
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
								<LoginForm hideGuestLogin />
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
