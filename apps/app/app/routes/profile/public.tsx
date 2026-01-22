import { EmptyState, Screen, Text } from "@/components";
import { Section } from "@/components/Section";
import { UserDetailsCard } from "@/modules/account/screens";
import { $styles } from "@/theme";

export default function PublicProfileScreen() {
	return (
		<Screen preset="scroll" style={[$styles.container, { gap: 24 }]}>
			<UserDetailsCard />

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
		</Screen>
	);
}
