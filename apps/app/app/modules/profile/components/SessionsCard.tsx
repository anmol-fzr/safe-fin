import { getEmptyArr } from "@/pkg/ui";
import {
	Monitor as LaptopIcon,
	Mobile as SmartphoneIcon,
} from "iconsax-react-nativejs";
import { Suspense } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { UAParser } from "ua-parser-js";
import { Button, ListView, Text } from "@/components";
import type { Session } from "@/modules/auth/utils";
import { $styles, colors, spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { useRevokeOtherSessions, useRevokeSession } from "../hooks/mutations";
import { useListSessions, useSession } from "../hooks/queries";
import { IconProvider, IconSax } from "@/context/IconContext";
import { Section } from "@/components/Section";

export function SessionsCard() {
	return (
		<View
			style={{
				gap: spacing.md,
				paddingHorizontal: $styles.container.paddingHorizontal,
			}}
		>
			<Section>
				<Section.Header
					style={{ flexDirection: "column", alignItems: "flex-start" }}
				>
					<Section.Title>Sessions</Section.Title>

					<Text>Manage your active sessions and revoke access</Text>
				</Section.Header>
				<Section.Body preset="default">
					<Suspense fallback={<SessionsCardImpl.Loading />}>
						<SessionsCardImpl />
					</Suspense>
				</Section.Body>
			</Section>
		</View>
	);
}

function SessionsCardImpl() {
	const { sessions, isRefetchingSessions, refetchSessions } = useListSessions();

	const { currSession } = useSession();

	return (
		<ListView
			data={sessions}
			keyExtractor={(item) => item.id}
			refreshing={isRefetchingSessions}
			ListHeaderComponent={
				sessions.length > 1 ? RevokeOtherSessions : undefined
			}
			onRefresh={refetchSessions}
			renderItem={({ item }) => (
				<SessionCell {...item} isCurrentSession={item.id === currSession?.id} />
			)}
		/>
	);
}

SessionsCardImpl.Loading = () => {
	const arr = getEmptyArr(3);

	return (
		<ListView
			data={arr}
			keyExtractor={(item) => item.toString()}
			renderItem={SessionCell.Loading}
		/>
	);
};

type SessionCellProps = Session & {
	isCurrentSession: boolean;
};

function SessionCell(props: SessionCellProps) {
	const { isCurrentSession, ...session } = props;

	const parser = UAParser(session.userAgent as string);
	const isMobile =
		parser.ua.includes("okhttp") || parser.device.type === "mobile";

	const { revokeSession, isRevokingSession } = useRevokeSession();

	const handleRevoke = () => revokeSession(session.token);
	const {
		theme: { colors },
	} = useAppTheme();

	const color = isRevokingSession ? colors.textDim : colors.palette.neutral700;

	return (
		<View
			style={{
				borderWidth: isCurrentSession ? 2 : 1,
				borderColor: isCurrentSession ? colors.tint : color,
				paddingInline: spacing.sm,
				height: 60,
				marginBottom: spacing.xs,
				borderRadius: spacing.sm,
				flexDirection: "row",
				alignItems: "center",
				gap: spacing.sm,
			}}
		>
			<IconProvider color={isCurrentSession ? colors.tint : color} size={20}>
				{isMobile ? (
					<IconSax icon={SmartphoneIcon} />
				) : (
					<IconSax icon={LaptopIcon} />
				)}
			</IconProvider>
			<Text
				style={{
					color,
				}}
			>
				{isCurrentSession
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
				alignItems: "flex-start",
				marginBottom: spacing.md,
			}}
		>
			<Pressable
				preset="text"
				onPress={revokeOtherSessions}
				style={[styles.sessionRevokerButton, ,]}
				status={isPending ? "disabled" : undefined}
			>
				<Text
					style={{
						textDecorationLine: "underline",
						color: isPending ? colors.textDim : colors.palette.neutral900,
					}}
				>
					Revoke all Other
				</Text>
			</Pressable>
			<Text>Session except current</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	sessionRevokerButton: {
		marginBottom: 2,
	},
});
