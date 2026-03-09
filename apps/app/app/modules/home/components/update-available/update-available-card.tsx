import { Button } from "@/components";
import { PromoCardImpl } from "@/components/promo-card";
import { useNativeUpdate } from "@/hooks/useNativeUpdate";
import type { ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export function UpdateAvailableCard() {
	return <UpdateAvailableCardImpl />;
}

function UpdateAvailableCardImpl() {
	const { themed } = useAppTheme();

	const update = useNativeUpdate();
	const { isDownloading, isDownloaded, isUpdateAvailable } = update;

	if (!isUpdateAvailable) return null;

	return (
		<PromoCardImpl.Root style={themed($root)}>
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
					style={themed($btn)}
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
const $root: ThemedViewStyle = (theme) => ({
	backgroundColor: theme.colors.palette.secondary300,
});

const $btn: ThemedViewStyle = (theme) => ({
	backgroundColor: theme.colors.palette.secondary500,
	borderColor: theme.colors.palette.secondary500,
});
