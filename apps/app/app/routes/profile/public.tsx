import { Screen } from "@/components";
import { UserDetailsCard } from "@/modules/account/screens";
import { $styles } from "@/theme";
// import { PublicProfileLinksCard } from "@/modules/profile/components/PublicProfileLinksCard";

export default function PublicProfileScreen() {
	return (
		<Screen preset="scroll" style={[$styles.container, { gap: 24 }]}>
			<UserDetailsCard />
			{/* <PublicProfileLinksCard /> */}
		</Screen>
	);
}
