import {
	$baseListItemSeparatorStyles,
	EmptyListView,
	ListView,
	Screen,
	Tabs,
	Text,
} from "@/components";
import { SavedCourseCard } from "@/modules/lesson/components/saved/SavedCourseCard";
import { SavedCoursesList } from "@/modules/lesson/components/saved/SavedCoursesList";
import { useGetSavedCourses } from "@/modules/lesson/hooks/api";
import { $styles } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

const tabs = [
	{
		label: "Courses",
		value: "courses",
	},
	{
		label: "Chapters",
		value: "chapters",
	},
	// {
	// 	label: "Units",
	// 	value: "units",
	// },
	{
		label: "Exercises",
		value: "exercises",
	},
];

export default function SavedScreen() {
	return (
		<Screen preset="scroll" style={$styles.container}>
			<Tabs defaultValue="courses" className="w-[400px]">
				<Tabs.List>
					{tabs.map((tab) => (
						<Tabs.Trigger
							key={tab.value}
							value={tab.value}
							textStyle={{ fontSize: 12 }}
						>
							{tab.label}
						</Tabs.Trigger>
					))}
				</Tabs.List>

				<Tabs.Content value="courses">
					<SavedCoursesList />
				</Tabs.Content>

				<Tabs.Content value="chapters">
					<EmptyListView />
				</Tabs.Content>

				<Tabs.Content value="exercises">
					<EmptyListView />
				</Tabs.Content>
			</Tabs>
		</Screen>
	);
}
