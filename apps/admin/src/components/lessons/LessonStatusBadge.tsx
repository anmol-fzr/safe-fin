import { Badge } from "@/components/ui/badge";

function LessonStatusBadge({ isPublished = false }) {
	return (
		<Badge variant={isPublished ? "default" : "outline"}>
			{isPublished ? "Publishd" : "Draft"}
		</Badge>
	);
}

export { LessonStatusBadge };
