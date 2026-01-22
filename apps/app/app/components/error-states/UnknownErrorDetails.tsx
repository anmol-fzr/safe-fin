import type { ErrorDetailsProps } from "@/screens/ErrorScreen/ErrorDetails";
import { GenericErrorDetails } from "./GenericErrorDetails";

const errorLottie = require("assets/lottie/errors/genric-error.lottie");

/**
 * Renders the error details screen.
 * @param {ErrorDetailsProps} props - The props for the `ErrorDetails` component.
 * @returns {JSX.Element} The rendered `ErrorDetails` component.
 */
export function UnknownErrorDetails(props: ErrorDetailsProps) {
	return (
		<GenericErrorDetails
			title={{ tx: "errorScreen:title" }}
			desc={{ tx: "errorScreen:friendlySubtitle" }}
			button={{ tx: "errorScreen:reset" }}
			lottieSrc={errorLottie}
			{...props}
		/>
	);
}
