import { cn } from "@/lib/utils";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import * as React from "react";
import { CheckIcon, PlusCircleIcon as PlusCircledIcon } from "lucide-react";
import { UserVerificationBadge } from "../users/UserVerifiedBadge";
import type { Column } from "@tanstack/react-table";

interface DataTableFacetedFilterProps<TData, TValue> {
	title?: string;
	options: {
		label: string;
		value: string;
		helper?: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
	selected: Set<string>;
	column: Column<TData, TValue>;
	hideSearch?: boolean;
}

function FacetedFilter<TData, TValue>({
	title,
	options,
	column,
	hideSearch = false,
}: DataTableFacetedFilterProps<TData, TValue>) {
	const [animateRef] = useAutoAnimate();

	const filtersSet = column.getFilterValue() ?? new Set();
	const filtersArr = Array.from(filtersSet ?? []);

	const selSize = filtersArr?.length;
	const haveValues = selSize > 0;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={`${haveValues ? "" : "border-dashed"} transition-border duration-300 ease-in-out`}
				>
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					{title}
					{haveValues && (
						<>
							<Separator orientation="vertical" className="mx-2 h-4" />
							<Badge
								variant="secondary"
								className="rounded-sm px-1 font-normal lg:hidden"
							>
								{selSize}
							</Badge>
							<div className="hidden space-x-1 lg:flex" ref={animateRef}>
								{selSize === options.length ? (
									<Badge>All</Badge>
								) : selSize > 2 ? (
									<Badge>{selSize} selected</Badge>
								) : (
									filtersArr.map((label) => <Badge key={label}>{label}</Badge>)
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					{!hideSearch && (
						<CommandInput placeholder={title} className="border-none" />
					)}
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = filtersSet.has(option.value);
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											const set = new Set(filtersSet);
											const { value } = option;

											if (set.has(value)) {
												set.delete(value);
												column.setFilterValue(set);
											} else {
												set.add(value);
												column.setFilterValue(set);
											}
										}}
									>
										<div
											className={cn(
												"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
												isSelected
													? "bg-primary text-primary-foreground"
													: "opacity-50 [&_svg]:invisible",
											)}
										>
											<CheckIcon className={cn("h-4 w-4")} />
										</div>
										{option.icon && (
											<option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
										)}
										<span>{option.label}</span>
										<span className="text-muted-foreground">
											{option.helper}
										</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
						{haveValues && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={column.setFilterValue(new Set())}
										className="justify-center text-center"
									>
										Clear filters
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export { FacetedFilter as TableFacetedFilter };
