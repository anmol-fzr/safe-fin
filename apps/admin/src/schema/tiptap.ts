import * as yup from "yup";

const tiptapMark = yup.object({
	type: yup.string().required(),
	attrs: yup.object().optional(), // loosely allow any object for attributes
});

const tiptapNode: yup.Schema<any> = yup.lazy(() =>
	yup.object({
		type: yup.string().required(),
		// Text content for text nodes
		text: yup.string().optional(),
		// Attributes for block nodes (level, alignment, etc.)
		attrs: yup.object().optional(),
		// Recursion: 'content' is an array of this very same schema
		content: yup.array().of(tiptapNode).optional(),
		// Inline marks (bold, italic, etc.)
		marks: yup.array().of(tiptapMark).optional(),
	}),
);

export const tiptapContentSchema = yup.object({
	type: yup.string().oneOf(["doc"]).required(),
	content: yup.array().of(tiptapNode).required(),
});
