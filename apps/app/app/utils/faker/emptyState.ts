import { faker } from "@faker-js/faker/locale/en";

interface EmptyStateItem {
	emoji: string;
	title: string;
	subtitle: string;
}

const emptyStates: EmptyStateItem[] = [
	// {
	// 	emoji: "📚",
	// 	title: "No Lessons Yet!",
	// 	subtitle: "Check back soon for new financial literacy lessons.",
	// },
	// {
	// 	emoji: "🔍",
	// 	title: "Nothing Found!",
	// 	subtitle: "Try adjusting your filters or search query.",
	// },
	{
		emoji: "🕒",
		title: "Coming Soon!",
		subtitle: "We’re preparing something special for you.",
	},
	{
		emoji: "😌",
		title: "All Caught Up!",
		subtitle: "You’ve completed all lessons. Great job!",
	},
	// {
	// 	emoji: "💡",
	// 	title: "No Tips Available!",
	// 	subtitle: "We’ll add fresh insights shortly. Stay tuned.",
	// },
	// {
	// 	emoji: "🤔",
	// 	title: "Hmm… Nothing Here!",
	// 	subtitle: "Seems like this section is still under development.",
	// },
	{
		emoji: "📭",
		title: "Empty Inbox!",
		subtitle: "No notifications or updates right now.",
	},
	{
		emoji: "🧩",
		title: "No Quizzes Yet!",
		subtitle: "We’re working on interactive content for you.",
	},
	{
		emoji: "🚧",
		title: "Under Construction!",
		subtitle: "We’re still building this section. Check again later.",
	},
	{
		emoji: "🌱",
		title: "No Progress Yet!",
		subtitle: "Start your first lesson to begin your learning journey.",
	},
];

const genericEmptyStates = [
	{
		emoji: "📭",
		title: "Nothing Here!",
		subtitle: "Looks like there's nothing to show right now.",
	},
	{
		emoji: "🔍",
		title: "No Results!",
		subtitle: "Try changing your search or filters.",
	},
	{ emoji: "🕒", title: "Coming Soon!", subtitle: "Stay tuned for updates." },
	{
		emoji: "📦",
		title: "Empty Space!",
		subtitle: "There’s nothing inside yet.",
	},
	{
		emoji: "💭",
		title: "No Data!",
		subtitle: "We couldn’t find anything to display.",
	},
	{ emoji: "😶", title: "Oops!", subtitle: "Seems a bit empty around here." },
	{
		emoji: "🌱",
		title: "Getting Started!",
		subtitle: "Add something to begin.",
	},
	{
		emoji: "🚫",
		title: "Unavailable!",
		subtitle: "Content not available at the moment.",
	},
	{
		emoji: "✨",
		title: "Nothing Yet!",
		subtitle: "New things will appear here soon.",
	},
	{
		emoji: "📃",
		title: "No Content!",
		subtitle: "Check back later for updates.",
	},
] as const;

const getGenericEmptyState = () => {
	return faker.helpers.arrayElement(genericEmptyStates);
};

export { getGenericEmptyState };
