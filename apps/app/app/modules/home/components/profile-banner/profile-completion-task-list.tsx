import { $lgGap, ListView } from "@/components";
import { useAppTheme } from "@/utils/useAppTheme";
import {
	type Item,
	ProfileCompletionTaskListItem,
} from "./profile-completion-task-list-item";

interface ProfileCompletionTaskListProps {
	tasks: Item[];
}

export const ProfileCompletionTaskList = (
	props: ProfileCompletionTaskListProps,
) => {
	const { tasks } = props;
	const { themed } = useAppTheme();

	return (
		<ListView
			data={tasks}
			keyExtractor={(item) => item.title}
			contentContainerStyle={themed($lgGap)}
			renderItem={({ item, index }) => (
				<ProfileCompletionTaskListItem
					task={item}
					tasks={tasks}
					index={index}
				/>
			)}
		/>
	);
};
