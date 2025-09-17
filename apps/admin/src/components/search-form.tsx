import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Kbd } from "./ui/kbd";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
	return (
		<form {...props}>
			<div className="relative">
				<Label htmlFor="search" className="sr-only">
					Search
				</Label>
				<div
					className={cn(
						"placeholder:text-muted-foreground dark:bg-input/30 border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm  min-w-44 items-center justify-center cursor-pointer",
						"bg-background h-8 w-full shadow-none",
					)}
				>
					<p className="text-muted-foreground text-sm absolute">
						Press{" "}
						<Kbd>
							<span className="text-xs">⌘</span>K
						</Kbd>{" "}
						to Search
					</p>
				</div>
			</div>
		</form>
	);
}
