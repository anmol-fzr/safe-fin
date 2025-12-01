import { Link } from "@react-navigation/native";
import {
	DocumentText1,
	InfoCircle as Info,
	Message as Mail,
	Share as Share2,
	Star1 as Star,
} from "iconsax-react-nativejs";
import { View } from "react-native";
import { ListView, Text } from "@/components";

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
			icon: DocumentText1,
		},
		{
			title: "Privacy Policy",
			icon: DocumentText1,
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
				const Icon = item.icon;
				return (
					<Link
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
									{item.title}
								</Text>
							</View>
						</View>
					</Link>
				);
			}}
		/>
	);
};
