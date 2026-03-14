import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Link } from "@tanstack/react-router";
import {
	Add,
	ArrowDown,
	ArrowUp,
	Edit2,
	InfoCircle,
	Trash,
} from "iconsax-reactjs";
import { useMemo, useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	useDeleteChapter,
	useDeleteUnit,
	useReorderChapters,
	useReorderUnits,
} from "@/modules/courses/hooks/mutations";
import { useGetCourse } from "@/modules/courses/hooks/queries";
import { NewChapterForm } from "@/modules/courses/components/chapter-form/NewChapterForm";
import { useToggle } from "@/pkg/ui";
import type { ResourceId } from "@/services/api/types";
import { NewUnitForm } from "@/modules/courses/components/unit-form/NewUnitForm";
import { useGetExercise } from "../../hooks/queries";
import {
	NewQuestionForm,
	useNewQuestionForm,
} from "../question-form/NewQuestionForm";
import { NewOptionForm, useNewOptionForm } from "../option-form/NewOptionForm";
import { useCreateOption, useCreateQuestion } from "../../hooks/mutations";
import { cn } from "@/lib/utils";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";

interface CurriculumBuilderProps {
	exerciseId: ResourceId;
}

export const ExerciseBuilder = (props: CurriculumBuilderProps) => {
	const { exerciseId } = props;

	const [autoAnimateRef] = useAutoAnimate();

	const {
		isOpen: isQuestionFormOpen,
		onOpen: openQuestionForm,
		onClose: closeQuestionForm,
	} = useToggle();

	const [newOptionQuestionId, setNewOptionQuestionId] = useState<number | null>(
		null,
	);

	const { exercise } = useGetExercise(exerciseId);

	// Mutations
	const { deleteChapter } = useDeleteChapter();
	const { reorderquestions } = useReorderChapters();
	const { deleteUnit } = useDeleteUnit();
	const { reorderUnits } = useReorderUnits();

	const handleDeleteChapter = (chapterId: number) => {
		if (
			confirm(
				"Are you sure you want to delete this chapter? All units will be deleted.",
			)
		) {
			deleteChapter(chapterId);
		}
	};

	const handleDeleteUnit = (unitId: number) => {
		if (confirm("Are you sure you want to delete this unit?")) {
			deleteUnit(unitId);
		}
	};

	const handleMoveChapter = (fromIndex: number, toIndex: number) => {
		if (!exercise.questions) return;

		const reordered = [...exercise.questions];
		const [moved] = reordered.splice(fromIndex, 1);
		reordered.splice(toIndex, 0, moved);

		const updates = reordered.map((ch, idx) => ({ id: ch.id, index: idx }));
		reorderquestions({
			exerciseId,
			questions: updates,
		});
	};

	const handleMoveUnit = (
		chapterId: number,
		fromIndex: number,
		toIndex: number,
	) => {
		const chapter = exercise.questions?.find((ch) => ch.id === chapterId);
		if (!chapter?.units) return;

		const reordered = [...chapter.units];
		const [moved] = reordered.splice(fromIndex, 1);
		reordered.splice(toIndex, 0, moved);

		const updates = reordered.map((unit, idx) => ({ id: unit.id, index: idx }));
		reorderUnits(updates);
	};

	const nextUnitIndex = 0;

	const nextChapterIndex = useMemo(() => {
		const nextIndex = exercise.questions?.length || 0;

		return nextIndex;
	}, [exercise.questions.length]);

	const newQuestionForm = useNewQuestionForm();
	const { createQuestion } = useCreateQuestion();

	const handleNewQuestionSubmit = newQuestionForm.handleSubmit((data) => {
		createQuestion(
			{
				...data,
				exerciseId,
			},
			{
				onSuccess() {
					closeQuestionForm();
				},
			},
		);
	});

	const { createOption } = useCreateOption();

	const newOptionForm = useNewOptionForm();
	const handleNewOptionSubmit = newOptionForm.handleSubmit((data) => {
		createOption(
			{
				...data,
				questionId: newOptionQuestionId,
			},
			{
				onSuccess() {
					setNewOptionQuestionId(null);
				},
			},
		);
	});

	return (
		<div className="w-full max-w-4xl mx-auto">
			<Card>
				<CardHeader>
					<div className="flex justify-between items-center">
						<CardTitle>Exercise Curriculum</CardTitle>
						<Button variant="outline" onClick={openQuestionForm}>
							<Add className="w-4 h-4 mr-2" />
							Add Question
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<div ref={autoAnimateRef} className="space-y-4">
						{isQuestionFormOpen && (
							<Card className="border-2 border-dashed">
								<CardContent className="pt-6">
									<NewQuestionForm
										form={newQuestionForm}
										handleSubmit={handleNewQuestionSubmit}
										onCancel={closeQuestionForm}
										// index={nextChapterIndex}
										// exerciseId={exerciseId}
										// onCancel={closeChapterForm}
									/>
								</CardContent>
							</Card>
						)}

						{/* questions List */}
						{exercise.questions && exercise.questions.length > 0 ? (
							<Accordion type="multiple" className="space-y-2">
								{exercise.questions.map((question, chapterIndex) => {
									const isFirst = chapterIndex === 0;
									const isLast =
										chapterIndex === exercise.questions!.length - 1;

									return (
										<AccordionItem
											key={question.id}
											value={`chapter-${question.id}`}
											className={cn(
												"border rounded-lg ",
												//question.answerId ? "" : "border-2 border-red-400",
											)}
										>
											<AccordionTrigger className="px-4 hover:no-underline">
												<div className="flex items-center justify-between w-full pr-4">
													<div className="flex items-center gap-3">
														<span className="font-semibold text-sm text-muted-foreground">
															{chapterIndex + 1}.
														</span>
														<span className="font-medium">
															{question.question}
														</span>
														<span className="text-xs text-muted-foreground">
															({question.options?.length || 0} Options)
														</span>

														{question.answerId ? (
															""
														) : (
															<span className="text-xs text-destructive ">
																(No Answer Selected)
																<Tooltip>
																	<TooltipTrigger>
																		<InfoCircle className="m-auto" size={16} />
																	</TooltipTrigger>
																	<TooltipContent>
																		Without any answer selected, this Question
																		Won't appear to Users in Exercise
																	</TooltipContent>
																</Tooltip>
															</span>
														)}
													</div>
													<ButtonGroup className="group-hover:opacity-100 transition-opacity">
														<Button
															variant="ghost"
															size="sm"
															onClick={(e) => {
																e.stopPropagation();
																handleDeleteChapter(question.id);
															}}
														>
															<Trash className="w-4 h-4 text-red-500" />
														</Button>
														{!isFirst && (
															<Button
																variant="ghost"
																size="sm"
																onClick={(e) => {
																	e.stopPropagation();
																	handleMoveChapter(
																		chapterIndex,
																		chapterIndex - 1,
																	);
																}}
															>
																<ArrowUp className="w-4 h-4" />
															</Button>
														)}
														{!isLast && (
															<Button
																variant="ghost"
																size="sm"
																onClick={(e) => {
																	e.stopPropagation();
																	handleMoveChapter(
																		chapterIndex,
																		chapterIndex + 1,
																	);
																}}
															>
																<ArrowDown className="w-4 h-4" />
															</Button>
														)}
													</ButtonGroup>
												</div>
											</AccordionTrigger>
											<AccordionContent className="px-4 pb-4">
												<div className="space-y-3 mt-2">
													<div className="flex items-center justify-between p-3 bg-muted/50 rounded-md group hover:bg-muted transition-colors">
														<div className="flex items-center gap-3">
															<span className="text-sm text-muted-foreground">
																Hint/Reason: {question.reason}
															</span>
														</div>
													</div>

													{/* Units List */}
													{question.options && question.options.length > 0 ? (
														<div className="space-y-2 pl-4 border-l-2 border-muted">
															{question.options.map((option, optionIndex) => {
																const isFirstUnit = optionIndex === 0;
																const isLastUnit =
																	optionIndex === question.options!.length - 1;

																return (
																	<div
																		key={option.id}
																		className="flex items-center justify-between p-3 bg-muted/50 rounded-md group hover:bg-muted transition-colors"
																	>
																		<div className="flex items-center gap-3">
																			<span className="text-sm text-muted-foreground">
																				{chapterIndex + 1}.{optionIndex + 1}
																			</span>
																			<div>
																				<p className="font-medium text-sm">
																					{option.value || "Untitled Unit"}
																				</p>
																			</div>
																		</div>
																		<ButtonGroup className="opacity-0 group-hover:opacity-100 transition-opacity">
																			<Button variant="ghost" size="sm" asChild>
																				<Link
																					to="/dashboard/units/$unitId/edit"
																					params={{
																						unitId: option.id.toString(),
																					}}
																				>
																					<Edit2 className="w-3 h-3" />
																				</Link>
																			</Button>

																			<Button
																				variant="ghost"
																				size="sm"
																				onClick={() =>
																					handleDeleteUnit(option.id)
																				}
																			>
																				<Trash className="w-3 h-3" />
																			</Button>
																			{!isFirstUnit && (
																				<Button
																					variant="ghost"
																					size="sm"
																					onClick={() =>
																						handleMoveUnit(
																							question.id,
																							optionIndex,
																							optionIndex - 1,
																						)
																					}
																				>
																					<ArrowUp className="w-3 h-3" />
																				</Button>
																			)}
																			{!isLastUnit && (
																				<Button
																					variant="ghost"
																					size="sm"
																					onClick={() =>
																						handleMoveUnit(
																							question.id,
																							optionIndex,
																							optionIndex + 1,
																						)
																					}
																				>
																					<ArrowDown className="w-3 h-3" />
																				</Button>
																			)}
																		</ButtonGroup>
																	</div>
																);
															})}
														</div>
													) : (
														<p className="text-sm text-muted-foreground pl-4">
															No Options yet. Add your first option below.
														</p>
													)}

													{newOptionQuestionId === question.id ? (
														<Card className="border-2 border-dashed ml-4">
															<CardContent className="pt-6">
																<NewOptionForm
																	form={newOptionForm}
																	handleSubmit={handleNewOptionSubmit}
																	onCancel={() => {
																		setNewOptionQuestionId(null);
																	}}
																/>
															</CardContent>
														</Card>
													) : (
														<Button
															variant="outline"
															type="button"
															size="sm"
															className="ml-4"
															onClick={() =>
																setNewOptionQuestionId(question.id)
															}
														>
															<Add className="w-4 h-4 mr-2" />
															Add Option
														</Button>
													)}
												</div>
											</AccordionContent>
										</AccordionItem>
									);
								})}
							</Accordion>
						) : (
							<div className="text-center py-12 text-muted-foreground">
								<p>
									No questions yet. Create your first chapter to get started.
								</p>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
