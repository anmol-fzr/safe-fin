import { type Href, Link } from "expo-router";
import {
	Bank as BookUserIcon,
	DocumentText1,
	type Icon as IconType,
	InfoCircle as Info,
	Logout,
	Message as Mail,
	Share as Share2,
	Star1 as Star,
	User as UserIcon,
	WalletMoney as WalletIcon,
} from "iconsax-react-nativejs";
import { Linking, Platform, Pressable, Share, View } from "react-native";
import { Button, Icon, Screen, Text } from "@/components";
import { IconSax } from "@/context/IconContext";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { ThemeSwitcher } from "@/modules/settings/component/ThemeSwitcher";
import { colors, spacing } from "@/theme";
import { APP } from "@/utils/const";
import { envs } from "@/utils/envs";

// --- Types ---
type BaseItem = {
	title: string;
	desc?: string;
	icon: IconType;
};

type NavigationItem = BaseItem & {
	href: Href;
};

type ActionItem = BaseItem & {
	href?: string; // External URL
	action?: VoidFunction | Promise<void>;
};

// --- Data Configuration ---
const { ABOUT, TERMS, POLICY, SUPPORT, APPSTORE, PLAYSTORE, GITHUB } =
	envs.META_URLS;

async function handleShareApp() {
	try {
		await Share.share(
			{
				message: `✨ Try Our App!
Discover amazing things! Download it now for free:

Android: ${PLAYSTORE}
iOS: ${APPSTORE}
Github: ${GITHUB}
`,
			},
			{ dialogTitle: `${APP.NAME} | ${APP.DESC}` },
		);
	} catch (error: any) {
		console.error(error);
	}
}

async function handleRateApp() {
	const url = Platform.select({
		ios: APPSTORE,
		android: PLAYSTORE,
		default: PLAYSTORE,
	});
	Linking.openURL(url);
}

// 1. Internal Routes
const accountItems: NavigationItem[] = [
	{
		title: "User Profile",
		icon: UserIcon,
		desc: "Name, Phone number ...",
		href: "/tabs/profile/user-profile",
	},
	{
		title: "Demographics",
		icon: WalletIcon,
		desc: "Address, Occupation etc.",
		href: "/tabs/profile/demographics",
	},
	{
		title: "Financial Details",
		icon: BookUserIcon,
		desc: "Income, Spending Habits etc.",
		href: "/tabs/profile/financials",
	},
	{
		title: "Account",
		icon: UserIcon,
		desc: "Session, Delete Account etc...",
		href: "/tabs/profile/account",
	},
];

if (envs.isDev) {
	accountItems.push({
		title: "Debug Screen",
		icon: () => <Icon icon="debug" />,
		desc: "App Id, Build Id, Versions",
		href: "/tabs/profile/debug" as Href,
	});
}

// 2. External Actions/Links
const appInfoItems: ActionItem[] = [
	{ title: "About Us", icon: Info, href: ABOUT },
	{ title: "Share the app", icon: Share2, action: handleShareApp },
	{ title: "Rate the app", icon: Star, action: handleRateApp },
	{ title: "Support", icon: Mail, href: SUPPORT },
	{ title: "Terms of Service", icon: DocumentText1, href: TERMS },
	{ title: "Privacy Policy", icon: DocumentText1, href: POLICY },
];

// --- Helper Components ---

// Shared UI for the row content
const ItemContent = ({
	icon,
	title,
	desc,
}: {
	icon: IconType;
	title: string;
	desc?: string;
}) => (
	<View
		style={{
			flexDirection: "row",
			gap: 12,
			alignItems: "center",
			paddingBottom: 12,
			paddingLeft: 12,
		}}
	>
		<IconSax icon={icon} />
		<View>
			<Text size="lg" weight="medium">
				{title}
			</Text>
			{desc && (
				<Text size="xs" style={{ color: colors.textDim }}>
					{desc}
				</Text>
			)}
		</View>
	</View>
);

const SectionHeader = ({ title }: { title: string }) => (
	<Text preset="subheading" size="xl" style={{ marginBottom: spacing.sm }}>
		{title}
	</Text>
);

// --- Main Screen ---

export const ProfileIndexScreen = () => {
	const isGuest = true;
	const { handleLogout } = useAuth();

	const handleExternalPress = (item: ActionItem) => {
		if (item.href) {
			Linking.openURL(item.href);
		} else if (item.action) {
			item.action();
		}
	};

	return (
		<Screen
			preset="scroll"
			style={{ paddingTop: spacing.md }}
			contentContainerStyle={{
				gap: spacing.xl,
				padding: spacing.xs,
				paddingBottom: spacing.xxxl,
			}}
			safeAreaEdges={["bottom"]}
		>
			<View>
				<SectionHeader title="Account" />
				<View style={{ gap: spacing.sm }}>
					{accountItems.map((item, index) => (
						<Link key={item.title} href={item.href} asChild>
							<Pressable>
								<ItemContent
									icon={item.icon}
									title={item.title}
									desc={item.desc}
								/>
							</Pressable>
						</Link>
					))}
				</View>
			</View>

			<View>
				<SectionHeader title="App Info" />
				<View style={{ gap: spacing.sm }}>
					{appInfoItems.map((item, index) => (
						<Pressable
							key={item.title}
							onPress={() => handleExternalPress(item)}
						>
							<ItemContent
								icon={item.icon}
								title={item.title}
								desc={item.desc}
							/>
						</Pressable>
					))}
				</View>
			</View>

			<ThemeSwitcher />

			{isGuest && (
				<Button
					tx="common:logOutAsGuest"
					onPress={handleLogout}
					preset="reversed"
					RightAccessory={() => (
						<Logout style={{ marginLeft: 12 }} size={20} color="#fff" />
					)}
				/>
			)}
		</Screen>
	);
};
