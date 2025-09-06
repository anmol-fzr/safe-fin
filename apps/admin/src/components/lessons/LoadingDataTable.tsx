import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";

export function LoadingDataTable({ rows = 10, columns = 5 }) {
	return (
		<div className="w-full">
			{/*
			<div className="flex items-center py-4">
				<Skeleton className="h-9 w-96" />
			</div>
      */}
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{Array.from({ length: columns }).map((_header, indx) => (
								<TableHead key={indx}>
									<Skeleton className="h-6 w-24" />
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: rows }).map((_row, indx) => (
							<TableRow key={indx}>
								{Array.from({ length: columns }).map((_col, indx) => (
									<TableCell key={indx}>
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
