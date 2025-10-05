import type { Session, User } from "@/auth";

export interface HonoEnv {
	Variables: {
		user: User;
		session: Session;
	};
	Bindings: CloudflareBindings;
}
