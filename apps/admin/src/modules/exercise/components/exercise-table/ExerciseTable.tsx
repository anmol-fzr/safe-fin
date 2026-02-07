import { Link } from "@tanstack/react-router";
import { type ColumnDef, useReactTable } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { type ReactNode, useMemo } from "react";
import { DataTable } from "@/components/table/DataTable";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useDefaultTableOpts } from "@/hooks/table";
import type { IExercise } from "../../api";
import { LessonStatusBadge } from "@/components/lessons/LessonStatusBadge";
import {
	TableColActions,
	TableColCreatedAt,
	TableColUpdatedAt,
	TableSearch,
	useTableSearchValue,
} from "@/components/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetExercises } from "../../hooks/queries";

const columns: ColumnDef<IExercise>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
				<QuizHoverCard {...{ id, title, desc }}>
					<Link
						to="/dashboard/exercises/$exerciseId"
						params={{ quizId: id }}
						className="hover:underline"
					>
						{title}
					</Link>
				</QuizHoverCard>
			);
		},
	},
	{
		accessorKey: "chapter.title",
		header: "From Chapter",
		cell: ({ row }) => {
			const { chapter } = row.original;

			return <p>{chapter.title}</p>;
			// return (
			// 	<QuizHoverCard {...{ id, title, desc }}>
			// 		<Link
			// 			to="/dashboard/"
			// 			params={{ quizId: id }}
			// 			className="hover:underline"
			// 		>
			// 			{chapter.title}
			// 		</Link>
			// 	</QuizHoverCard>
			// );
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
			const exerciseId = id.toString();

			const handleDeleteLesson = () => console.log(id);

			return (
				<TableColActions>
					<TableColActions.Edit
						to="/dashboard/exercises/$exerciseId"
						params={{ exerciseId }}
					/>

					<TableColActions.Delete
						phrase={`exercise/${exerciseId}`}
						onDelete={handleDeleteLesson}
					/>
				</TableColActions>
			);
		},
	},
];

const searchQueryParamKey = "query";

export function ExerciseTable() {
	const searchQuery = useTableSearchValue(searchQueryParamKey);

	const { data, isFetching, fetchNextPage } = useGetExercises({
		search: searchQuery,
	});

	const tableOpts = useDefaultTableOpts();

	const exercises = useMemo(
		() => data?.pages?.flatMap((page) => page.data) ?? [],
		[data],
	);

	const currRows = useMemo(
		() => data.pages.reduce((prev, curr) => prev + curr.data.length, 0),
		[data],
	);

	const totalRows = useMemo(() => data.pages[0].paginate.total ?? 0, [data]);

	const table = useReactTable({
		data: exercises,
		columns,
		...tableOpts,
	});

	return (
		<div className="flex flex-col gap-5">
			<TableSearch searchQueryParamKey={searchQueryParamKey} />
			<DataTable
				table={table}
				isFetching={isFetching}
				fetchNextPage={fetchNextPage}
				currRows={currRows}
				totalRows={totalRows}
			/>
		</div>
	);
}

type QuizHoverCardProps = Pick<IExercise, "id" | "title" | "desc"> & {
	children: ReactNode;
};

function QuizHoverCard({ id, title, desc, children }: QuizHoverCardProps) {
	const quizId = id.toString();
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
						to="/dashboard/exercises/$exerciseId"
						params={{ quizId }}
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
