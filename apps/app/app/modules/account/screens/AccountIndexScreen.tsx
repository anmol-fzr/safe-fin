import { useQueryClient } from "@tanstack/react-query";
import { Link, type LinkProps } from "expo-router";
import {
	ArrowRight2,
	Danger,
	DocumentText1,
	Edit,
	type Icon as IconType,
	Lifebuoy,
	Profile,
	Star1,
	User,
	WalletMoney,
	LikeDislike,
} from "iconsax-react-nativejs";
import { useEffect } from "react";
import { Image, Platform, View } from "react-native";
import { ListView, PressableIcon, Screen, Text } from "@/components";
import { Section } from "@/components/Section";
import { IconSax } from "@/context/IconContext";
import { getCountriesOpts } from "@/hooks/queries";
import { type TxKeyPath, translate } from "@/i18n";
import {
	getDemoGraphicsOpts,
	useSession,
} from "@/modules/profile/hooks/queries";
import { $styles } from "@/theme";
import { envs } from "@/utils/envs";
import { useAppTheme } from "@/utils/useAppTheme";
import Animated, { FadeIn } from "react-native-reanimated";
import { useAuthStore } from "@/modules/auth/store";

const { ABOUT, TERMS, POLICY, SUPPORT, APPSTORE, PLAYSTORE } = envs.META_URLS;

const DATA: {
	title: string;
	links: {
		title: TxKeyPath;
		desc?: TxKeyPath;
		href: LinkProps["href"];
		icon: IconType;
	}[];
}[] = [
	{
		title: "Personal Info",
		links: [
			{
				icon: User,
				title: "screens:profileList.accountList.userProfile.title",
				desc: "screens:profileList.accountList.userProfile.desc",
				href: "/tabs/profile/user-profile",
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
			// {
			// 	icon: Setting2,
			// 	title: "screens:profileList.accountList.appSettings.title",
			// 	desc: "screens:profileList.accountList.appSettings.desc",
			// 	href: "/settings/app",
			// },
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
				icon: LikeDislike,
				title: "screens:profileList.appInfoList.feedback.title",
				desc: "screens:profileList.appInfoList.feedback.desc",
				href: "/extras/feedback",
			},
			// {
			// 	icon: Share,
			// 	title: "screens:profileList.appInfoList.shareApp",
			// 	//desc: "Share App with you friends",
			// 	href: "/tabs/profile/financials",
			// },
		],
	},
];

type BoxProps = {
	title: string;
	icon: IconType;
	href: LinkProps["href"];
};

const Box = (props: BoxProps) => {
	const { title, icon, href } = props;
	const {
		theme: { colors, spacing, roundness },
	} = useAppTheme();

	return (
		<Link href={href} push style={{ flex: 1 }}>
			<View
				style={{
					backgroundColor: colors.palette.neutral200,
					padding: spacing.md,
					borderRadius: roundness,
					flex: 1,
					flexDirection: "row",
					alignItems: "center",
					gap: 8,
				}}
			>
				<View
					style={{
						padding: 8,
						backgroundColor: colors.palette.primary100,
						borderRadius: 20,
					}}
				>
					<IconSax icon={icon} color={colors.tint} />
				</View>
				<Text>{title}</Text>
			</View>
		</Link>
	);
};

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
			<Box title="Public Profile" icon={Profile} href="/profile/public" />
			<ListView
				data={DATA}
				keyExtractor={(item) => item.title}
				contentContainerStyle={{ gap: spacing.md }}
				renderItem={({ item: section, index }) => (
					<Animated.View entering={FadeIn.delay(50 * index)}>
						<Section>
							<Section.Title>{section.title}</Section.Title>
							<Section.Body preset="filled" style={{ paddingBottom: 0 }}>
								<View style={{ flex: 1 }}>
									<ListView
										data={section.links}
										keyExtractor={(item) => item.title}
										contentContainerStyle={{ gap: spacing.md }}
										renderItem={({ item, index }) => (
											<Animated.View entering={FadeIn.delay(50 * index)}>
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
														<View style={{ flex: 1 }}>
															<Text size="md">{translate(item.title)}</Text>
															{item.desc && (
																<Text
																	size="xs"
																	style={{ color: colors.textDim }}
																>
																	{translate(item.desc)}
																</Text>
															)}
														</View>
														<IconSax icon={ArrowRight2} />
													</View>
												</Link>
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

export const UserDetailsCard = () => {
	const {
		theme: { colors, spacing },
	} = useAppTheme();

	const image = useAuthStore((state) => state.user?.image);

	const { currUser } = useSession();

	return (
		<View
			style={{
				flexDirection: "row",
				gap: spacing.md,
				padding: spacing.sm,
				borderBottomWidth: 1,
				borderBottomColor: colors.border,
				paddingTop: 0,
			}}
		>
			<Image
				height={80}
				width={80}
				style={{
					borderRadius: 100,
				}}
				source={{
					uri: image,
				}}
			/>
			<View>
				<Text size="xxl" weight="medium">
					{currUser?.name ?? "User"}
				</Text>
			</View>

			<Link href="/profile/edit" asChild>
				<PressableIcon
					icon={Edit}
					size={20}
					style={{ position: "absolute", top: 0, right: 8 }}
				/>
			</Link>
		</View>
	);
};
