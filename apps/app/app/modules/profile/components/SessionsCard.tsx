import { LaptopIcon, SmartphoneIcon } from "lucide-react-native";
import { ActivityIndicator, View } from "react-native";
import { UAParser } from "ua-parser-js";
import { Button, ListView, Text } from "@/components";
import type { Session } from "@/modules/auth/utils";
import { $styles, spacing } from "@/theme";
import { isStrictlySameObj } from "@/utils/funcs";
import { useRevokeSession } from "../hooks/mutations";
import { useListSessions, useSession } from "../hooks/queries";

export function SessionsCard() {
	const { sessions, isRefetchingSessions, refetchSessions } = useListSessions();
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

			<ListView
				data={sessions}
				keyExtractor={(item) => item.token}
				refreshing={isRefetchingSessions}
				onRefresh={refetchSessions}
				renderItem={({ item }) => (
					<SessionCell
						{...item}
						isCurrentSession={isStrictlySameObj(currSession, item)}
					/>
				)}
			/>
		</View>
	);
}

type SessionCellProps = Session & {
	isCurrentSession: boolean;
};

function SessionCell(session: SessionCellProps) {
	const parser = UAParser(session.userAgent as string);
	const isMobile =
		parser.ua.includes("okhttp") || parser.device.type === "mobile";

	const { revokeSession, isRevokingSession } = useRevokeSession();

	const handleRevoke = () => revokeSession(session.token);

	const color = isRevokingSession ? "gray" : "black";

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
