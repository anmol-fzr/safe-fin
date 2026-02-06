import { ArrowRight } from "iconsax-react-nativejs";
import { Button } from "@/components";
import { PromoCardImpl } from "@/components/promo-card";
import { IconSax } from "@/context/IconContext";
import { shareApp } from "@/modules/account/screens";
import { useAppTheme } from "@/utils/useAppTheme";

export function ShareAppCard() {
	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<PromoCardImpl.Root
			style={{
				backgroundColor: colors.palette.secondary400,
			}}
		>
			<PromoCardImpl.Badge>share app</PromoCardImpl.Badge>
			<PromoCardImpl.Body>
				<PromoCardImpl.Title size="xl" numberOfLines={3} style={{ zIndex: 1 }}>
					Help others master thier money, Share with Your Friends
				</PromoCardImpl.Title>

				<Button
					preset="reversed"
					onPress={shareApp}
					style={{ gap: 8 }}
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
