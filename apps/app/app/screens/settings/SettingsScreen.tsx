import { Screen, ScreenHeader, ListView, Text } from "@/components";
import { $styles } from "@/theme";
import { TouchableHighlight, View } from "react-native";
import { spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Share2, Mail, ChevronRight, Star, Info } from "lucide-react-native";

type SettingList = { title: string; icon: any }[];
type SettingsList = SettingList[];

const lists: SettingsList = [
	[
		{
			title: "About Us",
			icon: Info,
		},
	],
	[
		{
			title: "Share the app",
			icon: Share2,
		},
		{
			title: "Rate the app",
			icon: Star,
		},
	],
	[
		{
			title: "Support",
			icon: Mail,
		},
	],
	[
		{
			title: "Terms of Service",
			icon: Mail,
		},
		{
			title: "Privacy Policy",
			icon: Share2,
		},
	],
];

export const SettingScreen = () => {
	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader
				titleTx="settingScreen:title"
				tagLineTx="settingScreen:tagLine"
			/>
			<View style={{ gap: spacing.md }}>
				{lists.map((list, index) => (
					<SettingList list={list} key={index} />
				))}
			</View>
		</Screen>
	);
};

const SettingList = ({ list }: { list: SettingList }) => {
	const { theme } = useAppTheme();

	return (
		<ListView
			data={list}
			renderItem={({ item }) => {
				const Icon = item.icon;
				return (
					<TouchableHighlight
						key={item.title}
						style={{
							marginBottom: spacing.xs,
						}}
					>
						<View
							style={{
								backgroundColor: theme.colors.palette.neutral100,
								padding: spacing.md,
								borderRadius: spacing.sm,
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignContent: "center",
							}}
						>
							<View
								style={{
									display: "flex",
									gap: spacing.md,
									flexDirection: "row",
									justifyContent: "space-between",
									alignContent: "center",
								}}
							>
								<Icon size={22} color={theme.colors.tint} />
								<Text preset="bold">{item.title}</Text>
							</View>
							<ChevronRight size={22} />
						</View>
					</TouchableHighlight>
				);
			}}
		/>
	);
};
