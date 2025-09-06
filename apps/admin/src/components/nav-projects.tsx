import { type LucideIcon } from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, type LinkComponentProps } from "@tanstack/react-router";

export function NavProjects({
	projects,
}: {
	projects: {
		name: string;
		url: LinkComponentProps["to"];
		icon: LucideIcon;
	}[];
}) {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Projects</SidebarGroupLabel>
			<SidebarMenu>
				{projects.map((item) => (
					<SidebarMenuItem key={item.name}>
						<Link to={item.url} activeOptions={{ exact: true }}>
							{({ isActive }) => (
								<SidebarMenuButton tooltip={item.name} isActive={isActive}>
									<item.icon />
									<span className="z-10 font-medium">{item.name}</span>
								</SidebarMenuButton>
							)}
						</Link>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
