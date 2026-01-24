import { useAutoAnimate } from "@formkit/auto-animate/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Add, ArrowDown, ArrowUp, Edit2, Trash } from "iconsax-reactjs";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { DraftPublishSwitch } from "@/components/DraftPublishSwitch";
import { convertJsonToMarkdown } from "@/components/editor/Editor";
import { FormEditor } from "@/components/form/form-editor";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
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
	useCreateChapter,
	useCreateUnit,
	useDeleteChapter,
	useDeleteUnit,
	useReorderChapters,
	useReorderUnits,
	useUpdateChapter,
} from "../hooks/mutations";
import { getCourseOpts } from "../hooks/queries";
import { newUnitSchema } from "../schema/unit.schema";

interface CurriculumBuilderProps {
	courseId: string;
}

// Schema for creating a new chapter
const newChapterSchema = Yup.object({
	title: Yup.string().required("Chapter title is required").min(3).max(256),
	isPublished: Yup.boolean().default(false).label("Published / Draft"),
});

export const CurriculumBuilder = (props: CurriculumBuilderProps) => {
	const { courseId } = props;

	const [autoAnimateRef] = useAutoAnimate();
	const [showNewChapterForm, setShowNewChapterForm] = useState(false);
	const [showNewUnitForm, setShowNewUnitForm] = useState<number | null>(null);

	// Fetch course data with chapters and units
	const { data: courseData } = useSuspenseQuery(
		getCourseOpts(Number(props.courseId)),
	);
	const course = courseData.data;

	// Mutations
	const { createChapter } = useCreateChapter();
	const { deleteChapter } = useDeleteChapter();
	const { reorderChapters } = useReorderChapters();
	const { createUnit } = useCreateUnit();
	const { deleteUnit } = useDeleteUnit();
	const { reorderUnits } = useReorderUnits();

	// Form for new chapter
	const newChapterForm = useForm({
		resolver: yupResolver(newChapterSchema),
		defaultValues: {
			title: "",
			isPublished: false,
		},
	});

	const newUnitForm = useForm({
		resolver: yupResolver(newUnitSchema),
		defaultValues: {
			title: "",
			shortDesc: "",
			content: "",
			points: 10,
			isPublished: false,
		},
	});

	const handleCreateChapter = newChapterForm.handleSubmit((data) => {
		const nextIndex = course.chapters?.length || 0;

		createChapter(
			{
				courseId: Number(props.courseId),
				chapters: [{ title: data.title, index: nextIndex }],
				isPublished: data.isPublished,
			},
			{
				onSuccess: () => {
					newChapterForm.reset();
					setShowNewChapterForm(false);
				},
			},
		);
	});

	// onSubmit={newUnitForm.handleSubmit((data) =>
	// 	handleCreateUnit(chapter.id, data),
	// )}

	const handleCreateUnit = (
		chapterId: number,
		data: {
			title: string;
			shortDesc: string;
			content: any;
			points: number;
			isPublished: boolean;
		},
	) => {
		const chapter = course.chapters?.find((ch) => ch.id === chapterId);
		const nextIndex = chapter?.units?.length || 0;

		const markdown = convertJsonToMarkdown(data.content);

		createUnit(
			{
				chapterId,
				units: [
					{
						title: data.title,
						shortDesc: data.shortDesc,
						longDesc: {
							content: markdown,
							contentJson: data.content,
						},
						points: data.points,
						index: nextIndex,
						isPublished: data.isPublished,
					},
				],
			},
			{
				onSuccess: () => {
					newUnitForm.reset();
					setShowNewUnitForm(null);
				},
			},
		);
	};

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
		if (!course.chapters) return;

		const reordered = [...course.chapters];
		const [moved] = reordered.splice(fromIndex, 1);
		reordered.splice(toIndex, 0, moved);

		const updates = reordered.map((ch, idx) => ({ id: ch.id, index: idx }));
		reorderChapters({
			courseId,
			chapters: updates,
		});
	};

	const handleMoveUnit = (
		chapterId: number,
		fromIndex: number,
		toIndex: number,
	) => {
		const chapter = course.chapters?.find((ch) => ch.id === chapterId);
		if (!chapter?.units) return;

		const reordered = [...chapter.units];
		const [moved] = reordered.splice(fromIndex, 1);
		reordered.splice(toIndex, 0, moved);

		const updates = reordered.map((unit, idx) => ({ id: unit.id, index: idx }));
		reorderUnits(updates);
	};

	return (
		<div className="w-full max-w-4xl mx-auto">
			<Card>
				<CardHeader>
					<div className="flex justify-between items-center">
						<CardTitle>Course Curriculum</CardTitle>
						<Button
							variant="outline"
							onClick={() => setShowNewChapterForm(!showNewChapterForm)}
						>
							<Add className="w-4 h-4 mr-2" />
							Add Chapter
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<div ref={autoAnimateRef} className="space-y-4">
						{/* New Chapter Form */}
						{showNewChapterForm && (
							<Card className="border-2 border-dashed">
								<CardContent className="pt-6">
									<form onSubmit={handleCreateChapter}>
										<FormProvider {...newChapterForm}>
											<div className="space-y-4">
												<FormInput
													name="title"
													label="Chapter Title"
													placeholder="e.g., Introduction to Finance"
												/>
												<DraftPublishSwitch />
												<div className="flex gap-2">
													<Button type="submit">Create Chapter</Button>
													<Button
														type="button"
														variant="outline"
														onClick={() => {
															setShowNewChapterForm(false);
															newChapterForm.reset();
														}}
													>
														Cancel
													</Button>
												</div>
											</div>
										</FormProvider>
									</form>
								</CardContent>
							</Card>
						)}

						{/* Chapters List */}
						{course.chapters && course.chapters.length > 0 ? (
							<Accordion type="multiple" className="space-y-2">
								{course.chapters.map((chapter, chapterIndex) => {
									const isFirst = chapterIndex === 0;
									const isLast = chapterIndex === course.chapters!.length - 1;

									return (
										<AccordionItem
											key={chapter.id}
											value={`chapter-${chapter.id}`}
											className="border rounded-lg"
										>
											<AccordionTrigger className="px-4 hover:no-underline">
												<div className="flex items-center justify-between w-full pr-4">
													<div className="flex items-center gap-3">
														<span className="font-semibold text-sm text-muted-foreground">
															{chapterIndex + 1}.
														</span>
														<span className="font-medium">{chapter.title}</span>
														<span className="text-sm text-muted-foreground">
															({chapter.units?.length || 0} units)
														</span>
													</div>
													<ButtonGroup className="group-hover:opacity-100 transition-opacity">
														<Button
															variant="ghost"
															size="sm"
															onClick={(e) => {
																e.stopPropagation();
																handleDeleteChapter(chapter.id);
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
													{/* Units List */}
													{chapter.units && chapter.units.length > 0 ? (
														<div className="space-y-2 pl-4 border-l-2 border-muted">
															{chapter.units.map((unit, unitIndex) => {
																const isFirstUnit = unitIndex === 0;
																const isLastUnit =
																	unitIndex === chapter.units!.length - 1;

																return (
																	<div
																		key={unit.id}
																		className="flex items-center justify-between p-3 bg-muted/50 rounded-md group hover:bg-muted transition-colors"
																	>
																		<div className="flex items-center gap-3">
																			<span className="text-sm text-muted-foreground">
																				{chapterIndex + 1}.{unitIndex + 1}
																			</span>
																			<div>
																				<p className="font-medium text-sm">
																					{unit.content?.title ||
																						"Untitled Unit"}
																				</p>
																				<p className="text-xs text-muted-foreground">
																					{unit.points} points
																				</p>
																			</div>
																		</div>
																		<ButtonGroup className="opacity-0 group-hover:opacity-100 transition-opacity">
																			<Button variant="ghost" size="sm" asChild>
																				<Link
																					to="/dashboard/units/$unitId/edit"
																					params={{
																						unitId: unit.id.toString(),
																					}}
																				>
																					<Edit2 className="w-3 h-3" />
																				</Link>
																			</Button>

																			<Button
																				variant="ghost"
																				size="sm"
																				onClick={() =>
																					handleDeleteUnit(unit.id)
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
																							chapter.id,
																							unitIndex,
																							unitIndex - 1,
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
																							chapter.id,
																							unitIndex,
																							unitIndex + 1,
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
															No units yet. Add your first unit below.
														</p>
													)}

													{/* New Unit Form */}
													{showNewUnitForm === chapter.id ? (
														<Card className="border-2 border-dashed ml-4">
															<CardContent className="pt-6">
																<form
																	className="w-full"
																	onSubmit={newUnitForm.handleSubmit((data) =>
																		handleCreateUnit(chapter.id, data),
																	)}
																>
																	<FormProvider {...newUnitForm}>
																		<div className="space-y-4">
																			<FormInput
																				name="title"
																				label="Unit Title"
																				placeholder="e.g., Understanding Budgets"
																			/>
																			<FormTextarea
																				name="shortDesc"
																				label="Short Description"
																				placeholder="Brief description of this unit"
																			/>
																			<FormEditor
																				name="content"
																				label="Content"
																				placeholder="Main content of the unit"
																				rows={4}
																			/>
																			<DraftPublishSwitch />
																			<FormInput
																				name="points"
																				label="Points"
																				type="number"
																				placeholder="10"
																			/>
																			<div className="flex gap-2">
																				<Button type="submit" size="sm">
																					Create Unit
																				</Button>
																				<Button
																					type="button"
																					variant="outline"
																					size="sm"
																					onClick={() => {
																						setShowNewUnitForm(null);
																						newUnitForm.reset();
																					}}
																				>
																					Cancel
																				</Button>
																			</div>
																		</div>
																	</FormProvider>
																</form>
															</CardContent>
														</Card>
													) : (
														<Button
															variant="outline"
															type="button"
															size="sm"
															className="ml-4"
															onClick={() => setShowNewUnitForm(chapter.id)}
														>
															<Add className="w-4 h-4 mr-2" />
															Add Unit
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
									No chapters yet. Create your first chapter to get started.
								</p>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
