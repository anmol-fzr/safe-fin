import { memo, useCallback, useEffect } from "react";
import { useYupForm } from "@/hooks/form/useYupForm";
import { newQuizSchema } from "@/schema/quiz";
import {
	FormProvider,
	useFieldArray,
	useFormContext,
	useWatch,
} from "react-hook-form";
import { XIcon as IconX, InfoIcon } from "lucide-react";
import { FormInput } from "../form/form-input";
import { formatOrdinals } from "@/lib/utils";
import { AddButton } from "../form/button/AddButton";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Button } from "../ui/button";
import { FormTextarea } from "../form/form-textarea";
import { FormSelect } from "../form/form-select";
import { useCreateQuiz } from "@/hooks/api/quiz";

const p = "You know its just a placeholder";
const placeholders = [
	{
		question: "Who is Bruce Wayne better known as?",
		options: ["Spider-Man", "Batman", "Iron Man", "Superman"],
		answer: "Batman",
	},
	{
		question: "Which superhero is known as the 'Man of Steel'?",
		options: ["Hulk", "Superman", "Thor", "Doctor Strange"],
		answer: "Superman",
	},
	{
		question: "What is the name of Thor’s hammer?",
		options: ["Stormbreaker", "Mjolnir", "Excalibur", "Andúril"],
		answer: "Mjolnir",
	},
	{
		question: "Which Hogwarts house is Harry Potter in?",
		options: ["Ravenclaw", "Slytherin", "Gryffindor", "Hufflepuff"],
		answer: "Gryffindor",
	},
	{
		question: "Which character says 'I am inevitable'?",
		options: ["Thanos", "Loki", "Ultron", "Red Skull"],
		answer: "Thanos",
	},
	{
		question: "Which planet is known as the Red Planet?",
		options: ["Mars", "Venus", "Jupiter", "Mercury"],
		answer: "Mars",
	},
	{
		question: "What is the capital of France?",
		options: ["London", "Berlin", "Madrid", "Paris"],
		answer: "Paris",
	},
	{
		question: "Which app is owned by Meta?",
		options: ["Snapchat", "Telegram", "Instagram", "TikTok"],
		answer: "Instagram",
	},
	{
		question: "In cricket, how many runs is a 'six' worth?",
		options: ["4", "5", "6", "3"],
		answer: "6",
	},
	{
		question: "Which Indian city is called the 'Pink City'?",
		options: ["Udaipur", "Jodhpur", "Jaipur", "Bikaner"],
		answer: "Jaipur",
	},
];

const infos = ["Minimum 3 Question per Quiz", "Minimum 3 Options per Question"];

const InfoCard = memo(() => (
	<div className=" bg-destructive  text-destructive-foreground  border border-border p-2 rounded-md max-w-sm">
		<p className="ml-2 text-sm font-semibold">Note:</p>
		<ul className="text-sm p-2">
			{infos.map((info) => (
				<li key={info}>
					<InfoIcon className="inline mr-1" size={18} />
					{info}
				</li>
			))}
		</ul>
	</div>
));

export function NewQuizForm() {
	const form = useYupForm({
		schema: newQuizSchema,
	});

	const { createQuiz } = useCreateQuiz();

	const onSubmit = form.handleSubmit((data) => {
		createQuiz(data);
	});

	return (
		<FormProvider {...form}>
			<div className="flex justify-between gap-8">
				<div className="w-full space-y-4">
					<InfoCard />
					<form onSubmit={onSubmit} className="grid gap-1">
						<FormInput
							name="title"
							label="Title"
							placeholder="Know Your Superheroes"
						/>
						<FormTextarea
							name="desc"
							label="Description"
							placeholder="A quick quiz to test your knowledge about iconic characters from comics and movies."
						/>

						<NewQuestionForm />
						<Button type="submit">Submit</Button>
					</form>
				</div>
			</div>
		</FormProvider>
	);
}

function NewQuestionForm() {
	const form = useFormContext();
	const [animate] = useAutoAnimate();

	const {
		fields: questions,
		append: appendQuestion,
		remove: removeQuestion,
	} = useFieldArray({
		name: "questions",
		control: form.control,
	});

	const handleAddNewQuestion = useCallback(
		() =>
			appendQuestion({
				question: "",
				options: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
			}),
		[],
	);

	useEffect(() => {
		if (questions.length === 0) {
			handleAddNewQuestion();
		}
	}, [questions.length === 0]);

	return (
		<fieldset className="gap-4 border @container border-border p-3 rounded-md w-full">
			<legend>Questions</legend>
			<AddButton className="ml-auto mr-0" onClick={handleAddNewQuestion}>
				Add Question
			</AddButton>
			{/*
			<div ref={animate} className="grid gap-3 @lg:grid-cols-2 @xl:grid-cols-4">
      */}
			<div
				ref={animate}
				className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
			>
				{questions.map((question, index) => (
					<QuestionField
						key={question.id}
						index={index}
						remove={removeQuestion}
					/>
				))}
			</div>
		</fieldset>
	);
}

const OptionsField = memo(({ questionIndex }: { questionIndex: number }) => {
	const [animate] = useAutoAnimate();
	const { control } = useFormContext();

	const {
		fields: optionFields,
		append,
		remove,
	} = useFieldArray({
		name: `questions.${questionIndex}.options`,
		control,
	});

	const handleAddNewOption = useCallback(() => append({ value: "" }), []);
	return (
		<fieldset className="grid gap-4 border border-border p-3 rounded-md">
			<legend className="font-medium">Options</legend>
			<div className="flex items-center justify-between ml-auto mr-0">
				<AddButton onClick={handleAddNewOption}>Add Option</AddButton>
			</div>

			<div ref={animate} className="grid gap-2">
				{optionFields.map((option, optIndex) => (
					<div key={option.id} className="relative">
						{optIndex > 2 && (
							<button
								type="button"
								className="text-destructive-foreground absolute top-1 right-2"
								onClick={() => remove(optIndex)}
							>
								<IconX size={16} />
							</button>
						)}

						<FormInput
							name={`questions.${questionIndex}.options.${optIndex}.value`}
							placeholder={placeholders?.[questionIndex].options[optIndex] ?? p}
							label={`${formatOrdinals(optIndex + 1)} Option`}
						/>
					</div>
				))}
			</div>
		</fieldset>
	);
});

const QuestionField = memo(
	({ index, remove }: { index: number; remove: Function }) => {
		const onRemove = useCallback(() => remove(index), [index, remove]);
		const { control } = useFormContext();

		const optionVals: { value: string }[] = useWatch({
			control,
			name: `questions.${index}.options`,
		});

		const options = [];

		for (let i = 0; i < optionVals.length; i++) {
			const value = optionVals[i].value;
			if (value) {
				options.push({ label: value, value });
			}
		}

		if (options.length === 0) {
			options.push({
				label: "Select a Answer From Options",
				value: "select",
			});
		}

		return (
			<div className="relative grid gap-2 bg-muted border border-neutral-800 p-4 rounded-md">
				{index > 2 && (
					<button
						className="text-destructive-foreground absolute top-3 right-3"
						onClick={onRemove}
					>
						<IconX size={18} />
					</button>
				)}
				<FormInput
					label={`${formatOrdinals(index + 1)} Question`}
					placeholder={placeholders?.[index].question ?? p}
					name={`questions.${index}.question`}
				/>
				<OptionsField questionIndex={index} />
				<FormSelect
					label="Answer"
					name={`questions.${index}.answer`}
					placeholder={placeholders?.[index].answer ?? p}
					options={options}
				/>
			</div>
		);
	},
);
