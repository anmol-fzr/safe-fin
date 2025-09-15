import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { LucideIcon } from "lucide-react";

type GreenBadgeProps = {
	Icon: LucideIcon;
	title: string;
	tooltip: string;
};

export const GreenBadge = memo(({ title, tooltip, Icon }: GreenBadgeProps) => {
	return (
		<Tooltip>
			<TooltipTrigger>
				<Badge className="bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-100 border-green-300 dark:border-green-600">
					<Icon />
					{title}
				</Badge>
			</TooltipTrigger>
			<TooltipContent>{tooltip}</TooltipContent>
		</Tooltip>
	);
});
