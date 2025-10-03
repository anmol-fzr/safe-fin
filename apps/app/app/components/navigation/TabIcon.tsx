import type { LucideIcon } from "lucide-react-native";
import { useAppTheme } from "@/utils/useAppTheme";

interface TabIconProps {
	focused: boolean;
	color?: string;
	size?: number;
	Icon: LucideIcon;
}

export function TabIcon(props: TabIconProps) {
	const { focused, Icon } = props;

	const {
		theme: { colors },
	} = useAppTheme();

	return <Icon color={focused ? colors.tint : colors.tintInactive} size={30} />;
}
