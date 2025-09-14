import type * as React from "react";
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

import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
} from "@/components/ui/sidebar";
import { useSession } from "@/hooks/api/auth";

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
	const { data: sessionData, isPending } = useSession();

	if (isPending === false && sessionData === null) {
		console.log("should call logout");
		//logout();
	}

	return (
		<Sidebar
			className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
			{...props}
		>
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
