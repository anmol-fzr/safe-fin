import { useSafeContext } from "@safe-fin/ui/hooks";
import type { Icon as BaseIcon, IconProps } from "iconsax-react-nativejs";
import { createContext, type PropsWithChildren } from "react";
import { useAppTheme } from "@/utils/useAppTheme";

type BaseIconProps = Pick<IconProps, "variant" | "size" | "color">;

const IconContext = createContext<BaseIconProps | null>(null);

type IconProviderProps = BaseIconProps & PropsWithChildren;

export const IconProvider = (props: IconProviderProps) => {
	const {
		theme: { colors },
	} = useAppTheme();
	const {
		variant = "Linear",
		color = colors.palette.accent500,
		size = 15,
	} = props;

	return (
		<IconContext.Provider value={{ variant, color, size }}>
			{props.children}
		</IconContext.Provider>
	);
};

export interface IconCompProps extends IconProps {
	icon: BaseIcon;
}

export const useIcon = () =>
	useSafeContext<BaseIconProps>(IconContext, "Icon Component");
