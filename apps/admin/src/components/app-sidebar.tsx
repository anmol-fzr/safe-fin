import * as React from "react";
import {
	CircleQuestionMark,
	Brain,
	User,
	LifeBuoy,
	Send,
	Settings,
	type LucideIcon,
} from "lucide-react";

import type { LinkComponentProps } from "@tanstack/react-router";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/hooks/api/auth";

type Data = {
	navSecondary: {
		title: string;
		url: LinkComponentProps["to"] | "#";
		icon: LucideIcon;
	}[];
	projects: {
		name: string;
		url: LinkComponentProps["to"] | "#";
		icon: LucideIcon;
	}[];
};

const data: Data = {
	navSecondary: [
		{
			title: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "#",
			icon: Send,
		},
		{
			title: "Settings",
			url: "/dashboard/settings",
			icon: Settings,
		},
	],
	projects: [
		{
			name: "Users",
			url: "/dashboard/users",
			icon: User,
		},
		{
			name: "Lessons",
			url: "/dashboard/lessons",
			icon: Brain,
		},
		{
			name: "Quiz",
			url: "/dashboard/quiz",
			icon: CircleQuestionMark,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data: sessionData, isPending } = useSession();

	return (
		<Sidebar
			className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
			{...props}
		>
			{/*
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Acme Inc</span>
									<span className="truncate text-xs">Enterprise</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
      */}
			<SidebarContent>
				<NavProjects projects={data.projects} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				{isPending ? <NavUser.Loading /> : <NavUser user={sessionData?.user} />}
			</SidebarFooter>
		</Sidebar>
	);
}
