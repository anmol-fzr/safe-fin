import { MarsIcon, TransgenderIcon, VenusIcon } from "lucide-react-native";
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

const genderOpts = [
	{ label: "Male", value: "male", Icon: MarsIcon },
	{ label: "Female", value: "female", Icon: VenusIcon },
	{ label: "Other", value: "other", Icon: TransgenderIcon },
] as const;

export { occupationOpts, educationLevels, genderOpts };
