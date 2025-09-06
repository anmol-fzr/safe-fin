import { useMemo, type ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";
import { ChevronRight, EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "./DataTable";
import { useDefaultTableOpts } from "@/hooks/table";
import { useGetLessons } from "@/hooks/api/lesson";
import type { ILesson } from "@/services/api";
import { Link } from "@tanstack/react-router";
import { formatDateTime } from "@/lib/utils";
import { TableSearch, useTableSearchValue } from "../table";

export const columns: ColumnDef<ILesson>[] = [
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
				<LessonHoverCard {...{ id, title, desc }}>
					<Link
						to="/dashboard/lessons/$lessonId"
						params={{ lessonId: id }}
						className="hover:underline"
					>
						{title}
					</Link>
				</LessonHoverCard>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "CreatedAt",
		cell: ({ row }) => {
			const createdAt = row.original.createdAt;

			return (
				<p className="text-muted-foreground">{formatDateTime(createdAt)}</p>
			);
		},
	},
	{
		accessorKey: "updatedAt",
		header: "UpdatedAt",
		cell: ({ row }) => {
			const { updatedAt, createdAt } = row.original;
			return (
				<p className="text-muted-foreground">
					{createdAt === updatedAt ? "-" : formatDateTime(updatedAt)}
				</p>
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
				<div className="flex gap-2">
					<Link to="/dashboard/lessons/$lessonId" params={{ lessonId }}>
						<EyeIcon />
					</Link>
					<PencilIcon />
					<Trash2Icon color="red" />
				</div>
			);
		},
	},
];

const queryParamKey = "query";

export function LessonsTable() {
	const searchQuery = useTableSearchValue(queryParamKey);

	const { lessons, isFetching, fetchNextPage } = useGetLessons({
		query: searchQuery,
	});

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

	const table = useReactTable({
		data,
		columns,
		...tableOpts,
	});

	return (
		<div className="flex flex-col gap-5">
			<TableSearch searchQueryParamKey={queryParamKey} />
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

type LessonHoverCardProps = Pick<ILesson, "id" | "title" | "desc"> & {
	children: ReactNode;
};

function LessonHoverCard({ id, title, desc, children }: LessonHoverCardProps) {
	return (
		<HoverCard>
			<HoverCardTrigger>{children}</HoverCardTrigger>
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
