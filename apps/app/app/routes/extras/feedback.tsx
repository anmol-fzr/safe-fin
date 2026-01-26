import { Screen } from "@/components";
import { Section } from "@/components/Section";
import { FeedbackForm } from "@/modules/profile/components/feedback-form/FeedbackForm";
import { $styles } from "@/theme";

export default function FeedbackScreen() {
	return (
		<Screen
			preset="scroll"
			safeAreaEdges={["bottom"]}
			contentContainerStyle={$styles.container}
		>
			<Section>
				<Section.Title>Feedback</Section.Title>

				<Section.Body preset="filled">
					<FeedbackForm />
				</Section.Body>
			</Section>
		</Screen>
	);
}
