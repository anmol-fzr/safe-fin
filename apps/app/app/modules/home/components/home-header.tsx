import { memo } from "react";
//import { StyleSheet } from "react-native";
import { useAuthStore } from "@/modules/auth/store";
import {
	ScreenHeaderImpl,
	ScreenHeaderRootProps,
} from "@/components/ScreenHeaderImpl";

export const HomeHeader = memo((props: ScreenHeaderRootProps) => {
	const name = useAuthStore((state) => state.user?.name ?? "User");

	return (
		<>
			<ScreenHeaderImpl.Root
				// style={styles.root}
				{...props}
			>
				<ScreenHeaderImpl.Title titleTx={`Welcome ${name}`} />
			</ScreenHeaderImpl.Root>
		</>
	);
});

// const styles = StyleSheet.create({
// 	root: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		justifyContent: "space-between",
// 	},
// });
