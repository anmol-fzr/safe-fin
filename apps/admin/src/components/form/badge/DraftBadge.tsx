import { memo } from "react";
import { useResource } from "@/context/resource.context";
import { CircleDashedIcon } from "lucide-react";
import { GrayBadge } from "./GrayBadge";

export const DraftBadge = memo(() => {
	const { resource } = useResource();

	return (
		<GrayBadge
			Icon={CircleDashedIcon}
			title="Draft"
			tooltip={`This ${resource} is not Published yet, and Visible only to admins`}
		/>
	);
});
