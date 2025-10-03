import { Suspense } from "react";
import { ListView } from "@/components";
import { useGetLessonTopics } from "../hooks/api";
import { TopicListItem } from "./TopicListItem";

export function TopicList() {
	return (
		<Suspense fallback={TopicListImpl.Loading}>
			<TopicListImpl />
		</Suspense>
	);
}

function TopicListImpl() {
	const { topics } = useGetLessonTopics();
	return (
		<ListView
			horizontal
			data={topics}
			estimatedItemSize={105}
			keyExtractor={(item) => item.title}
			renderItem={({ item, index }) => (
				<TopicListItem
					isFirst={index === 0}
					isLast={index === topics.length - 1}
					title={item.title}
				/>
			)}
		/>
	);
}

TopicListImpl.Loading = (
	<ListView
		horizontal
		data={[1, 2, 3]}
		estimatedItemSize={105}
		keyExtractor={(item) => item.toString()}
		renderItem={TopicListItem.Loading}
	/>
);
