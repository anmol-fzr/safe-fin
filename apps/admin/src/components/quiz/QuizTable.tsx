import { DataTable } from "../lessons/DataTable";
import {
	TableColActions,
	TableColCreatedAt,
	TableColUpdatedAt,
	TableSearch,
	useTableSearchValue,
} from "../table";
import { useDefaultTableOpts } from "@/hooks/table";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useMemo, type ReactNode } from "react";
import { useReactTable, type ColumnDef } from "@tanstack/react-table";
import type { IQuiz } from "@/services/api";
import { Checkbox } from "../ui/checkbox";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useGetQuizzes } from "@/hooks/api/quiz";
import { LessonStatusBadge } from "../lessons/LessonStatusBadge";
import { ResourceProvider } from "@/context/resource.context";

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
		cell: ({ row }) => {
			const { id = 0, title = "N/A", desc = "" } = row.original;

			return (
				<QuizHoverCard {...{ id, title, desc }}>
					<Link
						to="/dashboard/quiz/$quizId"
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
			const quizId = id.toString();

			const handleDeleteLesson = () => console.log(id);

			return (
				<TableColActions>
					<TableColActions.Edit
						to="/dashboard/quiz/$quizId"
						params={{ quizId }}
					/>

					<TableColActions.Delete
						phrase={`quiz/${quizId}`}
						onDelete={handleDeleteLesson}
					/>
				</TableColActions>
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
			<ResourceProvider value={{ resource: "Quiz" }}>
				<TableSearch searchQueryParamKey={searchQueryParamKey} />
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

type QuizHoverCardProps = Pick<IQuiz, "id" | "title" | "desc"> & {
	children: ReactNode;
};

function QuizHoverCard({ id, title, desc, children }: QuizHoverCardProps) {
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
						to="/dashboard/quiz/$quizId"
						params={{ quizId: id }}
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
