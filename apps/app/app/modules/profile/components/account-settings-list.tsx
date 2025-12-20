import { type Href, Link } from "expo-router";
import {
	Bank as BookUserIcon,
	type Icon as IconType,
	Setting,
	User as UserIcon,
	WalletMoney as WalletIcon,
} from "iconsax-react-nativejs";
import { Pressable, View } from "react-native";
import { Icon } from "@/components";
import type { TxKeyPath } from "@/i18n";
import { spacing } from "@/theme";
import { envs } from "@/utils/envs";
import { ItemContent, SectionHeader } from "../screens";

export interface BaseItem {
	titleTx: TxKeyPath;
	descTx?: TxKeyPath;
	icon: IconType;
}

type NavigationItem = BaseItem & {
	href: Href;
};

const accountItems: NavigationItem[] = [
	{
		titleTx: "screens:profileList.accountList.userProfile.title",
		icon: UserIcon,
		descTx: "screens:profileList.accountList.userProfile.desc",
		href: "/tabs/profile/user-profile",
	},
	{
		titleTx: "screens:profileList.accountList.demographics.title",
		icon: WalletIcon,
		descTx: "screens:profileList.accountList.demographics.desc",
		href: "/tabs/profile/demographics",
	},
	{
		titleTx: "screens:profileList.accountList.financialDetails.title",
		icon: BookUserIcon,
		descTx: "screens:profileList.accountList.financialDetails.desc",
		href: "/tabs/profile/financials",
	},
	{
		titleTx: "screens:profileList.accountList.account.title",
		icon: UserIcon,
		descTx: "screens:profileList.accountList.account.desc",
		href: "/tabs/profile/account",
	},
	{
		titleTx: "screens:profileList.accountList.appSettings.title",
		icon: Setting,
		descTx: "screens:profileList.accountList.appSettings.desc",
		href: "/tabs/profile/settings",
	},
];

if (envs.isDev) {
	accountItems.push({
		titleTx: "screens:profileList.accountList.debug.title",
		icon: () => <Icon icon="debug" />,
		descTx: "screens:profileList.accountList.debug.desc",
		href: "/tabs/profile/debug" as Href,
	});
}

export function AccountSettingsList() {
	return (
		<View>
			<SectionHeader title="Account" />
			<View style={{ gap: spacing.sm }}>
				{accountItems.map((item) => (
					<Link key={item.titleTx} href={item.href} asChild>
						<Pressable>
							<ItemContent {...item} />
						</Pressable>
					</Link>
				))}
			</View>
		</View>
	);
}
