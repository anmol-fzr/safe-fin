import { Link } from "@react-navigation/native";
import { Account, BookUserIcon, BugIcon, UserIcon } from "lucide-react-native";
import { View } from "react-native";
import { ListView, Screen, ScreenHeader, Text } from "@/components";
import { $styles, colors } from "@/theme";
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
		Icon: BookUserIcon,
		desc: "Address, Occupation etc.",
		screen: "DemoGraphics",
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
		Icon: BugIcon,
		desc: "App Id, Build Id, Versions",
		screen: "Debug",
	});
}

export const ProfileIndexScreen = () => {
	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader
				titleTx="profileScreen:title"
				tagLineTx="profileScreen:tagLine"
			/>
			<View>
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
									<Icon />
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
			</View>
		</Screen>
	);
};
