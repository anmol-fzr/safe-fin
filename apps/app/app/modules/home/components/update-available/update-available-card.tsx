import { PromoCardImpl } from "@/components/promo-card";
import { Button } from "@/components";
import { useAppTheme } from "@/utils/useAppTheme";
import { useNativeUpdate } from "@/hooks/useNativeUpdate";

export function UpdateAvailableCard() {
	return <UpdateAvailableCardImpl />;
}

function UpdateAvailableCardImpl() {
	const {
		theme: { colors },
	} = useAppTheme();

	const update = useNativeUpdate();

	if (!update.isUpdateAvailable) return null;

	return (
		<PromoCardImpl.Root
			style={{
				backgroundColor: colors.palette.secondary300,
			}}
		>
			<PromoCardImpl.Badge>Update Available</PromoCardImpl.Badge>
			<PromoCardImpl.Body>
				<PromoCardImpl.Title
					size="xxl"
					numberOfLines={2}
					style={{ textAlign: "center" }}
				>
					A better way to learn is here
				</PromoCardImpl.Title>
				<Button
					style={{
						backgroundColor: colors.palette.secondary500,
						borderColor: colors.palette.secondary500,
					}}
					onPress={update.isDownloaded ? update.install : update.download}
				>
					{update.isDownloaded ? "Update Now" : "Download Update"}
				</Button>
			</PromoCardImpl.Body>
		</PromoCardImpl.Root>
	);
}
