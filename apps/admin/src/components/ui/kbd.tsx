import { cn } from "@/lib/utils";

export function Kbd(props: React.ComponentPropsWithRef<"kbd">) {
	return (
		<kbd
			{...props}
			className={cn(
				"bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded-md border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none",
				props.className,
			)}
		/>
	);
}
