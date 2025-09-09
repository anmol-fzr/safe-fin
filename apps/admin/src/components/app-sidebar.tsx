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
import { logout } from "@/lib/auth";

type Data = {
	[key: string]: {
		title: string;
		url: LinkComponentProps["to"];
		icon: LucideIcon;
	}[];
};

const data: Data = {
	footer: [
		{
			title: "Support",
			url: "/dashboard/settings",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "/dashboard/settings",
			icon: Send,
		},
		{
			title: "Settings",
			url: "/dashboard/settings",
			icon: Settings,
		},
	],
	navigation: [
		{
			title: "Users",
			url: "/dashboard/users",
			icon: User,
		},
		{
			title: "Lessons",
			url: "/dashboard/lessons",
			icon: Brain,
		},
		{
			title: "Quiz",
			url: "/dashboard/quiz",
			icon: CircleQuestionMark,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	//const { data: sessionData, isPending } = useSession();
	const isPending = true;
	const sessionData = {
		status: true,
		token: "Ea9yvmSTupL8U9yiqRpPsDu1U61XiNxF",
		user: {
			id: "F7EOrNtgbhOUA4FYvj0r7bN4eJykYGMb",
			email: "8427822949",
			emailVerified: false,
			name: "Anmol",
			image: null,
			phoneNumber: "8427822949",
			phoneNumberVerified: true,
			createdAt: "2025-08-10T12:13:11.000Z",
			updatedAt: "2025-08-10T12:13:11.000Z",
		},
	};

	if (isPending === false && sessionData === null) {
		console.log("should call logout");
		//logout();
	}

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
				<NavProjects projects={data.navigation} />
				<NavSecondary items={data.footer} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				{isPending ? <NavUser.Loading /> : <NavUser user={sessionData?.user} />}
			</SidebarFooter>
		</Sidebar>
	);
}
