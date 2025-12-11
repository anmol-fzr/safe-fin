import { Link } from "@react-navigation/native";
import {
	Bank as BookUserIcon,
	Logout as LogOutIcon,
	User as UserIcon,
	WalletMoney as WalletIcon,
} from "iconsax-react-nativejs";
import { View } from "react-native";
import { Button, Icon, ListView, Screen, Text } from "@/components";
import { IconSax } from "@/context/IconContext";
import { useIsGuestUser } from "@/modules/auth/hooks/use-guest-login";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { MoreLinks } from "@/screens";
import { colors, spacing } from "@/theme";
import { envs } from "@/utils/envs";

//: { title: string; screen: ProfileScreenKey }[]

const linkItems = [
	{
		title: "User Profile",
		Icon: UserIcon,
		desc: "Name, Phone number",
		screen: "UserProfile",
	},
	{
		title: "Demographics",
		Icon: WalletIcon,
		desc: "Address, Occupation etc.",
		screen: "DemoGraphics",
	},
	{
		title: "Financial Details",
		Icon: BookUserIcon,
		desc: "Income, Spending Habits etc.",
		screen: "FinancialDetails",
	},
	{
		title: "Account",
		Icon: UserIcon,
		desc: "Session, Phone Number etc...",
		screen: "Account",
	},
];

if (envs.isDev) {
	linkItems.push({
		title: "Debug Screen",
		Icon: () => <Icon icon="debug" />,
		desc: "App Id, Build Id, Versions",
		screen: "Debug",
	});
}

export const ProfileIndexScreen = () => {
	const isGuest = useIsGuestUser();
	const { handleLogout } = useAuth();

	return (
		<Screen
			preset="scroll"
			style={{ paddingTop: spacing.md }}
			safeAreaEdges={["bottom"]}
		>
			<View style={{ flex: 1, paddingInline: spacing.sm, paddingBottom: 64 }}>
				<ListView
					data={linkItems}
					keyExtractor={(item) => item.title}
					estimatedItemSize={29}
					renderItem={({ item }) => {
						const { title, desc, Icon, screen } = item;
						return (
							<Link
								screen={screen}
								style={{
									marginBottom: 16,
									paddingBottom: 12,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										gap: 12,
										alignItems: "center",
									}}
								>
									<IconSax icon={Icon} />
									<View>
										<Text size="lg" weight="medium">
											{title}
										</Text>
										<Text
											size="xs"
											style={{ color: colors.palette.neutral600 }}
										>
											{desc}
										</Text>
									</View>
								</View>
							</Link>
						);
					}}
				/>
				<MoreLinks />
				{isGuest && (
					<Button
						tx="common:logOutAsGuest"
						onPress={handleLogout}
						preset="reversed"
						style={{
							marginBlock: 24,
						}}
						RightAccessory={() => (
							<LogOutIcon style={{ marginLeft: 12 }} size={20} color="#fff" />
						)}
					/>
				)}
			</View>
		</Screen>
	);
};
