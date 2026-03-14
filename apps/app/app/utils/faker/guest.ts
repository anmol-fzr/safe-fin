import { getRandomizer } from ".";

const guestModeMessages = [
	"You’re exploring as a guest 👀. Log in to unlock the cool stuff and make the most of the app!",
	"Guest vibes only get you so far 😅. Sign in to save progress and access all features!",
	"Hey there, guest! 🚪 Some doors stay locked till you log in. Wanna open them?",
	"You’re just visiting right now. Log in to personalize your experience and go full access mode 🔓.",
	"Guest mode = limited mode. Sign in to level up and use all the good stuff ✨.",
];

export const getGuestMessage = getRandomizer(guestModeMessages);
