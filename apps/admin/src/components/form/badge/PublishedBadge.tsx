import { memo } from "react";
import { useResource } from "@/context/resource.context";
import { CircleCheckBigIcon } from "lucide-react";
import { GreenBadge } from "./GreenBadge";

export const PublishedBadge = memo(() => {
	const { resource } = useResource();

	return (
		<GreenBadge
			Icon={CircleCheckBigIcon}
			title="Published"
			tooltip={`This ${resource} is Published, and Visible to End Users`}
		/>
	);
});
