import { useLocalSearchParams } from "expo-router";
import { CalculatorScreenWrapper } from "@/modules/Calculator/components";
//import { Calculator } from "@/modules/Calculator/components/Calculator";

export function CalculatorScreen() {
	const { id } = useLocalSearchParams();
	console.log({ id });

	return (
		<CalculatorScreenWrapper>
			{/*
			<Calculator id={id} />
        */}
		</CalculatorScreenWrapper>
	);
}
