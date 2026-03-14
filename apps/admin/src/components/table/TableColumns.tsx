import { Link, type LinkComponentProps } from "@tanstack/react-router";
import type { Row } from "@tanstack/react-table";
import { Edit2, Eye, Trash } from "iconsax-reactjs";
import type { ComponentPropsWithoutRef } from "react";
import { cn, formatDateTime } from "@/lib/utils";
import type { IBaseData, ITimestamps } from "@/services/api/types";
import { DeleteDialog, type DeleteDialogProps } from "../form/DeleteDialog";

type TableColumn<TData extends ITimestamps | IBaseData> = {
	row: Row<TData>;
};

const naValue = "-";

const TableColNaValue = () => (
	<p className="text-center text-muted-foreground">{naValue}</p>
);

const TableColCreatedAt = <TData extends ITimestamps>({
	row,
}: TableColumn<TData>) => {
	const { createdAt = naValue } = row.original;
	return <p className="text-muted-foreground">{formatDateTime(createdAt)}</p>;
};

const TableColUpdatedAt = <TData extends ITimestamps>({
	row,
}: TableColumn<TData>) => {
	const { updatedAt = naValue, createdAt = naValue } = row.original;

	return (
		<p className="text-muted-foreground">
			{createdAt == updatedAt ? "-" : formatDateTime(updatedAt)}
		</p>
	);
};

type TableColActions<TData extends IBaseData> = {
	row: Row<TData>;
	viewLinkProps: LinkComponentProps;
};

const TableColActions = (props: ComponentPropsWithoutRef<"div">) => {
	return <div {...props} className={cn("flex gap-2", props.className)} />;
};

TableColActions.View = (props: LinkComponentProps) => {
	return (
		<Link {...props}>
			<Eye />
		</Link>
	);
};

TableColActions.Edit = (props: LinkComponentProps) => {
	return (
		<Link {...props}>
			<Edit2 />
		</Link>
	);
};

type TableColActionsDelete = Pick<DeleteDialogProps, "onDelete" | "phrase">;

TableColActions.Delete = (props: TableColActionsDelete) => {
	return (
		<DeleteDialog {...props}>
			<Trash color="red" />
		</DeleteDialog>
	);
};

export {
	TableColCreatedAt,
	TableColUpdatedAt,
	TableColActions,
	TableColNaValue,
};
