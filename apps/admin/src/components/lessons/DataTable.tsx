import type { Row, RowData, Table as TableType } from "@tanstack/react-table";
import type { UseSuspenseInfiniteQueryResult } from "@tanstack/react-query";
import { flexRender } from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { LoadingDataTable } from "./LoadingDataTable";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef } from "react";

type DataTableProps<TData = RowData> = {
	table: TableType<TData>;
	currRows: number;
	totalRows: number;
} & Pick<UseSuspenseInfiniteQueryResult, "fetchNextPage" | "isFetching">;

// TODO: Impliment Sticky Headers and Footer for DataTable
export function DataTable<TData = RowData>(props: DataTableProps<TData>) {
	const { table, fetchNextPage, isFetching, currRows, totalRows } = props;

	const tableContainerRef = useRef<HTMLDivElement>(null);

	const fetchMoreOnBottomReached = useCallback(
		(containerRefElement?: HTMLDivElement | null) => {
			if (containerRefElement) {
				const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
				// once within 500px of the bottom, fetch more (if any)
				if (
					scrollHeight - scrollTop - clientHeight < 500 &&
					!isFetching &&
					currRows < totalRows
				) {
					fetchNextPage();
				}
			}
		},
		[fetchNextPage, isFetching, currRows, totalRows],
	);

	useEffect(() => {
		fetchMoreOnBottomReached(tableContainerRef.current);
	}, [fetchMoreOnBottomReached]);

	const colLen = table.getAllColumns().length;

	const allRows =
		typeof table.getPrePaginationRowModel === "function"
			? table.getPrePaginationRowModel().rows
			: table.getRowModel().rows;

	const rowVirtualizer = useVirtualizer({
		count: allRows.length,
		estimateSize: () => 33,
		getScrollElement: () => tableContainerRef.current,
		measureElement:
			typeof window !== "undefined" &&
			navigator.userAgent.indexOf("Firefox") === -1
				? (el) => el?.getBoundingClientRect().height
				: undefined,
		overscan: 20,
	});

	const virtualRows = rowVirtualizer.getVirtualItems();
	const totalSize = rowVirtualizer.getTotalSize();
	const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
	const paddingBottom =
		virtualRows.length > 0
			? totalSize - virtualRows[virtualRows.length - 1].end
			: 0;

	return (
		<div className="w-full">
			<div
				className="rounded-md border relative"
				onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
				style={{
					overflow: "auto", // scrollable container
					maxHeight: "600px", // fixed height to enable scrolling
				}}
				ref={tableContainerRef}
			>
				<Table className="w-full relative">
					<TableHeader className="!sticky !top-0 z-10">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{allRows.length ? (
							<>
								{/* Spacer row BEFORE the virtualized window */}
								{paddingTop > 0 && (
									<TableRow aria-hidden>
										<TableCell
											colSpan={colLen}
											style={{ height: paddingTop, padding: 0 }}
										/>
									</TableRow>
								)}

								{virtualRows.map((vr) => {
									const row = allRows[vr.index] as Row<TData>;
									return (
										<TableRow
											key={row.id}
											data-index={vr.index}
											ref={(node) => rowVirtualizer.measureElement(node)}
											data-state={row.getIsSelected() && "selected"}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											))}
										</TableRow>
									);
								})}

								{/* Spacer row AFTER the virtualized window */}
								{paddingBottom > 0 && (
									<TableRow aria-hidden>
										<TableCell
											colSpan={colLen}
											style={{ height: paddingBottom, padding: 0 }}
										/>
									</TableRow>
								)}
							</>
						) : (
							<TableRow>
								<TableCell colSpan={colLen} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>

					<TableFooter className="sticky bottom-0 z-10">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableFooter>
				</Table>

				{isFetching && (
					<div className="py-2 text-center text-sm text-muted-foreground">
						Fetching More...
					</div>
				)}
			</div>
		</div>
	);
}

DataTable.Loading = LoadingDataTable;
