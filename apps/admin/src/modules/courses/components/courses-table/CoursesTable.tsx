import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { type ReactNode, useMemo } from "react";
import { LessonStatusBadge } from "@/components/lessons/LessonStatusBadge";
import {
	TableColActions,
	TableColCreatedAt,
	TableColUpdatedAt,
	TableSearch,
	useTableSearchValue,
} from "@/components/table";
import { DataTable } from "@/components/table/DataTable";
import { Checkbox } from "@/components/ui/checkbox";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ResourceProvider } from "@/context/resource.context";
import { useDeleteLesson } from "@/hooks/api/lesson";
import { useDefaultTableOpts } from "@/hooks/table";
import type { ILesson } from "@/services/api";
import type { CourseItem } from "../../api";
import { useGetCourses } from "../../hooks/queries";

const queryParamKey = "query";

export function CoursesTable() {
	const searchQuery = useTableSearchValue(queryParamKey);

	const { courses, isFetching, fetchNextPage } = useGetCourses();
	const { deleteLesson } = useDeleteLesson();

	const tableOpts = useDefaultTableOpts();

	const data = useMemo(
		() => courses.pages.flatMap((page) => page.data) ?? [],
		[courses],
	);

	const currRows = useMemo(
		() => courses.pages.reduce((prev, curr) => prev + curr.data.length, 0),
		[courses],
	);

	const totalRows = useMemo(() => courses.pages[0].paginate.total, [courses]);

	const columns = useMemo<ColumnDef<CourseItem>[]>(
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
					const { id, content } = row.original;
					const { title, shortDesc } = content;

					const courseId = id.toString();
					return (
						<LessonHoverCard {...{ id, title, desc: shortDesc }}>
							<Link
								to="/dashboard/courses/$courseId/view"
								params={{ courseId }}
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
					const courseId = id.toString();

					const handleDeleteLesson = () => deleteLesson(id);

					return (
						<TableColActions>
							<TableColActions.Edit
								to="/dashboard/courses/$courseId/edit"
								params={{ courseId }}
							/>

							<TableColActions.Delete
								phrase={`course/${courseId}`}
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
	const courseId = id.toString();
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
						to="/dashboard/courses/$courseId/view"
						params={{ courseId }}
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
