import {
	Monitor as LaptopIcon,
	Mobile as SmartphoneIcon,
} from "iconsax-react-nativejs";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { UAParser } from "ua-parser-js";
import { Button, Text } from "@/components";
import type { Session } from "@/modules/auth/utils";
import { ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { useRevokeSession } from "../../hooks/mutations";
import { IconProvider, IconSax } from "@/context/IconContext";
import { isNull, isUndefined } from "@/pkg/utils";

type SessionCellProps = Session & {
	isCurrentSession: boolean;
};

const useSessionCell = (ua: string | undefined | null) => {
	if (isNull(ua) || isUndefined(ua)) {
		return {
			isMobile: false,
			name: "UNKNOWN",
		};
	}

	const parser = UAParser(ua as string);
	const isMobile =
		parser.ua.includes("okhttp") || parser.device.type === "mobile";

	const name =
		parser.os.name && parser.browser.name
			? `${parser.os.name}, ${parser.browser.name}`
			: parser.os.name || parser.browser.name || isMobile
				? "Mobile"
				: ua || "UNKNOWN";

	return {
		isMobile,
		name,
	};
};

export function SessionCell(props: SessionCellProps) {
	const { isCurrentSession, ...session } = props;

	const { name, isMobile } = useSessionCell(session.userAgent);

	const { revokeSession, isRevokingSession } = useRevokeSession();

	const handleRevoke = () => revokeSession(session.token);
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	const color = isRevokingSession ? colors.textDim : colors.palette.neutral700;
	const iconColor = isCurrentSession ? colors.tint : color;

	return (
		<View
			style={[
				themed($root),
				{
					borderWidth: isCurrentSession ? 2 : 1,
					borderColor: iconColor,
				},
			]}
		>
			<IconProvider color={iconColor} size={20}>
				<IconSax icon={isMobile ? SmartphoneIcon : LaptopIcon} />
			</IconProvider>

			<Text
				style={{
					color,
				}}
			>
				{isCurrentSession ? "Current Session" : name}
			</Text>

			{isRevokingSession ? (
				<ActivityIndicator color="black" style={styles.loader} />
			) : (
				<Button onPress={handleRevoke} preset="text" style={styles.actionBtn}>
					{isCurrentSession ? "Sign Out" : "Revoke"}
				</Button>
			)}
		</View>
	);
}

SessionCell.Loading = () => {
	const {
		theme: { spacing },
	} = useAppTheme();
	return (
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item height={45} borderRadius={spacing.sm} />
		</SkeletonPlaceholder>
	);
};

const styles = StyleSheet.create({
	actionBtn: {
		marginRight: 0,
		marginLeft: "auto",
	},
	loader: {
		marginRight: 16,
		marginLeft: "auto",
	},
});

const $root: ThemedViewStyle = (theme) => ({
	paddingInline: theme.spacing.sm,
	height: 60,
	marginBottom: theme.spacing.xs,
	borderRadius: theme.spacing.sm,
	flexDirection: "row",
	alignItems: "center",
	gap: theme.spacing.sm,
});
