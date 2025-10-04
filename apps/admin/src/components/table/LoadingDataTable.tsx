import { getEmptyArr } from "@safe-fin/ui/utils";
import { useMemo } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";

export function LoadingDataTable({ rows = 10, columns = 5 }) {
	const tableColumns = useMemo(() => getEmptyArr(columns), [columns]);
	const tableRows = useMemo(() => getEmptyArr(rows), [rows]);

	return (
		<div className="w-full">
			<div className="flex gap-4">
				<Skeleton className="w-60 h-8 mb-6" />
			</div>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{tableColumns.map((column) => (
								<TableHead key={column}>
									<Skeleton className="h-6 w-24" />
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{tableRows.map((row) => (
							<TableRow key={row}>
								{tableColumns.map((column) => (
									<TableCell key={column}>
										<Skeleton className="h-6 w-24" />
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							{tableColumns.map((column) => (
								<TableHead key={column}>
									<Skeleton className="h-6 w-24" />
								</TableHead>
							))}
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</div>
	);
}
