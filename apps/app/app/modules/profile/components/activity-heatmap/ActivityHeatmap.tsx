import { View, ScrollView, Pressable } from "react-native";
import { Text } from "@/components";
import Animated, {
	FadeIn,
	FadeInUp,
	FadeOut,
	FadeOutDown,
	FadingTransition,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useDerivedValue,
	withSpring,
} from "react-native-reanimated";
import { useAppTheme } from "@/utils/useAppTheme";
import {
	Dispatch,
	memo,
	SetStateAction,
	useCallback,
	useMemo,
	useState,
} from "react";
import { Section } from "@/components/Section";
import { IconSax } from "@/context/IconContext";
import { Activity } from "iconsax-react-nativejs";
import { ANIMATION, colors, getSpringConfig, spacing } from "@/theme";
import { formatDate } from "@safe-fin/utils";
import { getEmptyArr } from "@safe-fin/ui/utils";
import { makeSpringy } from "@/theme";

/* ------------------ Constants ------------------ */

const ROW_COUNT = 7;

/* ------------------ Root ------------------ */
type ActivityRow = {
	date: string;
	totalPxEarned: number;
};

function buildActivity(
	year: number,
	rows: ActivityRow[],
	month?: { from: number; to: number },
): ActivityRow[] {
	const map = new Map<string, ActivityRow>();

	for (const row of rows) {
		const key = row.date.slice(0, 10); // YYYY-MM-DD

		map.set(key, row);
	}

	const result: ActivityRow[] = [];

	const today = new Date();

	const start = new Date(Date.UTC(year, month?.from ?? 0, 1));
	const end = new Date(
		Date.UTC(year, month?.to ?? today.getMonth(), today.getDate()),
	);

	for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
		const key = d.toISOString().slice(0, 10);

		const existing = map.get(key);

		if (existing) {
			result.push(existing);
		} else {
			result.push({
				date: d.toISOString(),
				totalPxEarned: 0,
			});
		}
	}

	return result;
}

interface ActivityHeatmapProps {
	activity: ActivityRow[];
}

export function ActivityHeatmap(props: ActivityHeatmapProps) {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const { activity } = props;

	const activityData = buildActivity(
		2026,
		activity,
		//{ from: 0, to: 0 },
	);

	const activeItem = activeIndex !== null ? activityData[activeIndex] : null;

	return (
		<Section>
			<Section.Header>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center",
						gap: spacing.xs,
					}}
				>
					<IconSax icon={Activity} color={colors.tint} />
					<Section.Title style={{ color: colors.tint }}>
						Recent Activity
					</Section.Title>
				</View>

				<Text size="xs" style={{ color: colors.textDim }}>
					This Year Activity
				</Text>
			</Section.Header>

			<Section.Body preset="filled">
				<View>
					<Heatmap
						activeIndex={activeIndex}
						setActiveIndex={setActiveIndex}
						data={activityData}
					/>

					<Animated.View
						style={{
							marginTop: 8,
						}}
						layout={FadingTransition}
					>
						{activeIndex !== null ? (
							<Animated.View
								style={{ flexDirection: "row", gap: 6 }}
								layout={FadingTransition}
							>
								<Text
									entering={makeSpringy(FadeInUp)}
									exiting={makeSpringy(FadeOutDown)}
									style={{ color: colors.textDim }}
									key={
										activeItem?.totalPxEarned === 0
											? "No"
											: activeItem?.totalPxEarned
									}
								>
									{activeItem?.totalPxEarned === 0
										? "No"
										: activeItem?.totalPxEarned}
								</Text>
								<Text
									entering={makeSpringy(FadeInUp)}
									exiting={makeSpringy(FadeOutDown)}
									style={{ color: colors.textDim }}
								>
									PX Earned
								</Text>

								<Text
									entering={makeSpringy(FadeInUp)}
									exiting={makeSpringy(FadeOutDown)}
									style={{ color: colors.textDim }}
									key={formatDate(activeItem?.date)}
								>
									{formatDate(activeItem?.date)}
								</Text>
							</Animated.View>
						) : (
							<Text
								entering={makeSpringy(FadeIn.delay(100))}
								exiting={makeSpringy(FadeOut.delay(100))}
							>
								Tap any day to see your PX for that day
							</Text>
						)}
					</Animated.View>
					<View style={{ marginTop: 8, alignItems: "flex-end" }}>
						<View
							style={{ flexDirection: "row", gap: 6, alignItems: "flex-end" }}
						>
							<Text style={{ color: colors.textDim }} size="xs">
								Less
							</Text>
							{getEmptyArr(5).map((_, i) => (
								<Animated.View entering={makeSpringy(FadeIn.delay(100 * i))}>
									<DayItem count={500 * i} />
								</Animated.View>
							))}
							<Text style={{ color: colors.textDim }} size="xs">
								More
							</Text>
						</View>
					</View>
				</View>
			</Section.Body>
		</Section>
	);
}

