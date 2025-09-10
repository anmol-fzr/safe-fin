import { useMemo, type ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "./DataTable";
import { useDefaultTableOpts } from "@/hooks/table";
import { useGetLessons, useDeleteLesson } from "@/hooks/api/lesson";
import type { ILesson } from "@/services/api";
import { Link } from "@tanstack/react-router";
import {
	TableColActions,
	TableColCreatedAt,
	TableColUpdatedAt,
	TableSearch,
	useTableSearchValue,
} from "../table";
import { LessonStatusBadge } from "./LessonStatusBadge";
import { ResourceProvider } from "@/context/resource.context";

const queryParamKey = "query";

export function LessonsTable() {
	const searchQuery = useTableSearchValue(queryParamKey);

	const { lessons, isFetching, fetchNextPage } = useGetLessons({
		query: searchQuery,
	});
	const { deleteLesson } = useDeleteLesson();

	const tableOpts = useDefaultTableOpts();

	const data = useMemo(
		() => lessons?.pages?.flatMap((page) => page.data) ?? [],
		[lessons],
	);

	const currRows = useMemo(
		() => lessons.pages.reduce((prev, curr) => prev + curr.data.length, 0),
		[lessons],
	);

	const totalRows = useMemo(() => lessons.pages[0].total, [lessons]);

	const columns = useMemo<ColumnDef<ILesson>[]>(
		() => [
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() && "indeterminate")
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
						aria-label="Select all"
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label="Select row"
					/>
				),
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "id",
				header: "Id",
			},
			{
				accessorKey: "title",
				header: "Title",
				cell: ({ row }) => {
					const { id = 0, title = "N/A", desc = "" } = row.original;

					return (
						<LessonHoverCard {...{ id, title, desc }}>
							<Link
								to="/dashboard/lessons/$lessonId"
								params={{ lessonId: id.toString() }}
								className="hover:underline"
							>
								{title}
							</Link>
						</LessonHoverCard>
					);
				},
			},
			{
				id: "status",
				header: "Status",
				cell: ({ row }) => {
					const { isPublished } = row.original;
					return <LessonStatusBadge {...{ isPublished }} />;
				},
			},
			{
				accessorKey: "createdAt",
				header: "CreatedAt",
				cell: TableColCreatedAt,
			},
			{
				accessorKey: "updatedAt",
				header: "UpdatedAt",
				cell: TableColUpdatedAt,
			},
			{
				id: "actions",
				header: "Actions",
				enableHiding: false,
				cell: ({ row }) => {
					const id = row.original.id;
					const lessonId = id.toString();

					const handleDeleteLesson = () => deleteLesson(id);

					return (
						<TableColActions>
							<TableColActions.Edit
								to="/dashboard/lessons/$lessonId/edit"
								params={{ lessonId }}
							/>

							<TableColActions.Delete
								phrase={`lesson/${lessonId}`}
								onDelete={handleDeleteLesson}
							/>
						</TableColActions>
					);
				},
			},
		],
		[deleteLesson],
	);

	const table = useReactTable({
		data,
		columns,
		...tableOpts,
	});
	return (
		<div className="flex flex-col gap-5">
			<ResourceProvider value={{ resource: "Lesson" }}>
				<TableSearch searchQueryParamKey={queryParamKey} />
				<DataTable
					table={table}
					isFetching={isFetching}
					fetchNextPage={fetchNextPage}
					currRows={currRows}
					totalRows={totalRows}
				/>
			</ResourceProvider>
		</div>
	);
}

type LessonHoverCardProps = Pick<ILesson, "id" | "title" | "desc"> & {
	children: ReactNode;
};

function LessonHoverCard({ id, title, desc, children }: LessonHoverCardProps) {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>{children}</HoverCardTrigger>
			<HoverCardContent className="w-80">
				<div className="flex flex-col gap-4">
					<div className="flex justify-between gap-4">
						<div className="space-y-1">
							<h4 className="text-sm font-semibold">{title}</h4>
							<p className="text-sm">{desc}</p>
						</div>
					</div>
					<Link
						to="/dashboard/lessons/$lessonId"
						params={{ lessonId: id }}
						className="hover:underline ml-auto mr-0 inline-flex items-center justify-center gap-1"
					>
						See more
						<ChevronRight size={20} />
					</Link>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
