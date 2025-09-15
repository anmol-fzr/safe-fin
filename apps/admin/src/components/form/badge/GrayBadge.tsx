import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { LucideIcon } from "lucide-react";

type GrayBadgeProps = {
	Icon: LucideIcon;
	title: string;
	tooltip: string;
};

export const GrayBadge = memo(({ title, tooltip, Icon }: GrayBadgeProps) => {
	return (
		<Tooltip>
			<TooltipTrigger>
				<Badge className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600">
					<Icon />
					{title}
				</Badge>
			</TooltipTrigger>
			<TooltipContent> {tooltip} </TooltipContent>
		</Tooltip>
	);
});
