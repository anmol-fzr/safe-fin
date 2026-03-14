import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ComponentPropsWithoutRef } from "react";

type UserAvatarProps = {
	image: ComponentPropsWithoutRef<"img">["src"];
	name: string;
};

export const UserAvatar = ({ image, name }: UserAvatarProps) => {
	return (
		<Avatar className="h-8 w-8 rounded-lg">
			<AvatarImage src={image} alt={name} />
			<AvatarFallback className="rounded-lg uppercase">
				{name.slice(0, 2)}
			</AvatarFallback>
		</Avatar>
	);
};
