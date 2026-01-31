import { ListView, Text } from "@/components";
import { View } from "react-native";
import { IconSax } from "@/context/IconContext";
import { TickCircle } from "iconsax-react-nativejs";
import { useAppTheme } from "@/utils/useAppTheme";
import { Section } from "@/components/Section";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

const stats = [
	{
		label: "Days",
		value: 22,
	},
	{
		label: "Courses",
		value: 36,
	},
	{
		label: "Quizzes",
		value: 18,
	},
];

const weekData = [
	{
		day: "Monday",
		date: 25,
		isCheck: true,
	},
	{
		day: "Tuesday",
		date: 26,
		isCheck: true,
	},
	{
		day: "Wednsday",
		date: 27,
		isCheck: true,
	},
	{
		day: "Thursday",
		date: 28,
		isCheck: true,
	},
	{
		day: "Friday",
		date: 29,
		isCheck: true,
	},
	{
		day: "Saturday",
		date: 30,
		isCheck: false,
	},
	{
		day: "Sunday",
		date: 31,
		isCheck: false,
	},
];

export function StreakSheetView() {
	const {
		theme: { spacing, colors, roundness },
	} = useAppTheme();

	return (
		<>
			<View
				style={{
					width: "35%",
					aspectRatio: 1,
					borderWidth: 1,
					borderColor: colors.tint,
					backgroundColor: colors.palette.primary100,
					borderRadius: 100,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text
					size="xxl"
					weight="bold"
					style={{
						color: colors.tint,
					}}
				>
					{weekData.filter((day) => day.isCheck).length}
				</Text>
			</View>
			<View>
				<Text
					size="xxl"
					weight="bold"
					style={{ textAlign: "center" }}
					entering={FadeInUp}
				>
					Week Streak
				</Text>

				<Text>You are doing really great, Anmol!</Text>
			</View>

			<View style={{ width: "80%", gap: 24 }}>
				<View>
					<ListView
						data={weekData}
						horizontal
						showsHorizontalScrollIndicator={false}
						keyExtractor={(item) => item.day}
						contentContainerStyle={{ gap: spacing.md }}
						style={{ width: "100%" }}
						renderItem={({ item, index }) => (
							<Animated.View
								entering={FadeIn.delay(50 * index)}
								style={{
									alignItems: "center",
									gap: spacing.xs,
								}}
							>
								<Text style={{ color: colors.textDim }} weight="medium">
									{item.day.at(0)}
								</Text>
								{item.isCheck ? (
									<IconSax
										icon={TickCircle}
										color={colors.tint}
										size={32}
										variant="Bold"
									/>
								) : (
									<View
										style={{
											height: 32,
											aspectRatio: 1,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Text weight="semiBold">{item.date}</Text>
									</View>
								)}
							</Animated.View>
						)}
					/>
				</View>

				<Section
					style={{
						backgroundColor: colors.palette.neutral200,
						width: "100%",
						borderRadius: roundness * 1.25,
						padding: spacing.sm,
					}}
				>
					<Section.Title
						style={{ marginInline: "auto", color: colors.textDim }}
						size="sm"
					>
						Your Stats
					</Section.Title>
					<Section.Body
						style={{
							flex: 1,
							width: "100%",
							backgroundColor: colors.palette.neutral100,
							borderRadius: roundness,
						}}
						preset="filled"
					>
						<View style={{ flex: 1, width: "100%" }}>
							<ListView
								data={stats}
								keyExtractor={(stat) => stat.label}
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={{
									gap: spacing.md,
									paddingInline: spacing.xs,
								}}
								renderItem={({ item }) => (
									<View
										style={{
											alignItems: "center",
											width: 65,
											gap: 2,
										}}
									>
										<Text style={{ color: colors.textDim }}>{item.label}</Text>
										<Text weight="medium">{item.value}</Text>
									</View>
								)}
							/>
						</View>
					</Section.Body>
				</Section>
			</View>
		</>
	);
}
