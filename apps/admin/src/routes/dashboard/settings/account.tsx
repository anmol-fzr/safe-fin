import { createFileRoute } from "@tanstack/react-router";
import {
	DeleteAccountCard,
	SessionsCard,
	UpdateAvatarCard,
} from "@daveyplate/better-auth-ui";
import { Page } from "@/components/page";

export const Route = createFileRoute("/dashboard/settings/account")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Page>
			<Page.Header>
				<Page.Title title="Account" />
			</Page.Header>
			<Page.Content className="!w-full">
				<UpdateAvatarCard />
				<SessionsCard />
				<DeleteAccountCard />
			</Page.Content>
		</Page>
	);
}
