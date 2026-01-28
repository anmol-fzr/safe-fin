import { memo } from "react";
import type { TextStyle } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeSpringy, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Text } from "@/components";
import { useAuthStore } from "@/modules/auth/store";
import { IconSax } from "@/context/IconContext";
import { Flash } from "iconsax-react-nativejs";
import { useToggle } from "@safe-fin/ui/hooks";
import { PressableScale } from "pressto";

export const HomeHeader = memo(() => {
	const {
		themed,
		theme: { colors, spacing },
	} = useAppTheme();
	const { top } = useSafeAreaInsets();

	const name = useAuthStore((state) => state.user?.name ?? "User");

	const {
		isOpen: isStreakSheetOpen,
		onOpen: openStreakSheet,
		onClose: closeStreakSheet,
		onToggle: toggleStreakSheet,
	} = useToggle();

	return (
		<Animated.View
			style={{
				elevation: 1,
				marginTop: top,
				paddingInline: spacing.sm,
				backgroundColor: colors.background,
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Text
				preset="heading"
				style={themed($title)}
				entering={makeSpringy(FadeInUp)}
				exiting={FadeOutDown.duration(50)}
				text={`Welcome ${name}`}
			/>

			<PressableScale
				onPress={toggleStreakSheet}
				style={{
					padding: 4,
					borderRadius: 8,
				}}
			>
				<IconSax icon={Flash} variant={isStreakSheetOpen ? "Bold" : "Linear"} />
			</PressableScale>
		</Animated.View>
	);
});

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
	marginBottom: spacing.xxxs,
});
