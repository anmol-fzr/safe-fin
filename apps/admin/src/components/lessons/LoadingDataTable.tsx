import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import { getEmptyArr } from "@/lib/utils";
import { useMemo } from "react";

export function LoadingDataTable({ rows = 10, columns = 5 }) {
	const tableColumns = useMemo(() => getEmptyArr(columns), [columns]);
	const tableRows = useMemo(() => getEmptyArr(rows), [rows]);

	return (
		<div className="w-full">
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
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Skeleton className="h-6 w-48 ml-0 mr-auto" />
				<div className="space-x-2 flex">
					<Skeleton className="h-8 w-22" />
					<Skeleton className="h-8 w-20" />
				</div>
			</div>
		</div>
	);
}
