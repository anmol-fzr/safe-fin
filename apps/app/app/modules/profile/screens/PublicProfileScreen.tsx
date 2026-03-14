import { Link } from "expo-router";
import { Edit } from "iconsax-react-nativejs";
import { createContext, useMemo } from "react";
import { View } from "react-native";
import { FadeInUp } from "react-native-reanimated";
import { PressableIcon, Screen, Text } from "@/components";
import { useAuthStore } from "@/modules/auth/store";
import { ActivityHeatmap } from "@/modules/profile/components/activity-heatmap";
import { PublicProfileLinks } from "@/modules/profile/components/public-profile/links/PublicProfileLinks";
import { useGetPublicProfile } from "@/modules/profile/hooks/queries";
import { ellipsize, useSafeContext } from "@/pkg/ui";
import { $styles } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { ProfileForm } from "../components";
import { PublicProfileStats } from "../components/public-profile/PublicProfileStats";

const PublicProfileScreenContext = createContext({ isMyProfile: false });

export const usePublicProfileScreenContext = () => {
	return useSafeContext(
		PublicProfileScreenContext,
		"PublicProfileScreenContext",
	);
};

export function PublicProfileScreen() {
	const userId = useAuthStore((state) => state.user.id!);

	const { data } = useGetPublicProfile();
	const { user, profile, activity } = data;

	const stats = useMemo(
		() => [
			{
				title: "Current Streak",
				count: user.streak?.current ?? 0,
			},
			{
				title: "Maximum Streak",
				count: user.streak?.maximum ?? 0,
			},
			{
				title: "Courses Completed",
				count: profile.courses,
			},
			{
				title: "Total PX",
				count: profile.totalPX,
			},
		],
		[user, profile],
	);

	const {
		theme: { colors, spacing },
	} = useAppTheme();
	const isMyProfile = user.id === userId;
	return (
		<Screen
			preset="scroll"
			style={[
				$styles.container,
				{
					gap: spacing.xxl,
				},
			]}
		>
			<PublicProfileScreenContext.Provider value={{ isMyProfile }}>
				<View style={{ gap: spacing.lg }}>
					<View
						style={{
							borderBottomColor: colors.border,
							alignItems: "center",
							paddingTop: 0,
						}}
					>
						<View
							style={{
								width: 100,
								height: 100,
								margin: "auto",
								borderRadius: 50,
								backgroundColor: colors.palette.neutral200,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<ProfileForm.Avatar imageUri={user.image} />
						</View>

						{user.name && (
							<Text
								size="xxl"
								weight="medium"
								entering={FadeInUp}
								numberOfLines={1}
							>
								{ellipsize(user.name, 15)}
							</Text>
						)}

						{user.bio && (
							<Text
								entering={FadeInUp}
								style={{
									textAlign: "center",
									paddingInline: spacing.md,
									color: colors.textDim,
								}}
							>
								{ellipsize(user.bio, 100)}
							</Text>
						)}

						{isMyProfile && (
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
						)}
					</View>

					<PublicProfileStats stats={stats} />
					<PublicProfileLinks links={user.links} />
					<ActivityHeatmap activity={activity} />
				</View>
			</PublicProfileScreenContext.Provider>
		</Screen>
	);
}
