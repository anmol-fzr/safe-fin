import {
	Bank as BookUserIcon,
	DocumentText1,
	type Icon as IconType,
	InfoCircle as Info,
	Message as Mail,
	Share as Share2,
	Star1 as Star,
	User as UserIcon,
	WalletMoney as WalletIcon,
} from "iconsax-react-nativejs";
import { Linking, Platform, Pressable, Share, View } from "react-native";
//import * as RateApp from "react-native-rate-app";
import { ListView, Text } from "@/components";
import { IconSax } from "@/context/IconContext";
import { APP } from "@/utils/const";
import { envs } from "@/utils/envs";

interface LinkItem {
	title: string;
	Icon: IconType;
	desc: string;
	href: Href;
}

type SettingList =
	| { title: string; icon: IconType; url: string }[]
	| { title: string; icon: IconType; action: VoidFunction | Promise<void> }[];

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
			{
				dialogTitle: `${APP.NAME} | ${APP.DESC}`,
			},
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

const lists: SettingList = [
	{
		title: "About Us",
		icon: Info,
		url: ABOUT,
	},
	{
		title: "Share the app",
		icon: Share2,
		action: handleShareApp,
	},
	{
		title: "Rate the app",
		icon: Star,
		action: handleRateApp,
	},
	{
		title: "Support",
		icon: Mail,
		url: SUPPORT,
	},
	{
		title: "Terms of Service",
		icon: DocumentText1,
		url: TERMS,
	},
	{
		title: "Privacy Policy",
		icon: DocumentText1,
		url: POLICY,
	},
];

export const MoreLinks = () => {
	return <SettingList list={lists} />;
};

const SettingList = ({ list }: { list: SettingList }) => {
	return (
		<ListView
			data={list}
			estimatedItemSize={29}
			renderItem={({ item }) => {
				const handlePress = () => {
					if (item.url) {
						Linking.openURL(item.url);
						return;
					}
					item.action();
				};

				return (
					<Pressable
						onPress={handlePress}
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
							<IconSax icon={item.icon} />
							<View>
								<Text size="lg" weight="medium">
									{item.title}
								</Text>
							</View>
						</View>
					</Pressable>
				);
			}}
		/>
	);
};

type Item =
	| { title: string; desc?: string; icon: IconType; href: Href & string }
	| {
			title: string;
			desc?: string;
			icon: IconType;
			action: VoidFunction | Promise<void>;
	  };

type Items = {
	meta: boolean;
	title: string;
	list: Item[];
};

const items: Items[] = [
	{
		meta: false,
		title: "Account",
		list: [
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
		],
	},
	{
		meta: true,
		title: "App Info",
		list: [
			{
				title: "About Us",
				icon: Info,
				href: ABOUT,
			},
			{
				title: "Share the app",
				icon: Share2,
				action: handleShareApp,
			},
			{
				title: "Rate the app",
				icon: Star,
				action: handleRateApp,
			},
			{
				title: "Support",
				icon: Mail,
				href: SUPPORT,
			},
			{
				title: "Terms of Service",
				icon: DocumentText1,
				href: TERMS,
			},
			{
				title: "Privacy Policy",
				icon: DocumentText1,
				href: POLICY,
			},
		],
	},
];
