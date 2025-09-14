import { useMemo } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "../lessons/DataTable";
import { useDefaultTableOpts } from "@/hooks/table";
import { useDeleteLesson } from "@/hooks/api/lesson";
import type { IUser } from "@/services/api";
import {
	TableColCreatedAt,
	TableColUpdatedAt,
	TableSearch,
	useTableSearchValue,
} from "../table";
import { LessonStatusBadge } from "../lessons/LessonStatusBadge";
import { ResourceProvider } from "@/context/resource.context";
import { useGetUsers } from "@/hooks/api/user";
import { UserRoleBadge } from "../form/badge/UserRoleBadge";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "../common/UserAvatar";
import { useQueryStates, parseAsStringEnum, parseAsString } from "nuqs";
import { UserBanDialog } from "./UserBanDialog";
import { UserDeleteDialog } from "./UserDeleteDialog";

const queryParamKey = "query";

const useUserQuerySearch = () => {
	const [{ action }, setQueryParams] = useQueryStates({
		userId: parseAsString,
		action: parseAsStringEnum(["ban", "delete"]),
	});

	const isBanOpen = action === "ban";
	const isDeleteOpen = action === "delete";

	const clear = () => {
		setQueryParams({
			userId: null,
			action: null,
		});
	};

	const handleBanOpen = (userId: string) => {
		setQueryParams({
			action: "ban",
			userId,
		});
	};

	const handleDeleteOpen = (userId: string) => {
		setQueryParams({
			action: "delete",
			userId,
		});
	};

	return { isBanOpen, isDeleteOpen, clear, handleBanOpen, handleDeleteOpen };
};

export function UsersTable() {
	const searchQuery = useTableSearchValue(queryParamKey);
	const { isBanOpen, isDeleteOpen, clear, handleDeleteOpen, handleBanOpen } =
		useUserQuerySearch();
	const [state, setState] = useQueryStates({
		userId: parseAsString,
		action: parseAsStringEnum(["ban", "delete"]),
	});

	const { users, isFetching, fetchNextPage } = useGetUsers({
		query: searchQuery,
	});
	const { deleteLesson } = useDeleteLesson();

	const tableOpts = useDefaultTableOpts();

	const data = useMemo(
		() => users?.pages?.flatMap((page) => page.users) ?? [],
		[users],
	);

	//debugger;
	const currRows = useMemo(
		() =>
			users.pages.reduce((prev, curr) => {
				return prev + curr.users.length;
			}, 0),
		[users],
	);

	const totalRows = useMemo(() => users.pages[0].total, [users]);

	const columns = useMemo<ColumnDef<IUser>[]>(
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
				cell: ({ row }) => {
					const { id } = row.original;
					return <p className="text-muted-foreground">{id.slice(0, 12)}</p>;
				},
			},
			{
				accessorKey: "image",
				header: "Image",
				cell: ({ row }) => {
					const { image, name } = row.original;
					return <UserAvatar {...{ image, name }} />;
				},
			},
			{
				accessorKey: "name",
				header: "Name",
			},
			{
				accessorKey: "phoneNumber",
				header: "Phone Number",
			},
			{
				accessorKey: "email",
				header: "Email Address",
			},
			{
				accessorKey: "banned",
				header: "Banned",
				cell: ({ row }) => {
					const { banned } = row.original;
					return (
						<p
							className={banned ? "text-destructive" : "text-muted-foreground"}
						>
							{banned ? (
								<Badge className="border-destructive/50 bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90">
									Banned
								</Badge>
							) : (
								"-"
							)}
						</p>
					);
				},
			},
			{
				accessorKey: "role",
				header: "Role",
				cell: ({ row }) => {
					const { role } = row.original;
					return <UserRoleBadge role={role} />;
				},
			},

			{
				id: "phoneNumberVerified",
				header: "Verified",
				cell: ({ row }) => {
					const { phoneNumberVerified } = row.original;
					return (
						<LessonStatusBadge {...{ isPublished: phoneNumberVerified }} />
					);
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
					const { id } = row.original;

					const handleBan = () => {
						handleBanOpen(id);
					};

					const handleDelete = () => {
						handleDeleteOpen(id);
					};

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
								<DropdownMenuItem>Change User Password</DropdownMenuItem>
								<DropdownMenuItem>Impersonate User</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem variant="destructive" onClick={handleBan}>
									Ban User
								</DropdownMenuItem>
								<DropdownMenuItem variant="destructive" onClick={handleDelete}>
									Delete User
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
			},
		],
		[deleteLesson, handleBanOpen, handleDeleteOpen],
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
				<UserBanDialog isOpen={isBanOpen} onClose={clear} />
				<UserDeleteDialog isOpen={isDeleteOpen} onClose={clear} />
			</ResourceProvider>
		</div>
	);
}
