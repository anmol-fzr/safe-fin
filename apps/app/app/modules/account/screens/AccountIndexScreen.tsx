import { useQueryClient } from "@tanstack/react-query";
import { Heart, Profile } from "iconsax-react-nativejs";
import { useEffect } from "react";
import { View } from "react-native";
import { Screen } from "@/components";
import { getCountriesOpts } from "@/hooks/queries";
import {
	getDemoGraphicsOpts,
	getSessionOpts,
} from "@/modules/profile/hooks/queries";
import { $styles, type ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Action } from "../components";
import { AccountIndexList } from "../components/account-index/AccountIndexList";

export const AccountIndexScreen = () => {
	const { themed } = useAppTheme();
	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.prefetchQuery(getSessionOpts());
		queryClient.prefetchQuery(getCountriesOpts());
		queryClient.prefetchQuery(getDemoGraphicsOpts());
	}, [queryClient]);

	return (
		<Screen
			preset="scroll"
			//safeAreaEdges={["bottom"]}
			contentContainerStyle={$styles.fullHeaderScreen}
		>
			<View style={themed($actionsRoot)}>
				<Action title="Public Profile" icon={Profile} href="/profile/public" />
				<Action title="Saved" icon={Heart} href="/saved" />
			</View>

			<AccountIndexList />
		</Screen>
	);
};

const $actionsRoot: ThemedViewStyle = (theme) => ({
	flex: 1,
	flexDirection: "row",
	flexWrap: "wrap",
	justifyContent: "space-between",
	gap: theme.spacing.sm,
});
