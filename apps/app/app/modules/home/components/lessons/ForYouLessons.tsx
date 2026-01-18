import { Link } from "expo-router";
import { Suspense } from "react";
import { View } from "react-native";
import { Text } from "@/components";
import { Section } from "@/components/Section";
import { ForYouLessonsImpl } from "./ForYouLessonsImpl";

export const ForYouLessons = () => {
	return (
		<Section>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Section.Title>Recommended for you</Section.Title>

				<Link href="/tabs/learnings">
					<Link.Trigger>
						<Text>View all</Text>
					</Link.Trigger>
					<Link.Preview />
				</Link>
			</View>
			<Suspense fallback={<ForYouLessonsImpl.Loading horizontal />}>
				<ForYouLessonsImpl />
			</Suspense>
		</Section>
	);
};
