import { User } from "iconsax-react-nativejs";
import type { ReactNode } from "react";
import { View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Screen, Text } from "@/components";
import { IconSax } from "@/context/IconContext";
import { ActivityHeatmap } from "@/modules/profile/components/activity-heatmap";
import { PublicProfileLinksCard } from "@/modules/profile/components/PublicProfileLinksCard";
import { useGetPublicProfile } from "@/modules/profile/hooks/queries";
import { ellipsize } from "@/pkg/ui";
import { $styles } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export default function PublicProfileScreen() {
	const { data } = useGetPublicProfile();
	const { user, profile, activity } = data;

	const streaks = [
		{
			title: "Current Streak",
			count: profile.currentStreak,
		},
		{
			title: "Maximum Streak",
			count: profile.maxStreak,
		},

		{
			title: "Courses Completed",
			count: profile.courses,
		},

		{
			title: "Total PX",
			count: profile.totalPX,
		},
	];

	const {
		theme: { colors, spacing },
	} = useAppTheme();
	return (
		<Screen preset="scroll" style={[$styles.container, { gap: spacing.xxl }]}>
			<View style={{ gap: spacing.lg }}>
				<View
					style={{
						//flexDirection: "row",
						//padding: spacing.sm,
						//borderBottomWidth: StyleSheet.hairlineWidth,
						borderBottomColor: colors.border,
						//backgroundColor: "red",
						alignItems: "center",
						paddingTop: 0,
					}}
				>
					{user.image ? (
						<Animated.Image
							entering={FadeInDown}
							height={100}
							width={100}
							style={{
								borderRadius: 100,
							}}
							source={{
								uri: user.image,
							}}
						/>
					) : (
						<IconSax
							icon={User}
							size={40}
							style={{
								borderRadius: 100,
								height: 100,
								width: 100,
							}}
						/>
					)}
					<Text
						size="xxl"
						weight="medium"
						entering={FadeInUp}
						numberOfLines={1}
					>
						{ellipsize(user.name, 15)}
					</Text>

					{/*
      <Link href="/profile/edit" asChild>
        <PressableIcon
          icon={Edit}
          size={20}
          style={{
            position: "absolute",
            top: 0,
            right: 8,
          }}
        />
      </Link>
      */}
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-evenly",
						//gap: spacing.xs,
						//margin: "auto",
						flexWrap: "wrap",
					}}
				>
					{streaks.map((streak) => (
						<Streak title={streak.count} desc={streak.title} />
					))}
				</View>

				<PublicProfileLinksCard />

				<ActivityHeatmap activity={activity} />
			</View>
		</Screen>
	);
}

interface StreakProps {
	title: ReactNode;
	desc: ReactNode;
}

const Streak = (props: StreakProps) => {
	const { title, desc } = props;

	const {
		theme: { colors, roundness, spacing },
	} = useAppTheme();

	return (
		<View
			style={{
				minWidth: 150,
				//backgroundColor: colors.palette.neutral200,
				borderRadius: roundness,
				padding: spacing.sm,
				alignItems: "center",
			}}
		>
			<Text size="lg" weight="semiBold" entering={FadeInUp}>
				{title}
			</Text>
			<Text style={{ color: colors.textDim }} size="xs" entering={FadeInUp}>
				{desc}
			</Text>
		</View>
	);
};
