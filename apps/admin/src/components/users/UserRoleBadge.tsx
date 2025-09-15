import { Badge } from "@/components/ui/badge";
import type { User } from "@/lib/auth";
import { cva } from "class-variance-authority";
import { UserStarIcon, UserIcon } from "lucide-react";

type UserRoleBadgeProps = {
	role: User["role"];
};

const userBadgeVariant = cva("capitalize", {
	variants: {
		role: {
			admin:
				"bg-amber-100 dark:bg-amber-700 text-amber-700 dark:text-amber-100 border-amber-300 dark:border-amber-600 capitalize",
			user: "bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-100 border-indigo-300 dark:border-indigo-600 capitalize",
		},
	},
	defaultVariants: {
		role: "user",
	},
});

export const UserRoleBadge = ({ role }: UserRoleBadgeProps) => {
	return (
		<Badge className={userBadgeVariant({ role })}>
			{role === "admin" ? <UserStarIcon /> : <UserIcon />}
			{role}
		</Badge>
	);
};
