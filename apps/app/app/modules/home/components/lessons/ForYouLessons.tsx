import { Link } from "expo-router";
import { Suspense } from "react";
import { Text } from "@/components";
import { Section } from "@/components/Section";
import { ForYouLessonsImpl } from "./ForYouLessonsImpl";

export const ForYouLessons = () => {
	return (
		<Section>
			<Section.Header>
				<Section.Title>Recommended for you</Section.Title>

				<Link href="/tabs/learnings">
					<Link.Trigger>
						<Text>View all</Text>
					</Link.Trigger>
					<Link.Preview />
				</Link>
			</Section.Header>
			<Suspense fallback={<ForYouLessonsImpl.Loading horizontal />}>
				<ForYouLessonsImpl />
			</Suspense>
		</Section>
	);
};
