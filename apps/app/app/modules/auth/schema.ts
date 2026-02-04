import * as Yup from "yup";

const phoneNumber = Yup.number()
	.positive()
	.integer()
	.test(
		"is-of-10-length",
		"Invalid Phone Number",
		(value) => value?.toString().length === 10,
	)
	.typeError("Enter a valid Phone Number")
	.label("Phone Number")
	.required();

const otp = Yup.number()
	.positive()
	.integer()
	.label("OTP")
	.typeError("Enter a valid OTP");
// .test("is-of-6-length", "OTP must be of 6 digits", (value) => {
// 	return value?.toString().length === 6;
// });

const email = Yup.string()
	.email()
	.required()
	.label("Email")
	.typeError("Enter a valid Email address");

const loginSchema = Yup.object().shape({
	email,
	//otp,
});

const registerSchema = Yup.object({
	name: Yup.string().required().label("Name"),
	email,
});

//const profileSchema = registerSchema.concat(loginSchema.pick(["phoneNumber"]));
const profileSchema = Yup.object({
	name: Yup.string().required().label("Name"),
	email,
	image: Yup.string(),
	bio: Yup.string().required().label("Bio"),
});

export { loginSchema, registerSchema, profileSchema };
