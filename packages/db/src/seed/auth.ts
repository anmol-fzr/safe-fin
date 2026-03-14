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

const getRealUsers = (len = 10): InsertUser[] => {
	const realUsers: InsertUser[] = [
		{
			id: faker.string.nanoid(),
			name: "Anmol",
			bio: faker.person.bio(),
			email: "anmol_dev@getsafefin.app",
			emailVerified: true,
			role: "user",
		},
		{
			id: faker.string.nanoid(),
			name: "Anmol Admin",
			bio: faker.person.bio(),
			email: "anmol_admin@getsafefin.app",
			emailVerified: true,
			role: "admin",
		},
	];

	return realUsers;
};

export { getFakeUsers, getRealUsers };
