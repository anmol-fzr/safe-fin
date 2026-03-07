import { getEmptyArr } from "@safe-fin/ui/utils";
import { formatDate, getDay, getMonth } from "@safe-fin/utils";
import {
	type Dispatch,
	memo,
	type SetStateAction,
	useCallback,
	useMemo,
	useState,
} from "react";
import { Pressable, ScrollView, View, type ViewProps } from "react-native";
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
import { Text } from "@/components";
import { Section } from "@/components/Section";
import { ANIMATION, getSpringConfig, makeSpringy, spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

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
	activity: {
		year: ActivityRow[];
		month: ActivityRow[];
	};
}

export function ActivityHeatmap(props: ActivityHeatmapProps) {
	const [curr, setCurr] = useState<"year" | "month">("year");
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const { activity } = props;

	const monthIndx = new Date().getMonth();

	const activityData = buildActivity(
		2026,
		activity[curr],
		curr === "year"
			? undefined
			: {
					from: monthIndx,
					to: monthIndx,
				},
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
					<Section.Title>Recent Activity</Section.Title>
				</View>

				<Pressable
					onPress={() => setCurr((c) => (c === "year" ? "month" : "year"))}
				>
					<Text size="xs" color="dim" style={{ textTransform: "capitalize" }}>
						This {curr} Activity
					</Text>
				</Pressable>
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
									color="dim"
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
									color="dim"
								>
									PX Earned
								</Text>

								<Text
									entering={makeSpringy(FadeInUp)}
									exiting={makeSpringy(FadeOutDown)}
									color="dim"
									key={formatDate(activeItem?.date)}
								>
									{formatDate(activeItem?.date)}
								</Text>
							</Animated.View>
						) : (
							<Text
								entering={makeSpringy(FadeIn).delay(100)}
								exiting={makeSpringy(FadeOut).delay(100)}
								color="dim"
							>
								Tap any day to see your PX for that day
							</Text>
						)}
					</Animated.View>
					<View style={{ marginTop: 8, alignItems: "flex-end" }}>
						<View
							style={{ flexDirection: "row", gap: 6, alignItems: "flex-end" }}
						>
							<Text color="dim" size="xs">
								Less
							</Text>
							{getEmptyArr(5).map((i) => (
								<Animated.View
									entering={makeSpringy(FadeIn).delay(100 * i)}
									key={i}
								>
									<DayItem
										count={500 * i}
										style={{ height: 20, aspectRatio: 1 }}
									/>
								</Animated.View>
							))}
							<Text color="dim" size="xs">
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

	const columnCount = useMemo(
		() => Math.ceil(data.length / ROW_COUNT),
		[data.length],
	);

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
			{getEmptyArr(columnCount).map((col, colIndx) => {
				return (
					<Animated.View
						entering={makeSpringy(FadeIn).delay(50 * col)}
						key={col}
						//style={{ gap: spacing.xxxs }}
						style={{
							gap: spacing.xxxs,
						}}
					>
						{getEmptyArr(ROW_COUNT).map((row, rowIndx) => {
							const index = row + col * ROW_COUNT;
							const item = data[index];
							if (!item) return null;

							return (
								<View
									key={`activit-${item.date}`}
									style={{
										paddingTop: rowIndx === 0 ? 30 : 0,
									}}
								>
									{colIndx > 0 && colIndx % 4 === 1 && rowIndx === 0 && (
										<Text
											style={{
												position: "absolute",
												flex: 1,
												width: 4 * 30,
											}}
										>
											{getMonth(data[index].date)}
										</Text>
									)}
									<Animated.View
										entering={makeSpringy(FadeIn).delay(50 * (row + col))}
										style={{
											maxWidth: 30,
											paddingLeft: colIndx === 0 ? 96 : 30,
										}}
									>
										<Text
											style={{
												position: "absolute",
												minWidth: 30 * 3,
											}}
										>
											{colIndx === 0 ? getDay(data[row].date) : ""}
										</Text>
										{/*
									<Text
										//style={{ overflow: "visible" }}
										style={{
											position: "absolute",
											minWidth: 30 * 3,
										}}
									>
										{rowIndx % 30 === 0 ? getMonth(data[index].date) : ""}
									</Text>
                  */}
										<ActivityDayItem
											index={index}
											count={item.totalPxEarned}
											isActive={index === activeIndex}
											onPress={onSelect}
										/>
									</Animated.View>
								</View>
							);
						})}
					</Animated.View>
				);
			})}
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

	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

type DayItemProps = {
	count: number;
	isActive?: boolean;
	style?: ViewProps["style"];
};

const DayItem = memo((props: DayItemProps) => {
	const { count, isActive = false, style } = props;

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
						colors.palette.primary100,
						colors.palette.primary600,
						intensity,
					),
				},
				rStyle, // Apply the animated styles
				style,
			]}
		/>
	);
});
