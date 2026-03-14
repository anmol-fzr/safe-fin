import { isMatch, useMatches } from "@tanstack/react-router";

import { SidebarLeft } from "iconsax-reactjs";
import { Fragment } from "react";
import { SearchForm } from "@/components/search-form";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { useCmdk } from "./cmd-k";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
	const { toggleSidebar } = useSidebar();
	const { setOpen } = useCmdk();

	const matches = useMatches();
	const matchesWithCrumbs = matches.filter((match) =>
		isMatch(match, "loaderData.crumb"),
	);

	const items = matchesWithCrumbs.map(({ pathname, loaderData }) => {
		return {
			href: pathname,
			label: loaderData?.crumb,
		};
	});

	const lastIndx = items.length - 1;

	return (
		<header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
			<div className="flex h-(--header-height) w-full items-center gap-2 px-4">
				<Button
					className="h-8 w-8"
					variant="ghost"
					size="icon"
					onClick={toggleSidebar}
				>
					<SidebarLeft />
				</Button>
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb className="hidden sm:block">
					<BreadcrumbList>
						{items.map((crumb, indx) => {
							return (
								<Fragment key={crumb.label}>
									<BreadcrumbItem>
										<BreadcrumbLink href={crumb.href}>
											{crumb.label}
										</BreadcrumbLink>
									</BreadcrumbItem>
									{indx !== lastIndx && <BreadcrumbSeparator />}
								</Fragment>
							);
						})}
					</BreadcrumbList>
				</Breadcrumb>
				<SearchForm
					className="w-full sm:ml-auto sm:w-auto"
					onClick={() => setOpen(true)}
				/>
				<ModeToggle />
			</div>
		</header>
	);
}
