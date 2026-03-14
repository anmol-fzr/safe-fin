import { Button } from "@/components";
import { PromoCardImpl } from "@/components/promo-card";
import { useNativeUpdate } from "@/hooks/useNativeUpdate";
import { useAppTheme } from "@/utils/useAppTheme";

export function UpdateAvailableCard() {
	return <UpdateAvailableCardImpl />;
}

function UpdateAvailableCardImpl() {
	const {
		theme: { colors },
	} = useAppTheme();

	const update = useNativeUpdate();
	const { isDownloading, isDownloaded, isUpdateAvailable } = update;

	if (!isUpdateAvailable) return null;

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
					onPress={isDownloaded ? update.install : update.download}
				>
					{isDownloading
						? "Downloading ..."
						: isDownloaded
							? "Update Now"
							: "Download Update"}
				</Button>
			</PromoCardImpl.Body>
		</PromoCardImpl.Root>
	);
}
