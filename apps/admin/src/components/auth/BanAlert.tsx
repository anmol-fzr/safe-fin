import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface BanAlertProps {
	message: string;
}

export function BanAlert({ message }: BanAlertProps) {
	return (
		<div className="grid w-full max-w-xl items-start gap-4">
			<Alert variant="destructive">
				<AlertCircleIcon />
				<AlertTitle>Unable to Login.</AlertTitle>
				<AlertDescription>
					<p>{message}</p>
				</AlertDescription>
			</Alert>
		</div>
	);
}
