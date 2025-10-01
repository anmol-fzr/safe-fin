import type { Session, User } from "@/auth";

export type HonoEnv = {
	Variables: {
		user: User;
		session: Session;
	};
	Bindings: CloudflareBindings;
};
