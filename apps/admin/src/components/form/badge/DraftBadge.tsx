import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useResource } from "@/context/resource.context";

export const DraftBadge = memo(() => {
	const { resource } = useResource();

	return (
		<Tooltip>
			<TooltipTrigger>
				<Badge className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600">
					Draft
				</Badge>
			</TooltipTrigger>
			<TooltipContent>
				This {resource} is not Published yet, and Visible only to admins
			</TooltipContent>
		</Tooltip>
	);
});