/* ------------------ Heatmap ------------------ */

interface HeatmapProps {
	activeIndex: number | null;
	setActiveIndex: Dispatch<SetStateAction<number | null>>;
	data: ActivityRow[];
}

function Heatmap(props: HeatmapProps) {
	const { activeIndex, setActiveIndex, data } = props;
	const {
		theme: { spacing },
	} = useAppTheme();

	const columnCount = useMemo(() => Math.ceil(data.length / ROW_COUNT), []);

	const onSelect = useCallback(
		(index: number) => {
			setActiveIndex((currIndex) => (currIndex !== index ? index : null));
		},
		[setActiveIndex],
	);

	return (
		<ScrollView
			horizontal
			contentContainerStyle={{
				gap: spacing.xxxs,
			}}
		>
			{Array.from({ length: columnCount }).map((_, col) => (
				<Animated.View
					entering={makeSpringy(FadeIn.delay(50 * col))}
					key={col}
					style={{ gap: spacing.xxxs }}
				>
					{Array.from({ length: ROW_COUNT }).map((_, row) => {
						const index = row + col * ROW_COUNT;
						const item = data[index];
						if (!item) return null;

						return (
							<Animated.View
								entering={makeSpringy(FadeIn.delay(50 * (row + col)))}
								key={item.date}
							>
								<ActivityDayItem
									index={index}
									count={item.totalPxEarned}
									isActive={index === activeIndex}
									onPress={onSelect}
								/>
							</Animated.View>
						);
					})}
				</Animated.View>
			))}
		</ScrollView>
	);
}

/* ------------------ Day Cell ------------------ */

interface ActivityDayItemProps {
	index: number;
	count: number;
	isActive: boolean;
	onPress: (index: number) => void;
}

const ActivityDayItem = memo(
	({ index, count, isActive, onPress }: ActivityDayItemProps) => {
		const handlePress = useCallback(() => {
			onPress(index);
		}, [index, onPress]);

		return (
			<Pressable onPress={handlePress}>
				<DayItem {...{ count, isActive }} />
			</Pressable>
		);
	},
	(prev, next) => prev.isActive === next.isActive && prev.count === next.count,
);

/* ------------------ Utils ------------------ */

function interpolateColorsHelper(
	color1: string,
	color2: string,
	percent: number,
) {
	const r1 = parseInt(color1.substring(1, 3), 16);
	const g1 = parseInt(color1.substring(3, 5), 16);
	const b1 = parseInt(color1.substring(5, 7), 16);

	const r2 = parseInt(color2.substring(1, 3), 16);
	const g2 = parseInt(color2.substring(3, 5), 16);
	const b2 = parseInt(color2.substring(5, 7), 16);

	const r = Math.round(r1 + (r2 - r1) * percent);
	const g = Math.round(g1 + (g2 - g1) * percent);
	const b = Math.round(b1 + (b2 - b1) * percent);

	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

type DayItemProps = {
	count: number;
	isActive?: boolean;
};

const DayItem = memo(({ count, isActive = false }: DayItemProps) => {
	const {
		theme: { colors, roundness },
	} = useAppTheme();

	const intensity = Math.min(count / 2000);

	const springConfig = getSpringConfig(ANIMATION.effects.default);

	const progress = useDerivedValue(() => {
		return withSpring(isActive ? 1 : 0, springConfig);
	}, [isActive]);

	const rStyle = useAnimatedStyle(() => {
		return {
			borderRadius: interpolate(progress.value, [0, 1], [2, roundness]),
			borderColor: interpolateColor(
				progress.value,
				[0, 1],
				["transparent", colors.palette.primary600],
			),
		};
	});

	return (
		<Animated.View
			entering={makeSpringy(FadeIn)}
			exiting={makeSpringy(FadeOut)}
			style={[
				{
					width: 30,
					aspectRatio: 1,
					borderWidth: 1,
					backgroundColor: interpolateColorsHelper(
						colors.palette.neutral100,
						colors.palette.primary600,
						intensity,
					),
				},
				rStyle, // Apply the animated styles
			]}
		/>
	);
});
