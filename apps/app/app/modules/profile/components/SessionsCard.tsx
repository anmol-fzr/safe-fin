import { getEmptyArr } from "@safe-fin/ui/utils";
import {
	Monitor as LaptopIcon,
	Mobile as SmartphoneIcon,
} from "iconsax-react-nativejs";
import { Suspense } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { UAParser } from "ua-parser-js";
import { Button, ListView, Text } from "@/components";
import type { Session } from "@/modules/auth/utils";
import { $styles, colors, spacing } from "@/theme";
import { isStrictlySameObj } from "@/utils/funcs";
import { useAppTheme } from "@/utils/useAppTheme";
import { useRevokeOtherSessions, useRevokeSession } from "../hooks/mutations";
import { useListSessions, useSession } from "../hooks/queries";

export function SessionsCard() {
	const { sessions, isRefetchingSessions, refetchSessions } = useListSessions();
	console.log(sessions);

	const { currSession } = useSession();

	return (
		<View
			style={{
				gap: spacing.md,
				paddingHorizontal: $styles.container.paddingHorizontal,
			}}
		>
			<View
				style={{
					gap: spacing.xs,
				}}
			>
				<Text size="xl" weight="semiBold">
					Sessions
				</Text>
				<Text>Manage your active sessions and revoke access</Text>
			</View>

			<Suspense fallback={<SessionsCardImpl.Loading />}>
				<SessionsCardImpl />
			</Suspense>
		</View>
	);
}

function SessionsCardImpl() {
	const { sessions, isRefetchingSessions, refetchSessions } = useListSessions();
	console.log(sessions);

	const { currSession } = useSession();

	return (
		<ListView
			data={sessions}
			keyExtractor={(item) => item.token}
			refreshing={isRefetchingSessions}
			ListHeaderComponent={
				sessions.length > 1 ? RevokeOtherSessions : undefined
			}
			onRefresh={refetchSessions}
			renderItem={({ item }) => (
				<SessionCell
					{...item}
					isCurrentSession={isStrictlySameObj(currSession, item)}
				/>
			)}
		/>
	);
}

const arr = getEmptyArr(3);

SessionsCardImpl.Loading = () =>
	arr.map((i) => <SessionCell.Loading key={i} />);

type SessionCellProps = Session & {
	isCurrentSession: boolean;
};

function SessionCell(session: SessionCellProps) {
	const parser = UAParser(session.userAgent as string);
	const isMobile =
		parser.ua.includes("okhttp") || parser.device.type === "mobile";

	const { revokeSession, isRevokingSession } = useRevokeSession();

	const handleRevoke = () => revokeSession(session.token);

	const color = isRevokingSession
		? colors.textDisabled
		: colors.palette.neutral700;

	return (
		<View
			style={{
				borderWidth: 1,
				borderColor: color,
				padding: spacing.sm,
				marginBottom: spacing.xs,
				borderRadius: spacing.sm,
				flexDirection: "row",
				alignItems: "center",
				gap: spacing.sm,
			}}
		>
			{isMobile ? (
				<SmartphoneIcon color={color} size={20} />
			) : (
				<LaptopIcon color={color} size={20} />
			)}
			<Text
				style={{
					color,
				}}
			>
				{session.isCurrentSession
					? "Current Session"
					: parser.os.name && parser.browser.name
						? `${parser.os.name}, ${parser.browser.name}`
						: parser.os.name || parser.browser.name || isMobile
							? "Mobile"
							: session.userAgent || "UNKNOWN"}
			</Text>
			{isRevokingSession ? (
				<ActivityIndicator
					color="black"
					style={{
						marginRight: 16,
						marginLeft: "auto",
					}}
				/>
			) : (
				<Button
					onPress={handleRevoke}
					preset="text"
					style={{
						marginRight: 0,
						marginLeft: "auto",
					}}
				>
					{session.isCurrentSession ? "Sign Out" : "Revoke"}
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

function RevokeOtherSessions() {
	const { revokeOtherSessions, isPending } = useRevokeOtherSessions();

	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				gap: 4,
				alignItems: "flex-end",
				marginBottom: spacing.md,
			}}
		>
			<Button
				preset="text"
				onPress={revokeOtherSessions}
				style={styles.sessionRevokerButton}
				status={isPending ? "disabled" : undefined}
				textStyle={{
					textDecorationLine: "underline",
					color: isPending ? colors.textDisabled : colors.palette.neutral900,
				}}
			>
				Revoke all Other
			</Button>
			<Text>Session except current</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	sessionRevokerButton: {
		marginBottom: 2,
	},
});
