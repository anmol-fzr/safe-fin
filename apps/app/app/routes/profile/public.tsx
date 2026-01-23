import { Screen, Text, TextProps } from "@/components";
import { UserDetailsCard } from "@/modules/account/screens";
import { $styles, roundness, spacing } from "@/theme";
import { PublicProfileLinksCard } from "@/modules/profile/components/PublicProfileLinksCard";
import { ActivityHeatmap } from "@/modules/profile/components/activity-heatmap";
import { View } from "react-native";
import { IconSax } from "@/context/IconContext";
import { useAppTheme } from "@/utils/useAppTheme";
import React, { ReactNode } from "react";
import { Flashy } from "iconsax-react-nativejs";

export default function PublicProfileScreen() {
	const {
		theme: { colors, roundness },
	} = useAppTheme();

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

				<PublicProfileLinksCard />

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
