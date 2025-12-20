import { useTranslation } from "react-i18next";
import { LayoutAnimation, Platform, UIManager } from "react-native";
import { SelectChips } from "@/components/SelectChips";

if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

export const LangSwitcher = () => {
	const { i18n } = useTranslation();
	const { resolvedLanguage: currLanguage } = i18n;

	const langOptions = [
		{ label: "English", value: "en" },
		{ label: "Hindi", value: "hi" },
	];

	return (
		<SelectChips.Root
			value={currLanguage}
			onChange={(newLang) => {
				LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
				i18n.changeLanguage(newLang);
			}}
		>
			<SelectChips>
				<SelectChips.Label label="Language" />
				<SelectChips.Options options={langOptions} />
			</SelectChips>
		</SelectChips.Root>
	);
};
