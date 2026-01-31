import { Screen, Text } from "@/components";
import { UserDetailsCard } from "@/modules/account/screens";
import { $styles, spacing } from "@/theme";
import { ActivityHeatmap } from "@/modules/profile/components/activity-heatmap";
import { View } from "react-native";
import { useAppTheme } from "@/utils/useAppTheme";
import React, { ReactNode } from "react";
import { useAuthStore } from "@/modules/auth/store";

export default function PublicProfileScreen() {
	const image = useAuthStore((state) => state.user?.image);
	console.log({ image });
	return (
		<Screen preset="scroll" style={[$styles.container, { gap: 48 }]}>
			<View style={{ gap: 24 }}>
				<UserDetailsCard />
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-evenly",
						gap: spacing.xs,
						margin: "auto",
						flexWrap: "wrap",
					}}
				>
					<Streak title="12" desc="Current Streak" />
					<Streak title="30" desc="Maximum Streak" />
					<Streak title="8" desc="Courses Completed" />
					<Streak title="1400" desc="Total PX" />
				</View>

				{/*
				<PublicProfileLinksCard />
        */}

				<ActivityHeatmap />
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
			<Text size="lg" weight="semiBold">
				{title}
			</Text>
			<Text style={{ color: colors.textDim }} size="xs">
				{desc}
			</Text>
		</View>
	);
};
