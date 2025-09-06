import { useGetLessons } from "@/hooks/api/lesson";
import { DataTable } from "../lessons/DataTable";
import { TableSearch, useTableSearchValue } from "../table";
import { useDefaultTableOpts } from "@/hooks/table";
import { useMemo } from "react";
import { useReactTable, type ColumnDef } from "@tanstack/react-table";
import type { ILesson, IQuiz } from "@/services/api";
import { Checkbox } from "../ui/checkbox";
import { formatDateTime } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ExternalLink, MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useGetQuizzes } from "@/hooks/api/quiz";

const columns: ColumnDef<IQuiz>[] = [
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
	},
	{
		accessorKey: "createdAt",
		header: "CreatedAt",
		cell: ({ row }) => {
			const createdAt = row.original.createdAt;
			return formatDateTime(createdAt);
		},
	},
	{
		id: "View",
		header: "View",
		cell: ({ row }) => {
			const lessonId = row.original.id.toString();

			return (
				<Link to="/dashboard/lessons/$lessonId" params={{ lessonId }}>
					<ExternalLink />
				</Link>
			);
		},
	},
	{
		id: "actions",
		header: "Actions",
		enableHiding: false,
		cell: ({ row }) => {
			const lessonId = row.original.id.toString();

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link to="/dashboard/lessons/$lessonId" params={{ lessonId }}>
								View Lesson
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

const searchQueryParamKey = "query";

export function QuizTable() {
	const searchQuery = useTableSearchValue(searchQueryParamKey);

	const { quizzes, isFetching, fetchNextPage } = useGetQuizzes({
		query: searchQuery,
	});

	const tableOpts = useDefaultTableOpts();

	const data = useMemo(
		() => quizzes?.pages?.flatMap((page) => page.data) ?? [],
		[quizzes],
	);

	const currRows = useMemo(
		() => quizzes.pages.reduce((prev, curr) => prev + curr.data.length, 0),
		[quizzes],
	);

	const totalRows = useMemo(() => quizzes.pages[0].total ?? 0, [quizzes]);

	const table = useReactTable({
		data,
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
