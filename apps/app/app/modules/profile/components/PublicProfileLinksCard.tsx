import { Section } from "@/components/Section";
import { EmptyState } from "@/components";

export const PublicProfileLinksCard = () => {
	return (
		<Section>
			<Section.Header>
				<Section.Title>Links</Section.Title>
			</Section.Header>

			<Section.Body preset="filled">
				<EmptyState
					imageStyle={{ height: 0, width: 0 }}
					heading="No Links here"
					content="Add your portfolio and social links here"
					button="Add Link"
				/>
			</Section.Body>
		</Section>
	);
};
