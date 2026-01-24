import * as Yup from "yup";

const unitSchema = Yup.object({
	title: Yup.string().required("Unit title is required").min(3).max(256),
	shortDesc: Yup.string()
		.required("Short description is required")
		.min(10)
		.max(500),
	content: Yup.mixed(),
	points: Yup.number().min(0).default(10),
	isPublished: Yup.boolean().default(false).label("Published / Draft"),
});

export const newUnitSchema = unitSchema;
