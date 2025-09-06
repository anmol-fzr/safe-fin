import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

function Page(props: ComponentPropsWithoutRef<"div">) {
	return (
		<div {...props} className={cn("flex flex-col gap-4", props.className)} />
	);
}

function PageHeader(props: ComponentPropsWithoutRef<"div">) {
	return (
		<div {...props} className={cn("flex justify-between", props.className)} />
	);
}

function PageContent(props: ComponentPropsWithoutRef<"div">) {
	//return children;

	return (
		<div {...props} className={cn("flex flex-col gap-4", props.className)} />
	);
}

function PageTitle({ title }: { title: string }) {
	return (
		<h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
			{title}
		</h2>
	);
}

Page.Header = PageHeader;
Page.Content = PageContent;
Page.Title = PageTitle;

export { Page };
