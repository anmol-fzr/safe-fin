import { getRandomizer } from ".";

const lockedUnitMessages = [
	"Level still locked 🔐",
	"Locked for now",
	"Grind First, Unlock later",
];

export const getRandomLockedUnitMessage = getRandomizer(lockedUnitMessages);
