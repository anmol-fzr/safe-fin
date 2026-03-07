import { PressableScale } from "pressto";
import { useState } from "react";
import Animated, { FadeIn, FadingTransition } from "react-native-reanimated";
import { ListView, Text } from "@/components";
import { getEmptyArr } from "@/pkg/ui";
import { makeSpringy } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { useListSessions, useSession } from "../../hooks/queries";
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

	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<>
			<Animated.View layout={FadingTransition}>
				<ListView
					data={sessions.slice(0, maxNumSessionShown)}
					keyExtractor={(item) => item.id}
					refreshing={isRefetchingSessions}
					ListHeaderComponent={
						sessions.length > 1 ? RevokeOtherSessions : undefined
					}
					onRefresh={refetchSessions}
					renderItem={({ item, index }) => (
						<Animated.View entering={makeSpringy(FadeIn).delay(100 * index)}>
							<SessionCell
								{...item}
								isCurrentSession={item.id === currSession?.id}
							/>
						</Animated.View>
					)}
				/>
			</Animated.View>

			{sessions.length > maxNumSessionShown &&
				(maxNumSessionShown !== sessions.length ? (
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
								color: colors.textDim,
								marginBottom: 24,
								textAlign: "center",
							}}
						>
							Collapse Sessions
						</Text>
					</PressableScale>
				))}
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
