import { Screen, Text } from "@/components";
import { UserDetailsCard } from "@/modules/account/screens";
import { $styles, spacing } from "@/theme";
import { ActivityHeatmap } from "@/modules/profile/components/activity-heatmap";
import { View } from "react-native";
import { useAppTheme } from "@/utils/useAppTheme";
import React, { ReactNode } from "react";
import { FadeInDown, FadeInLeft, FadeInUp } from "react-native-reanimated";
import { useGetPublicProfile } from "@/modules/profile/hooks/queries";

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

	return (
		<Screen preset="scroll" style={[$styles.container, { gap: 48 }]}>
			<View style={{ gap: 24 }}>
				<UserDetailsCard {...user} />
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-evenly",
						gap: spacing.xs,
						margin: "auto",
						flexWrap: "wrap",
					}}
				>
					{streaks.map((streak) => (
						<Streak title={streak.count} desc={streak.title} />
					))}
				</View>

				{/*
				<PublicProfileLinksCard />
        */}

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
				backgroundColor: colors.palette.neutral200,
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
