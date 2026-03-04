import { useQueryClient } from "@tanstack/react-query";
import { Link, type LinkProps } from "expo-router";
import {
	ArrowRight2,
	Danger,
	DocumentText1,
	Heart,
	type Icon as IconType,
	Lifebuoy,
	LikeDislike,
	Profile,
	Setting2,
	Share as ShareIcon,
	Star1,
	User,
	WalletMoney,
} from "iconsax-react-nativejs";
import { useEffect } from "react";
import { Platform, Pressable, Share, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { ListView, Screen, Text } from "@/components";
import { Section } from "@/components/Section";
import { IconSax } from "@/context/IconContext";
import { getCountriesOpts } from "@/hooks/queries";
import type { TxKeyPath } from "@/i18n";
import { getDemoGraphicsOpts } from "@/modules/profile/hooks/queries";
import { $styles } from "@/theme";
import { APP } from "@/utils/const";
import { envs } from "@/utils/envs";
import { useAppTheme } from "@/utils/useAppTheme";
import { Action } from "../components";

const { ABOUT, TERMS, POLICY, SUPPORT, APPSTORE, PLAYSTORE } = envs.META_URLS;

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

interface ListItemBaseItem {
	title: TxKeyPath;
	desc?: TxKeyPath;
	icon: IconType;
}

interface ListItemActionItem {
	href: LinkProps["href"];
}

interface ListItemLinkItem {
	action: VoidFunction;
}

type ListItemAction = ListItemBaseItem &
	(ListItemActionItem | ListItemLinkItem);

type ListItemActions = ListItemAction[];

type ListItem = {
	title: string;
	links: ListItemActions;
};

type ListItems = ListItem[];

const DATA = [
	{
		title: "Personal Info",
		links: [
			{
				icon: User,
				title: "screens:profileList.accountList.userProfile.title",
				desc: "screens:profileList.accountList.userProfile.desc",
				href: "/profile/edit",
			},

			{
				icon: WalletMoney,
				title: "screens:profileList.accountList.demographics.title",
				desc: "screens:profileList.accountList.demographics.desc",
				href: "/profile/demographics",
			},
			// {
			// 	icon: Bank,
			// 	title: "screens:profileList.accountList.financialDetails.title",
			// 	desc: "screens:profileList.accountList.financialDetails.desc",
			// 	href: "/profile/financials",
			// },
		],
	},
	{
		title: "Settings & Security",
		links: [
			{
				icon: User,
				title: "screens:profileList.accountList.account.title",
				desc: "screens:profileList.accountList.account.desc",
				href: "/profile/account",
			},
			{
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
				icon: User,
				title: "screens:profileList.appInfoList.aboutUs",
				href: ABOUT,
			},
			{
				icon: Lifebuoy,
				title: "screens:profileList.appInfoList.support",
				href: SUPPORT,
			},
			{
				icon: DocumentText1,
				title: "screens:profileList.appInfoList.terms",
				href: TERMS,
			},
			{
				icon: DocumentText1,
				title: "screens:profileList.appInfoList.privacyPolicy",
				href: POLICY,
			},
			{
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
				icon: ShareIcon,
				title: "screens:profileList.appInfoList.shareApp.title",
				desc: "screens:profileList.appInfoList.shareApp.desc",
				action: shareApp,
				//href: "/tabs/profile/financials",
			},
			{
				icon: LikeDislike,
				title: "screens:profileList.appInfoList.feedback.title",
				desc: "screens:profileList.appInfoList.feedback.desc",
				href: "/extras/feedback",
			},
		],
	},
] as const;

export const AccountIndexScreen = () => {
	const {
		theme: { colors, spacing },
	} = useAppTheme();

	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.prefetchQuery(getCountriesOpts());
		queryClient.prefetchQuery(getDemoGraphicsOpts());
	}, [queryClient]);

	return (
		<Screen
			preset="scroll"
			safeAreaEdges={["bottom"]}
			contentContainerStyle={$styles.fullHeaderScreen}
		>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					flexWrap: "wrap",
					justifyContent: "space-between",
					gap: spacing.sm,
				}}
			>
				<Action title="Public Profile" icon={Profile} href="/profile/public" />
				<Action title="Saved" icon={Heart} href="/saved" />
			</View>

			<ListView
				data={DATA}
				keyExtractor={(item) => item.title}
				contentContainerStyle={{ gap: spacing.md }}
				renderItem={({ item: section, index }) => (
					<Animated.View entering={FadeIn.delay(50 * index)}>
						<Section>
							<Section.Title>{section.title}</Section.Title>
							<Section.Body preset="filled" style={{ paddingBottom: 0 }}>
								<View style={$styles.flex1}>
									<ListView
										data={section.links}
										keyExtractor={(item) => item.title}
										contentContainerStyle={{ gap: spacing.md }}
										renderItem={({ item, index }) => (
											<Animated.View entering={FadeIn.delay(50 * index)}>
												{item.href ? (
													<Link href={item.href}>
														<View
															style={{
																flexDirection: "row",
																alignItems: "center",
																gap: spacing.md,
															}}
														>
															<IconSax
																icon={item.icon}
																size={24}
																color={colors.text}
															/>
															<View style={$styles.flex1}>
																<Text size="md" tx={item.title} />
																{item.desc && (
																	<Text size="xs" color="dim" tx={item.desc} />
																)}
															</View>
															<IconSax icon={ArrowRight2} />
														</View>
													</Link>
												) : (
													<Pressable onPress={item.action}>
														<View
															style={{
																flexDirection: "row",
																alignItems: "center",
																gap: spacing.md,
															}}
														>
															<IconSax
																icon={item.icon}
																size={24}
																color={colors.text}
															/>
															<View style={$styles.flex1}>
																<Text size="md" tx={item.title} />
																{item.desc && (
																	<Text size="xs" color="dim" tx={item.desc} />
																)}
															</View>
															<IconSax icon={ArrowRight2} />
														</View>
													</Pressable>
												)}
											</Animated.View>
										)}
									/>
								</View>
							</Section.Body>
						</Section>
					</Animated.View>
				)}
			/>
		</Screen>
	);
};
