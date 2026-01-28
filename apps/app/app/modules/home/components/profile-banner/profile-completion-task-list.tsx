import { ListView } from "@/components";
import { useAppTheme } from "@/utils/useAppTheme";
import { ProfileCompletionTaskListItem } from "./profile-completion-task-list-item";
import { Item } from "./profile-completion-task-list-item";

export const ProfileCompletionTaskList = ({ tasks }: { tasks: Item[] }) => {
	const {
		theme: { spacing },
	} = useAppTheme();
	return (
		<ListView
			data={tasks}
			keyExtractor={(item) => item.title}
			contentContainerStyle={{ gap: spacing.lg }}
			style={{
				paddingInline: spacing.xxs,
				paddingBlock: spacing.xs,
			}}
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
