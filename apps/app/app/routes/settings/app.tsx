import { View } from "react-native";
import { Screen } from "@/components";
//import { LangSwitcher } from "@/modules/settings/component/LangSwitcher";
import { ThemeSwitcher } from "@/modules/settings/component/ThemeSwitcher";
import { $styles } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export default function Settings() {
	const {
		theme: { spacing },
	} = useAppTheme();
	return (
		<Screen preset="scroll" contentContainerStyle={$styles.container}>
			<View style={{ gap: spacing.lg }}>
				{/*
				<ThemeSwitcher />
				<LangSwitcher />
        */}
			</View>
		</Screen>
	);
}
