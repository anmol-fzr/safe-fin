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

const calculatorEmptyStates = [
	{
		emoji: "🧮",
		title: "No Calculators Yet",
		subtitle: "Calculators will appear here once they’re available.",
	},
	{
		emoji: "➕",
		title: "Nothing to Calculate",
		subtitle: "Looks like there are no calculators to show right now.",
	},
	{
		emoji: "📊",
		title: "No Tools Found",
		subtitle: "Try checking back later for financial calculators.",
	},
	{
		emoji: "🪄",
		title: "Ready to Crunch Numbers",
		subtitle: "use calculators to start estimating.",
	},
	{
		emoji: "💸",
		title: "No Finance Tools",
		subtitle: "Financial calculators will show up here soon.",
	},
	{
		emoji: "🔎",
		title: "No Calculator Matches",
		subtitle: "Try adjusting your search or filters.",
	},
	{
		emoji: "⚙",
		title: "Calculators Coming Soon",
		subtitle: "We’re preparing tools to help you estimate finances.",
	},
] as const;

const getCalculatorEmptyState = () => {
	return faker.helpers.arrayElement(calculatorEmptyStates);
};

export { getCalculatorEmptyState, getGenericEmptyState };
