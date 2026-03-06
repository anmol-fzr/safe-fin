import type { ExternalPathString, Href } from "expo-router";
import {
	Danger,
	DocumentText1,
	type Icon as IconType,
	Lifebuoy,
	LikeDislike,
	Setting2,
	Share as ShareIcon,
	Star1,
	User,
	WalletMoney,
} from "iconsax-react-nativejs";
import { Platform, Share, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { $mdListItemSeparatorStyles, ListView } from "@/components";
import { Section } from "@/components/Section";
import type { TxKeyPath } from "@/i18n";
import { $styles } from "@/theme";
import { APP } from "@/utils/const";
import { envs } from "@/utils/envs";
import { useAppTheme } from "@/utils/useAppTheme";
import { AccountIndexListItem } from "./AccountIndexListItem";

const { ABOUT, TERMS, POLICY, SUPPORT, APPSTORE, PLAYSTORE } = envs.META_URLS;

type BaseItem = {
	icon: IconType;
	title: TxKeyPath;
	desc?: TxKeyPath;
};

type LinkItem = BaseItem & {
	type: "link";
	href: ExternalPathString | Href;
};

type ActionItem = BaseItem & {
	type: "action";
	action: () => void | Promise<void>;
};

type AccountItem = LinkItem | ActionItem;

type SectionData = {
	title: string;
	links: AccountItem[];
};

export async function shareApp() {
	try {
		await Share.share({
			message:
				`Stay financially safe with ${APP.NAME}.\n` +
				`${APP.DESC}\n\n` +
				"Check scams, understand fraud, and protect your money.\n\n" +
				`Download here:\n${envs.APK_URL}`,
		});
	} catch (error) {
		console.error("Share failed:", error);
	}
}

const DATA: SectionData[] = [
	{
		title: "Personal Info",
		links: [
			{
				type: "link",
				icon: User,
				title: "screens:profileList.accountList.userProfile.title",
				desc: "screens:profileList.accountList.userProfile.desc",
				href: "/profile/edit",
			},
			{
				type: "link",
				icon: WalletMoney,
				title: "screens:profileList.accountList.demographics.title",
				desc: "screens:profileList.accountList.demographics.desc",
				href: "/profile/demographics",
			},
		],
	},
	{
		title: "Settings & Security",
		links: [
			{
				type: "link",
				icon: User,
				title: "screens:profileList.accountList.account.title",
				desc: "screens:profileList.accountList.account.desc",
				href: "/profile/account",
			},
			{
				type: "link",
				icon: Setting2,
				title: "screens:profileList.accountList.appSettings.title",
				desc: "screens:profileList.accountList.appSettings.desc",
				href: "/settings/app",
			},
		],
	},
	{
		title: "Support & Legal",
		links: [
			{
				type: "link",
				icon: User,
				title: "screens:profileList.appInfoList.aboutUs",
				href: ABOUT,
			},
			{
				type: "link",
				icon: Lifebuoy,
				title: "screens:profileList.appInfoList.support",
				href: SUPPORT,
			},
			{
				type: "link",
				icon: DocumentText1,
				title: "screens:profileList.appInfoList.terms",
				href: TERMS,
			},
			{
				type: "link",
				icon: DocumentText1,
				title: "screens:profileList.appInfoList.privacyPolicy",
				href: POLICY,
			},
			{
				type: "link",
				icon: Danger,
				title: "screens:profileList.accountList.debug.title",
				href: "/extras/debug",
			},
		],
	},
	{
		title: "More",
		links: [
			{
				type: "link",
				icon: Star1,
				title: "screens:profileList.appInfoList.rateApp.title",
				desc: "screens:profileList.appInfoList.rateApp.desc",
				href: Platform.select({
					ios: APPSTORE,
					android: PLAYSTORE,
					default: PLAYSTORE,
				}),
			},
			{
				type: "action",
				icon: ShareIcon,
				title: "screens:profileList.appInfoList.shareApp.title",
				desc: "screens:profileList.appInfoList.shareApp.desc",
				action: shareApp,
			},
			{
				type: "link",
				icon: LikeDislike,
				title: "screens:profileList.appInfoList.feedback.title",
				desc: "screens:profileList.appInfoList.feedback.desc",
				href: "/extras/feedback",
			},
		],
	},
];

export const AccountIndexList = () => {
	const { themed } = useAppTheme();

	return (
		<ListView
			data={DATA}
			keyExtractor={(item) => item.title}
			contentContainerStyle={themed($mdListItemSeparatorStyles)}
			renderItem={({ item: section, index }) => (
				<Animated.View entering={FadeIn.delay(50 * index)}>
					<Section>
						<Section.Title>{section.title}</Section.Title>

						<Section.Body preset="filled" style={{ paddingBottom: 0 }}>
							<View style={$styles.flex1}>
								<ListView
									data={section.links}
									keyExtractor={(item) => item.title}
									contentContainerStyle={themed($mdListItemSeparatorStyles)}
									renderItem={({ item, index }) => (
										<Animated.View entering={FadeIn.delay(50 * index)}>
											<AccountIndexListItem item={item} />
										</Animated.View>
									)}
								/>
							</View>
						</Section.Body>
					</Section>
				</Animated.View>
			)}
		/>
	);
};
