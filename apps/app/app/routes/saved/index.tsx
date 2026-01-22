import { Screen, Text, Tabs } from "@/components";
import { View } from "react-native";
import { useGetSavedCourses } from "@/modules/lesson/hooks/api";
import { $styles } from "@/theme";

export default function SavedScreen() {
	const { courses } = useGetSavedCourses();

	return (
		<Screen preset="scroll" style={$styles.container}>
			<Tabs defaultValue="courses" className="w-[400px]">
				<Tabs.List>
					<Tabs.Trigger value="courses" textStyle={{ fontSize: 12 }}>
						Courses
					</Tabs.Trigger>
					<Tabs.Trigger value="chapter" textStyle={{ fontSize: 12 }}>
						Chapters
					</Tabs.Trigger>
					<Tabs.Trigger value="unit" textStyle={{ fontSize: 12 }}>
						Units
					</Tabs.Trigger>
					<Tabs.Trigger value="exercise" textStyle={{ fontSize: 12 }}>
						Exercise
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="courses">
					<Text>Courses</Text>
				</Tabs.Content>

				<Tabs.Content value="chapter">
					<Text>Chapters</Text>
				</Tabs.Content>

				<Tabs.Content value="unit">
					<Text>Unit</Text>
				</Tabs.Content>

				<Tabs.Content value="exercise">
					<Text>Exercise</Text>
				</Tabs.Content>
			</Tabs>
		</Screen>
	);
}
