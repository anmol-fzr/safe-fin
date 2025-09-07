import { cn, formatDateTime } from "@/lib/utils";

import type { IBaseData, ITimestamps } from "@/services/api/types";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import type { Row } from "@tanstack/react-table";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { DeleteDialog, type DeleteDialogProps } from "../form/DeleteDialog";

type TableColumn<TData extends ITimestamps | IBaseData> = {
	row: Row<TData>;
};

const TableColCreatedAt = <TData extends ITimestamps>({
	row,
}: TableColumn<TData>) => {
	const { createdAt = "N/A" } = row.original;
	return <p className="text-muted-foreground">{formatDateTime(createdAt)}</p>;
};

const TableColUpdatedAt = <TData extends ITimestamps>({
	row,
}: TableColumn<TData>) => {
	const { updatedAt = "N/A", createdAt = "N/A" } = row.original;

	return (
		<p className="text-muted-foreground">
			{createdAt === updatedAt ? "-" : formatDateTime(updatedAt)}
		</p>
	);
};

type TableColActions<TData extends IBaseData> = {
	row: Row<TData>;
	viewLinkProps: LinkComponentProps;
};

const TableColActions = (props: ComponentPropsWithoutRef<"div">) => {
	//const dataId = row.original.id.toString();

	{
		/*
			<Link
				//to="/dashboard/lessons/$lessonId" params={{ lessonId }}
				{...viewLinkProps}
			>
				<EyeIcon />
			</Link>
			<PencilIcon />
			<Trash2Icon color="red" />
      */
	}

	return <div {...props} className={cn("flex gap-2", props.className)} />;
};

TableColActions.View = (props: LinkComponentProps) => {
	return (
		<Link {...props}>
			<EyeIcon />
		</Link>
	);
};

TableColActions.Edit = (props: LinkComponentProps) => {
	return (
		<Link {...props}>
			<PencilIcon />
		</Link>
	);
};

type TableColActionsDelete = Pick<DeleteDialogProps, "onDelete" | "phrase">;

TableColActions.Delete = (props: TableColActionsDelete) => {
	return (
		<DeleteDialog {...props}>
			<Trash2Icon color="red" />
		</DeleteDialog>
	);
};

export { TableColCreatedAt, TableColUpdatedAt, TableColActions };
