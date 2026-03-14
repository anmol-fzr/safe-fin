import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSettingsStore, type DateTimeStyle } from "@/store/useSettingsStore";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type PropsWithChildren } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/dashboard/settings/customization")({
	component: RouteComponent,
});

const opts = ["short", "medium", "full", "long"] as const;

function RouteComponent() {
	const { enabled, toggle } = useSettingsStore((state) => state.shortcuts);

	return (
		<Page>
			<Page.Content>
				<SettingsCard title="Pro Users">
					<div className="flex items-center space-x-2">
						<Switch id="airplane-mode" checked={enabled} onClick={toggle} />
						<Label htmlFor="airplane-mode">
							Keyboard Shortcuts
							<p className="text-muted-foreground">
								{enabled ? "(Enabled)" : "(Disabled)"}
							</p>
						</Label>
					</div>
				</SettingsCard>

				<SettingsCard title="Customize Date & Time Appearance">
					<DateStyleSelector />
				</SettingsCard>
			</Page.Content>
		</Page>
	);
}

type SettingsCardProps = PropsWithChildren & {
	title: string;
};

const SettingsCard = ({ title, children }: SettingsCardProps) => {
	return (
		<div className="min-w-lg pt-6">
			<CardHeader className="p-0 pb-3">
				<CardTitle className="text-primary">{title}</CardTitle>
			</CardHeader>
			<CardContent className="p-2">{children}</CardContent>
		</div>
	);
};

const DateStyleSelector = () => {
	const { dateStyle, timeStyle } = useSettingsStore((state) => state.dateTime);
	const { setDateStyle, setTimeStyle } = useSettingsStore(
		(state) => state.dateTime,
	);

	return (
		<div className="space-y-6">
			<StyleSelector
				label="Date Styles"
				style={dateStyle}
				setStyle={setDateStyle}
				getFormatter={(opt: DateTimeStyle) => {
					return new Intl.DateTimeFormat("en-US", { dateStyle: opt }).format;
				}}
			/>

			<StyleSelector
				label="Time Styles"
				style={timeStyle}
				setStyle={setTimeStyle}
				getFormatter={(opt: DateTimeStyle) => {
					return new Intl.DateTimeFormat("en-US", { timeStyle: opt }).format;
				}}
			/>
		</div>
	);
};

type StyleSelectorProps = {
	label: string;
	style: DateTimeStyle;
	setStyle: (s: DateTimeStyle) => void;
	getFormatter: (opt: DateTimeStyle) => (d: Date) => string;
};

const StyleSelector = ({
	label,
	style,
	setStyle,
	getFormatter,
}: StyleSelectorProps) => {
	const currDate = new Date().toDateString();

	return (
		<div className="space-y-2">
			<Label>{label}</Label>
			<Select value={style} onValueChange={setStyle}>
				<SelectTrigger className="!min-w-84">
					<SelectValue placeholder="Select a Date Style" />
				</SelectTrigger>

				<SelectContent>
					<SelectGroup>
						<SelectLabel>Styles</SelectLabel>
						{opts.map((opt) => (
							<SelectItem value={opt} key={opt}>
								{getFormatter(opt)(new Date(currDate))}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};
