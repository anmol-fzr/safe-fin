import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import type { Sizes } from "./Text";
import { $sizeStyles } from "./Text";

const heightSizeMap = new Map<Sizes, { height: number }>();

Object.keys($sizeStyles).forEach((key) => {
	heightSizeMap.set(key, { height: $sizeStyles[key]?.lineHeight ?? 16 });
});

type LoadingTextProps = {
	size: Sizes;
};

export const LoadingText = (props: LoadingTextProps) => {
	const { size } = props;
	const { height = 16 } = heightSizeMap.get(size) ?? { height: 16 };

	return (
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item height={height} />
		</SkeletonPlaceholder>
	);
};
