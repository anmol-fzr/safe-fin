import { faker } from "@faker-js/faker/locale/en";
import type { InsertUser } from "@/schema";

const getFakeUser = (): InsertUser => {
	const isBanned = faker.datatype.boolean();

	return {
		id: faker.string.nanoid(),
		name: faker.person.fullName(),
		bio: faker.person.bio(),
		email: faker.internet.email().toLowerCase(),
		emailVerified: faker.datatype.boolean(),
		phoneNumber: faker.phone.number(),
		banned: isBanned,
		role: "user",
		banReason: isBanned ? faker.word.words(5) : "",
	};
};

const getFakeUsers = (len = 10): InsertUser[] => {
	const fakerUsers: InsertUser[] = [];

	for (let i = 0; i < len; i++) {
		fakerUsers.push(getFakeUser());
	}

	return fakerUsers;
};

export { getFakeUsers };
