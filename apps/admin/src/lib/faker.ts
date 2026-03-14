import { faker } from "@faker-js/faker";

const getPhonePlaceholder = () => {
	return faker.helpers.fromRegExp("[6-9]{3}[0-9]{2}-[0-9]{5}");
};

export { getPhonePlaceholder };
