import { faker } from "@faker-js/faker/locale/en";

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
