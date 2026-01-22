import { Moon, Settings, Sun1 } from "iconsax-react-nativejs";
import { LayoutAnimation, Platform, UIManager } from "react-native";
import { SelectChips } from "@/components/SelectChips";
import type { ThemeContexts } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

export const ThemeSwitcher = () => {
	const { themeContext, setThemeContextOverride } = useAppTheme();

	const themeOptions = [
		{ label: "Light", value: "light", Icon: Sun1 },
		{ label: "System", value: "system", Icon: Settings },
		{ label: "Dark", value: "dark", Icon: Moon },
	];

	return (
		<SelectChips.Root
			value={themeContext}
			onChange={(newTheme) => {
				LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
				setThemeContextOverride(newTheme as ThemeContexts);
			}}
		>
			<SelectChips>
				<SelectChips.Label label="Theme" />
				<SelectChips.Options
					options={themeOptions}
					optionRenderer={SelectChips.IconOptionRenderer}
				/>
			</SelectChips>
		</SelectChips.Root>
	);
};
