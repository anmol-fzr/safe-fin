import { getEmptyArr } from "@/pkg/ui";
import { useState } from "react";
import { ListView, Text } from "@/components";
import { colors } from "@/theme";
import { useListSessions, useSession } from "../../hooks/queries";
import { PressableScale } from "pressto";
import { RevokeOtherSessions } from "./revoke-other-sessions";
import { SessionCell } from "./session-cell";

const MAX_NUM_SESSIONS_SHOWN = 3;

export function SessionList() {
	const { sessions, isRefetchingSessions, refetchSessions } = useListSessions();

	const { currSession } = useSession();

	const [maxNumSessionShown, setMaxNumSessionShown] = useState(
		MAX_NUM_SESSIONS_SHOWN,
	);

	const onSessionsCollapse = () => {
		setMaxNumSessionShown(MAX_NUM_SESSIONS_SHOWN);
	};

	const onSessionsExpand = () => {
		setMaxNumSessionShown(sessions.length);
	};

	return (
		<>
			<ListView
				data={sessions.slice(0, maxNumSessionShown)}
				keyExtractor={(item) => item.id}
				refreshing={isRefetchingSessions}
				ListHeaderComponent={
					sessions.length > 1 ? RevokeOtherSessions : undefined
				}
				onRefresh={refetchSessions}
				renderItem={({ item }) => (
					<SessionCell
						{...item}
						isCurrentSession={item.id === currSession?.id}
					/>
				)}
			/>

			{maxNumSessionShown !== sessions.length ? (
				<PressableScale onPress={onSessionsExpand}>
					<Text
						style={{
							color: colors.palette.neutral700,
							marginBottom: 24,
							textAlign: "center",
						}}
					>
						And {sessions.length - maxNumSessionShown} More ...
					</Text>
				</PressableScale>
			) : (
				<PressableScale onPress={onSessionsCollapse}>
					<Text
						style={{
							color: colors.palette.neutral700,
							marginBottom: 24,
							textAlign: "center",
						}}
					>
						Collapse Sessions
					</Text>
				</PressableScale>
			)}
		</>
	);
}

SessionList.Loading = () => {
	const arr = getEmptyArr(3);

	return (
		<ListView
			data={arr}
			keyExtractor={(item) => item.toString()}
			renderItem={SessionCell.Loading}
		/>
	);
};
