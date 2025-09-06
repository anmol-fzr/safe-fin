import { Button, type ButtonProps } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";

type BackButtonProps = ButtonProps & {
	to: LinkComponentProps["to"];
	resource: string;
};

export function BackButton({ to, resource, ...props }: BackButtonProps) {
	return (
		<Button {...props} asChild variant="ghost" className="ml-0 pl-0">
			<Link to={to}>
				<ChevronLeftIcon /> {resource}
			</Link>
		</Button>
	);
}
