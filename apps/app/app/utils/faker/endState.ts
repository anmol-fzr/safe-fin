import { faker } from "@faker-js/faker/locale/en";

const endOfListStates = [
	{
		emoji: "📘",
		title: "You're All Caught Up!",
		subtitle: "You've reached the end. Keep building strong financial habits.",
	},
	{
		emoji: "🏁",
		title: "End of the Road!",
		subtitle:
			"You've explored everything here. More financial lessons coming soon.",
	},
	{
		emoji: "💡",
		title: "Knowledge Gained!",
		subtitle: "You've completed this section. Apply what you've learned.",
	},
	{
		emoji: "📈",
		title: "Progress Made!",
		subtitle: "You've reviewed all available insights. Stay consistent.",
	},
	{
		emoji: "🧠",
		title: "Learning Complete!",
		subtitle:
			"You've covered all topics in this list. Keep growing financially.",
	},
	{
		emoji: "🪙",
		title: "Well Done!",
		subtitle:
			"You've reached the end. Smart money decisions start with knowledge.",
	},
	{
		emoji: "📊",
		title: "All Set!",
		subtitle:
			"You've gone through every item. More resources will be added soon.",
	},
	{
		emoji: "🏦",
		title: "Section Finished!",
		subtitle:
			"You've reached the end. Continue exploring other financial topics.",
	},
	{
		emoji: "🧾",
		title: "Nothing More Here!",
		subtitle: "You've reviewed all entries. Check back for future updates.",
	},
	{
		emoji: "✨",
		title: "Journey Complete!",
		subtitle:
			"You've reached the end. Financial confidence is built step by step.",
	},
] as const;

export const getGenericEndState = () => {
	return faker.helpers.arrayElement(endOfListStates);
};
