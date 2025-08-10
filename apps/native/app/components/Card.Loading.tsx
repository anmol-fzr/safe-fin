import { Fragment } from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useAppTheme } from "@/utils/useAppTheme";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import type { CardProps } from "./Card";
import { $cardContainerPresets } from "./Card";

type Presets = CardProps["preset"];

type LoadingCardProps = Pick<
	CardProps,
	"verticalAlignment" | "preset" | "style"
>;

export function LoadingCard(props: LoadingCardProps) {
	const { verticalAlignment = "top", style: $containerStyleOverride } = props;

	const {
		themed,
		theme: { spacing },
	} = useAppTheme();

	const preset: Presets = props.preset ?? "default";

	const HeaderContentWrapper =
		verticalAlignment === "force-footer-bottom" ? View : Fragment;

	const $containerStyle: StyleProp<ViewStyle> = [
		themed($cardContainerPresets[preset]),
		$containerStyleOverride,
	];

	return (
		<View style={$containerStyle}>
			<SkeletonPlaceholder>
				<HeaderContentWrapper>
					<SkeletonPlaceholder.Item
						width={250}
						height={24}
						borderRadius={5}
						style={{ marginBottom: spacing.sm }}
					/>
					<SkeletonPlaceholder.Item width={325} height={24} borderRadius={5} />
				</HeaderContentWrapper>
			</SkeletonPlaceholder>
		</View>
	);
}
