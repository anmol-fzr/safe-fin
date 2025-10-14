import type { Options } from "@/components/SelectField";

const occupationOpts: Options = [
	{
		label: "Salaried",
		value: "salaried",
	},
	{
		label: "Self Employed",
		value: "self-employed",
	},
	{
		label: "Student",
		value: "student",
	},
	{
		label: "Non Working",
		value: "non-working",
	},
];

const educationLevels: Options = [
	{
		label: "High School",
		value: "high-school",
	},
	{
		label: "Graduate",
		value: "graduate",
	},
	{
		label: "Post Graduate",
		value: "post-graduate",
	},
];
// const genders = ["male", "female", "others"] as const;

const genderOpts: Options = [
	{ label: "Male", value: "male" },
	{ label: "Female", value: "female" },
	{ label: "Other", value: "other" },
];

export { occupationOpts, educationLevels, genderOpts };
