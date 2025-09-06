import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

export function BackToLessons() {
	return (
		<Button asChild variant="ghost" className="ml-0 pl-0">
			<Link to="/dashboard/lessons">
				<ChevronLeftIcon /> Lessons
			</Link>
		</Button>
	);
}
