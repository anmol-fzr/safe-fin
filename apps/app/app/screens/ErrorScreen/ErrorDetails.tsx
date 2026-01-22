import type { ErrorInfo } from "react";
import { ViewStyle } from "react-native";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Screen } from "../../components";
import { GenericErrorDetails } from "@/components/error-states/GenericErrorDetails";
import { UnknownErrorDetails } from "@/components/error-states/UnknownErrorDetails";
import { AxiosError } from "axios";
import { NotFoundErrorDetails } from "@/components/error-states/NotFoundErrorDetails";

export interface ErrorDetailsProps {
	error: Error;
	errorInfo: ErrorInfo | null;
	onReset(): void;
}

/**
 * Renders the error details screen.
 * @param {ErrorDetailsProps} props - The props for the `ErrorDetails` component.
 * @returns {JSX.Element} The rendered `ErrorDetails` component.
 */
export function ErrorDetails(props: ErrorDetailsProps) {
	const { themed } = useAppTheme();

	let ErrorComp = UnknownErrorDetails;

	if (props.error instanceof AxiosError) {
		if ((props.error.status = 404)) {
			ErrorComp = NotFoundErrorDetails;
		}
	}

	return (
		<Screen
			preset="fixed"
			safeAreaEdges={["top", "bottom"]}
			contentContainerStyle={themed($contentContainer)}
		>
			<ErrorComp {...props} />
		</Screen>
	);
}

const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	alignItems: "center",
	paddingHorizontal: spacing.lg,
	paddingTop: spacing.xl,
	flex: 1,
});
