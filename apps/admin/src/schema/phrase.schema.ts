import { object, string } from "yup";

const getPhraseSchema = (phrase: string) => {
	const schema = object({
		name: string()
			.matches(new RegExp(phrase), {
				excludeEmptyString: true,
				message: `Must match ${phrase}`,
			})
			.required("Please: Type to Confirm Deletion"),
	});

	return schema;
};

export { getPhraseSchema };
