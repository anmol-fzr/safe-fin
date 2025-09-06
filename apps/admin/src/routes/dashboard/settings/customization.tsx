import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSettingsStore } from "@/store/useSettingsStore";

export const Route = createFileRoute("/dashboard/settings/customization")({
	component: RouteComponent,
});

function RouteComponent() {
	const { enabled, toggle } = useSettingsStore((state) => state.shortcuts);

	return (
		<Page>
			<Page.Header></Page.Header>
			<Page.Content>
				<div className="flex items-center space-x-2">
					<Switch id="airplane-mode" checked={enabled} onClick={toggle} />
					<Label htmlFor="airplane-mode">
						Keyboard Shortcuts
						<p className="text-muted-foreground">
							{enabled ? "(Enabled)" : "(Disabled)"}
						</p>
					</Label>
				</div>
			</Page.Content>
		</Page>
	);
}
