import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useResource } from "@/context/resource.context";

export const PublishedBadge = memo(() => {
	const { resource } = useResource();

	return (
		<Tooltip>
			<TooltipTrigger>
				<Badge className="bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-100 border-green-300 dark:border-green-600">
					Published
				</Badge>
			</TooltipTrigger>
			<TooltipContent>
				This {resource} is Published, and Visible to End Users
			</TooltipContent>
		</Tooltip>
	);
});
