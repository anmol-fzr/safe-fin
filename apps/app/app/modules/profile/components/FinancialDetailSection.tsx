import { View } from "react-native";
import { Section, type SectionProps } from "@/components/Section";

type FinancialDetailSectionProps = SectionProps;

export function FinancialDetailSection(props: FinancialDetailSectionProps) {
	const { children, ...rest } = props;
	return (
		<Section {...rest}>
			<View style={{ paddingHorizontal: 8 }}>{children}</View>
		</Section>
	);
}
