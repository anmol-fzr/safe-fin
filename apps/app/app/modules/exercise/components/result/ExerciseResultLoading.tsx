import { Text, type TextProps } from "@/components";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { ComponentProps } from "react";

const lottie = require("assets/lottie/exercise/loading-result.json");

interface EvaluatingStateProps extends ViewProps {
	lottieProps?: Omit<ComponentProps<typeof LottieView>, "source">;
	loadingText?: string;
	loadingTextProps?: TextProps;
}

export function ExerciseResultLoading(props: EvaluatingStateProps) {
	const {
		lottieProps = {},
		loadingTextProps = {},
		loadingText = "Evaluating Your Choices...",
	} = props;

	return (
		<View style={{ margin: "auto" }}>
			<LottieView
				source={lottie}
				loop
				autoPlay
				style={{
					width: 200,
					height: 200,
					alignSelf: "center",
				}}
				{...lottieProps}
			/>
			<Text preset="subheading" {...loadingTextProps}>
				{loadingText}
			</Text>
		</View>
	);
}
