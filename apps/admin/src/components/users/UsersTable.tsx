import { useMemo, useCallback } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "../lessons/DataTable";
import { useDefaultTableOpts } from "@/hooks/table";
import { useDeleteLesson } from "@/hooks/api/lesson";
import {
	TableColCreatedAt,
	TableColNaValue,
	TableColUpdatedAt,
	TableSearch,
	useTableSearchValue,
} from "../table";
import { useGetUsers } from "@/hooks/api/user";
import { UserRoleBadge } from "../users/UserRoleBadge";
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
import { UserVerificationBadge } from "./UserVerifiedBadge";
import type { IUser } from "@/lib/auth";

export const useUserQuerySearch = () => {
	const [{ userId, action }, setQueryParams] = useQueryStates({
		userId: parseAsString,
		action: parseAsStringEnum(["ban", "delete"]),
	});

	const isBanOpen = action === "ban";
	const isDeleteOpen = action === "delete";

	const clear = useCallback(() => {
		setQueryParams({
			userId: null,
			action: null,
		});
	}, []);

	const handleBanOpen = useCallback((userId: string) => {
		setQueryParams({
			action: "ban",
			userId,
		});
	}, []);

	const handleDeleteOpen = useCallback((userId: string) => {
		setQueryParams({
			action: "delete",
			userId,
		});
	}, []);

	return {
		userId,
		isBanOpen,
		isDeleteOpen,
		clear,
		handleBanOpen,
		handleDeleteOpen,
	};
};

const queryParamKey = "name";

export function UsersTable() {
	const searchQuery = useTableSearchValue(queryParamKey);
	const {
		userId,
		isBanOpen,
		isDeleteOpen,
		clear,
		handleDeleteOpen,
		handleBanOpen,
	} = useUserQuerySearch();

	const { users, isFetching, fetchNextPage } = useGetUsers({
		name: searchQuery,
	});

	const { deleteLesson } = useDeleteLesson();

	const data = useMemo(
		() => users?.pages?.flatMap((page) => page.data?.users),
		[users],
	);

	//debugger;
	const currRows = useMemo(
		() =>
			users.pages.reduce((prev, curr) => {
				return prev + (curr?.data?.users?.length ?? 0);
			}, 0),
		[users],
	);

	const totalRows = useMemo(() => users?.pages?.[0]?.data?.total ?? 0, [users]);

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
				cell: ({ row }) => {
					const { phoneNumber } = row.original;
					return phoneNumber || <TableColNaValue />;
				},
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
					return banned ? (
						<Badge className="border-destructive/50 bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90">
							Banned
						</Badge>
					) : (
						<TableColNaValue />
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
				id: "verified",
				accessorKey: "verified",
				header: "verified",
				cell: ({ row }) => {
					const { phoneNumberVerified } = row.original;
					return <UserVerificationBadge isVerified={phoneNumberVerified} />;
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

	const tableOpts = useDefaultTableOpts();

	const table = useReactTable<IUser>({
		data,
		columns,
		...tableOpts,
	});

	return (
		<>
			<div className="flex gap-4">
				<TableSearch searchQueryParamKey={queryParamKey} />
			</div>
			<DataTable
				{...{ table, isFetching, fetchNextPage, currRows, totalRows }}
			/>
			<UserBanDialog isOpen={isBanOpen} onClose={clear} userId={userId} />
			<UserDeleteDialog isOpen={isDeleteOpen} onClose={clear} userId={userId} />
		</>
	);
}
