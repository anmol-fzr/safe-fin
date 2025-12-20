import {
	DocumentText1,
	InfoCircle as Info,
	Message as Mail,
	Share as Share2,
	Star1 as Star,
} from "iconsax-react-nativejs";
import { Linking, Platform, Pressable, Share, View } from "react-native";
import { spacing } from "@/theme";
import { APP } from "@/utils/const";
import { envs } from "@/utils/envs";
import { ItemContent, SectionHeader } from "../screens";
import type { BaseItem } from "./account-settings-list";

type ActionItem = BaseItem & {
	href?: string;
	action?: VoidFunction | Promise<void>;
};

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
// 2. External Actions/Links
const appInfoItems: ActionItem[] = [
	{
		titleTx: "screens:profileList.appInfoList.aboutUs",
		icon: Info,
		href: ABOUT,
	},
	{
		titleTx: "screens:profileList.appInfoList.shareApp",
		icon: Share2,
		action: handleShareApp,
	},
	{
		titleTx: "screens:profileList.appInfoList.rateApp",
		icon: Star,
		action: handleRateApp,
	},
	{
		titleTx: "screens:profileList.appInfoList.support",
		icon: Mail,
		href: SUPPORT,
	},
	{
		titleTx: "screens:profileList.appInfoList.terms",
		icon: DocumentText1,
		href: TERMS,
	},
	{
		titleTx: "screens:profileList.appInfoList.privacyPolicy",
		icon: DocumentText1,
		href: POLICY,
	},
];

export const AppInfoList = () => {
	const handleExternalPress = (item: ActionItem) => {
		if (item.href) {
			Linking.openURL(item.href);
			return;
		}
		if (item.action) {
			item.action();
		}
	};

	return (
		<View>
			<SectionHeader title="App Info" />
			<View style={{ gap: spacing.sm }}>
				{appInfoItems.map((item) => (
					<Pressable
						key={item.titleTx}
						onPress={() => handleExternalPress(item)}
					>
						<ItemContent {...item} />
					</Pressable>
				))}
			</View>
		</View>
	);
};
