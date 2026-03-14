import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Link } from "@tanstack/react-router";
import { Add, ArrowDown, ArrowUp, Edit2, Trash } from "iconsax-reactjs";
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
} from "../hooks/mutations";
import { useGetCourse } from "../hooks/queries";
import { NewChapterForm } from "./chapter-form/NewChapterForm";
import { useToggle } from "@/pkg/ui";
import type { ResourceId } from "@/services/api/types";
import { NewUnitForm } from "./unit-form/NewUnitForm";

interface CurriculumBuilderProps {
	courseId: ResourceId;
}

export const CurriculumBuilder = (props: CurriculumBuilderProps) => {
	const { courseId } = props;

	const [autoAnimateRef] = useAutoAnimate();

	const {
		isOpen: isChapterFormOpen,
		onOpen: openChapterForm,
		onClose: closeChapterForm,
	} = useToggle();

	const [newUnitChapterId, setNewUnitChapterId] = useState<number | null>(null);

	const { course } = useGetCourse(courseId);

	// Mutations
	const { deleteChapter } = useDeleteChapter();
	const { reorderChapters } = useReorderChapters();
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

	const nextUnitIndex = useMemo(() => {
		if (newUnitChapterId === null) {
			return 0;
		}

		const chapter = course.chapters?.find((ch) => ch.id === newUnitChapterId);
		const nextIndex = chapter?.units?.length || 0;
		return nextIndex;
	}, [course.chapters.length, newUnitChapterId]);

	const nextChapterIndex = useMemo(() => {
		const nextIndex = course.chapters?.length || 0;

		return nextIndex;
	}, [course.chapters.length]);

	return (
		<div className="w-full max-w-4xl mx-auto">
			<Card>
				<CardHeader>
					<div className="flex justify-between items-center">
						<CardTitle>Course Curriculum</CardTitle>
						<Button variant="outline" onClick={openChapterForm}>
							<Add className="w-4 h-4 mr-2" />
							Add Chapter
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<div ref={autoAnimateRef} className="space-y-4">
						{/* New Chapter Form */}
						{isChapterFormOpen && (
							<Card className="border-2 border-dashed">
								<CardContent className="pt-6">
									<NewChapterForm
										index={nextChapterIndex}
										courseId={courseId}
										onCancel={closeChapterForm}
									/>
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

													{newUnitChapterId === chapter.id ? (
														<Card className="border-2 border-dashed ml-4">
															<CardContent className="pt-6">
																<NewUnitForm
																	index={nextUnitIndex}
																	chapterId={chapter.id}
																	onCancel={() => {
																		setNewUnitChapterId(null);
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
															onClick={() => setNewUnitChapterId(chapter.id)}
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
