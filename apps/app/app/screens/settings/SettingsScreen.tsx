import {
	DocumentText1,
	InfoCircle as Info,
	Message as Mail,
	Share as Share2,
	Star1 as Star,
} from "iconsax-react-nativejs";
import { Linking, Pressable, Share, View } from "react-native";
//import * as RateApp from "react-native-rate-app";
import { ListView, Text } from "@/components";
import { IconSax } from "@/context/IconContext";
import { APP } from "@/utils/const";
import { envs } from "@/utils/envs";

type SettingList =
	| { title: string; icon: any; url: string }[]
	| { title: string; icon: any; action: VoidFunction }[];

type SettingsList = SettingList[];

const { ABOUT, TERMS, POLICY, SUPPORT, APPSTORE, PLAYSTORE, GITHUB } =
	envs.META_URLS;

const lists: SettingsList = [
	[
		{
			title: "About Us",
			icon: Info,
			url: ABOUT,
		},
	],
	[
		{
			title: "Share the app",
			icon: Share2,
			action: async () => {
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
			},
		},
		{
			title: "Rate the app",
			icon: Star,
			action: () => {
				//RateApp.requestReview();
			},
		},
	],
	[
		{
			title: "Support",
			icon: Mail,
			url: SUPPORT,
		},
	],
	[
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
	],
];

export const MoreLinks = () => {
	return lists.map((list, index) => <SettingList list={list} key={index} />);
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
