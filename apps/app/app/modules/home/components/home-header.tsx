import { memo, useCallback, useRef } from "react";
import { StyleSheet, type TextStyle } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeSpringy, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Text } from "@/components";
import { useAuthStore } from "@/modules/auth/store";
import { IconSax } from "@/context/IconContext";
import { Flash } from "iconsax-react-nativejs";
import { useToggle } from "@/pkg/ui";
import { PressableScale } from "pressto";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { create } from "zustand";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type StreakStore = {
	isOpen: boolean;
	toggle: VoidFunction;
};

export const useStreakStore = create<StreakStore>()(
	persist(
		immer((set, get) => ({
			isOpen: false,

			toggle: () => {
				set({ isOpen: !get().isOpen });
			},
		})),
		{ name: "streak-store", storage: createJSONStorage(() => AsyncStorage) },
	),
);

export const HomeHeader = memo(() => {
	const {
		themed,
		theme: { colors, spacing },
	} = useAppTheme();
	const { top } = useSafeAreaInsets();

	const name = useAuthStore((state) => state.user?.name ?? "User");

	const { isOpen: isStreakSheetOpen, toggle: toggleStreakSheet } =
		useStreakStore();

	// const {
	// 	isOpen: isStreakSheetOpen,
	// 	onOpen: openStreakSheet,
	// 	onClose: closeStreakSheet,
	// 	onToggle: toggleStreakSheet,
	// } = useToggle();

	const bottomSheetRef = useRef<BottomSheet>(null);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

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

			<BottomSheet ref={bottomSheetRef} index={-1}>
				<BottomSheetView style={styles.contentContainer}>
					<Text>Awesome 🎉</Text>
				</BottomSheetView>
			</BottomSheet>
		</Animated.View>
	);
});

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
	marginBottom: spacing.xxxs,
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "grey",
	},
	contentContainer: {
		flex: 1,
		padding: 36,
		alignItems: "center",
	},
});
