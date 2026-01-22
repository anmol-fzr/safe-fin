import type { ErrorInfo } from "react";
import { ScrollView, type TextStyle, View, type ViewStyle } from "react-native";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Button, Icon, Screen, Text } from "../../components";
import { envs } from "@/utils/envs";
import { DotLottie } from "@lottiefiles/dotlottie-react-native";
import type { ErrorDetailsProps } from "@/screens/ErrorScreen/ErrorDetails";
import { TxKeyPath } from "@/i18n";
import { TOptions } from "i18next";

const errorLottie = require("assets/lottie/errors/genric-error.lottie");

interface Tx {
	tx: TxKeyPath;
	options?: TOptions;
}

interface GenericErrorDetails extends ErrorDetailsProps {
	title: Tx;
	desc: Tx;
	button: Tx;

	lottieSrc: any;
}

/**
 * Renders the error details screen.
 * @param {ErrorDetailsProps} props - The props for the `ErrorDetails` component.
 * @returns {JSX.Element} The rendered `ErrorDetails` component.
 */
export function GenericErrorDetails(props: GenericErrorDetails) {
	const { title, desc, button, lottieSrc, ...errorDetails } = props;

	const { themed } = useAppTheme();

	return (
		<>
			<DotLottie
				source={lottieSrc}
				loop
				autoplay
				style={{ width: 200, height: 200 }}
			/>

			<View style={$topSection}>
				<Text
					style={themed($heading)}
					preset="subheading"
					tx={title.tx}
					txOptions={title.options}
				/>
				<Text
					style={{ textAlign: "center" }}
					tx={desc.tx}
					txOptions={desc.options}
				/>

				<Button
					preset="reversed"
					style={themed($resetButton)}
					onPress={errorDetails?.onReset}
					tx={button.tx}
					txOptions={button.options}
				/>
			</View>

			{envs.isDev && (
				<ScrollView
					style={themed($errorSection)}
					contentContainerStyle={themed($errorSectionContentContainer)}
				>
					<Text
						style={themed($errorContent)}
						weight="bold"
						text={`${errorDetails?.error}`.trim()}
					/>
					<Text
						selectable
						style={themed($errorBacktrace)}
						text={`${errorDetails?.errorInfo?.componentStack ?? ""}`.trim()}
					/>
				</ScrollView>
			)}
		</>
	);
}

const $topSection: ViewStyle = {
	flex: 1,
	alignItems: "center",
};

const $heading: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
	color: colors.error,
	marginBottom: spacing.md,
});

const $errorSection: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
	flex: 2,
	backgroundColor: colors.separator,
	marginVertical: spacing.md,
	borderRadius: 6,
});

const $errorSectionContentContainer: ThemedStyle<ViewStyle> = ({
	spacing,
}) => ({
	padding: spacing.md,
});

const $errorContent: ThemedStyle<TextStyle> = ({ colors }) => ({
	color: colors.error,
});

const $errorBacktrace: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
	marginTop: spacing.md,
	color: colors.textDim,
});

const $resetButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
	backgroundColor: colors.error,
	paddingHorizontal: spacing.xxl,
	marginTop: spacing.xl,
});
