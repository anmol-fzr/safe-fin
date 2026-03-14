import { ArrowRight } from "iconsax-react-nativejs";
import { Button } from "@/components";
import { PromoCardImpl } from "@/components/promo-card";
import { IconSax } from "@/context/IconContext";
import { shareApp } from "@/modules/account/components/account-index/AccountIndexList";
import type { ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export function ShareAppCard() {
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	return (
		<PromoCardImpl.Root style={themed($root)}>
			<PromoCardImpl.Badge>share app</PromoCardImpl.Badge>
			<PromoCardImpl.Body>
				<PromoCardImpl.Title size="xl" numberOfLines={3} style={{ zIndex: 1 }}>
					Help others master thier money, Share with Your Friends
				</PromoCardImpl.Title>

				<Button
					preset="reversed"
					onPress={shareApp}
					style={themed($button)}
					RightAccessory={() => (
						<IconSax icon={ArrowRight} color={colors.textInverse} />
					)}
				>
					Invite Friends
				</Button>
			</PromoCardImpl.Body>
		</PromoCardImpl.Root>
	);
}
const $root: ThemedViewStyle = (theme) => ({
	backgroundColor: theme.colors.palette.secondary400,
});

const $button: ThemedViewStyle = (theme) => ({
	gap: theme.spacing.xs,
});
